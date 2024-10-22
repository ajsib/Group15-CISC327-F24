import { render, screen, fireEvent } from '@testing-library/react';
import FlightCard from '../components/FlightCard';
import { Flight, Destination } from '../types'; // Import Flight and Destination types

// Mock destinations
const origin: Destination = { id: 1, code: 'YYZ', city: 'Toronto', country: 'Canada', airport: 'Toronto Pearson International Airport' };
const destination: Destination = { id: 7, code: 'LON', city: 'London', country: 'United Kingdom', airport: 'London Heathrow Airport' };

// Mock flight
const mockFlight: Flight = {
  id: 1,
  origin,
  destination,
  departureDate: '2024-10-22',
  departureTime: '04:10',
  arrivalTime: '17:32',
  price: 878.21,
  connections: []
};

describe('FlightCard Component', () => {
  const mockOnSelect = jest.fn();

  test('renders flight details correctly', () => {
    render(<FlightCard flight={mockFlight} onSelect={mockOnSelect} />);
    
    expect(screen.getByText('YYZ')).toBeInTheDocument();
    expect(screen.getByText('LON')).toBeInTheDocument();
    expect(screen.getByText('Departure: 04:10')).toBeInTheDocument();
    expect(screen.getByText('Arrival: 17:32')).toBeInTheDocument();
    expect(screen.getByText('$878.21')).toBeInTheDocument();
  });

  test('displays no connections when there are none', () => {
    render(<FlightCard flight={mockFlight} onSelect={mockOnSelect} />);
    expect(screen.queryByText('Stops at:')).not.toBeInTheDocument();
  });

  test('calls onSelect when "Book" button is clicked', () => {
    render(<FlightCard flight={mockFlight} onSelect={mockOnSelect} />);
    fireEvent.click(screen.getByText('Book'));
    expect(mockOnSelect).toHaveBeenCalledWith(mockFlight);
  });
});
