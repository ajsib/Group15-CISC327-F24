import express from 'express';
import { getAllDestinations } from '../controllers/destinationController.js';

const router = express.Router();

router.get('/get-destinations', getAllDestinations);

export default router;
