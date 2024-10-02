import express from 'express';
import { registerUser, loginUser , updateProfile, getUserProfile, logoutUser} from '../controllers/user.controller.js';
import { protect } from '../middleware/authMiddleware.js'; // Middleware to check authentication

const router = express.Router();

// Route for user registration
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser)
// Route for getting user profile (requires authentication)
router.get('/profile' , protect , getUserProfile)
router.put('/profile/update', protect, updateProfile);

export default router;
