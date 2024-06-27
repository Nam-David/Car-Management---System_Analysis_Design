const express = require('express');
const router = express.Router();
const fillCustomerInfoController = require('../../controller/client/fillCustomerInfoController');

router.post('/',fillCustomerInfoController.saveCustomerInfo);

module.exports = router;