
// Obtener usuarios morosos
export const fetchMorosos = async (): Promise<number> => {
    try {
        // Aquí puedes hacer la llamada a la API para obtener los morosos
        // const response = await api.get("/cobros/morosos");
        // return response.data;

        // Por ahora, solo devolver un 0
        return 0;
    } catch (error) {
        console.error("Error fetching morosos:", error);
        throw error;
    }
};