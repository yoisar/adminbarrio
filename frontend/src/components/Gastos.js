import React, { useEffect, useState } from "react";
import { createGasto, fetchGastos } from "../services/gastosService";

const Gastos = () => {
    const [gastos, setGastos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getGastos = async () => {
            try {
                const data = await fetchGastos();
                setGastos(data);
            } catch (err) {
                setError(err.message);
            }
        };

        getGastos();
    }, []);

    const handleAddGasto = async () => {
        try {
            const newGasto = { descripcion: "Nuevo Gasto", monto: 100, tipo: "fijo", fecha: "2024-01-01" };
            const savedGasto = await createGasto(newGasto);
            setGastos([...gastos, savedGasto]);
        } catch (err) {
            setError(err.message);
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Gastos</h1>
            <button onClick={handleAddGasto}>Agregar Gasto</button>
            <ul>
                {gastos.map((gasto) => (
                    <li key={gasto.id}>
                        {gasto.descripcion} - ${gasto.monto} ({gasto.tipo})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Gastos;