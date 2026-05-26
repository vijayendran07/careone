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
      'treatments-hero',
      'skin-treatment-before',
      'skin-treatment-after',
      'laser-treatment-1',
      'laser-treatment-2',
      'about-story-image',
      'doctor-image-1',
      'doctor-image-2',
      'doctor-image-3',
      'hair-result-1-before',
      'hair-result-1-after',
      'hair-result-2-before',
      'hair-result-2-after',
      'hair-result-3-before',
      'hair-result-3-after',
      'skin-result-1-before',
      'skin-result-1-after',
      'skin-result-2-before',
      'skin-result-2-after',
      'skin-result-3-before',
      'skin-result-3-after',
      'skin-result-4-before',
      'skin-result-4-after'
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
