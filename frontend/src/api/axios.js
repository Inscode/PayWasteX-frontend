import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // e.g. "http://localhost:8080/api"
  withCredentials: true, // Send HttpOnly cookie automatically
});

// Attach access token to Authorization header on each request
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Refresh token queue to prevent duplicate refresh calls
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(({ resolve, reject }) =>
    error ? reject(error) : resolve(token)
  );
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { config, response } = error;
    if (response?.status === 401 && !config._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          config.headers.Authorization = `Bearer ${token}`;
          return api(config);
        });
      }
      config._retry = true;
      isRefreshing = true;

      return api
        .post("/auth/refresh")
        .then(({ data }) => {
          sessionStorage.setItem("accessToken", data.token);
          api.defaults.headers.Authorization = `Bearer ${data.token}`;
          processQueue(null, data.token);
          config.headers.Authorization = `Bearer ${data.token}`;
          return api(config);
        })
        .catch((err) => {
          processQueue(err, null);
          sessionStorage.removeItem("accessToken");
          window.location.href = "/login";
          return Promise.reject(err);
        })
        .finally(() => {
          isRefreshing = false;
        });
    }
    return Promise.reject(error);
  }
);

export default api;
