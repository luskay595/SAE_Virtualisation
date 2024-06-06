// backend/models/db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'admin',
  host: 'db',
  database: 'wishlist',
  password: 'admin123',
  port: 5432,
});

module.exports = pool;
