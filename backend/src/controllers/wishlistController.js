const jwt = require('jsonwebtoken');
const db = require('../models/db');

/**
 * Retrieves the items from the wishlist of the authenticated user.
 *
 * @function getItems
 * @param {Object} req - The request object.
 * @param {Object} req.headers - The headers of the request.
 * @param {string} req.headers.authorization - The authorization header containing the JWT token.
 * @param {Object} res - The response object.
 * @returns {void} - Responds with the wishlist items or an error message.
 */
const getItems = (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'secretKey');
    const userId = decoded.userId;

    db.query(
      'SELECT * FROM wishlist WHERE user_id = $1',
      [userId],
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.status(200).json(result.rows);
      }
    );
  } catch (err) {
    res.status(401).json({ error: 'Missing or invalid token.' });
  }
};

/**
 * Retrieves the shared wishlist items for the authenticated user.
 *
 * @function getSharedItems
 * @param {Object} req - The request object.
 * @param {Object} req.headers - The headers of the request.
 * @param {string} req.headers.authorization - The authorization header containing the JWT token.
 * @param {Object} res - The response object.
 * @returns {void} - Responds with the shared wishlist items or an error message.
 */
const getSharedItems = (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'secretKey');
    const userId = decoded.userId;

    db.query(
      `
    SELECT w.* 
    FROM wishlist w 
    INNER JOIN shared_wishlist sw ON w.id = sw.wishlist_id 
    WHERE sw.shared_with_user_id = $1
  `,
      [userId],
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.status(200).json(result.rows);
      }
    );
  } catch (err) {
    res.status(401).json({ error: 'Missing or invalid token.' });
  }
};

/**
 * Adds an item to the authenticated user's wishlist.
 *
 * @function addItem
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.name - The name of the item.
 * @param {number} req.body.price - The price of the item.
 * @param {string} req.body.keyword - The keyword associated with the item.
 * @param {Object} req.headers - The headers of the request.
 * @param {string} req.headers.authorization - The authorization header containing the JWT token.
 * @param {Object} res - The response object.
 * @returns {void} - Responds with the added item or an error message.
 */
const addItem = (req, res) => {
  try {
    const { name, price, keyword } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'secretKey');
    const userId = decoded.userId;

    db.query(
      'INSERT INTO wishlist (name, price, keywords, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, price, keyword, userId],
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.status(201).json(result.rows[0]);
      }
    );
  } catch (err) {
    res.status(401).json({ error: 'Missing or invalid token.' });
  }
};

/**
 * Shares the user's wishlist with specified users.
 *
 * @function shareWishlist
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request.
 * @param {number|number[]} req.body.shareWithUserId - The ID(s) of the user(s) to share the wishlist with.
 * @param {number|number[]} req.body.wishlistId - The ID(s) of the wishlist(s) to be shared.
 * @param {Object} res - The response object.
 * @returns {void} - Responds with the shared wishlist data or an error message.
 */
const shareWishlist = (req, res) => {
  try {
    const { shareWithUserId, wishlistId } = req.body;

    const wishlistIds = Array.isArray(wishlistId) ? wishlistId : [wishlistId];
    const userIds = Array.isArray(shareWithUserId)
      ? shareWithUserId
      : [shareWithUserId];

    const promises = wishlistIds
      .map((wid) =>
        userIds.map((uid) =>
          db.query(
            'INSERT INTO shared_wishlist (wishlist_id, shared_with_user_id) VALUES ($1, $2) RETURNING *',
            [wid, uid]
          )
        )
      )
      .flat();

    Promise.all(promises)
      .then((results) => {
        const sharedItems = results.map((result) => result.rows[0]);
        console.log('Shared wishlists:', sharedItems); // Added log
        res.status(201).json(sharedItems);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  } catch (err) {
    res.status(401).json({ error: 'Missing or invalid token.' });
  }
};

/**
 * Retrieves the wishlists shared with the specified user.
 *
 * @function getSharedWishlists
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request.
 * @param {number} req.body.userId - The ID of the user for whom to retrieve shared wishlists.
 * @param {Object} res - The response object.
 * @returns {void} - Responds with the shared wishlists or an error message.
 */
const getSharedWishlists = (req, res) => {
  try {
    const { userId } = req.body;
    db.query(
      'SELECT * FROM shared_wishlist WHERE shared_with_user_id = $1',
      [userId],
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.status(200).json(result.rows);
      }
    );
  } catch (err) {
    res.status(401).json({ error: 'Missing or invalid token.' });
  }
};

module.exports = {
  getItems,
  getSharedItems,
  addItem,
  shareWishlist,
  getSharedWishlists,
};
