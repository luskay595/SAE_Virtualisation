const express = require('express');
const cors = require('cors');
const wishlistRoutes = require('./routes/wishlist');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/wishlist', wishlistRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

