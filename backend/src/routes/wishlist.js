const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');

// Routes
router.get('/', wishlistController.getItems);
router.get('/shared', wishlistController.getSharedItems);
router.post('/', wishlistController.addItem);
router.post('/share', wishlistController.shareItem);

module.exports = router;

