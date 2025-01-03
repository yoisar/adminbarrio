import api from "./api";
import { User } from "./userService";

// Definir la interfaz para Sueldo
export interface Sueldo {
    id: number;
    user_id: number;
    monto: string;
    fecha: string;
    created_at: string;
    updated_at: string;
    user: User;
}

// Obtener todos los sueldos
export const fetchSueldos = async (): Promise<Sueldo[]> => {
    try {
        const response = await api.get("/sueldos");
        return response.data;
    } catch (error) {
        console.error("Error fetching sueldos:", error);
        throw error;
    }
};

// Registrar un nuevo sueldo
export const createSueldo = async (sueldoData: Sueldo): Promise<Sueldo> => {
    try {
        const response = await api.post("/sueldos", sueldoData);
        return response.data;
    } catch (error) {
        console.error("Error creating sueldo:", error);
        throw error;
    }
};

// Actualizar un sueldo
export const updateSueldo = async (id: number, sueldoData: Sueldo): Promise<Sueldo> => {
    try {
        const response = await api.put(`/sueldos/${id}`, sueldoData);
        return response.data;
    } catch (error) {
        console.error("Error updating sueldo:", error);
        throw error;
    }
};

// Eliminar un sueldo
export const deleteSueldo = async (id: number): Promise<void> => {
    try {
        await api.delete(`/sueldos/${id}`);
    } catch (error) {
        console.error("Error deleting sueldo:", error);
        throw error;
    }
};