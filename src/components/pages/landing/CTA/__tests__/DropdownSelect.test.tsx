// DropdownSelect.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import DropdownSelect from '../DropdownSelect';
import destinationsData from '@/public/dummy_data/destinations.json';

describe('DropdownSelect Component', () => {
  test('opens dropdown and selects an airport', async () => {
    const mockOnSelect = jest.fn();

    render(
      <DropdownSelect type="origin" value={null} onSelect={mockOnSelect} />
    );

    // Simulate clicking the dropdown to open it
    const dropdownButton = screen.getByText('Origin');
    fireEvent.click(dropdownButton);

    // Ensure the input field is present
    const searchInput = screen.getByPlaceholderText(
      'Search by airport name, city, or code'
    );
    expect(searchInput).toBeInTheDocument();

    // Simulate typing into the input to filter results
    fireEvent.change(searchInput, { target: { value: 'Toronto' } });

    // Expect Toronto option to appear
    const torontoOption = await screen.findByText(
      /Toronto Pearson International Airport/i
    );
    expect(torontoOption).toBeInTheDocument();

    // Select Toronto option
    fireEvent.click(torontoOption);

    // Ensure the selected value is shown
    expect(mockOnSelect).toHaveBeenCalledWith(
      destinationsData.Destinations.find(
        (airport) => airport.city === 'Toronto'
      )
    );
  });
});
