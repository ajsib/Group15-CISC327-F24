import Flight from '../schemas/Flight.js';
import Destination from '../schemas/Destination.js';

// Controller to retrieve flights based on query parameters
export const searchFlights = async (req, res) => {
  try {
    const { origin_id, destination_id, departureDate, page = 1, limit = 5 } = req.query;
    const skip = (page - 1) * limit;

    const filter = {};
    if (origin_id) filter.origin_id = Number(origin_id);
    if (destination_id) filter.destination_id = Number(destination_id);
    if (departureDate) filter.departureDate = departureDate;

    const flights = await Flight.find(filter).skip(skip).limit(Number(limit)).lean();

    const flightsWithDestinations = await Promise.all(
      flights.map(async (flight) => {
        const [origin, destination] = await Promise.all([
          Destination.findOne({ id: flight.origin_id }).lean(),
          Destination.findOne({ id: flight.destination_id }).lean(),
        ]);

        return {
          ...flight,
          origin: origin || { error: 'Origin data not found' },
          destination: destination || { error: 'Destination data not found' },
        };
      })
    );

    res.status(200).json({
      flights: flightsWithDestinations,
      currentPage: page,
      hasMore: flights.length === Number(limit),
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching flights." });
  }
};
