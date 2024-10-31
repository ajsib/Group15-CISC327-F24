// flightController.js
import Flight from '../schemas/Flight.js';
import Destination from '../schemas/Destination.js';

export const searchFlights = async (req, res) => {
  const { origin_id, destination_id, departureDate, page = 1 } = req.query;

  console.log('Flight search request received with parameters:', req.query);

  const filter = {};
  const perPage = 10;
  const skip = (page - 1) * perPage;

  try {
    // Check for origin_id and find corresponding _id in Destination collection
    if (origin_id) {
      const originDestination = await Destination.findOne({ id: parseInt(origin_id) });
      if (originDestination) {
        filter.origin = originDestination._id;
        console.log(`Origin ID found: ${origin_id} mapped to _id: ${originDestination._id}`);
      } else {
        console.warn(`Origin with id ${origin_id} not found.`);
        return res.status(404).json({ message: `Origin with id ${origin_id} not found.` });
      }
    }

    // Check for destination_id and find corresponding _id in Destination collection
    if (destination_id) {
      const destinationDestination = await Destination.findOne({ id: parseInt(destination_id) });
      if (destinationDestination) {
        filter.destination = destinationDestination._id;
        console.log(`Destination ID found: ${destination_id} mapped to _id: ${destinationDestination._id}`);
      } else {
        console.warn(`Destination with id ${destination_id} not found.`);
        return res.status(404).json({ message: `Destination with id ${destination_id} not found.` });
      }
    }

    // Add departureDate to filter if provided
    if (departureDate) {
      filter.departureDate = departureDate;
      console.log(`Departure date filter added: ${departureDate}`);
    }

    console.log('Constructed filter for flight search:', filter);

    // Find flights that match the filter
    const flights = await Flight.find(filter)
      .populate('origin')
      .populate('destination')
      .skip(skip)
      .limit(perPage);

    console.log(`Flights found: ${flights.length}`);

    // Count total flights that match the filter
    const totalFlights = await Flight.countDocuments(filter);
    const totalPages = Math.ceil(totalFlights / perPage);

    console.log(`Total flights: ${totalFlights}, Total pages: ${totalPages}, Current page: ${page}`);

    res.status(200).json({
      page: parseInt(page, 10),
      totalPages,
      flights,
    });
  } catch (error) {
    console.error('Error occurred while searching for flights:', error.message);
    res.status(500).json({ message: error.message });
  }
};
