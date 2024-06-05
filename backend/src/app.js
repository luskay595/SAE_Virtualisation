const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const wishlistRoutes = require('./routes/wishlist');
const userRoutes = require('./routes/user');

const app = express();
const port = 5000;

// Middleware
app.use(cors()); // Ajoutez ceci pour activer CORS
app.use(bodyParser.json());

app.use('/api/wishlist', wishlistRoutes);
app.use('/api/user', userRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

