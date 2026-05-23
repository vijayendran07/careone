const express = require('express');
const router = express.Router();
const { getSettings, saveSettings } = require('../controllers/settingsController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', protect, adminOnly, getSettings);
router.post('/', protect, adminOnly, saveSettings);

module.exports = router;
