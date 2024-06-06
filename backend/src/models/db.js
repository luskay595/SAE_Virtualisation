const { Pool } = require('pg');

const pool = new Pool({
  user: 'admin',
  host: 'db',
  database: 'wishlist',
  password: 'admin123',
  port: 5432,
});

/**
 * A PostgreSQL connection pool for interacting with the database.
 *
 * @module db
 * @type {Pool}
 * @property {string} user - The database user.
 * @property {string} host - The database host.
 * @property {string} database - The database name.
 * @property {string} password - The database user's password.
 * @property {number} port - The port number on which the database is running.
 */
module.exports = pool;
