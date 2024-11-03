// Importing the Flight schema for accessing flight data from the database
import Flight from '../schemas/Flight.js';
// Importing the Destination schema for accessing destination data from the database
import Destination from '../schemas/Destination.js';

/**
 * Controller function to handle flight search requests.
 * This function retrieves flights based on query parameters with pagination
 * and populates destination data for each flight.
 */
export const searchFlights = async (req, res) => {
  try {
    // Destructure query parameters from the request
    // 'origin_id': ID of the flight's origin location
    // 'destination_id': ID of the flight's destination location
    // 'departureDate': Date when the flight departs
    // 'page': Current page of paginated results (default is 1)
    // 'limit': Maximum number of results per page (default is 5)
    const { origin_id, destination_id, departureDate, page = 1, limit = 5 } = req.query;

    // Calculate the number of documents to skip based on the current page and limit
    // Used for paginating results
    const skip = (page - 1) * limit;

    // Log query parameters for debugging
    console.log("Fetching flights from the database with parameters:", {
      origin_id,
      destination_id,
      departureDate,
      page,
      limit
    });

    // Initialize an empty filter object to construct the query criteria
    const filter = {};

    // If 'origin_id' is provided in the query, add it to the filter
    if (origin_id) filter.origin_id = Number(origin_id); // Converts origin_id to a Number

    // If 'destination_id' is provided in the query, add it to the filter
    if (destination_id) filter.destination_id = Number(destination_id); // Converts destination_id to a Number

    // If 'departureDate' is provided, add it to the filter
    if (departureDate) filter.departureDate = departureDate;

    // Query the 'Flight' collection in the database using the constructed filter.
    // Apply pagination by skipping 'skip' number of records and limiting the results to 'limit'.
    // Use 'lean()' for optimized read-only operations by returning plain JavaScript objects instead of Mongoose documents.
    const flights = await Flight.find(filter).skip(skip).limit(Number(limit)).lean();

    // Log the number of flights retrieved and the current page for debugging
    console.log(`Retrieved ${flights.length} flights for page ${page}.`);

    // Populate each flight with its origin and destination information.
    // 'flightsWithDestinations' will contain flight objects with additional destination data.
    const flightsWithDestinations = await Promise.all(
      flights.map(async (flight) => {
        // Fetch the origin and destination data based on the IDs in the flight record
        const [origin, destination] = await Promise.all([
          Destination.findOne({ id: flight.origin_id }).lean(), // Find origin destination data
          Destination.findOne({ id: flight.destination_id }).lean(), // Find destination data
        ]);

        // Log a warning if either origin or destination data is missing
        if (!origin || !destination) {
          console.warn(
            `Warning: Missing destination data for flight ID ${flight.id}. Origin or Destination not found.`
          );
        }

        // Return a new flight object that includes the origin and destination data.
        // If origin or destination data is missing, add an error message to indicate this.
        return {
          ...flight, // Spread operator to include all original flight data
          origin: origin || { error: 'Origin data not found' }, // Add origin data or error if not found
          destination: destination || { error: 'Destination data not found' }, // Add destination data or error if not found
        };
      })
    );

    // Log success message after successfully populating destination data for each flight
    console.log("Successfully populated destinations for flights.");

    // Send the final response back to the client
    // Contains:
    // - flightsWithDestinations: Array of flights with populated destination info
    // - currentPage: Current page number
    // - hasMore: Boolean indicating if there are more flights to fetch based on the limit
    res.status(200).json({
      flights: flightsWithDestinations,
      currentPage: page,
      hasMore: flights.length === Number(limit), // Checks if there are more flights for pagination
    });
  } catch (error) {
    // Log the error message to help diagnose any issues
    console.error("Error retrieving flights with destinations:", error);

    // Send an error response with status code 500 indicating a server error
    res.status(500).json({ error: "An error occurred while fetching flights." });
  }
};
