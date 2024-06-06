const express = require('express');
const router = express.Router();
const insertionStatusController = require('../controllers/insertionStatusController');

/**
 * Route to get the insertion status.
 *
 * @name /insertionStatus
 * @function
 * @memberof module:router
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void} - Responds with the insertion status.
 */
router.get('/insertionStatus', insertionStatusController.getInsertionStatus);

module.exports = router;
