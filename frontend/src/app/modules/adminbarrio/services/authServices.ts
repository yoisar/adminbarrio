import { User } from '../../auth/core/_models';
import api from './api';

export const login = async (email: string, password: string, role: string) => {
    const response = await api.post('login', { email, password, role })
    const { access_token, barrio, user } = response.data

    // Guardar el token, el barrio y el usuario en localStorage
    localStorage.setItem('access_token', access_token)
    localStorage.setItem('barrio', JSON.stringify(barrio))
    localStorage.setItem('user', JSON.stringify(user))

    return response.data
}

export const verifyToken = async () => {
    const response = await api.post('/verify_token')
    return response.data
}

// Servicio para obtener los datos del barrio desde localStorage
export const getBarrioFromLocalStorage = () => {
    const barrio = localStorage.getItem('barrio')
    return barrio ? JSON.parse(barrio) : null
}

// Servicio para obtener los datos del usuario desde localStorage
export const getUserFromLocalStorage = (): User | null => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) as User : null;
}