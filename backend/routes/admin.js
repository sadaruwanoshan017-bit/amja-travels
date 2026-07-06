const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Login route
router.post('/login', adminController.login);

// Get current username
router.get('/credentials', adminController.getCredentials);

// Update credentials
router.put('/credentials', adminController.updateCredentials);

module.exports = router;