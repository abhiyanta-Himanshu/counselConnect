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
  // console.log(req.user)
  try {
    const appointments = await Appointment.find({ user: req.user }).populate('lawyer').populate('user');
    // console.log(appointments)
    res.status(200).json({
      message : "Fetched User Appointment Successfully",
      appointments,
      success: true
    });
  } catch (err) {
    res.status(500).json({
       message: 'Error fetching appointments',
        error: err.message,
        success : false
      });
  }
};

//Get all appointment for a lawyer
export const lawyerAppointment = async (req, res) => {
  try {
    const appointments = await Appointment.find({lawyer : req.user}).populate('lawyer').populate('user')

    if(!appointments) {
      return res.status(404).json({
        message: 'Appointment not found',
        success: true
      });
    }

    res.status(200).json({
      message : "Fetched Lawyer Appointment Successfully",
      appointments,
      success: true
    })
    
  } catch (error) {
    es.status(500).json({
      message: 'Error fetching appointments',
       error: err.message,
       success : false
     });
  }
}

// Update appointment status
export const updateAppointmentStatus = async (req, res) => {
  const {status } = req.body;
  const {id} = req.params;
  const lawyer = req.user;
  try {
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({
        message: 'Appointment not found',
        success: true
      });
    }

    console.log(lawyer._id , appointment.lawyer._id)
    if(lawyer._id.toString() !== appointment.lawyer._id.toString()) {
      return res.status(401).json({
        message : "Lawyer Not authenticate",
        success : false
      })
    }

    appointment.status = status;
    await appointment.save();
    res.status(200).json({
      message:"Updated Successfully",
      appointment,
      success : true
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error updating appointment status',
      success: false,
      error: err.message
    });
  }
};
