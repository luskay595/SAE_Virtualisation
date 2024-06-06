// controllers/insertionStatusController.js

const db = require('../models/db');

exports.getInsertionStatus = async (req, res) => {
    try {
        // Exécutez des requêtes pour compter le nombre de lignes insérées dans chaque table
        const usersCount = await db.query('SELECT COUNT(*) FROM users');
        const wishlistCount = await db.query('SELECT COUNT(*) FROM wishlist');
        const sharedWishlistCount = await db.query('SELECT COUNT(*) FROM shared_wishlist');

        // Construisez la réponse avec le nombre de lignes insérées dans chaque table
        const insertionStatus = {
            users: usersCount.rows[0].count,
            wishlist: wishlistCount.rows[0].count,
            sharedWishlist: sharedWishlistCount.rows[0].count
        };

        // Envoyez la réponse au client
        res.json(insertionStatus);
    } catch (error) {
        console.error('Error fetching insertion status:', error);
        // En cas d'erreur, envoyez une réponse avec un code d'erreur
        res.status(500).json({ error: 'An error occurred while fetching insertion status' });
    }
};

