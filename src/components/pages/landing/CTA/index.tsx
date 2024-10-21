/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import PassSelect from './PassSelect';
import DropdownSelect from './DropdownSelect';

const ticketContainerStyles = css`
  max-width: 800px;
  background-color: var(--color-component-bg);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  font-family: Arial, sans-serif;
  color: var(--color-text);
  display: flex;
  flex-direction: row;
  padding: 16px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const sectionStyles = css`
  flex: 1;
`;

const dividerStyles = css`
  width: 1px;
  background-color: var(--color-border);
  margin: 0 16px;
`;

const originDestinationStyles = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const datesPassengersStyles = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const dateGroupStyles = css`
  display: flex;
  flex-direction: row;
  gap: 16px;

  .date-field {
    flex: 1;
    display: flex;
    flex-direction: column;

    label {
      margin-bottom: 4px;
      font-size: 14px;
      color: var(--color-muted);
    }

    input[type='date'] {
      padding: 8px;
      font-size: 16px;
      border: 1px solid var(--color-border);
      border-radius: 4px;
    }
  }
`;

const passengerOneWayStyles = css`
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: center;

  .checkbox-group {
    display: flex;
    align-items: center;
    gap: 8px;

    input[type='checkbox'] {
      width: 16px;
      height: 16px;
    }

    label {
      font-size: 14px;
    }
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const searchButtonStyles = css`
  background-color: var(--color-primary);
  color: var(--color-component-bg);
  border: none;
  padding: 16px;
  font-size: 18px;
  cursor: pointer;
  width: 100%;
  text-align: center;
  border-top: 1px solid var(--color-border);
  margin-top: 16px;
  border-radius: 0 0 8px 8px;

  &:hover {
    background-color: var(--color-secondary);
  }
`;

interface Airport {
  id: number;
  code: string;
  city: string;
  country: string;
  airport: string;
}

export default function FlightSearchForm() {
  const [origin, setOrigin] = useState<Airport | null>(null);
  const [destination, setDestination] = useState<Airport | null>(null);
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    seniors: 0,
  });
  const [oneWay, setOneWay] = useState(false);
  const router = useRouter();

  const handleSearch = () => {
    if (!origin || !destination || !departureDate) {
      alert('Please fill in all required fields.');
      return;
    }

    const query = {
      origin_id: origin.id.toString(),
      destination_id: destination.id.toString(),
      origin_code: origin.code,
      destination_code: destination.code,
      departureDate,
      returnDate: oneWay ? undefined : returnDate,
      adults: passengers.adults.toString(),
      children: passengers.children.toString(),
      seniors: passengers.seniors.toString(),
      oneWay: oneWay ? 'true' : undefined,
    };

    const cleanQuery = Object.fromEntries(
      Object.entries(query).filter(([_, v]) => v != null)
    );

    router.push({ pathname: '/search-results', query: cleanQuery });
  };

  const handlePassengerChange = (value: { adults: number; children: number; seniors: number }) => {
    setPassengers(value);
  };

  // Prevent return date from being earlier than departure date
  const minReturnDate = departureDate;

  return (
    <div css={ticketContainerStyles}>
      {/* Origin and Destination Section */}
      <div css={sectionStyles}>
        <div css={originDestinationStyles}>
          <DropdownSelect type="origin" value={origin} onSelect={setOrigin} />
          <DropdownSelect type="destination" value={destination} onSelect={setDestination} />
        </div>
      </div>

      {/* Divider */}
      <div css={dividerStyles}></div>

      {/* Dates and Passengers Section */}
      <div css={sectionStyles}>
        <div css={datesPassengersStyles}>
          {/* Date Selection Row */}
          <div css={dateGroupStyles}>
            <div className="date-field">
              <label htmlFor="departureDate">Departure Date</label>
              <input
                type="date"
                id="departureDate"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                required
              />
            </div>
            {!oneWay && (
              <div className="date-field">
                <label htmlFor="returnDate">Return Date</label>
                <input
                  type="date"
                  id="returnDate"
                  value={returnDate}
                  min={minReturnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                />
              </div>
            )}
          </div>

          {/* Passengers and One Way Row */}
          <div css={passengerOneWayStyles}>
            <PassSelect value={passengers} onChange={handlePassengerChange} />
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="oneWay"
                checked={oneWay}
                onChange={(e) => setOneWay(e.target.checked)}
              />
              <label htmlFor="oneWay">One Way</label>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <button css={searchButtonStyles} onClick={handleSearch}>
          Search Flights
        </button>
      </div>
    </div>
  );
}
