const pool = require('../../config/db');

const getDashboardData = async (req, res) => {
    try {
        const totalRevenueResult = await pool.query(
            'SELECT SUM(Transaction_Price) as total_revenue FROM dataACCOUTING'
        );
        const totalRevenue = totalRevenueResult.rows[0].total_revenue;

        const totalCarsInStockResult = await pool.query(
            'SELECT SUM(Car_Number_Availability) as total_cars_in_stock FROM dataCAR'
        );
        const totalCarsInStock = totalCarsInStockResult.rows[0].total_cars_in_stock;

        res.json({
            totalRevenue,
            totalCarsInStock
        });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getDashboardData };