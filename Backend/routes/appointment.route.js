import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createAppointment, getAppointments, updateAppointmentStatus } from '../controllers/appointment.controller.js';

const router = express.Router();

router.post('/create', protect, createAppointment);  // Create an appointment
router.get('/all', protect, getAppointments);     // Get all appointments for the user
router.put('/status/update', protect, updateAppointmentStatus);  // Update appointment status

export default router;
