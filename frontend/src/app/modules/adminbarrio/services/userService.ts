import api from "./api";
// Definir la interfaz para User
export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    role: string;
}

// Obtener todos los usuarios
export const getUsers = async (): Promise<User[]> => {
    try {
        const response = await api.get("/users");
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

// Crear un nuevo usuario
export const createUser = async (userData: User): Promise<User> => {
    try {
        const response = await api.post("/users", userData);
        return response.data;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

// Obtener usuarios con rol 'user'
export const getUsersWithRoleUser = async (): Promise<User[]> => {
    try {
        const response = await api.get('/users/role/user');
        return response.data;
    } catch (error) {
        console.error("Error fetching users with role 'user':", error);
        throw error;
    }
};