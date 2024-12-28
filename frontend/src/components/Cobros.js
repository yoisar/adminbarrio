import React, { useEffect, useState } from "react";
import { createCobro, fetchCobros, fetchMorosos } from "../services/cobrosService";

const Cobros = () => {
    const [cobros, setCobros] = useState([]);
    const [morosos, setMorosos] = useState([]);
    const [newCobro, setNewCobro] = useState({
        user_id: "",
        expensa_id: "",
        monto_pagado: "",
        fecha_pago: "",
    });
    const [error, setError] = useState(null);

    // Cargar cobros al montar el componente
    useEffect(() => {
        const getCobros = async () => {
            try {
                const cobrosData = await fetchCobros();
                setCobros(cobrosData);
                const morososData = await fetchMorosos();
                setMorosos(morososData);
            } catch (err) {
                setError(err.message);
            }
        };

        getCobros();
    }, []);

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        setNewCobro({
            ...newCobro,
            [e.target.name]: e.target.value,
        });
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const createdCobro = await createCobro(newCobro);
            setCobros([...cobros, createdCobro]); // Actualizar lista de cobros
            setNewCobro({ user_id: "", expensa_id: "", monto_pagado: "", fecha_pago: "" }); // Limpiar formulario
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h1>Gestión de Cobros</h1>

            {/* Formulario para registrar un nuevo cobro */}
            <form onSubmit={handleSubmit}>
                <h2>Registrar Cobro</h2>
                <div>
                    <label>Usuario ID:</label>
                    <input
                        type="number"
                        name="user_id"
                        value={newCobro.user_id}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Expensa ID:</label>
                    <input
                        type="number"
                        name="expensa_id"
                        value={newCobro.expensa_id}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Monto Pagado:</label>
                    <input
                        type="number"
                        name="monto_pagado"
                        value={newCobro.monto_pagado}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Fecha de Pago:</label>
                    <input
                        type="date"
                        name="fecha_pago"
                        value={newCobro.fecha_pago}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Registrar Cobro</button>
            </form>

            {/* Lista de cobros */}
            <h2>Lista de Cobros</h2>
            <ul>
                {cobros.map((cobro) => (
                    <li key={cobro.id}>
                        Usuario: {cobro.user?.name} - Expensa: {cobro.expensa_id} - Monto: ${cobro.monto_pagado} - Fecha: {cobro.fecha_pago}
                    </li>
                ))}
            </ul>

            {/* Lista de morosos */}
            <h2>Morosos</h2>
            <ul>
                {morosos.map((moroso) => (
                    <li key={moroso.id}>{moroso.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Cobros;