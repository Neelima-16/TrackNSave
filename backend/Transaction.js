const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['income','expense'], required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true, default: process.env.BASE_CURRENCY || 'USD' },
  category: { type: String, default: 'General' },
  date: { type: Date, default: Date.now },
  notes: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', TransactionSchema);
