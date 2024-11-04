import Flight from '../schemas/Flight.js';
import Destination from '../schemas/Destination.js';

/**
 * Controller to retrieve flights based on query parameters with pagination and populated destinations.
 */
export const searchFlights = async (req, res) => {
  try {
    const { origin_id, destination_id, departureDate, page = 1, limit = 5 } = req.query;
    const skip = (page - 1) * limit;

    console.log("Fetching flights from the database with parameters:", {
      origin_id,
      destination_id,
      departureDate,
      page,
      limit
    });

    // Construct the query filter based on the parameters provided
    const filter = {};
    if (origin_id) filter.origin_id = Number(origin_id);
    if (destination_id) filter.destination_id = Number(destination_id);
    if (departureDate) filter.departureDate = departureDate;

    // Query flights based on the filter and apply pagination
    const flights = await Flight.find(filter).skip(skip).limit(Number(limit)).lean();

    console.log(`Retrieved ${flights.length} flights for page ${page}.`);

    // Map through each flight to replace origin_id and destination_id with full destination objects
    const flightsWithDestinations = await Promise.all(
      flights.map(async (flight) => {
        const [origin, destination] = await Promise.all([
          Destination.findOne({ id: flight.origin_id }).lean(),
          Destination.findOne({ id: flight.destination_id }).lean(),
        ]);

        if (!origin || !destination) {
          console.warn(
            `Warning: Missing destination data for flight ID ${flight.id}. Origin or Destination not found.`
          );
        }

        // Return the flight object with populated destination data
        return {
          ...flight,
          origin: origin || { error: 'Origin data not found' },
          destination: destination || { error: 'Destination data not found' },
        };
      })
    );

    console.log("Successfully populated destinations for flights.");

    // Send the paginated response
    res.status(200).json({
      flights: flightsWithDestinations,
      currentPage: page,
      hasMore: flights.length === Number(limit),
    });
  } catch (error) {
    console.error("Error retrieving flights with destinations:", error);
    res.status(500).json({ error: "An error occurred while fetching flights." });
  }
};
