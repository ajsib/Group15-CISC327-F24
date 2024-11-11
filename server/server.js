import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './utils/dbConnection.js';
import destinationRoutes from './routes/destination.js';
import flightRoutes from './routes/flight.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// Database connection
connectDB()
  .then(() => {
    console.log('MongoDB connected successfully');
    
    if (process.env.NODE_ENV !== 'test') {
      app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });
    }
  })
  .catch((error) => {
    console.error(`Failed to connect to MongoDB: ${error.message}`);
  });

// Use Routes
app.use('/api/destinations', destinationRoutes); 
app.use('/api/flights', flightRoutes);

export default app;
