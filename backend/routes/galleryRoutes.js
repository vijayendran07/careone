const express = require('express');
const router = express.Router();
const { getGallery, getGalleryBySection, updateGalleryImage, deleteGalleryImage } = require('../controllers/galleryController');
const { protect, adminOnly } = require('../middleware/auth');

// Public - read gallery
router.get('/', getGallery);
router.get('/:section', getGalleryBySection);

// Admin - update/delete gallery
router.put('/:section', protect, adminOnly, updateGalleryImage);
router.delete('/:section', protect, adminOnly, deleteGalleryImage);

module.exports = router;
