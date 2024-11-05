import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';  // Import cors
import connectDB from './utils/dbConnection.js';
import destinationRoutes from './routes/destination.js';
import flightRoutes from './routes/flight.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON
app.use(express.json());

// CORS Middleware
app.use(cors({
  origin: 'http://localhost:3000',  
  credentials: true,                 
}));

// Database connection
connectDB()
  .then(() => {
    console.log('MongoDB connected successfully');
    
    // Start the server only after successful DB connection
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`Failed to connect to MongoDB: ${error.message}`);
  });

// Use Routes
app.use('/api', destinationRoutes);
app.use('/api', flightRoutes);

// Health route to check server and database status
app.get('/health', async (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.status(200).json({
    message: 'Server is healthy',
    database: dbStatus,
  });
});

// Simple root route for testing
app.get('/', (req, res) => {
  res.send('Express server is running!');
});

export default app;
