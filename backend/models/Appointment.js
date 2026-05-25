const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
  },
  treatment: {
    type: String,
    required: [true, 'Treatment type is required'],
  },
  preferredDate: {
    type: Date,
    required: [true, 'Preferred date is required'],
  },
  preferredTime: {
    type: String,
    default: '',
  },
  confirmedDate: {
    type: Date,
    default: null,
  },
  confirmedTime: {
    type: String,
    default: '',
  },
  adminNote: {
    type: String,
    default: '',
  },
  notes: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending',
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
