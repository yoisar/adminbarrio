import api from "./api";

// Obtener todos los cobros
export const fetchCobros = async () => {
    try {
        const response = await api.get("/cobros");
        return response.data;
    } catch (error) {
        console.error("Error fetching cobros:", error);
        throw error;
    }
};

// Registrar un nuevo cobro
export const createCobro = async (cobroData) => {
    try {
        const response = await api.post("/cobros", cobroData);
        return response.data;
    } catch (error) {
        console.error("Error creating cobro:", error);
        throw error;
    }
};

// Obtener usuarios morosos
export const fetchMorosos = async () => {
    try {
        const response = await api.get("/cobros/morosos");
        return response.data;
    } catch (error) {
        console.error("Error fetching morosos:", error);
        throw error;
    }
};