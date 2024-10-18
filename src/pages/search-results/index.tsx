/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// Define types for flight data
interface Flight {
  id: number;
  time: string;
  route: string;
  price: number;
}

type FlightData = {
  [date: string]: Flight[];
};

// CSS styles using Emotion
const containerStyle = css`
  font-family: Arial, sans-serif;
  padding: 2rem;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const headerStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #e0e0e0;
  padding: 1rem;
  margin-bottom: 1rem;

  h1 {
    color: black;
  }
`;

const flightInfoStyle = css`
  padding: 1rem;
  background-color: #eeeeee;
  margin-bottom: 1rem;
  border-radius: 8px;
`;

const datePickerStyle = css`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 1rem 0;

  button {
    background-color: white;
    border: 1px solid #ccc;
    padding: 0.75rem 1.5rem;
    cursor: pointer;
    color: black;

    &.active {
      font-weight: bold;
      border-color: #0070f3;
    }

    &:hover {
      background-color: #e0e0e0;
    }
  }
`;

const flightListStyle = css`
  background-color: white;
  padding: 1rem;
  border-radius: 8px;
`;

const flightRowStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }
`;

const priceStyle = css`
  font-weight: bold;
  color: black;
`;

const loadMoreStyle = css`
  text-align: center;
  margin-top: 1rem;

  button {
    background-color: #0070f3;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    cursor: pointer;
    border-radius: 4px;

    &:hover {
      background-color: #005bb5;
    }
  }
`;

const FlightSearchResultsPage = () => {
  const router = useRouter();
  const { origin, destination, departureDate, returnDate, adults, children, seniors, oneWay } = router.query;

  const flightData: FlightData = {
    '2024-09-29': [
      { id: 1, time: '05:32 - 06:17', route: 'YYZ to YOW', price: 950.33 },
      { id: 2, time: '07:32 - 08:17', route: 'YYZ to YOW', price: 1270.5 },
    ],
    '2024-09-30': [
      { id: 3, time: '05:32 - 06:17', route: 'YYZ to YOW', price: 1050.75 },
      { id: 4, time: '08:32 - 09:17', route: 'YYZ to YOW', price: 1370.5 },
    ],
    '2024-10-01': [
      { id: 5, time: '06:32 - 07:17', route: 'YYZ to YOW', price: 1200.99 },
    ],
  };

  const [flights, setFlights] = useState<Flight[]>(flightData['2024-09-30'] || []);

  useEffect(() => {
    setFlights(flightData[departureDate as string] || []);
  }, [departureDate]);

  return (
    <div css={containerStyle}>
      <header css={headerStyle}>
        <h1>Flight Search Results</h1>
        <button>Sign In</button>
      </header>

      <div css={flightInfoStyle}>
        <h2>Select Departing Flight</h2>
        <p>{origin} to {destination} | Departure: {departureDate}</p>
        {returnDate && <p>Return: {returnDate}</p>}
        <p>Passengers: {adults} Adult(s), {children} Child(ren), {seniors} Senior(s)</p>
      </div>

      <div css={flightListStyle}>
        <h3>Available Flights</h3>
        {flights.length > 0 ? (
          flights.map((flight) => (
            <div key={flight.id} css={flightRowStyle}>
              <div>
                <p>{flight.time}</p>
                <p>{flight.route}</p>
              </div>
              <div css={priceStyle}>${flight.price.toFixed(2)}</div>
            </div>
          ))
        ) : (
          <p>No flights available for this date.</p>
        )}
      </div>

      <div css={loadMoreStyle}>
        <button onClick={() => alert('Loading more flights...')}>Load more</button>
      </div>
    </div>
  );
};

export default FlightSearchResultsPage;
