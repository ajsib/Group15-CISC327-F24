import express from 'express';
import { searchFlights } from '../controllers/flightController.js';

const router = express.Router();

router.get('/', searchFlights);

export default router;
