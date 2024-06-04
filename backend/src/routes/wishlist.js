const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');

// Routes
router.get('/', wishlistController.getItems);
router.post('/', wishlistController.addItem);

module.exports = router;

