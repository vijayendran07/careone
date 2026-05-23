const Gallery = require('../models/Gallery');

// @desc    Get all gallery images
// @route   GET /api/gallery
exports.getGallery = async (req, res) => {
  try {
    const images = await Gallery.find();
    res.json({ success: true, images });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single gallery image by section
// @route   GET /api/gallery/:section
exports.getGalleryBySection = async (req, res) => {
  try {
    const image = await Gallery.findOne({ section: req.params.section });
    if (!image) {
      return res.status(404).json({ message: 'Gallery image not found' });
    }
    res.json({ success: true, image });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update gallery image (Admin)
// @route   PUT /api/gallery/:section
exports.updateGalleryImage = async (req, res) => {
  try {
    const { imageUrl, title, description } = req.body;
    
    if (!imageUrl) {
      return res.status(400).json({ message: 'Image URL is required' });
    }

    let image = await Gallery.findOne({ section: req.params.section });
    
    if (!image) {
      // Create new gallery image if it doesn't exist
      image = await Gallery.create({
        section: req.params.section,
        imageUrl,
        title,
        description,
        updatedBy: req.user._id
      });
    } else {
      // Update existing
      image.imageUrl = imageUrl;
      image.title = title;
      image.description = description;
      image.updatedBy = req.user._id;
      await image.save();
    }

    res.json({ success: true, image });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete gallery image (Admin)
// @route   DELETE /api/gallery/:section
exports.deleteGalleryImage = async (req, res) => {
  try {
    const image = await Gallery.findOneAndDelete({ section: req.params.section });
    if (!image) {
      return res.status(404).json({ message: 'Gallery image not found' });
    }
    res.json({ success: true, message: 'Gallery image deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
