const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');
const authenticateToken = require('../middlewares/authMiddleware');

/**
 * Route to get all items in the user's wishlist.
 *
 * @name /
 * @function
 * @memberof module:router
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void} - Responds with the list of wishlist items or an error message.
 * @middleware authenticateToken - Middleware to authenticate the JWT token.
 */
router.get('/', authenticateToken, wishlistController.getItems);

/**
 * Route to add an item to the user's wishlist.
 *
 * @name /
 * @function
 * @memberof module:router
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request containing item details.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void} - Responds with the added item or an error message.
 * @middleware authenticateToken - Middleware to authenticate the JWT token.
 */
router.post('/', authenticateToken, wishlistController.addItem);

/**
 * Route to share the user's wishlist with other users.
 *
 * @name /share
 * @function
 * @memberof module:router
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request containing share details.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void} - Responds with the shared wishlist details or an error message.
 * @middleware authenticateToken - Middleware to authenticate the JWT token.
 */
router.post('/share', authenticateToken, wishlistController.shareWishlist);

/**
 * Route to get all items shared with the user.
 *
 * @name /shared
 * @function
 * @memberof module:router
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void} - Responds with the list of shared items or an error message.
 * @middleware authenticateToken - Middleware to authenticate the JWT token.
 */
router.get('/shared', authenticateToken, wishlistController.getSharedItems);

module.exports = router;
