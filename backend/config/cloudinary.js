const cloudinary = require('cloudinary').v2;

if (process.env.CLOUDINARY_URL) {
  // Cloudinary SDK automatically reads CLOUDINARY_URL if it's in the environment
} else {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

module.exports = cloudinary;
