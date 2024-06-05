const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes
router.post('/login', userController.login); // Assurez-vous que vous avez une fonction login dans le userController
router.post('/register', userController.register);

module.exports = router;

