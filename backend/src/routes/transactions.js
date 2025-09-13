const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const txController = require('../controllers/transactionsController');

// All transaction routes are protected
router.post('/', auth, txController.createTransaction);
router.get('/', auth, txController.getTransactions);
router.put('/:id', auth, txController.updateTransaction);
router.delete('/:id', auth, txController.deleteTransaction);

module.exports = router;
