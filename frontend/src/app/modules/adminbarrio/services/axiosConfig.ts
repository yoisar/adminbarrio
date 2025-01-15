import axios from 'axios';

// Crear una instancia de Axios para la API
const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL || "http://localhost:8010/api", // URL base del backend Laravel
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Configurar un interceptor global para agregar los encabezados 'role' y 'Authorization'
api.interceptors.request.use(
    (config) => {
        // Añadir el encabezado 'role'
        config.headers['role'] = 'admin';

        // Añadir el token de autenticación si está disponible
        const token = localStorage.getItem("auth-token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;