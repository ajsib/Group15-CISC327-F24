import express from 'express';
import { searchFlights } from '../controllers/flightController.js';

const router = express.Router();

router.get('/search-results', searchFlights);

export default router;
