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

export const createCustomer = async (customerData, role = "CUSTOMER") => {
  try {
    const dataWithRole = { ...customerData, role };
    const response = await api.post("auth/customer-register", dataWithRole);
    return response.data;
  } catch (error) {
    throw error;
  }
};