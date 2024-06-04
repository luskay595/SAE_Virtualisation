// backend/db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'admin',
  host: 'db',  // Utilisez le nom de service Docker pour la base de données
  database: 'wishlist',
  password: 'admin123',
  port: 5432
});

module.exports = pool;

