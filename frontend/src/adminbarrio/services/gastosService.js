import api from "../api";

export const fetchGastos = async () => {
    const response = await api.get('/gastos');
    return response.data;
};

export const createGasto = async (gasto) => {
    const response = await api.post('/gastos', gasto);
    return response.data;
};

export const fetchCategorias = async () => {
    const response = await api.get('/categorias');
    return response.data;
};

// Obtener todos los gastos de una expensa
export const fetchGastosByExpensaId = async (expensaId) => {
    try {
        const response = await api.get(`/expensas/${expensaId}/gastos`);
        return response.data;
    } catch (error) {
        console.error("Error fetching gastos:", error);
        throw error;
    }
};