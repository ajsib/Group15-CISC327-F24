/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { useRouter } from 'next/router'; // Import useRouter to get query params
import SearchResultsHeader from '../../components/pages/search-results/SearchResultsHeader';
import FlightCard from '../../components/pages/search-results/FlightCard';
import PaginationControls from '../../components/pages/search-results/PaginationControls';
// import FiltersSidebar from '../../components/pages/search-results/FiltersSidebar'; // Uncomment if using

// Define the Flight type
interface Flight {
  id: number;
  origin: string;
  destination: string;
  date: string;
}

const pageContainerStyles = css`
  font-family: Arial, sans-serif;
`;

const contentStyles = css`
  display: flex;
`;

const resultsStyles = css`
  flex-grow: 1;
  padding: 20px;
`;

const SearchResultsPage = () => {
  const router = useRouter();
  
  // Get the query params from the URL (i.e. from the CTA page)
  const { origin, destination, departureDate } = router.query;

  const [flights, setFlights] = useState<Flight[]>([]); // Explicitly setting Flight[] as the type
  const [currentPage, setCurrentPage] = useState(1);
  const flightsPerPage = 10;
  const totalPages = Math.ceil(flights.length / flightsPerPage);

  const indexOfLastFlight = currentPage * flightsPerPage;
  const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
  const currentFlights = flights.slice(indexOfFirstFlight, indexOfLastFlight);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Load the flight data from the JSON file on component mount and filter flights
  useEffect(() => {
    const fetchFlights = async () => {
      const res = await fetch('/flights.json'); // Fetch flight data from JSON
      const data: Flight[] = await res.json();

      // Filter the flights based on the query parameters (origin, destination, date)
      const filteredFlights = data.filter((flight) => {
        return (
          (!origin || flight.origin.toLowerCase().includes((origin as string).toLowerCase())) &&
          (!destination || flight.destination.toLowerCase().includes((destination as string).toLowerCase())) &&
          (!departureDate || flight.date === departureDate)
        );
      });

      setFlights(filteredFlights); // Set the filtered flights
    };

    fetchFlights();
  }, [origin, destination, departureDate]); // Re-run whenever query params change

  return (
    <div css={pageContainerStyles}>
      <SearchResultsHeader />
      <div css={contentStyles}>
        {/* <FiltersSidebar /> Uncomment if using */}
        <div css={resultsStyles}>
          {currentFlights.length > 0 ? (
            currentFlights.map((flight) => (
              <FlightCard key={flight.id} flight={flight} />
            ))
          ) : (
            <p>No flights found matching your criteria.</p>
          )}
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;
