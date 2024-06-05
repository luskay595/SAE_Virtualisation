const jwt = require('jsonwebtoken');
const db = require('../models/db');

const getItems = (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'secretKey');
    const userId = decoded.userId;

    db.query('SELECT * FROM wishlist WHERE user_id = $1', [userId], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json(result.rows);
    });
  } catch (err) {
    res.status(401).json({ error: 'Token manquant ou invalide.' });
  }
};

const getSharedItems = (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'secretKey');
    const userId = decoded.userId;

    db.query('SELECT w.* FROM wishlist w INNER JOIN shared_wishlist sw ON w.id = sw.wishlist_id WHERE sw.shared_with_user_id = $1', [userId], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json(result.rows);
    });
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

    db.query('INSERT INTO wishlist (name, price, keywords, user_id) VALUES ($1, $2, $3, $4) RETURNING *', [name, price, keyword, userId], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json(result.rows[0]);
    });
  } catch (err) {
    res.status(401).json({ error: 'Token manquant ou invalide.' });
  }
};

const shareItem = (req, res) => {
  try {
    const { wishlistId, shareWithUserId } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'secretKey');
    const userId = decoded.userId;

    db.query('SELECT * FROM wishlist WHERE id = $1 AND user_id = $2', [wishlistId, userId], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (result.rows.length === 0) {
        return res.status(403).json({ error: 'You are not authorized to share this item' });
      }

      db.query('INSERT INTO shared_wishlist (wishlist_id, shared_with_user_id) VALUES ($1, $2) RETURNING *', [wishlistId, shareWithUserId], (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.status(201).json(result.rows[0]);
      });
    });
  } catch (err) {
    res.status(401).json({ error: 'Token manquant ou invalide.' });
  }
};

module.exports = {
  getItems,
  getSharedItems,
  addItem,
  shareItem
};

