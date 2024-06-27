const express = require('express');
const router = express.Router();
const accountingController = require('../../controller/admin/accountingController');

router.get('/', accountingController.getTransactions);
router.get('/:id', accountingController.getTransactionById);

module.exports = router;