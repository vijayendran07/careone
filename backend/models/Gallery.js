const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  section: {
    type: String,
    required: true,
    unique: true,
    enum: [
      'home-hero-banner',
      'clinic-image-1',
      'clinic-image-2',
      'hair-restoration-before',
      'hair-restoration-after',
      'skin-treatment-before',
      'skin-treatment-after',
      'laser-treatment-1',
      'laser-treatment-2',
      'doctor-image-1',
      'doctor-image-2',
      'treatments-hero'
    ]
  },
  imageUrl: {
    type: String,
    required: true
  },
  title: String,
  description: String,
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

module.exports = mongoose.model('Gallery', gallerySchema);
