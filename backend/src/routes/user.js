const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * Route to log in a user.
 *
 * @name /login
 * @function
 * @memberof module:router
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request containing user credentials.
 * @param {Object} res - The response object.
 * @returns {void} - Responds with a JWT token or an error message.
 */
router.post('/login', userController.login);

/**
 * Route to register a new user.
 *
 * @name /register
 * @function
 * @memberof module:router
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request containing user details.
 * @param {Object} res - The response object.
 * @returns {void} - Responds with the registered user data or an error message.
 */
router.post('/register', userController.register);

module.exports = router;
