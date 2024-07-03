const express = require('express');
const router = express.Router();
const carController = require('../../controller/admin/carController');

router.post('/', carController.createCar);
router.get('/', carController.getCars);
router.get('/:id', carController.getCarById);
router.put('/:id', carController.updateCar);
router.delete('/:id', carController.deleteCar);
router.get('/sales/:date', carController.getCarSalesByDate);

module.exports = router;
