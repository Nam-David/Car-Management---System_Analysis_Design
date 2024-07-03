const database = require('../../config/db'); // Import the database object

const getDashboardData = async (req, res) => {
  try {
    // Use database.pool to access the pool
    const [totalRevenueResult, totalCarsInStockResult] = await Promise.all([
      database.pool.query('SELECT SUM(Transaction_Price) as total_revenue FROM dataACCOUNTING'),
      database.pool.query('SELECT SUM(Car_Number_Availability) as total_cars_in_stock FROM dataCAR')
    ]);

    const totalRevenue = totalRevenueResult.rows[0].total_revenue;
    const totalCarsInStock = totalCarsInStockResult.rows[0].total_cars_in_stock;

    const transactionDataResult = await database.pool.query('SELECT * FROM dataTransaction ORDER BY Transaction_Date DESC LIMIT 5');
    const transactionData = transactionDataResult.rows;

    res.json({ totalRevenue, totalCarsInStock, transactionData });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ message: 'Server error' });
    console.log(database.pool); // Log the pool object for debugging
  }
};

module.exports = { getDashboardData };