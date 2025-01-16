import api from './api';

// Definir la interfaz para Proveedor
export interface Proveedor {
    id?: number;
    nombre: string;
    descripcion?: string;
    created_at?: string;
    updated_at?: string;
}

// Obtener todos los proveedores
export const fetchProveedores = async (): Promise<Proveedor[]> => {
    const response = await api.get('/proveedores');
    return response.data;
};

// Crear un nuevo proveedor
export const createProveedor = async (proveedor: Proveedor): Promise<Proveedor> => {
    const response = await api.post('/proveedores', proveedor);
    return response.data;
};

// Actualizar un proveedor existente
export const updateProveedor = async (id: number, proveedor: Proveedor): Promise<Proveedor> => {
    const response = await api.put(`/proveedores/${id}`, proveedor);
    return response.data;
};

// Eliminar un proveedor
export const deleteProveedor = async (id: number): Promise<void> => {
    await api.delete(`/proveedores/${id}`);
};