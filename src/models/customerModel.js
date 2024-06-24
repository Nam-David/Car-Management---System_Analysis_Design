/**
const pool = require('../config/db');

const addCustomer = async (customerData) => {
    const { Citizen_ID, Customer_Name, Email, Phone_No, Address, Number_Transaction } = customerData;
    const result = await pool.query(
        'INSERT INTO dataCUSTOMER (Citizen_ID, Customer_Name, Email, Phone_No, Address, Number_Transaction) VALUES ($1, $2, $3, $4, $5, $6)',
        [Citizen_ID, Customer_Name, Email, Phone_No, Address, 0]
    );
    return result.rowCount > 0; // Trả về true nếu thêm thành công
};

const checkDiscountEligibility = async (Citizen_ID) => {
    const DISCOUNT_THRESHOLD = 1; // Số lần giao dịch tối thiểu để được giảm giá
    const result = await pool.query(
        'SELECT COUNT(*) FROM dataTRANSACTION WHERE Citizen_ID = $1',
        [Citizen_ID]
    );
    const transactionCount = result.rows[0].count;
    return transactionCount >= DISCOUNT_THRESHOLD; // Replace DISCOUNT_THRESHOLD with the minimum number of transactions for a discount
};

module.exports = { addCustomer, checkDiscountEligibility };
*/

// backend/src/models/customerModel.js

const { pool } = require('../config/db');

const addCustomer = async (customerData) => {
    const { Citizen_ID, Customer_Name, Email, Phone_No, Address, Number_Transaction } = customerData;
    const result = await pool.query(
        'INSERT INTO dataCUSTOMER (Citizen_ID, Customer_Name, Email, Phone_No, Address, Number_Transaction) VALUES ($1, $2, $3, $4, $5, $6)',
        [Citizen_ID, Customer_Name, Email, Phone_No, Address, Number_Transaction]
    );
    return result.rowCount > 0; // Trả về true nếu thêm thành công
};

const getAllCustomers = async () => {
    const result = await pool.query('SELECT * FROM dataCUSTOMER');
    return result.rows;
};

const getCustomerById = async (Citizen_ID) => {
    const result = await pool.query('SELECT * FROM dataCUSTOMER WHERE Citizen_ID = $1', [Citizen_ID]);
    return result.rows[0];
};

const updateCustomer = async (Citizen_ID, customerData) => {
    const { Customer_Name, Email, Phone_No, Address, Number_Transaction } = customerData;
    const result = await pool.query(
        'UPDATE dataCUSTOMER SET Customer_Name = $1, Email = $2, Phone_No = $3, Address = $4, Number_Transaction = $5 WHERE Citizen_ID = $6',
        [Customer_Name, Email, Phone_No, Address, Number_Transaction, Citizen_ID]
    );
    return result.rowCount > 0;
};

const deleteCustomer = async (Citizen_ID) => {
    const result = await pool.query('DELETE FROM dataCUSTOMER WHERE Citizen_ID = $1', [Citizen_ID]);
    return result.rowCount > 0;
};

const checkDiscountEligibility = async (Citizen_ID) => {
    const DISCOUNT_THRESHOLD = 1; // Số lần giao dịch tối thiểu để được giảm giá
    const result = await pool.query(
        'SELECT COUNT(*) FROM dataTRANSACTION WHERE Citizen_ID = $1',
        [Citizen_ID]
    );
    const transactionCount = result.rows[0].count;
    return transactionCount >= DISCOUNT_THRESHOLD; // Replace DISCOUNT_THRESHOLD with the minimum number of transactions for a discount
};

module.exports = { 
    addCustomer, 
    getAllCustomers, 
    getCustomerById, 
    updateCustomer, 
    deleteCustomer, 
    checkDiscountEligibility 
};