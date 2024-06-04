const db = require('../models/db');

const getItems = (req, res) => {
  db.query('SELECT * FROM wishlist', (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(result.rows);
  });
};

const addItem = (req, res) => {
  const { name, price, keyword } = req.body;
  db.query('INSERT INTO wishlist (name, price, keywords) VALUES ($1, $2, $3) RETURNING *', [name, price, keyword], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json(result.rows[0]);
  });
};

module.exports = {
  getItems,
  addItem
};

