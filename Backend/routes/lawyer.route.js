import express from 'express';
import {
  registerLawyer,
  loginLawyer,
  getAllLawyers,
  getLawyerById,
  updateLawyerProfile,
  deleteLawyer,
  logoutLawyer,
} from '../controllers/lawyer.controller.js';
import { authenticateLawyer } from '../middleware/lawyerMiddleware.js';
import {singleUpload} from "../middleware/multer.js"

const router = express.Router();

// Public Routes
router.post('/register',singleUpload, registerLawyer);
router.post('/login',loginLawyer);
router.get('/logout',logoutLawyer)
router.get('/all', getAllLawyers);
router.get('/:id', getLawyerById);

// Protected Routes (Only authenticated lawyers can access)
router.put('/profile/update',authenticateLawyer,singleUpload, updateLawyerProfile);
router.delete('/delete/:id',authenticateLawyer, deleteLawyer);

export default router;

