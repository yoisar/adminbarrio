import api from "./api";
import { Proveedor } from "./proveedorService";

// Definir la interfaz para Gasto
export interface Gasto {
    id: number;
    subcategoria_gasto_id: number;
    barrio_id: number;
    proveedor_id: number;
    descripcion: string;
    barrio: string | null;
    monto: number;
    fecha: string;
    nro_factura?: string;
    created_at?: string;
    updated_at?: string;
    subcategoria: SubcategoriaGasto | null;
    categoria: string | null;
    categoriaYSubcategoria: string | null;
    proveedor: Proveedor | null;
}

// Definir la interfaz para CategoriaGasto
export interface CategoriaGasto {
    id?: number;
    nombre: string;
    descripcion?: string;
    created_at?: string;
    updated_at?: string;
    subcategorias?: SubcategoriaGasto[];
}

// Definir la interfaz para SubcategoriaGasto
export interface SubcategoriaGasto {
    id?: number;
    categoria_gasto_id: number;
    nombre: string;
    descripcion?: string;
    categoria?: CategoriaGasto; // Actualizar el tipo de categoria
    created_at?: string;
    updated_at?: string;
}

// Obtener todos los gastos
export const fetchGastos = async (): Promise<Gasto[]> => {
    const response = await api.get('/gastos');
    return response.data;
};

// Obtener los gastos por barrio
export const fetchGastosByBarrio = async (barrioId: number): Promise<Gasto[]> => {
    const response = await api.get(`/gastos/barrio/${barrioId}`);
    return response.data;
};

// Crear un nuevo gasto
export const createGasto = async (gasto: Gasto): Promise<Gasto> => {
    const response = await api.post('/gastos', gasto);
    return response.data;
};

// Actualizar un gasto existente
export const updateGasto = async (id: number, gasto: Gasto): Promise<Gasto> => {
    const response = await api.put(`/gastos/${id}`, gasto);
    return response.data;
};

// Eliminar un gasto
export const deleteGasto = async (id: number): Promise<void> => {
    await api.delete(`/gastos/${id}`);
};

// Obtener todas las categorías de gastos
export const fetchCategorias = async (): Promise<CategoriaGasto[]> => {
    const response = await api.get('/categorias');
    return response.data;
};

// Crear una nueva categoría de gasto
export const createCategoriaGasto = async (categoria: CategoriaGasto): Promise<CategoriaGasto> => {
    const response = await api.post('/categorias', categoria);
    return response.data;
};

// Actualizar una categoría de gasto existente
export const updateCategoriaGasto = async (id: number, categoria: CategoriaGasto): Promise<CategoriaGasto> => {
    const response = await api.put(`/categorias/${id}`, categoria);
    return response.data;
};

// Eliminar una categoría de gasto
export const deleteCategoriaGasto = async (id: number): Promise<void> => {
    await api.delete(`/categorias/${id}`);
};

// Crear una nueva subcategoría de gasto
export const createSubcategoriaGasto = async (subcategoria: SubcategoriaGasto): Promise<SubcategoriaGasto> => {
    const response = await api.post('/subcategorias', subcategoria);
    return response.data;
};

// Actualizar una subcategoría de gasto existente
export const updateSubcategoriaGasto = async (id: number, subcategoria: SubcategoriaGasto): Promise<SubcategoriaGasto> => {
    const response = await api.put(`/subcategorias/${id}`, subcategoria);
    return response.data;
};

// Eliminar una subcategoría de gasto
export const deleteSubcategoriaGasto = async (id: number): Promise<void> => {
    await api.delete(`/subcategorias/${id}`);
};

// Obtener todas las subcategorías de gastos
export const fetchSubcategorias = async (): Promise<SubcategoriaGasto[]> => {
    const response = await api.get('/subcategorias');
    return response.data;
};