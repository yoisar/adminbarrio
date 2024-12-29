import api from "../api"; // Asegúrate de tener configurado tu cliente Axios

// Obtener todas las expensas
export const fetchExpensas = async () => {
    try {
        const response = await api.get("/expensas");
        return response.data;
    } catch (error) {
        console.error("Error fetching expensas:", error);
        throw error;
    }
};

// Obtener los detalles de una expensa específica
export const fetchExpensaById = async (id) => {
    try {
        const response = await api.get(`/expensas/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching expensa:", error);
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