const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.post('/', customerController.createCustomer);
// kiểm tra id khách hàng có được giảm giá hay không
router.get('/:Citizen_ID/discount', customerController.checkDiscount);
module.exports = router;