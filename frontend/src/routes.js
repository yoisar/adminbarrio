import React from "react";
import { Route, Routes } from "react-router-dom";
import Cobros from "./components/Cobros";
import Dashboard from "./components/Dashboard";
import Expensas from "./components/Expensas";
import Gastos from "./components/Gastos";
import NotFound from "./components/NotFound";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/gastos" element={<Gastos />} />
            <Route path="/expensas" element={<Expensas />} />
            <Route path="/cobros" element={<Cobros />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;