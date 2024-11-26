import Flight from '../schemas/Flight.js';
import Destination from '../schemas/Destination.js';

// Controller to retrieve flights based on query parameters
export const searchFlights = async (req, res) => {
  try {
    console.log("Incoming request query:", req.query);

    const { origin_id, destination_id, departureDate, page = 1, limit = 5 } = req.query;
    const skip = (page - 1) * limit;

    console.log("Pagination details:", { page, limit, skip });

    const filter = {};
    if (origin_id) filter.origin_id = Number(origin_id);
    if (destination_id) filter.destination_id = Number(destination_id);
    if (departureDate) filter.departureDate = departureDate;

    console.log("Filter applied:", filter);

    const flights = await Flight.find(filter).skip(skip).limit(Number(limit)).lean();
    console.log("Flights retrieved from database:", flights);

    const flightsWithDestinations = await Promise.all(
      flights.map(async (flight) => {
        console.log("Processing flight:", flight);

        const [origin, destination] = await Promise.all([
          Destination.findOne({ id: flight.origin_id }).lean(),
          Destination.findOne({ id: flight.destination_id }).lean(),
        ]);

        console.log("Origin found:", origin);
        console.log("Destination found:", destination);

        return {
          ...flight,
          origin: origin || { error: 'Origin data not found' },
          destination: destination || { error: 'Destination data not found' },
        };
      })
    );

    console.log("Flights with destinations:", flightsWithDestinations);

    res.status(200).json({
      flights: flightsWithDestinations,
      currentPage: page,
      hasMore: flights.length === Number(limit),
    });
  } catch (error) {
    console.error("Error occurred while fetching flights:", error);
    res.status(500).json({ error: "An error occurred while fetching flights." });
  }
};
