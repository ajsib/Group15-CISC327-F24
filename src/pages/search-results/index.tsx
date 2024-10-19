/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { css } from '@emotion/react';
import SearchResultsHeader from '../../components/pages/search-results/SearchResultsHeader';
import FlightCard from '../../components/pages/search-results/FlightCard';
import PaginationControls from '../../components/pages/search-results/PaginationControls';
// import FiltersSidebar from '../../components/pages/search-results/FiltersSidebar'; // Uncomment if using

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

const sampleFlights = [
  { id: 1, origin: 'New York', destination: 'Los Angeles', date: '2024-10-22' },
  { id: 2, origin: 'Toronto', destination: 'Vancouver', date: '2024-11-05' },
  // Add more sample flights
];

const SearchResultsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const flightsPerPage = 10;
  const totalPages = Math.ceil(sampleFlights.length / flightsPerPage);

  const indexOfLastFlight = currentPage * flightsPerPage;
  const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
  const currentFlights = sampleFlights.slice(indexOfFirstFlight, indexOfLastFlight);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
