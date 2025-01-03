import api from "./api";

// Definir la interfaz para Concepto
export interface Concepto {
    id?: number;
    sueldo_id: number;
    carga_social_id: number | null;
    nombre: string;
    monto: number;
    created_at?: string;
    updated_at?: string;
}

// Obtener todos los conceptos
export const fetchConceptos = async (): Promise<Concepto[]> => {
    try {
        const response = await api.get("/conceptos");
        return response.data;
    } catch (error) {
        console.error("Error fetching conceptos:", error);
        throw error;
    }
};

// Registrar un nuevo concepto
export const createConcepto = async (conceptoData: Concepto): Promise<Concepto> => {
    try {
        const response = await api.post("/conceptos", conceptoData);
        return response.data;
    } catch (error) {
        console.error("Error creating concepto:", error);
        throw error;
    }
};

// Actualizar un concepto
export const updateConcepto = async (id: number, conceptoData: Concepto): Promise<Concepto> => {
    try {
        const response = await api.put(`/conceptos/${id}`, conceptoData);
        return response.data;
    } catch (error) {
        console.error("Error updating concepto:", error);
        throw error;
    }
};

// Eliminar un concepto
export const deleteConcepto = async (id: number): Promise<void> => {
    try {
        await api.delete(`/conceptos/${id}`);
    } catch (error) {
        console.error("Error deleting concepto:", error);
        throw error;
    }
};