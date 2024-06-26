const express = require('express');
const router = express.Router();
const HRController = require('../../controller/admin/HRController');

router.get('/', HRController.getHRs);
router.get('/:id', HRController.getHRById);
router.post('/', HRController.createHR);
router.put('/:id', HRController.updateHR);
router.delete('/:id', HRController.deleteHR);

module.exports = router;