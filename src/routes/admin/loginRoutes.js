const express = require('express');
const router = express.Router();
const loginController = require('../../controller/admin/loginController'); 

router.post('/', loginController.login);


module.exports = router;