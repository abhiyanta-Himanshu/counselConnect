import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createReview, getReviewsForLawyer, getReview, deleteReview } from '../controllers/review.controller.js';

const router = express.Router();

router.post('/create/:id', protect, createReview);                       // Create a review for a lawyer
router.get('/lawyer/:lawyerId', getReviewsForLawyer);        // Get all reviews for a specific lawyer
router.get('/all', getReview);         // get all review
router.delete('/delete/:reviewId', protect, deleteReview);           // Delete a review by ID

export default router;
