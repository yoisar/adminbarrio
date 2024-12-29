import api from "./api";


// Definir la interfaz para Expensa
export interface Expensa {
    id?: number;
    fecha_vencimiento: string;
    total: number;
    saldo_anterior: number;
    monto_pagado: number;
    created_at?: string;
    updated_at?: string;
}

// Obtener todas las expensas
export const fetchExpensas = async (): Promise<Expensa[]> => {
    try {
        const response = await api.get("/expensas");
        return response.data;
    } catch (error) {
        console.error("Error fetching expensas:", error);
        throw error;
    }
};

// Obtener los detalles de una expensa específica
export const fetchExpensaById = async (id: number): Promise<Expensa> => {
    try {
        const response = await api.get(`/expensas/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching expensa:", error);
        throw error;
    }
};

// Crear una nueva expensa
export const createExpensa = async (expensaData: Expensa): Promise<Expensa> => {
    try {
        const response = await api.post("/expensas", expensaData);
        return response.data;
    } catch (error) {
        console.error("Error creating expensa:", error);
        throw error;
    }
};

// Actualizar una expensa existente
export const updateExpensa = async (id: number, expensaData: Expensa): Promise<Expensa> => {
    try {
        const response = await api.put(`/expensas/${id}`, expensaData);
        return response.data;
    } catch (error) {
        console.error("Error updating expensa:", error);
        throw error;
    }
};

// Obtener el total de expensas
export const fetchTotalExpensas = async (): Promise<number> => {
    try {
        const response = await api.get("/expensas/total");
        return response.data.total;
    } catch (error) {
        console.error("Error fetching total expensas:", error);
        throw error;
    }
};

// Obtener el total de cobros realizados
export const fetchTotalCobros = async (): Promise<number> => {
    try {
        const response = await api.get("/cobros/total");
        return response.data.total;
    } catch (error) {
        console.error("Error fetching total cobros:", error);
        throw error;
    }
};