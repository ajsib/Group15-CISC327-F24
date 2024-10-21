// components/pages/search-results/FlightSearchResults.tsx

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { fetchFlights, Flight } from './service';
import InfoBanner from './InfoBanner';
import DateTabs from './DateTabs';
import FlightsList from './FlightsList';
import LoadMoreButton from './LoadMoreButton';

export default function FlightSearchResults({ query }: { query: any }) {
  const router = useRouter();
  const [flights, setFlights] = useState<Flight[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>(query.departureDate);
  const [isReturn, setIsReturn] = useState(false);
  const [itinerary, setItinerary] = useState<any>({});
  const [loading, setLoading] = useState(true); // Track loading state
  const [noFlights, setNoFlights] = useState(false); // Track if no flights are available

  const loadFlights = async (reset = false) => {
    setLoading(true);
    const newFlights = await fetchFlights(query, selectedDate, reset ? 0 : offset);
    if (reset) {
      setFlights(newFlights);
      setOffset(newFlights.length);
    } else {
      setFlights((prev) => [...prev, ...newFlights]);
      setOffset((prev) => prev + newFlights.length);
    }
    setHasMore(newFlights.length === 10); // Assume a batch size of 10
    setLoading(false);
    setNoFlights(newFlights.length === 0 && reset); // If reset and no flights are found, flag noFlights
  };

  useEffect(() => {
    // Reset state when date changes
    setFlights([]);
    setOffset(0);
    setHasMore(true);
    setNoFlights(false);
    loadFlights(true);
  }, [selectedDate]);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  const handleFlightSelect = (flight: Flight) => {
    if (!query.oneWay) {
      if (!isReturn) {
        setItinerary({ departingFlight: flight });
        setIsReturn(true);
        const newQuery = {
          ...query,
          origin: query.destination,
          destination: query.origin,
          departureDate: query.returnDate,
        };
        router.push({ pathname: router.pathname, query: newQuery }, undefined, { shallow: true });
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

      {loading ? (
        <p>Loading flights...</p>
      ) : noFlights ? (
        <div>
          <p>No flights available for the selected date.</p>
          <button onClick={handleRetry}>Retry Search</button>
        </div>
      ) : (
        <>
          <FlightsList flights={flights} onFlightSelect={handleFlightSelect} />
          {hasMore && <LoadMoreButton onClick={() => loadFlights()} />}
        </>
      )}
    </div>
  );
}
