const express = require('express');
const router = express.Router();
const accountingController = require('../../controller/admin/accountingController');

router.get('/', accountingController.getAccountings);
//router.get('/:id', accountingController.getAccountingById);

module.exports = router;