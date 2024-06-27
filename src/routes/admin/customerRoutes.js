/**
const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.post('/', customerController.createCustomer);
// kiểm tra id khách hàng có được giảm giá hay không
router.get('/:Citizen_ID/discount', customerController.checkDiscount);
module.exports = router;
*/

// backend/src/routes/customerRoutes.js

const express = require('express');
const router = express.Router();
const customerController = require('../../controller/admin/customerController');

// Tạo khách hàng mới
router.post('/', customerController.createCustomer);

// Lấy danh sách tất cả khách hàng
router.get('/', customerController.getCustomers);

// Lấy thông tin khách hàng theo Citizen_ID
router.get('/:id', customerController.getCustomerById);

// Cập nhật thông tin khách hàng theo Citizen_ID
router.put('/:id', customerController.updateCustomer);

// Xóa khách hàng theo Citizen_ID
router.delete('/:id', customerController.deleteCustomer);

// Kiểm tra điều kiện giảm giá
// router.get('/:Citizen_ID/discount', customerController.checkDiscount);

module.exports = router;