import { render, screen } from '@testing-library/react';
import FlightsList from '../components/FlightsList';
import { Flight, Destination } from '../types'; // Import necessary types

// Mock destinations
const originYYZ: Destination = { id: 1, code: 'YYZ', city: 'Toronto', country: 'Canada', airport: 'Toronto Pearson International Airport' };
const destinationPAR: Destination = { id: 8, code: 'PAR', city: 'Paris', country: 'France', airport: 'Charles de Gaulle Airport' };
const destinationFRA: Destination = { id: 9, code: 'FRA', city: 'Frankfurt', country: 'Germany', airport: 'Frankfurt Airport' };

// Mock flights
const mockFlights: Flight[] = [
  {
    id: 13,
    origin: originYYZ,
    destination: destinationPAR,
    departureDate: '2024-10-22',
    departureTime: '19:39',
    arrivalTime: '19:50',
    price: 291.81,
    connections: []
  },
  {
    id: 25,
    origin: originYYZ,
    destination: destinationFRA,
    departureDate: '2024-10-22',
    departureTime: '14:29',
    arrivalTime: '05:51',
    price: 381.15,
    connections: []
  }
];

describe('FlightsList Component', () => {
  const mockOnFlightSelect = jest.fn();

  test('renders list of flight cards', () => {
    render(<FlightsList flights={mockFlights} onFlightSelect={mockOnFlightSelect} />);
    
    // Use getAllByText to account for multiple "YYZ"
    const yyzElements = screen.getAllByText('YYZ');
    expect(yyzElements.length).toBe(2); // Expect 2 occurrences of "YYZ"
    
    // Check for specific destination codes
    expect(screen.getByText('PAR')).toBeInTheDocument();
    expect(screen.getByText('FRA')).toBeInTheDocument();
  });

  test('renders nothing when flights array is empty', () => {
    render(<FlightsList flights={[]} onFlightSelect={mockOnFlightSelect} />);
    
    expect(screen.queryByText('YYZ')).not.toBeInTheDocument();
    expect(screen.queryByText('PAR')).not.toBeInTheDocument();
  });
});
