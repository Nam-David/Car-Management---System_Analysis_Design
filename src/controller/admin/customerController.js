/**
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
*/

// backend/src/controllers/customerController.js

const CustomerModel = require('../../models/customerModel');
const { pool } = require('../../config/db');

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

        if (!customerData.Citizen_ID) {
            return res.status(400).json({ message: 'Missing Citizen_ID' });
        }

        const success = await CustomerModel.addCustomer(pool, customerData);
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

const getAllCustomers = async (req, res) => {
    try {
        const customers = await CustomerModel.getAllCustomers();
        res.json(customers);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách khách hàng:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

const getCustomerById = async (req, res) => {
    try {
        const { Citizen_ID } = req.params;
        const customer = await CustomerModel.getCustomerById(Citizen_ID);
        if (!customer) {
            return res.status(404).json({ message: 'Không tìm thấy khách hàng' });
        }
        res.json(customer);
    } catch (error) {
        console.error('Lỗi khi lấy thông tin khách hàng:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

const updateCustomer = async (req, res) => {
    try {
        const { Citizen_ID } = req.params;
        const customerData = req.body;
        const success = await CustomerModel.updateCustomer(Citizen_ID, customerData);
        if (success) {
            res.json({ message: 'Cập nhật khách hàng thành công!' });
        } else {
            res.status(404).json({ message: 'Không tìm thấy khách hàng' });
        }
    } catch (error) {
        console.error('Lỗi khi cập nhật khách hàng:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

const deleteCustomer = async (req, res) => {
    try {
        const { Citizen_ID } = req.params;
        const success = await CustomerModel.deleteCustomer(Citizen_ID);
        if (success) {
            res.json({ message: 'Xóa khách hàng thành công!' });
        } else {
            res.status(404).json({ message: 'Không tìm thấy khách hàng' });
        }
    } catch (error) {
        console.error('Lỗi khi xóa khách hàng:', error);
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

module.exports = { 
    createCustomer, 
    getAllCustomers, 
    getCustomerById, 
    updateCustomer, 
    deleteCustomer, 
    checkDiscount 
};