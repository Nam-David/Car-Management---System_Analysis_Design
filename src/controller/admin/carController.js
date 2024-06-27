// src/controllers/carController.js
const CarModel = require('../../models/carModel'); 

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

const createCar = async (req, res) => {
    try {
        const car = req.body;
        const newCar = await CarModel.createCar(car);
        res.json(newCar);
    } catch (error) {
        console.error('Lỗi khi tạo xe hơi:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

const updateCar = async (req, res) => {
    try {
        const id = req.params.id;
        const car = req.body;
        const updatedCar = await CarModel.updateCar(id, car);
        if (!updatedCar) {
            return res.status(404).json({ message: 'Không tìm thấy xe hơi' });
        }
        res.json(updatedCar);
    } catch (error) {
        console.error('Lỗi khi cập nhật xe hơi:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

const deleteCar = async (req, res) => {
    try {
        const id = req.params.id;
        const car = await CarModel.deleteCar(id);
        if (!car) {
            return res.status(404).json({ message: 'Không tìm thấy xe hơi' });
        }
        res.json(car);
    } catch (error) {
        console.error('Lỗi khi xóa xe hơi:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

module.exports = {
    getCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar
};