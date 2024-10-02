import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { authenticateLawyer } from '../middleware/lawyerMiddleware.js';
import { createLegalResource, getLegalResources, deleteLegalResource } from '../controllers/legalResources.controller.js';

const router = express.Router();

router.post('/create', authenticateLawyer, createLegalResource); // Create a new legal resource
router.get('/all', getLegalResources);              // Get all legal resources
router.delete('/delete/:resourceId', authenticateLawyer , deleteLegalResource); // Delete a legal resource by ID

export default router;
