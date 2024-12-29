import React, { useEffect, useState } from "react";
import { createExpensa, fetchExpensas } from "../services/expensasService";

const Expensas = () => {
    const [expensas, setExpensas] = useState([]); // Lista de expensas
    const [error, setError] = useState(null); // Para manejar errores
    const [newExpensa, setNewExpensa] = useState({
        fecha_vencimiento: "",
        detalle: "",
        total: "",
        saldo_anterior: "",
        monto_pagado: "",
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

    // Función para manejar el cambio en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewExpensa((prevExpensa) => ({
            ...prevExpensa,
            [name]: value,
        }));
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const createdExpensa = await createExpensa(newExpensa);
            setExpensas((prevExpensas) => [...prevExpensas, createdExpensa]);
            setNewExpensa({
                fecha_vencimiento: "",
                detalle: "",
                total: "",
                saldo_anterior: "",
                monto_pagado: "",
            });
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h1>Expensas</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="date"
                    name="fecha_vencimiento"
                    value={newExpensa.fecha_vencimiento}
                    onChange={handleChange}
                    placeholder="Fecha"
                    required
                />
                <input
                    type="text"
                    name="detalle"
                    value={newExpensa.detalle}
                    onChange={handleChange}
                    placeholder="Detalle"
                    required
                />
                <input
                    type="number"
                    name="total"
                    value={newExpensa.total}
                    onChange={handleChange}
                    placeholder="Total"
                    required
                />
                <input
                    type="number"
                    name="saldo_anterior"
                    value={newExpensa.saldo_anterior}
                    onChange={handleChange}
                    placeholder="Saldo Anterior"
                    required
                />
                <input
                    type="number"
                    name="monto_pagado"
                    value={newExpensa.monto_pagado}
                    onChange={handleChange}
                    placeholder="Monto Pagado"
                    required
                />
                <button type="submit">Crear Expensa</button>
            </form>
            <ul>
                {expensas.map((expensa) => (
                    <li key={expensa.id}>{expensa.detalle}</li>
                ))}
            </ul>
        </div>
    );
};

export default Expensas;