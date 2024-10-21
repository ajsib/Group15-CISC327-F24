// components/pages/search-results/service.ts

import destinationsData from '../../../public/dummy_data/destinations.json';
import flightsData from '../../../public/dummy_data/flights.json';

interface Destination {
  id: number;
  code: string;
  city: string;
  country: string;
  airport: string;
}

export interface Flight {
  id: number;
  origin: Destination;
  destination: Destination;
  departureDate: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  airline: string;
}

export async function fetchFlights(
  query: any,
  date: string,
  offset = 0,
  limit = 10
): Promise<Flight[]> {
  // Simulate fetching data with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const { origin, destination } = query;

      // Map destinations by ID for easy lookup
      const destinationsMap = new Map(
        destinationsData.Destinations.map((dest) => [dest.id, dest])
      );

      // Filter flights based on query parameters
      let filteredFlights = flightsData.Flights.filter((flight: any) => {
        const originMatch =
          destinationsMap.get(flight.origin_id)?.code.toLowerCase() ===
          origin?.toLowerCase();
        const destinationMatch =
          destinationsMap.get(flight.destination_id)?.code.toLowerCase() ===
          destination?.toLowerCase();
        const dateMatch = flight.departureDate === date;

        return originMatch && destinationMatch && dateMatch;
      });

      // Sort flights from earliest to latest departure time
      filteredFlights.sort((a: any, b: any) =>
        a.departureTime.localeCompare(b.departureTime)
      );

      // Pagination
      const paginatedFlights = filteredFlights.slice(offset, offset + limit);

      // Map flight data to include origin and destination details
      const flights = paginatedFlights.map((flight: any) => ({
        ...flight,
        origin: destinationsMap.get(flight.origin_id),
        destination: destinationsMap.get(flight.destination_id),
      }));

      resolve(flights);
    }, 500);
  });
}
