import React, { useEffect, useState } from "react";
import { createExpensa, fetchExpensas } from "../services/expensasService";

const Expensas = () => {
    const [expensas, setExpensas] = useState([]); // Lista de expensas
    const [error, setError] = useState(null); // Para manejar errores
    const [newExpensa, setNewExpensa] = useState({
        monto_total: "",
        fecha: "",
        detalle: "",
    }); // Formulario para nueva expensa

    // Función para cargar las expensas al montar el componente
    useEffect(() => {
        const getExpensas = async () => {
            try {
                const data = await fetchExpensas();
                setExpensas(data);
            } catch (err) {
                setError(err.message);
            }
        };
        getExpensas();
    }, []);

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        setNewExpensa({
            ...newExpensa,
            [e.target.name]: e.target.value,
        });
    };

    // Manejar el envío del formulario para crear una nueva expensa
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const createdExpensa = await createExpensa(newExpensa);
            setExpensas([...expensas, createdExpensa]); // Actualizar la lista de expensas
            setNewExpensa({ monto_total: "", fecha: "", detalle: "" }); // Limpiar el formulario
        } catch (err) {
            setError(err.message);
        }
    };

    // Mostrar errores si existen
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Gestión de Expensas</h1>

            {/* Formulario para crear una nueva expensa */}
            <form onSubmit={handleSubmit}>
                <h2>Crear Nueva Expensa</h2>
                <div>
                    <label>Monto Total:</label>
                    <input
                        type="number"
                        name="monto_total"
                        value={newExpensa.monto_total}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Fecha:</label>
                    <input
                        type="date"
                        name="fecha"
                        value={newExpensa.fecha}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Detalle:</label>
                    <textarea
                        name="detalle"
                        value={newExpensa.detalle}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Crear Expensa</button>
            </form>

            {/* Lista de expensas */}
            <h2>Lista de Expensas</h2>
            <ul>
                {expensas.map((expensa) => (
                    <li key={expensa.id}>
                        <strong>{expensa.fecha}</strong>: ${expensa.monto_total} - {expensa.detalle}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Expensas;