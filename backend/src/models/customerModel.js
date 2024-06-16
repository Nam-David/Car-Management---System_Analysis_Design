const pool = require('../config/db');

const addCustomer = async (customerData) => {
    const { Citizen_ID, Customer_Name, Email, Phone_No, Address } = customerData;
    const result = await pool.query(
        'INSERT INTO dataCUSTOMER (Citizen_ID, Customer_Name, Email, Phone_No, Address) VALUES ($1, $2, $3, $4, $5)',
        [Citizen_ID, Customer_Name, Email, Phone_No, Address]
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