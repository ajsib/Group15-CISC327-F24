/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { css } from '@emotion/react';
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

  // Load the flight data from the JSON file on component mount
  useEffect(() => {
    const fetchFlights = async () => {
      const res = await fetch('/components/pages/search-results/flights.json');
      const data: Flight[] = await res.json(); // Telling TypeScript that data will be an array of Flight
      setFlights(data);
    };

    fetchFlights();
  }, []);

  return (
    <div css={pageContainerStyles}>
      <SearchResultsHeader />
      <div css={contentStyles}>
        {/* <FiltersSidebar /> Uncomment if using */}
        <div css={resultsStyles}>
          {currentFlights.map((flight) => (
            <FlightCard key={flight.id} flight={flight} />
          ))}
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
