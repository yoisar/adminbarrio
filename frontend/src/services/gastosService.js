import api from "../api";

export const fetchGastos = async () => {
    try {
        const response = await api.get("/gastos");
        return response.data;
    } catch (error) {
        console.error("Error fetching gastos:", error);
        throw error;
    }
};

export const createGasto = async (gastoData) => {
    try {
        const response = await api.post("/gastos", gastoData);
        return response.data;
    } catch (error) {
        console.error("Error creating gasto:", error);
        throw error;
    }
};