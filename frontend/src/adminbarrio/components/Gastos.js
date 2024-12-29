import React, { useEffect, useState } from "react";
import { createGasto, fetchCategorias, fetchGastos } from "../services/gastosService";

const Gastos = () => {
    const [gastos, setGastos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [error, setError] = useState(null);
    const [newGasto, setNewGasto] = useState({
        categoria_gasto_id: "",
        descripcion: "",
        monto: "",
        fecha: "",
    });

    useEffect(() => {
        const getGastos = async () => {
            try {
                const data = await fetchGastos();
                setGastos(data);
            } catch (err) {
                setError(err.message);
            }
        };

        const getCategorias = async () => {
            try {
                const data = await fetchCategorias();
                setCategorias(data);
            } catch (err) {
                setError(err.message);
            }
        };

        getGastos();
        getCategorias();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewGasto((prevGasto) => ({
            ...prevGasto,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const savedGasto = await createGasto(newGasto);
            setGastos([...gastos, savedGasto]);
            setNewGasto({
                categoria_gasto_id: "",
                descripcion: "",
                monto: "",
                fecha: "",
            });
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
            <form onSubmit={handleSubmit}>
                <select
                    name="categoria_gasto_id"
                    value={newGasto.categoria_gasto_id}
                    onChange={handleChange}
                    required
                >
                    <option value="">Seleccione una categoría</option>
                    {categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>
                            {categoria.nombre}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    name="descripcion"
                    value={newGasto.descripcion}
                    onChange={handleChange}
                    placeholder="Descripción"
                    required
                />
                <input
                    type="number"
                    name="monto"
                    value={newGasto.monto}
                    onChange={handleChange}
                    placeholder="Monto"
                    required
                />
                <input
                    type="date"
                    name="fecha"
                    value={newGasto.fecha}
                    onChange={handleChange}
                    placeholder="Fecha"
                    required
                />
                <button type="submit">Agregar Gasto</button>
            </form>
            <ul>
                {gastos.map((gasto) => (
                    <li key={gasto.id}>
                        {gasto.descripcion} - ${gasto.monto} ({gasto.categoria?.nombre})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Gastos;