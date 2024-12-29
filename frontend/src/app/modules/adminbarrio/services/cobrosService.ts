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

// Registrar un nuevo cobro
export const createCobro = async (cobroData: Cobro): Promise<Cobro> => {
    try {
        const response = await api.post("/cobros", cobroData);
        return response.data;
    } catch (error) {
        console.error("Error creating cobro:", error);
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