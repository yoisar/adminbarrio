import api from "./api";

// Definir la interfaz para Gasto
export interface Gasto {
    id?: number;
    categoria_gasto_id: number;
    barrio_id: number;
    descripcion: string;
    barrio: string;
    monto: string;
    fecha: string;
    created_at?: string;
    updated_at?: string;
    categoria?: any; // Puedes definir una interfaz para Categoria si es necesario
}

// Definir la interfaz para CategoriaGasto
export interface CategoriaGasto {
    id?: number;
    nombre: string;
    descripcion?: string;
    created_at?: string;
    updated_at?: string;
}

// Obtener todos los gastos
export const fetchGastos = async (): Promise<Gasto[]> => {
    const response = await api.get('/gastos');
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

// Obtener todos los gastos de una expensa
export const fetchGastosByExpensaId = async (expensaId: number): Promise<Gasto[]> => {
    try {
        const response = await api.get(`/expensas/${expensaId}/gastos`);
        return response.data;
    } catch (error) {
        console.error("Error fetching gastos:", error);
        throw error;
    }
};