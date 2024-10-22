// components/pages/search-results/service.ts

import destinationsData from '@/public/dummy_data/destinations.json';
import flightsData from '@/public/dummy_data/flights.json';

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
  connections: Flight[];
  airline?: string; // Optional
}

export async function fetchFlights(
  query: any,
  date: string,
  offset = 0,
  limit = 10
): Promise<Flight[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const { origin_id, destination_id } = query;

      // Map destinations by ID for easy lookup
      const destinationsMap = new Map<number, Destination>(
        destinationsData.Destinations.map((dest: Destination) => [dest.id, dest])
      );

      // Filter flights based on query parameters
      let filteredFlights = flightsData.Flights.filter((flight: any) => {
        const originMatch = flight.origin_id.toString() === origin_id;
        const destinationMatch = flight.destination_id.toString() === destination_id;
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
      const flightsWithDetails = paginatedFlights.map((flight: any) => {
        const origin = destinationsMap.get(flight.origin_id);
        const destination = destinationsMap.get(flight.destination_id);

        // Map connections if any
        const mapConnections = (connections: any[]): Flight[] => {
          return connections.map((conn: any) => {
            const connOrigin = destinationsMap.get(conn.origin_id);
            const connDestination = destinationsMap.get(conn.destination_id);
            return {
              ...conn,
              origin: connOrigin,
              destination: connDestination,
              connections: [], // Assuming no further nested connections
            };
          });
        };

        const connections = mapConnections(flight.connections || []);

        return {
          ...flight,
          origin,
          destination,
          connections,
        };
      });

      resolve(flightsWithDetails);
    }, 500);
  });
}
