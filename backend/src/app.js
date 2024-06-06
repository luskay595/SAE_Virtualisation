const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const wishlistRoutes = require('./routes/wishlist');
const userRoutes = require('./routes/user');
const usersRoutes = require('./routes/users');
const dbstatus = require('./routes/insertionstatus.js');


const app = express();
const port = 5000;

// Middleware
app.use(
  cors({
    origin: 'http://localhost:8085', // Ajoutez l'URL de votre frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);
app.use(bodyParser.json());

app.use('/api/wishlist', wishlistRoutes);
app.use('/api/user', userRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/status', dbstatus);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
