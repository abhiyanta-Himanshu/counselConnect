import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { authenticateLawyer } from "../middleware/lawyerMiddleware.js"
import { createAppointment, getAppointments, updateAppointmentStatus, lawyerAppointment } from '../controllers/appointment.controller.js';

const router = express.Router();

router.post('/create', protect, createAppointment);  // Create an appointment
router.get('/all', protect, getAppointments);     // Get all appointments for the user
router.get('/lawyer/all', authenticateLawyer, lawyerAppointment);     // Get all appointments for the lawyer
router.put('/status/update/:id', authenticateLawyer, updateAppointmentStatus);  // Update appointment status

export default router;
