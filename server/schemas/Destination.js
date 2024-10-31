import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  code: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  airport: { type: String, required: true },
});

export default mongoose.model('Destination', destinationSchema);
