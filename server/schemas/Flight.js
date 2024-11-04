import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  origin_id: { type: Number, required: true },
  destination_id: { type: Number, required: true },
  departureDate: { type: String, required: true },
  departureTime: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  price: { type: Number, required: true },
  connections: { type: Array, default: [] },
});

export default mongoose.model('Flight', flightSchema);
