const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const wishlistRoutes = require('./routes/wishlist');
const userRoutes = require('./routes/user');
const usersRoutes = require('./routes/users');
const dbstatus = require('./routes/insertionstatus.js');

const app = express();
const port = 5000;

/**
 * Middleware to enable CORS.
 * Configures the allowed origin, methods, and credentials.
 */
app.use(
  cors({
    origin: 'http://localhost:8085',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);

/**
 * Middleware to parse incoming request bodies in JSON format.
 */
app.use(bodyParser.json());

/**
 * Route to handle wishlist-related requests.
 * @name /api/wishlist
 * @function
 * @memberof module:app
 * @inner
 */
app.use('/api/wishlist', wishlistRoutes);

/**
 * Route to handle user authentication requests.
 * @name /api/user
 * @function
 * @memberof module:app
 * @inner
 */
app.use('/api/user', userRoutes);

/**
 * Route to handle user-related requests.
 * @name /api/users
 * @function
 * @memberof module:app
 * @inner
 */
app.use('/api/users', usersRoutes);

/**
 * Route to handle database status requests.
 * @name /api/status
 * @function
 * @memberof module:app
 * @inner
 */
app.use('/api/status', dbstatus);

/**
 * Starts the server and listens on the specified port.
 * Logs a message to the console when the server is running.
 */
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
