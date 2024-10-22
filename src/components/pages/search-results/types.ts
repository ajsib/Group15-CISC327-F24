// types.ts

export interface Destination {
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
    connections: Flight[]; // Optional: Flights can have connections
    airline?: string; // Optional: Add airline info if necessary
  }
  