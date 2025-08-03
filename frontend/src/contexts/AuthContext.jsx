import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import {
  login as svcLogin,
  refresh as svcRefresh,
  logout as svcLogout,
} from "../services/authService";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const refreshTimeout = useRef(null);

  const scheduleSilentRefresh = (token) => {
    try {
      const { exp, role, sub } = jwtDecode(token);
      const expiresInMs = exp * 1000 - Date.now();
      const timeout = expiresInMs - 30000; // 30 sec before expiry

      if (refreshTimeout.current) clearTimeout(refreshTimeout.current);

      if (timeout > 0) {
        refreshTimeout.current = setTimeout(async () => {
          try {
            const { data } = await svcRefresh();
            sessionStorage.setItem("accessToken", data.token);
            setUser({ id: data.userId, role: data.role });
            scheduleSilentRefresh(data.token);
          } catch {
            await logout();
          }
        }, timeout);
      }
    } catch {
      // Invalid token decode
    }
  };

  useEffect(() => {
    (async () => {
      try {
        // First check if we have an access token in sessionStorage
        const existingToken = sessionStorage.getItem("accessToken");
        const userInfo = sessionStorage.getItem("userInfo");

        if (existingToken && userInfo) {
          try {
            // Try to decode the existing token to get user info
            const decoded = jwtDecode(existingToken);
            const currentTime = Date.now() / 1000;

            // If token is still valid (not expired)
            if (decoded.exp > currentTime) {
              const parsedUserInfo = JSON.parse(userInfo);
              setUser(parsedUserInfo);
              scheduleSilentRefresh(existingToken);
              setLoading(false);
              return;
            }
          } catch (decodeError) {
            console.log("Token decode failed, trying refresh...");
          }
        }

        // If no valid token, try to refresh
        const { data } = await svcRefresh();
        sessionStorage.setItem("accessToken", data.token);
        sessionStorage.setItem(
          "userInfo",
          JSON.stringify({ id: data.userId, role: data.role })
        );
        setUser({ id: data.userId, role: data.role });
        scheduleSilentRefresh(data.token);
      } catch (error) {
        console.log("Refresh failed:", error);
        setUser(null);
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("userInfo");
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      if (refreshTimeout.current) clearTimeout(refreshTimeout.current);
    };
  }, []);

  const login = async (credentials) => {
    const { data } = await svcLogin(credentials);
    sessionStorage.setItem("accessToken", data.token);

    // Also store user info in sessionStorage as backup
    sessionStorage.setItem(
      "userInfo",
      JSON.stringify({ id: data.userId, role: data.role })
    );

    setUser({ id: data.userId, role: data.role });
    setLoading(false); // Ensure loading is false after login
    scheduleSilentRefresh(data.token);
    return data; // ✅ return the login response
  };

  const logout = async () => {
    await svcLogout();
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("userInfo"); // Also remove user info
    setUser(null);
    if (refreshTimeout.current) clearTimeout(refreshTimeout.current);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
