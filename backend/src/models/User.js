const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  preferences: {
    darkMode: { type: Boolean, default: false },
    baseCurrency: { type: String, default: process.env.BASE_CURRENCY || 'USD' }
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
