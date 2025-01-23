import api from "./api";

// Definir la interfaz para Barrio
export interface Barrio {
    id?: number;
    nombre: string;
    direccion: string;
    descripcion?: string;
    created_at?: string;
    updated_at?: string;
}

// Obtener los barrios administrados por el usuario actual
export const fetchBarrios = async (userId: number): Promise<Barrio[]> => {
    const response = await api.get(`/barrios/admin?user_id=${userId}`);
    return response.data;
};

// Crear un nuevo barrio
export const createBarrio = async (barrio: Barrio): Promise<Barrio> => {
    const response = await api.post('/barrios', barrio);
    return response.data;
};

// Actualizar un barrio existente
export const updateBarrio = async (id: number, barrio: Barrio): Promise<Barrio> => {
    const response = await api.put(`/barrios/${id}`, barrio);
    return response.data;
};

// Eliminar un barrio
export const deleteBarrio = async (id: number): Promise<void> => {
    await api.delete(`/barrios/${id}`);
};