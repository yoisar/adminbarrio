import api from "../api";

export const fetchExpensas = async () => {
    try {
        const response = await api.get("/expensas");
        return response.data;
    } catch (error) {
        console.error("Error fetching expensas:", error);
        throw error;
    }
};

export const createExpensa = async (expensaData) => {
    try {
        const response = await api.post("/expensas", expensaData);
        return response.data;
    } catch (error) {
        console.error("Error creating expensa:", error);
        throw error;
    }
};