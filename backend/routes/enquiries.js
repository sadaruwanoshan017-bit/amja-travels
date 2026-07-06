const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/enquiriesController');

// Notification counts (must come before /:category to avoid conflict)
router.get('/counts', ctrl.counts);

// Client submits an enquiry for a category (or "general")
router.post('/:category', ctrl.create);

// Admin: update/delete a specific enquiry by id
router.put('/item/:id', ctrl.updateStatus);
router.delete('/item/:id', ctrl.remove);

// Admin: list enquiries for a category
router.get('/:category', ctrl.listByCategory);

module.exports = router;
