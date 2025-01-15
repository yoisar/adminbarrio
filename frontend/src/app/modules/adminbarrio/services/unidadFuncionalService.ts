import api from './axiosConfig';

export interface UnidadFuncional {
    id: number;
    nombre: string;
    barrio: string;
    propietario: string | null;
    inquilino: string | null;
    barrio_id: number;
    propietario_id: number;
    inquilino_id: number | null;
    numero: string;
    saldo_actual: number;
    estado: string;
    created_at: string;
    updated_at: string;
}

export interface Barrio {
    id: number;
    nombre: string;
}

export interface User {
    id: number;
    name: string;
}

export const fetchUnidadesFuncionales = async (): Promise<UnidadFuncional[]> => {
    const response = await api.get('/unidades-funcionales');
    return response.data;
};

export const createUnidadFuncional = async (unidadFuncional: UnidadFuncional): Promise<UnidadFuncional> => {
    const response = await api.post('/unidades-funcionales', unidadFuncional);
    return response.data;
};

export const updateUnidadFuncional = async (id: number, unidadFuncional: UnidadFuncional): Promise<UnidadFuncional> => {
    const response = await api.put(`/unidades-funcionales/${id}`, unidadFuncional);
    return response.data;
};

export const deleteUnidadFuncional = async (id: number): Promise<void> => {
    await api.delete(`/unidades-funcionales/${id}`);
};

export const fetchBarrios = async (): Promise<Barrio[]> => {
    const response = await api.get('/barrios');
    return response.data;
};

export const fetchPropietarios = async (): Promise<User[]> => {
    const response = await api.get('/users?role=propietario');
    return response.data;
};

export const fetchInquilinos = async (): Promise<User[]> => {
    const response = await api.get('/users?role=inquilino');
    return response.data;
};