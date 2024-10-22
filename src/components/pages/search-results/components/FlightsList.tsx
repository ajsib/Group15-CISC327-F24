// components/pages/search-results/FlightsList.tsx

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Flight } from '../service';
import FlightCard from './FlightCard';

interface FlightsListProps {
  flights: Flight[];
  onFlightSelect: (flight: Flight) => void;
}

const listStyles = css`
  max-width: 800px;
  margin: 0 auto;
`;

export default function FlightsList({ flights, onFlightSelect }: FlightsListProps) {
  if (flights.length === 0) {
    return null;
  }

  return (
    <div css={listStyles}>
      {flights.map((flight) => (
        <FlightCard key={flight.id} flight={flight} onSelect={onFlightSelect} />
      ))}
    </div>
  );
}
