/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import InfoBanner from './components/InfoBanner';
import DateTabs from './components/DateTabs';
import FlightsList from './components/FlightsList';
import LoadMoreButton from './components/LoadMoreButton';
import FlightListSkeleton from './components/FlightListSkeleton';
import { searchFlights } from '@/services/flights';

interface Flight {
  id: number;
  origin_id: number;
  destination_id: number;
  departureDate: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  connections: any[];
}

const FLIGHTS_PER_PAGE = 5; // Number of flights to load per batch

// Styles for "No Flights Available" Section
const noFlightsStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 40px 20px;
  max-width: 800px;
  margin: 0 auto;

  h2 {
    font-size: 24px;
    font-weight: bold;
    color: var(--color-text);
    margin-bottom: 16px;
  }

  p {
    font-size: 16px;
    color: var(--color-muted);
    margin-bottom: 24px;
  }

  button {
    padding: 12px 24px;
    background-color: var(--color-primary);
    color: var(--color-component-bg);
    border: none;
    cursor: pointer;
    border-radius: 4px;
    width: 100%;
    max-width: 400px;
    font-size: 16px;
    font-weight: bold;

    &:hover {
      background-color: var(--color-secondary);
    }
  }
`;

export default function FlightSearchResults({ query }: { query: any }) {
  const router = useRouter();
  const [flights, setFlights] = useState<Flight[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>(query.departureDate);
  const [isReturn, setIsReturn] = useState(false); // Flag to know if searching for return flight
  const [itinerary, setItinerary] = useState<any>({});
  const [initialLoading, setInitialLoading] = useState(true); // Track loading for the first batch
  const [newBatchLoading, setNewBatchLoading] = useState(false); // Track loading for new batches
  const [noFlights, setNoFlights] = useState(false);

  const loadFlights = async (reset = false) => {
    if (reset) {
      setInitialLoading(true);
    } else {
      setNewBatchLoading(true); // Show loading for new batch only
    }

    // Fetch flights using searchFlights from services
    try {
      const params = {
        ...query,
        departureDate: selectedDate,
        page: reset ? 1 : offset / FLIGHTS_PER_PAGE + 1,
      };
      const response = await searchFlights(params);
      const newFlights = response?.flights || [];

      if (reset) {
        setFlights(newFlights);
        setOffset(newFlights.length);
      } else {
        setFlights((prev) => [...prev, ...newFlights]);
        setOffset((prev) => prev + newFlights.length);
      }

      setHasMore(newFlights.length === FLIGHTS_PER_PAGE);
      setNoFlights(newFlights.length === 0 && reset);
    } catch (error) {
      console.error('Failed to load flights:', error);
      setNoFlights(true);
    }

    setInitialLoading(false);
    setNewBatchLoading(false);
  };

  useEffect(() => {
    // Reset flight list and reload when selected date or query changes
    setFlights([]);
    setOffset(0);
    setHasMore(true);
    setNoFlights(false);
    loadFlights(true); // Initial load
  }, [selectedDate, query]);

  const handleDateChange = (date: string) => {
    setSelectedDate(date); // Update selected date when user clicks on a different tab
  };

  const handleFlightSelect = (flight: Flight) => {
    if (!query.oneWay) {
      if (!isReturn) {
        setItinerary({ departingFlight: flight });
        setIsReturn(true); // Move to return flight selection

        const newQuery = {
          ...query,
          origin_id: query.destination_id, // Swap origin and destination
          destination_id: query.origin_id,
          origin_code: query.destination_code,
          destination_code: query.origin_code,
          departureDate: query.returnDate, // Set to return date
        };

        router.push({ pathname: router.pathname, query: newQuery }, undefined, { shallow: true });
        setSelectedDate(query.returnDate); // Change the selected date to the return date
      } else {
        const updatedItinerary = { ...itinerary, returnFlight: flight };
        router.push({
          pathname: '/itinerary',
          query: { itinerary: JSON.stringify(updatedItinerary) },
        });
      }
    } else {
      const updatedItinerary = { departingFlight: flight };
      router.push({
        pathname: '/itinerary',
        query: { itinerary: JSON.stringify(updatedItinerary) },
      });
    }
  };

  const handleRetry = () => {
    router.push('/');
  };

  return (
    <div>
      <InfoBanner query={query} isReturn={isReturn} />
      <DateTabs selectedDate={selectedDate} onDateChange={handleDateChange} />

      {initialLoading ? (
        <FlightListSkeleton count={FLIGHTS_PER_PAGE} /> // Skeleton for the first batch
      ) : noFlights ? (
        <div css={noFlightsStyles}>
          <h2>No Flights Available</h2>
          <p>
            Unfortunately, there are no flights available for the selected date.
            <br />
            Try selecting a different date from the tabs above or click below to retry your search.
          </p>
          <button onClick={handleRetry}>
            Retry Search
          </button>
        </div>
      ) : (
        <>
          <FlightsList flights={flights} onFlightSelect={handleFlightSelect} />
          {newBatchLoading && <FlightListSkeleton count={FLIGHTS_PER_PAGE} />} {/* Skeleton for new flights */}
          {hasMore && !newBatchLoading && <LoadMoreButton onClick={() => loadFlights()} />}
        </>
      )}
    </div>
  );
}
