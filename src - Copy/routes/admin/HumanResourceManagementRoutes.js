// HumanResourceManagementRoutes.js
const express = require('express');
const router = express.Router();
const HumanResourceManagementController = require('../../controller/admin/HumanResourceManagementController');
// Define routes within the module
router.post('/',HumanResourceManagementController.HumanRMcreate);
// ... other routes for PUT, DELETE, etc. 

router.get('/', HumanResourceManagementController.getEmployees);
router.get('/:id', HumanResourceManagementController.getEmployeeById);
router.put('/:id', HumanResourceManagementController.updateEmployee);
router.delete('/:id', HumanResourceManagementController.deleteEmployee);

module.exports = router;