/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { format, addDays, parseISO } from 'date-fns';

interface DateTabsProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

const tabsContainerStyles = css`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  gap: 12px; /* Add spacing between tabs */
`;

const tabStyles = (isSelected: boolean) => css`
  flex-grow: 1;
  padding: 12px;
  background-color: ${isSelected ? 'var(--color-primary)' : 'var(--color-component-bg)'};
  color: ${isSelected ? 'var(--color-component-bg)' : 'var(--color-text)'};
  border: 1px solid var(--color-border);
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
  
  /* Subtle box shadow for selected tab */
  ${isSelected &&
    `box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);`} 

  &:hover {
    background-color: ${isSelected ? 'var(--color-primary)' : 'var(--color-accent)'};
    color: ${isSelected ? 'var(--color-component-bg)' : 'var(--color-component-bg)'};
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); /* Slight shadow on hover */
  }
`;

export default function DateTabs({ selectedDate, onDateChange }: DateTabsProps) {
  // Parse the selected date
  const parsedSelectedDate = parseISO(selectedDate);

  // Generate the three dates (previous day, selected day, next day)
  const dates = [
    addDays(parsedSelectedDate, -1), // Day before selected
    parsedSelectedDate,               // Selected day
    addDays(parsedSelectedDate, 1),   // Day after selected
  ];

  return (
    <div css={tabsContainerStyles}>
      {dates.map((date) => {
        const dateString = format(date, 'yyyy-MM-dd');
        const displayDate = format(date, 'MMM dd'); // Displayed in 'Month day' format
        return (
          <div
            key={dateString}
            css={tabStyles(dateString === selectedDate)}
            onClick={() => onDateChange(dateString)}
          >
            {displayDate}
          </div>
        );
      })}
    </div>
  );
}
