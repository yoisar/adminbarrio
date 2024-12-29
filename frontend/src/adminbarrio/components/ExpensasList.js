import React, { useEffect, useState } from "react";
import { fetchExpensas } from "../services/expensasService";

const ExpensasList = () => {
    const [expensas, setExpensas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadExpensas = async () => {
            try {
                const data = await fetchExpensas();
                setExpensas(data);
            } catch (err) {
                setError("Error al cargar las expensas");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadExpensas();
    }, []);

    if (loading) return <p>Cargando expensas...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="expensas-list">
            <h2>Listado de Expensas</h2>
            <table>
                <thead>
                    <tr>
                        <th>Fecha de Vencimiento</th>
                        <th>Total</th>
                        <th>Saldo Anterior</th>
                        <th>Monto Pagado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {expensas.map((expensa) => (
                        <tr key={expensa.id}>
                            <td>{expensa.fecha_vencimiento}</td>
                            <td>${Number(expensa.total).toFixed(2)}</td>
                            <td>${Number(expensa.saldo_anterior).toFixed(2)}</td>
                            <td>${Number(expensa.monto_pagado).toFixed(2)}</td>
                            <td>
                                <button
                                    onClick={() => {
                                        // Redirige al detalle de la expensa
                                        window.location.href = `/expensas/${expensa.id}`;
                                    }}
                                >
                                    Ver Detalle
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ExpensasList;