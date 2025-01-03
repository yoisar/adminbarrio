import api from "./api";

// Definir la interfaz para CargaSocial
export interface CargaSocial {
    id?: number;
    sueldo_id: number;
    monto: number;
    descripcion?: string;
    created_at?: string;
    updated_at?: string;
}

// Obtener todas las cargas sociales
export const fetchCargasSociales = async (): Promise<CargaSocial[]> => {
    try {
        const response = await api.get("/cargas-sociales");
        return response.data;
    } catch (error) {
        console.error("Error fetching cargas sociales:", error);
        throw error;
    }
};

// Registrar una nueva carga social
export const createCargaSocial = async (cargaSocialData: CargaSocial): Promise<CargaSocial> => {
    try {
        const response = await api.post("/cargas-sociales", cargaSocialData);
        return response.data;
    } catch (error) {
        console.error("Error creating carga social:", error);
        throw error;
    }
};

// Actualizar una carga social
export const updateCargaSocial = async (id: number, cargaSocialData: CargaSocial): Promise<CargaSocial> => {
    try {
        const response = await api.put(`/cargas-sociales/${id}`, cargaSocialData);
        return response.data;
    } catch (error) {
        console.error("Error updating carga social:", error);
        throw error;
    }
};

// Eliminar una carga social
export const deleteCargaSocial = async (id: number): Promise<void> => {
    try {
        await api.delete(`/cargas-sociales/${id}`);
    } catch (error) {
        console.error("Error deleting carga social:", error);
        throw error;
    }
};