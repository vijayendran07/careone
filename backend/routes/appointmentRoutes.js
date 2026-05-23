const express = require('express');
const router = express.Router();
const {
  createAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
  getMyAppointments,
} = require('../controllers/appointmentController');
const { protect, adminOnly } = require('../middleware/auth');

// Public - anyone can book
router.post('/', createAppointment);

// Protected - patient's own appointments
router.get('/my', protect, getMyAppointments);

// Admin - get all, update, delete
router.get('/', protect, adminOnly, getAppointments);
router.put('/:id', protect, adminOnly, updateAppointment);
router.delete('/:id', protect, adminOnly, deleteAppointment);

module.exports = router;
