// const express = require('express');
// const router = express.Router();
// const db = require('../../config/db');

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
