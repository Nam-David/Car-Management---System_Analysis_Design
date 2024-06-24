const express = require('express');
const router = express.Router();
const transactionController = require('../../controller/admin/transactionController');

router.post('/deposit', transactionController.createTransaction);

module.exports = router;