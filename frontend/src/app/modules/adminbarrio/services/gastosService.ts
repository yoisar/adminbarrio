import api from "./api";

// Definir la interfaz para Gasto
export interface Gasto {
    id?: number;
    categoria_gasto_id: number;
    descripcion: string;
    monto: string;
    fecha: string;
    created_at?: string;
    updated_at?: string;
    categoria?: any; // Puedes definir una interfaz para Categoria si es necesario
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

// Obtener todas las categorías de gastos
export const fetchCategorias = async () => {
    const response = await api.get('/categorias');
    return response.data;
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