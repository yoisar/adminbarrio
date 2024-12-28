import api from "../api";

export const fetchDashboardMetrics = async () => {
    try {
        const response = await api.get("/dashboard");
        return response.data;
    } catch (error) {
        console.error("Error fetching dashboard metrics:", error);
        throw error;
    }
};