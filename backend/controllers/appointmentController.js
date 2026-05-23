const Appointment = require('../models/Appointment');

// @desc    Create a new appointment
// @route   POST /api/appointments
exports.createAppointment = async (req, res) => {
  try {
    const { fullName, email, phone, treatment, preferredDate, notes } = req.body;
    const appointment = await Appointment.create({
      fullName,
      email,
      phone,
      treatment,
      preferredDate,
      notes,
      patient: req.user ? req.user._id : null,
    });
    res.status(201).json({ success: true, appointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all appointments (Admin)
// @route   GET /api/appointments
exports.getAppointments = async (req, res) => {
  try {
    const { status, page = 1, limit = 50 } = req.query;
    const query = {};
    if (status) query.status = status;

    const appointments = await Appointment.find(query)
      .populate('patient', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Appointment.countDocuments(query);

    res.json({
      success: true,
      appointments,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
      total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update appointment status (Admin)
// @route   PUT /api/appointments/:id
exports.updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json({ success: true, appointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete an appointment (Admin)
// @route   DELETE /api/appointments/:id
exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json({ success: true, message: 'Appointment deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get patient's own appointments
// @route   GET /api/appointments/my
exports.getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.user._id })
      .sort({ createdAt: -1 });
    res.json({ success: true, appointments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
