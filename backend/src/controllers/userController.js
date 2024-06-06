const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../models/db');

/**
 * Registers a new user by hashing the password and storing the user information in the database.
 *
 * @async
 * @function register
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.username - The username of the new user.
 * @param {string} req.body.password - The password of the new user.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the registered user data or an error message.
 */
const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
      [username, hashedPassword]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Logs in an existing user by verifying the username and password, then generates a JWT token.
 *
 * @async
 * @function login
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.username - The username of the user.
 * @param {string} req.body.password - The password of the user.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with a JWT token or an error message.
 */
const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await db.query('SELECT * FROM users WHERE username = $1', [
      username,
    ]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'User not found.' });
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ error: 'Incorrect password.' });
    }

    const token = jwt.sign({ userId: user.id }, 'secretKey', {
      expiresIn: '1h',
    });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Retrieves a list of all users except the logged-in user.
 *
 * @async
 * @function getUsers
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the list of users or an error message.
 */
const getUsers = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'secretKey');
    const userId = decodedToken.userId;

    const result = await db.query('SELECT * FROM users WHERE id != $1', [
      userId,
    ]);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  register,
  login,
  getUsers,
};
