const Appointment = require('../models/Appointment');

// @desc    Create a new appointment
// @route   POST /api/appointments
exports.createAppointment = async (req, res) => {
  try {
    const { fullName, email, phone, treatment, preferredDate, preferredTime, notes } = req.body;
    
    // Generate unique booking ID: emailPrefix + phoneSuffix + randomPart
    const emailPrefix = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '').slice(0, 4).toUpperCase();
    const phoneSuffix = phone.replace(/[^0-9]/g, '').slice(-4);
    const randomPart = Math.floor(100 + Math.random() * 900); // 3-digit random
    const bookingId = `C1-${emailPrefix}-${phoneSuffix}-${randomPart}`;

    const appointment = await Appointment.create({
      fullName,
      email,
      phone,
      treatment,
      preferredDate,
      preferredTime: preferredTime || '',
      notes,
      bookingId,
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
    const { status, confirmedDate, confirmedTime, adminNote } = req.body;
    const updateFields = {};
    if (status) updateFields.status = status;
    if (confirmedDate !== undefined) updateFields.confirmedDate = confirmedDate;
    if (confirmedTime !== undefined) updateFields.confirmedTime = confirmedTime;
    if (adminNote !== undefined) updateFields.adminNote = adminNote;

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      updateFields,
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
    const appointments = await Appointment.find({
      $or: [
        { patient: req.user._id },
        { email: req.user.email }
      ]
    }).sort({ createdAt: -1 });
    res.json({ success: true, appointments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get appointment by bookingId (Public status check)
// @route   GET /api/appointments/status/:bookingId
exports.getAppointmentStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const appointment = await Appointment.findOne({ bookingId });
    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found with this booking ID' });
    }
    res.json({ success: true, appointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
