const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/packagesController');

// Generic CRUD for any category: /api/packages/:category
router.get('/:category', ctrl.list);
router.get('/:category/:id', ctrl.getOne);
router.post('/:category', ctrl.create);
router.put('/:category/:id', ctrl.update);
router.delete('/:category/:id', ctrl.remove);

module.exports = router;
