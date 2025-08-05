import api from "../api/axios";

export const directCustomerPayment = async () => {
  
  try {
    const response = await api.post("responsibleOfficer/payments",paymentData);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};   

export const feeCollectorTotalPayment = async () => {
  try {
    const response = await api.get("responsibleOfficer/collectors/total-collected");
    return response.data;
  } catch (error) {
    console.error("Error fetching FeeCollector Total Payment data:", error);
    throw error;
  }
};   

export const billManagementCard = async () => {
  try {
    const response = await api.get("responsibleOfficer/bill-management-stats");
    return response.data;
  } catch (error) {
    console.error("Error fetching Bill Management Card data:", error);
    throw error;
  }
};  

export const getAllZOnes = async () => { 
  try {
    const response = await api.get("responsibleOfficer/get-zone");
    return response.data;
  } catch (error) {
    console.error("Error fetching Zone data:", error);
    throw error;
  }
};  
