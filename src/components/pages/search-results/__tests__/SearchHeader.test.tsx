import { render, screen } from '@testing-library/react';
import SearchHeader from '../components/SearchHeader';

describe('SearchHeader Component', () => {
  const mockQuery = { origin: 'JFK', destination: 'LAX', departureDate: '2024-11-01' };

  test('renders search header with query information', () => {
    render(<SearchHeader query={mockQuery} />);
    
    expect(screen.getByText('Flight Search Results')).toBeInTheDocument();
    expect(screen.getByText('JFK to LAX | 2024-11-01')).toBeInTheDocument();
  });
});
