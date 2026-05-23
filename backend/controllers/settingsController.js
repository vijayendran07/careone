const Settings = require('../models/Settings');

// @desc  Get clinic settings
// @route GET /api/settings
exports.getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.json({ success: true, settings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Save / update clinic settings
// @route POST /api/settings
exports.saveSettings = async (req, res) => {
  try {
    const { clinicName, email, phone, city, address, description } = req.body;
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({ clinicName, email, phone, city, address, description });
    } else {
      settings.clinicName   = clinicName   ?? settings.clinicName;
      settings.email        = email        ?? settings.email;
      settings.phone        = phone        ?? settings.phone;
      settings.city         = city         ?? settings.city;
      settings.address      = address      ?? settings.address;
      settings.description  = description  ?? settings.description;
      await settings.save();
    }
    res.json({ success: true, settings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
