import api from "./api";
import { Expensa } from "./expensasService";
import { User } from "./userService";

// Definir la interfaz para Cobro
export interface Cobro {
    id: number;
    user_id: number;
    expensa_id: number;
    monto_pagado: string;
    fecha_pago: string;
    created_at: string;
    updated_at: string;
    user: User;
    expensa: Expensa;
}

// Obtener todos los cobros
export const fetchCobros = async (): Promise<Cobro[]> => {
    try {
        const response = await api.get("/cobros");
        return response.data;
    } catch (error) {
        console.error("Error fetching cobros:", error);
        throw error;
    }
};

// Crear un nuevo cobro
export const createCobro = async (cobroData: Cobro): Promise<Cobro> => {
    try {
        const response = await api.post("/cobros", cobroData);
        return response.data;
    } catch (error) {
        console.error("Error creating cobro:", error);
        throw error;
    }
};

// Actualizar un cobro existente
export const updateCobro = async (id: number, cobroData: Cobro): Promise<Cobro> => {
    try {
        const response = await api.put(`/cobros/${id}`, cobroData);
        return response.data;
    } catch (error) {
        console.error("Error updating cobro:", error);
        throw error;
    }
};

// Eliminar un cobro
export const deleteCobro = async (id: number): Promise<void> => {
    try {
        await api.delete(`/cobros/${id}`);
    } catch (error) {
        console.error("Error deleting cobro:", error);
        throw error;
    }
};

// Obtener usuarios morosos
export const fetchMorosos = async (): Promise<User[]> => {
    try {
        const response = await api.get("/cobros/morosos");
        return response.data;
    } catch (error) {
        console.error("Error fetching morosos:", error);
        throw error;
    }
};