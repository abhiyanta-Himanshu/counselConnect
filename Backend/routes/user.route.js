import express from 'express';
import { registerUser, loginUser , updateProfile, getUserProfile, logoutUser} from '../controllers/user.controller.js';
import { protect } from '../middleware/authMiddleware.js'; // Middleware to check authentication
import {singleUpload} from "../middleware/multer.js"

const router = express.Router();

// Route for user registration
router.post('/register',singleUpload, registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser)
// Route for getting user profile (requires authentication)
router.get('/profile' , protect , getUserProfile)
router.put('/profile/update', protect,singleUpload, updateProfile);

export default router;
