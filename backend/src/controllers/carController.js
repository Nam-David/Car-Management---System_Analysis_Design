// src/controllers/carController.js
const CarModel = require('../models/carModel');

const getCars = async (req, res) => {
    try {
        const cars = await CarModel.getCars();
        console.log("Cars from DB: ", cars); // Thêm dòng này để kiểm tra dữ liệu
        res.json(cars);
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu xe hơi:', error);
        res.status(500).json({ error: 'Lỗi server' });
    }
};

const getCarById = async (req, res) => {
    try {
        const id = req.params.id; // Lấy id từ URL
        const car = await CarModel.getCarById(id);
        if (!car) {
            return res.status(404).json({ message: 'Không tìm thấy xe hơi' });
        }
        res.json(car);
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu xe hơi:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

module.exports = {
    getCars,
    getCarById // Xuất hàm mới
};