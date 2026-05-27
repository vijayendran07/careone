const express = require('express');
const router = express.Router();
const { register, login, adminSetup, getMe, resetPassword } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/admin-setup', adminSetup);
router.post('/reset-password', resetPassword);
router.get('/me', protect, getMe);

module.exports = router;
