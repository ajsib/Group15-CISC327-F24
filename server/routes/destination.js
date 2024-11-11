import express from 'express';
import { getAllDestinations } from '../controllers/destinationController.js';

const router = express.Router();

router.get('/', getAllDestinations); 

export default router;
