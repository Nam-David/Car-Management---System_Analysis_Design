const CustomerModel = require('../models/customerModel');
const pool = require('../config/db'); // Import pool từ db.js

const createCustomer = async (req, res) => {
    try {
        const customerData = req.body;
        const { Email } = customerData;

        // Kiểm tra xem email đã tồn tại hay chưa
        const existingCustomer = await pool.query(
            'SELECT 1 FROM dataCUSTOMER WHERE Email = $1',
            [Email]
        );

        if (existingCustomer.rows.length > 0) {
            return res.status(400).json({ message: 'Email đã tồn tại' });
        }

        const success = await CustomerModel.addCustomer(customerData);
        if (success) {
            res.status(201).json({ message: 'Thêm khách hàng thành công!' });
        } else {
            res.status(500).json({ message: 'Lỗi khi thêm khách hàng' });
        }
    } catch (error) {
        console.error('Lỗi khi thêm khách hàng:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

const checkDiscount = async (req, res) => {
    try {
        const { Citizen_ID } = req.params;
        const isEligible = await CustomerModel.checkDiscountEligibility(Citizen_ID);
        if (isEligible) {
            res.status(200).json({ message: 'Khách hàng đủ điều kiện cho ưu đãi!' });
        } else {
            res.status(200).json({ message: 'Khách hàng không đủ điều kiện cho ưu đãi' });
        }
    } catch (error) {
        console.error('Lỗi khi kiểm tra ưu đãi:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

module.exports = { createCustomer, checkDiscount };