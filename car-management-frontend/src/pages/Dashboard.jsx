import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [data, setData] = useState({ totalRevenue: 0, totalCarsInStock: 0 });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/dashboard');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Total Revenue: {data.totalRevenue}</p>
            <p>Total Cars in Stock: {data.totalCarsInStock}</p>
        </div>
    );
};

export default Dashboard;