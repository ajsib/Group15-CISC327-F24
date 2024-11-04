import { render, screen, fireEvent } from '@testing-library/react';
import PassSelect from '../PassSelect';
import { useState } from 'react';

describe('PassSelect Component', () => {
  test('allows user to increase passenger count', () => {
    const TestWrapper = () => {
      const [passengerData, setPassengerData] = useState({
        adults: 1,
        children: 0,
        seniors: 0,
      });
      return <PassSelect value={passengerData} onChange={setPassengerData} />;
    };

    render(<TestWrapper />);

    // Open the passenger selector
    const triggerButton = screen.getByText(/1 Adult/i);
    fireEvent.click(triggerButton);

    // Increase adult passengers
    const increaseAdultsButton = screen.getByLabelText('Increase Adults');
    fireEvent.click(increaseAdultsButton);

    // Expect passengers count to be 2 after increasing
    expect(screen.getByText('2 Passengers')).toBeInTheDocument();
  });

  test('allows user to decrease passenger count', async () => {
    const TestWrapper = () => {
      const [passengerData, setPassengerData] = useState({
        adults: 2,
        children: 0,
        seniors: 0,
      });
      return <PassSelect value={passengerData} onChange={setPassengerData} />;
    };

    render(<TestWrapper />);

    // Open the passenger selector
    const triggerButton = screen.getByText(/2 Passengers/i);
    fireEvent.click(triggerButton);

    // Decrease adult passengers
    const decreaseAdultsButton = screen.getByLabelText('Decrease Adults');
    fireEvent.click(decreaseAdultsButton);

    // Wait for the state update and expect passengers count to be 1 after decreasing
    expect(await screen.findByText('1 Adult')).toBeInTheDocument();
  });
});
