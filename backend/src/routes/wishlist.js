// routes/wishlist.js

const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');

// Routes
router.get('/', wishlistController.getItems);
router.post('/', wishlistController.addItem);
router.post('/share', wishlistController.shareWishlist); // Nouvelle route pour le partage

module.exports = router;

