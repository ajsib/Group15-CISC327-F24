// components/pages/search-results/FlightCard.tsx

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Flight } from './service';

interface FlightCardProps {
  flight: Flight;
  onSelect: (flight: Flight) => void;
}

const cardStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid var(--color-border);

  &:last-of-type {
    border-bottom: none;
  }
`;

const flightInfoStyles = css`
  display: flex;
  align-items: center;
  gap: 16px;

  .times {
    font-size: 18px;
    font-weight: bold;
  }

  .airports {
    font-size: 14px;
    color: var(--color-muted);
  }
`;

const priceStyles = css`
  font-size: 20px;
  font-weight: bold;
`;

const buttonStyles = css`
  padding: 8px 16px;
  background-color: var(--color-primary);
  color: var(--color-component-bg);
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: var(--color-secondary);
  }
`;

export default function FlightCard({ flight, onSelect }: FlightCardProps) {
  return (
    <div css={cardStyles}>
      <div css={flightInfoStyles}>
        <div>
          <div className="times">
            {flight.departureTime} &rarr; {flight.arrivalTime}
          </div>
          <div className="airports">
            {flight.origin.code} to {flight.destination.code}
          </div>
        </div>
      </div>
      <div css={priceStyles}>${flight.price.toFixed(2)}</div>
      <button css={buttonStyles} onClick={() => onSelect(flight)}>
        Book
      </button>
    </div>
  );
}
