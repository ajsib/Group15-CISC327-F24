import { render, screen, fireEvent } from '@testing-library/react';
import DateTabs from '../components/DateTabs';
import { format, addDays } from 'date-fns';

describe('DateTabs Component', () => {
  const mockOnDateChange = jest.fn();
  const today = format(new Date(), 'yyyy-MM-dd');

  test('renders three tabs with correct dates', () => {
    render(<DateTabs selectedDate={today} onDateChange={mockOnDateChange} />);
    
    const todayTab = screen.getByText(format(new Date(), 'MMM dd'));
    const previousDay = screen.getByText(format(addDays(new Date(), -1), 'MMM dd'));
    const nextDay = screen.getByText(format(addDays(new Date(), 1), 'MMM dd'));
    
    expect(todayTab).toBeInTheDocument();
    expect(previousDay).toBeInTheDocument();
    expect(nextDay).toBeInTheDocument();
  });

  test('calls onDateChange when a tab is clicked', () => {
    render(<DateTabs selectedDate={today} onDateChange={mockOnDateChange} />);
    
    const nextDay = screen.getByText(format(addDays(new Date(), 1), 'MMM dd'));
    fireEvent.click(nextDay);

    expect(mockOnDateChange).toHaveBeenCalledWith(format(addDays(new Date(), 1), 'yyyy-MM-dd'));
  });

  test('applies selected styles to the selected date tab', () => {
    render(<DateTabs selectedDate={today} onDateChange={mockOnDateChange} />);

    const todayTab = screen.getByText(format(new Date(), 'MMM dd'));
    expect(todayTab).toHaveStyle(`background-color: var(--color-primary)`);
  });
});
