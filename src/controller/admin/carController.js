const db = require('../../config/db');

const createCar = async (req, res) => {
    const { Model_Car_ID, Model_Car_Name, Price, Color, Origin_Of_Car, Date_Of_Import, Car_Number_Availability, Car_Sold, Lauching_Year } = req.body;
    try {
        await db.pool.query('INSERT INTO dataCAR (Model_Car_ID, Model_Car_Name, Price, Color, Origin_Of_Car, Date_Of_Import, Car_Number_Availability, Car_Sold, Lauching_Year) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [Model_Car_ID, Model_Car_Name, Price, Color, Origin_Of_Car, Date_Of_Import, Car_Number_Availability, Car_Sold, Lauching_Year]);
        res.status(201).json({ message: 'Car created successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while creating the car.', error });
    }
};

const getCars = async (req, res) => {
    try {
        const { rows } = await db.pool.query('SELECT * FROM dataCAR');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while retrieving cars.', error });
    }
};

const getCarById = async (req, res) => {
    const id = req.params.id;
    try {
        const { rows } = await db.pool.query('SELECT * FROM dataCAR WHERE Model_Car_ID = $1', [id]);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while retrieving the car.', error });
    }
};

const updateCar = async (req, res) => {
    const { Model_Car_ID, Model_Car_Name, Price, Color, Origin_Of_Car, Date_Of_Import, Car_Number_Availability, Car_Sold, Lauching_Year } = req.body;
    try {
        db.pool.query('UPDATE dataCAR SET Model_Car_ID = $1, Model_Car_Name = $2, Price = $3, Color = $4, Origin_Of_Car = $5, Date_Of_Import = $6, Car_Number_Availability = $7, Car_Sold = $8, Lauching_Year = $9 WHERE Model_Car_ID = $10', [Model_Car_ID, Model_Car_Name, Price, Color, Origin_Of_Car, Date_Of_Import, Car_Number_Availability, Car_Sold, Lauching_Year, Model_Car_ID]);
        res.status(200).json({ message: 'Car updated successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while updating the car.', error });
    }
};

const deleteCar = async (req, res) => {
    const id = req.params.id;
    try {
        db.pool.query('DELETE FROM dataCAR WHERE Model_Car_ID = $1', [id]);
        res.status(200).json({ message: 'Car deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting the car.', error });
    }
};

module.exports = {
    createCar,
    getCars,
    getCarById,
    updateCar,
    deleteCar
};