const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/authMiddleware');

// Routes
router.get('/', authenticateToken, userController.getUsers); // Route pour récupérer tous les utilisateurs

module.exports = router;
