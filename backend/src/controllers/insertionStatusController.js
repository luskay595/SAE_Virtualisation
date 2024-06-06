/**
 * This module exports a controller for fetching the insertion status.
 * @module insertionStatusController
 */

const db = require('../models/db');

/**
 * An async function that handles HTTP requests to get the insertion status.
 * It queries the database to get the count of users, wishlists, and shared wishlists.
 * It then constructs an object with these counts and sends it as a JSON response.
 * If an error occurs during this process, it logs the error and sends a 500 status code with an error message.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
exports.getInsertionStatus = async (req, res) => {
  try {
    const usersCount = await db.query('SELECT COUNT(*) FROM users');
    const wishlistCount = await db.query('SELECT COUNT(*) FROM wishlist');
    const sharedWishlistCount = await db.query(
      'SELECT COUNT(*) FROM shared_wishlist'
    );

    const insertionStatus = {
      users: usersCount.rows[0].count,
      wishlist: wishlistCount.rows[0].count,
      sharedWishlist: sharedWishlistCount.rows[0].count,
    };

    res.json(insertionStatus);
  } catch (error) {
    console.error('Error fetching insertion status:', error);

    res
      .status(500)
      .json({ error: 'An error occurred while fetching insertion status' });
  }
};
