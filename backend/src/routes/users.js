const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/authMiddleware');

/**
 * Route to get all users.
 *
 * @name /
 * @function
 * @memberof module:router
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void} - Responds with a list of users or an error message.
 * @middleware authenticateToken - Middleware to authenticate the JWT token.
 */
router.get('/', authenticateToken, userController.getUsers);

module.exports = router;
