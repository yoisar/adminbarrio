import axios from "axios";

// Crear una instancia de Axios para la API
const api = axios.create({
    // const API_URL = import.meta.env.VITE_APP_API_URL;
    baseURL: import.meta.env.VITE_APP_API_URL || "http://localhost:8010/api", // URL base del backend Laravel
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Interceptores de solicitud (opcional)
api.interceptors.request.use(
    (config) => {
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