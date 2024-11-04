// FlightSearchForm.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import FlightSearchForm from '../';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('FlightSearchForm Component', () => {
  test('fills out the form and submits search', () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });

    render(<FlightSearchForm />);

    // Select Origin
    fireEvent.click(screen.getByText('Origin'));
    const originOption = screen.getByText(/Toronto Pearson International Airport/i);
    fireEvent.click(originOption);
    expect(screen.getByText(/Toronto \(YYZ\)/i)).toBeInTheDocument();

    // Select Destination
    fireEvent.click(screen.getByText('Destination'));
    const destinationOption = screen.getByText(/Vancouver International Airport/i);
    fireEvent.click(destinationOption);
    expect(screen.getByText(/Vancouver \(YVR\)/i)).toBeInTheDocument();

    // Select Departure Date
    const departureDateInput = screen.getByLabelText('Departure Date');
    fireEvent.change(departureDateInput, { target: { value: '2024-10-21' } });
    expect(departureDateInput).toHaveValue('2024-10-21');

    // Select Return Date
    const returnDateInput = screen.getByLabelText('Return Date');
    fireEvent.change(returnDateInput, { target: { value: '2024-10-25' } });
    expect(returnDateInput).toHaveValue('2024-10-25');

    // Select Passengers
    fireEvent.click(screen.getByText(/1 Adult/i));
    const increaseAdultsButton = screen.getByRole('button', { name: 'Increase Adults' });
    fireEvent.click(increaseAdultsButton);
    expect(screen.getByText('2 Passengers')).toBeInTheDocument();

    // Close the passenger selector
    fireEvent.click(screen.getByText('Close'));

    // Submit the form
    fireEvent.click(screen.getByText('Search Flights'));
    expect(pushMock).toHaveBeenCalledWith({
      pathname: '/search-results',
      query: expect.objectContaining({
        origin_id: expect.any(String),
        destination_id: expect.any(String),
        origin_code: 'YYZ',
        destination_code: 'YVR',
        departureDate: '2024-10-21',
        returnDate: '2024-10-25',
        adults: '2',
        children: '0',
        seniors: '0',
      }),
    });
  });
});
