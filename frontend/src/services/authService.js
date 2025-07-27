import api from "../api/axios";

export const login = ({ email, password }) => {
  return api.post("/auth/login", { email, password });
};

export const refresh = () => {
  return api.post("/auth/refresh");
};

export const logout = () => {
  return api.post("/auth/logout");
};
