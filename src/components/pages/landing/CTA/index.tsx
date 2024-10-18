/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import DropdownSelect from './DropdownSelect';

const pageContainerStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 60px;
  font-family: Arial, sans-serif;
`;

const searchFormStyles = css`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  grid-gap: 20px;
  align-items: center;
  width: 80%;

  .search-form-left {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-gap: 20px;
  }

  .search-form-right {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    align-items: center;
  }

  input, select {
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f7f7f7;
  }

  .full-width {
    grid-column: span 2;
  }
`;

const passengersSelectStyle = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  align-items: center;

  select {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
`;

export default function CTA() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [adults, setAdults] = useState('1');
  const [children, setChildren] = useState('0');
  const [seniors, setSeniors] = useState('0');
  const [oneWay, setOneWay] = useState(false);
  const router = useRouter();

  // Handle form submission and pass state as query to the next page
  const searchAvailableFlights = () => {
    const query = {
      origin,
      destination,
      departureDate,
      returnDate: oneWay ? undefined : returnDate,
      adults,
      children,
      seniors,
      oneWay: oneWay ? 'true' : undefined
    };

    const cleanQuery = Object.fromEntries(Object.entries(query).filter(([_, v]) => v != null));
    router.push({ pathname: '/search-results', query: cleanQuery });
  };

  return (
    <div css={pageContainerStyles}>
      <div css={searchFormStyles}>
        {/* Origin and Destination */}
        <div className="search-form-left">
          <DropdownSelect label="Origin" id="origin" onSelect={setOrigin} />
          <DropdownSelect label="Destination" id="destination" onSelect={setDestination} />
        </div>

        {/* Dates and Passenger Information */}
        <div className="search-form-right">
          <div>
            <label htmlFor="departure-date">Departure Date</label>
            <input
              type="date"
              id="departure-date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="return-date">Return Date</label>
            <input
              type="date"
              id="return-date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              disabled={oneWay}
            />
          </div>

          {/* Passenger Select */}
          <div css={passengersSelectStyle}>
            <label htmlFor="adults">Adults</label>
            <select id="adults" value={adults} onChange={(e) => setAdults(e.target.value)}>
              <option value="1">1 Adult</option>
              <option value="2">2 Adults</option>
            </select>

            <label htmlFor="children">Children</label>
            <select id="children" value={children} onChange={(e) => setChildren(e.target.value)}>
              <option value="0">0 Child</option>
              <option value="1">1 Child</option>
            </select>

            <label htmlFor="seniors">Seniors</label>
            <select id="seniors" value={seniors} onChange={(e) => setSeniors(e.target.value)}>
              <option value="0">0 Senior</option>
              <option value="1">1 Senior</option>
            </select>
          </div>

          {/* One-Way Checkbox */}
          <div>
            <label>
              <input type="checkbox" checked={oneWay} onChange={() => setOneWay(!oneWay)} />
              One Way
            </label>
          </div>
        </div>

        {/* Search Button */}
        <button className="search-button full-width" onClick={searchAvailableFlights}>
          Search Available Flights
        </button>
      </div>
    </div>
  );
}
