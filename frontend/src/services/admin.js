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

export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`api/admin/delete?id=${userId}`);
    console.log("Deleted user:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

  export const editUser = async (userId, form) => {
  try {
    const response = await api.put(`api/admin/update?id=${userId}`, form);
    console.log("Updated user:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};