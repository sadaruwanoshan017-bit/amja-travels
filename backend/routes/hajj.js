const express = require('express');
const router = express.Router();
const hajjController = require('../controllers/hajjController');

// Get Hajj package
router.get('/', hajjController.getHajjPackage);

// Update Hajj package
router.put('/', hajjController.updateHajjPackage);

module.exports = router;