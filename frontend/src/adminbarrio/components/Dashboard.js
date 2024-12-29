import React, { useEffect, useState } from "react";
import { fetchDashboardMetrics } from "../../app/modules/adminbarrio/services/dashboardService";

const Dashboard = () => {
    const [metrics, setMetrics] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const getMetrics = async () => {
            try {
                const data = await fetchDashboardMetrics();
                setMetrics(data);
            } catch (err) {
                setError(err.message);
            }
        };

        getMetrics();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Total Gastos: {metrics.total_gastos}</p>
            <p>Total Expensas: {metrics.total_expensas}</p>
            <p>Total Cobros: {metrics.total_cobros}</p>
            <p>Morosos: {metrics.morosos}</p>
        </div>
    );
};

export default Dashboard;