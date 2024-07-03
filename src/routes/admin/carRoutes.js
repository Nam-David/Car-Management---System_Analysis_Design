const express = require('express');
const router = express.Router();
const carController = require('../../controller/admin/carController');

router.post('/', carController.createCar);
router.get('/', carController.getCars);
router.get('/:id', carController.getCarById);
router.get('/sales', carController.getCarSalesByDate);
router.put('/:id', carController.updateCar);
router.delete('/:id', carController.deleteCar);

module.exports = router;
