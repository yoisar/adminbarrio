import api from './api'

export const login = async (email: string, password: string, role: string) => {
    const response = await api.post('/login', { email, password, role })
    const { access_token, barrio } = response.data

    // Guardar el token y el barrio en localStorage
    localStorage.setItem('access_token', access_token)
    localStorage.setItem('barrio', JSON.stringify(barrio))

    return response.data
}

export const verifyToken = async () => {
    const response = await api.post('/verify_token')
    return response.data
}

// Servicio para obtener los datos del barrio desde localStorage
export const getBarrioFromLocalStorage = () => {
    const barrio = localStorage.getItem('kt-auth-react-v')
    return barrio ? JSON.parse(barrio) : null
}