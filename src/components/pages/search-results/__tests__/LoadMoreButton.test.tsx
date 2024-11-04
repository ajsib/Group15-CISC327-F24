import { render, screen, fireEvent } from '@testing-library/react';
import LoadMoreButton from '../components/LoadMoreButton';

describe('LoadMoreButton Component', () => {
  const mockOnClick = jest.fn();

  test('renders load more button', () => {
    render(<LoadMoreButton onClick={mockOnClick} />);
    
    expect(screen.getByText('Load More')).toBeInTheDocument();
  });

  test('calls onClick when button is clicked', () => {
    render(<LoadMoreButton onClick={mockOnClick} />);
    
    fireEvent.click(screen.getByText('Load More'));
    expect(mockOnClick).toHaveBeenCalled();
  });
});
