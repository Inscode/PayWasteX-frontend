import api from "../api/axios";

export const fetchCustomersByZone = async (zoneName) => {
  try {
    const response = await api.get("api/feeCollector/dashboard/cards", {
      params: { zoneName },
    });
    console.log("Fetched customers by zone:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching customers by zone:", error);
    throw error;
  }
};

export const fetchDashboardSummary = async () => {
  try {
    const response = await api.get("api/feeCollector/dashboard/summary");
    console.log("Fetched dashboard summary:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard summary:", error);
    throw error;
  }
};
