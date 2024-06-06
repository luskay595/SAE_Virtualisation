const express = require('express');
const router = express.Router();
const insertionStatusController = require('../controllers/insertionStatusController');

// Route pour récupérer le statut d'insertion
router.get('/insertionStatus', insertionStatusController.getInsertionStatus);

module.exports = router;

