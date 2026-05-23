const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  clinicName: { type: String, default: 'Care One' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  city: { type: String, default: '' },
  address: { type: String, default: '' },
  description: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
