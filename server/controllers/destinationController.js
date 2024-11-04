import Destination from '../schemas/Destination.js';

// Fetch all destinations
export const getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find({});
    res.status(200).json(destinations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
