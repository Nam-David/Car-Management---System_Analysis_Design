const pool = require('../config/db');

const addCustomer = async (customerData) => {
    const { Citizen_ID, Customer_Name, Email, Phone_No, Address } = customerData;
    const result = await pool.query(
        'INSERT INTO dataCUSTOMER (Citizen_ID, Customer_Name, Email, Phone_No, Address) VALUES ($1, $2, $3, $4, $5)',
        [Citizen_ID, Customer_Name, Email, Phone_No, Address]
    );
    return result.rowCount > 0; // Trả về true nếu thêm thành công
};

module.exports = { addCustomer };