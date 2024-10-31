/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Flight } from '../types';

interface FlightCardProps {
  flight: Flight;
  onSelect: (flight: Flight) => void;
}

const cardStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  margin: 16px 0;
  border-radius: 8px;
  background-color: var(--color-component-bg);
  border: 1px solid var(--color-border);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const flightDetailsStyles = css`
  display: flex;
  flex-direction: column;
  gap: 8px;

  .airport-codes {
    font-size: 24px;
    font-weight: bold;
    color: var(--color-primary);
    display: flex;
    justify-content: center;
    gap: 12px;
    align-items: center;

    .arrow {
      font-size: 18px;
      color: var(--color-secondary);
    }
  }

  .flight-times {
    font-size: 16px;
    color: var(--color-muted);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
  }

  .connections {
    font-size: 12px;
    color: var(--color-muted);
    text-align: center;
  }
`;

const priceAndButtonStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  min-width: 100px;
  gap: 12px;
`;

const priceStyles = css`
  font-size: 20px;
  font-weight: bold;
  color: var(--color-text);
`;

const buttonStyles = css`
  padding: 12px 16px;
  background-color: var(--color-primary);
  color: var(--color-component-bg);
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  width: 100px;
  text-align: center;

  &:hover {
    background-color: var(-color-component-bg);
  }
`;

export default function FlightCard({ flight, onSelect }: FlightCardProps) {
  const hasConnections = flight.connections && flight.connections.length > 0;

  return (
    <div css={cardStyles}>
      {/* Flight Details */}
      <div css={flightDetailsStyles}>
        <div className="airport-codes">
          <span>{flight.origin.code}</span>
          <span className="arrow">→</span>
          <span>{flight.destination.code}</span>
        </div>
        <div className="flight-times">
          <span>Departure: {flight.departureTime}</span>
          <span>Arrival: {flight.arrivalTime}</span>
        </div>
        {hasConnections && (
          <div className="connections">
            Stops at: {flight.connections.map((conn) => conn.destination.code).join(', ')}
          </div>
        )}
      </div>

      {/* Price and Book Button */}
      <div css={priceAndButtonStyles}>
        <div css={priceStyles}>${flight.price.toFixed(2)}</div>
        <button css={buttonStyles} onClick={() => onSelect(flight)}>
          Book
        </button>
      </div>
    </div>
  );
}
