import api from "../api/axios";


export const fetchAllUser = async () => {
  
  try {
    const response = await api.get("api/admin/all");
    console.log("Fetched all users:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};