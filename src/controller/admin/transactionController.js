// const express = require('express');
// const router = express.Router();
const pool = require('../../config/db');

// const createTransaction = async (req, res) => {
//     // Start transaction
//     await pool.query('BEGIN');

//     try {
//         // Update dataCAR table
//         await pool.query(
//             'UPDATE dataCAR SET Car_Number_Availability = Car_Number_Availability - 1 WHERE Model_Car_ID = $1',
//             [Model_Car_ID]
//         );

//         // Get current date and calculate payment date
//         const Transaction_Date = new Date();
//         const Payment_Date = new Date();
//         Payment_Date.setDate(Transaction_Date.getDate() + 7);
//         const Warranty_Date = new Date();
//         Warranty_Date.setDate(Transaction_Date.getDate() + 730);

//         // Insert into dataTRANSACTION table
//         await pool.query(
//             'INSERT INTO dataTRANSACTION (Transaction_ID, Citizen_ID, Model_Car_ID, Transaction_Date, Payment_Date, Status_Of_Purchasing) VALUES ($1, $2, $3, $4, $5, $6)',
//             [Transaction_ID, Citizen_ID, Model_Car_ID, Transaction_Date, Payment_Date, Warranty_Date, 'Deposited']
//         );

//         // Insert into dataACCOUTING table
//         await pool.query(
//             'INSERT INTO dataACCOUTING (Transaction_ID, Citizen_ID, Transaction_Price, Deposit_Price) VALUES ($1, $2, (SELECT Price FROM dataCAR WHERE Model_Car_ID = $3), $4)',
//             [Transaction_ID, Citizen_ID, Model_Car_ID, Deposit_Price]
//         );

//         // Commit transaction
//         await pool.query('COMMIT');

//         res.status(200).json({ message: 'Deposit transaction successfully processed.' });
//     } catch (error) {
//         // Rollback transaction in case of error
//         await pool.query('ROLLBACK');
//         res.status(500).json({ message: 'An error occurred during the transaction.', error });
//     }
// };

const getTransactions = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM dataTRANSACTION');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while retrieving transactions.', error });
    }
};

const getTransactionById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const { rows } = await pool.query('SELECT * FROM dataTRANSACTION WHERE Transaction_ID = $1', [id]);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while retrieving the transaction.', error });
    }
};

const updateTransaction = async (req, res) => {
    const id = parseInt(req.params.id);
    const { Transaction_ID, Citizen_ID, Model_Car_ID, Transaction_Date, Payment_Date, Warranty_Date, Status_Of_Purchasing } = req.body;
    try {
        pool.query('UPDATE dataTRANSACTION SET Transaction_ID = $1, Citizen_ID = $2, Model_Car_ID = $3, Transaction_Date = $4, Payment_Date = $5, Warranty_Date = $6, Status_Of_Purchasing = $7 WHERE Transaction_ID = $8', [Transaction_ID, Citizen_ID, Model_Car_ID, Transaction_Date, Payment_Date, Warranty_Date, Status_Of_Purchasing, id]);
        res.status(200).json({ message: 'Transaction updated successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while updating the transaction.', error });
    }
};

const deleteTransaction = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        pool.query('DELETE FROM dataTRANSACTION WHERE Transaction_ID = $1', [id]);
        res.status(200).json({ message: 'Transaction deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting the transaction.', error });
    }
};

module.exports = {
    // createTransaction,
    getTransactions,
    getTransactionById,
    updateTransaction,
    deleteTransaction
 };