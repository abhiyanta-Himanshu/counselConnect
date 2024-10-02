import Appointment from '../models/appointment.model.js';

// Create an appointment
export const createAppointment = async (req, res) => {
  const { lawyer, date, time, notes } = req.body;

  try {
    const appointment = new Appointment({
      user: req.user,  // req.user comes from the JWT middleware
      lawyer,
      date,
      time,
      notes,
    });

    await appointment.save();
    res.status(201).json({
      message: "Appointment Scheduled Succesfully",
      success: true,
      appointment
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error creating appointment',
      success: false,
      error: err.message
    });
  }
};

// Get all appointments for a user
export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user }).populate('lawyer').populate('user');
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching appointments', error: err.message });
  }
};

// Update appointment status
export const updateAppointmentStatus = async (req, res) => {
  const { appointmentId, status } = req.body;

  try {
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({
        message: 'Appointment not found',
        success: true
      });
    }

    appointment.status = status;
    await appointment.save();
    res.status(200).json(appointment);
  } catch (err) {
    res.status(500).json({
      message: 'Error updating appointment status',
      success: false,
      error: err.message
    });
  }
};
