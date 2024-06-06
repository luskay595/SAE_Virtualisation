const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');
const authenticateToken = require('../middlewares/authMiddleware');

// Routes
router.get('/', authenticateToken, wishlistController.getItems);
router.post('/', authenticateToken, wishlistController.addItem);
router.post('/share', authenticateToken, wishlistController.shareWishlist);
router.get('/shared', authenticateToken, wishlistController.getSharedItems);

module.exports = router;
