const express = require('express');
const router = express.Router();
const carController = require('../../controller/admin/carController');

router.get('/', carController.getCars);
router.get('/:id', carController.getCarById); // Thêm route mới

module.exports = router;
