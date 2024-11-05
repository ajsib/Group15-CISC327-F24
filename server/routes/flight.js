import express from 'express';
import { searchFlights } from '../controllers/flightController.js';
import { confirmFlightDetails } from '../controllers/confirmDetailsController.js';

const router = express.Router();

router.get('/search-results', searchFlights);
router.post('/confirm-details', confirmFlightDetails); // New route for confirmation

export default router;
