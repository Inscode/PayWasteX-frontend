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
        const { data } = await svcRefresh();
        sessionStorage.setItem("accessToken", data.token);
        setUser({ id: data.userId, role: data.role });
        scheduleSilentRefresh(data.token);
      } catch {
        setUser(null);
        sessionStorage.removeItem("accessToken");
      }
    })();

    return () => {
      if (refreshTimeout.current) clearTimeout(refreshTimeout.current);
    };
  }, []);

  const login = async (credentials) => {
    const { data } = await svcLogin(credentials);
    sessionStorage.setItem("accessToken", data.token);
    setUser({ id: data.userId, role: data.role });
    scheduleSilentRefresh(data.token);
    return data; // ✅ return the login response
  };

  const logout = async () => {
    await svcLogout();
    sessionStorage.removeItem("accessToken");
    setUser(null);
    if (refreshTimeout.current) clearTimeout(refreshTimeout.current);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
