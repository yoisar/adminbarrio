import axios from 'axios';

export interface User {
    id?: number;
    name: string;
    email: string;
    role: string;
    telefono: string;
    direccion: string;
    created_at?: string;
    updated_at?: string;
}

export const fetchUsuarios = async (): Promise<User[]> => {
    const response = await axios.get('/api/users');
    return response.data;
};

export const createUser = async (user: User): Promise<User> => {
    const response = await axios.post('/api/users', user);
    return response.data;
};

export const updateUser = async (id: number, user: User): Promise<User> => {
    const response = await axios.put(`/api/users/${id}`, user);
    return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
    await axios.delete(`/api/users/${id}`);
};