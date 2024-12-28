import React from "react";
import { Link } from "react-router-dom";
import AppRoutes from "./routes";

const App = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/gastos">Gastos</Link>
                    </li>
                    <li>
                        <Link to="/expensas">Expensas</Link>
                    </li>
                    <li>
                        <Link to="/cobros">Cobros</Link>
                    </li>
                </ul>
            </nav>

            <main>
                <AppRoutes />
            </main>
        </div>
    );
};

export default App;