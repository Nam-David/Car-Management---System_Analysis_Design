// HumanResourceManagementRoutes.js
const express = require('express');
const router = express.Router();
const HumanResourceManagementController = require('../../controller/admin/HumanResourceManagementController');
// Define routes within the module
router.post('/',HumanResourceManagementController.HumanRMcreate);
// ... other routes for PUT, DELETE, etc. 

module.exports = router; 
