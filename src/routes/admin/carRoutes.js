const express = require('express');
const router = express.Router();
const carController = require('../../controller/admin/carController');
const { route } = require('./loginRoutes');

router.get('/', carController.getCars);
router.get('/:id', carController.getCarById);
router.post('/', carController.createCar);
router.put('/:id', carController.updateCar);
router.delete('/:id', carController.deleteCar);

module.exports = router;
