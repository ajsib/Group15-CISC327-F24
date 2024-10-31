import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema({
  origin_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination', required: true },
  destination_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination', required: true },
  departureDate: { type: String, required: true },
  departureTime: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  price: { type: Number, required: true },
  connections: { type: Array, default: [] },
});

export default mongoose.model('Flight', flightSchema);
