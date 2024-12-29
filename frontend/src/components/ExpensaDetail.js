import React, { useEffect, useState } from "react";
import { fetchExpensaById } from "../services/expensasService";

const ExpensaDetail = ({ id }) => {
    const [expensa, setExpensa] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadExpensa = async () => {
            try {
                const data = await fetchExpensaById(id);
                setExpensa(data);
            } catch (err) {
                setError("Error al cargar la expensa");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadExpensa();
    }, [id]);

    if (loading) return <p>Cargando expensa...</p>;
    if (error) return <p>{error}</p>;
    if (!expensa) return <p>No se encontró la expensa</p>;

    return (
        <div className="expensa-detail">
            <h2>Detalle de Expensa</h2>
            <p><strong>Fecha de Vencimiento:</strong> {expensa.fecha_vencimiento}</p>
            <p><strong>Total:</strong> ${expensa.total.toFixed(2)}</p>
            <p><strong>Saldo Anterior:</strong> ${expensa.saldo_anterior.toFixed(2)}</p>
            <p><strong>Monto Pagado:</strong> ${expensa.monto_pagado.toFixed(2)}</p>

            <h3>Composición de Gastos</h3>
            <table>
                <thead>
                    <tr>
                        <th>Categoría</th>
                        <th>Descripción</th>
                        <th>Monto</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {expensa.gastos.map((gasto) => (
                        <tr key={gasto.id}>
                            <td>{gasto.categoria.nombre}</td>
                            <td>{gasto.descripcion}</td>
                            <td>${gasto.monto.toFixed(2)}</td>
                            <td>{gasto.fecha}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ExpensaDetail;