const db = require('../../config/db');

const createTransaction = async (req, res) => {
    const { Transaction_ID, Citizen_ID, Model_Car_ID, Transaction_Date, Payment_Date, Warranty_Valid_Date, Status_Of_Purchasing } = req.body;
    try {
        await db.pool.query('INSERT INTO dataTRANSACTION (Transaction_ID, Citizen_ID, Model_Car_ID, Transaction_Date, Payment_Date, Warranty_Valid_Date, Status_Of_Purchasing) VALUES ($1, $2, $3, $4, $5, $6, $7)', [Transaction_ID, Citizen_ID, Model_Car_ID, Transaction_Date, Payment_Date, Warranty_Valid_Date, Status_Of_Purchasing]);
        res.status(201).json({ message: 'Transaction created successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while creating the transaction.', error });
    }
};

const getTransactions = async (req, res) => {
    try {
        const { rows } = await db.pool.query('SELECT * FROM dataTRANSACTION');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while retrieving transactions.', error });
    }
};

const getTransactionById = async (req, res) => {
    const id = req.params.id;
    try {
        const { rows } = await db.pool.query('SELECT * FROM dataTRANSACTION WHERE Transaction_ID = $1', [id]);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while retrieving the transaction.', error });
    }
};

const updateTransaction = async (req, res) => {
    const { Transaction_ID, Citizen_ID, Model_Car_ID, Transaction_Date, Payment_Date, Warranty_Valid_Date, Status_Of_Purchasing } = req.body;
    try {
        db.pool.query('UPDATE dataTRANSACTION SET Transaction_ID = $1, Citizen_ID = $2, Model_Car_ID = $3, Transaction_Date = $4, Payment_Date = $5, Warranty_Valid_Date = $6, Status_Of_Purchasing = $7 WHERE Transaction_ID = $8', [Transaction_ID, Citizen_ID, Model_Car_ID, Transaction_Date, Payment_Date, Warranty_Valid_Date, Status_Of_Purchasing, Transaction_ID]);
        res.status(200).json({ message: 'Transaction updated successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while updating the transaction.', error });
    }
};

const deleteTransaction = async (req, res) => {
    const id = req.params.id;
    try {
        db.pool.query('DELETE FROM dataTRANSACTION WHERE Transaction_ID = $1', [id]);
        res.status(200).json({ message: 'Transaction deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting the transaction.', error });
    }
};

module.exports = {
    createTransaction,
    getTransactions,
    getTransactionById,
    updateTransaction,
    deleteTransaction
 };