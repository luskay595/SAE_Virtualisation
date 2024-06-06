const jwt = require('jsonwebtoken');
const db = require('../models/db');

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
    res.status(401).json({ error: 'Token manquant ou invalide.' });
  }
};

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
    res.status(401).json({ error: 'Token manquant ou invalide.' });
  }
};

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
    res.status(401).json({ error: 'Token manquant ou invalide.' });
  }
};

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
        console.log('Listes partagées:', sharedItems); // Ajout du log
        res.status(201).json(sharedItems);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  } catch (err) {
    res.status(401).json({ error: 'Token manquant ou invalide.' });
  }
};

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
    res.status(401).json({ error: 'Token manquant ou invalide.' });
  }
};

// Assurez-vous que toutes les fonctions sont exportées
module.exports = {
  getItems,
  getSharedItems,
  addItem,
  shareWishlist,
  getSharedWishlists,
};
