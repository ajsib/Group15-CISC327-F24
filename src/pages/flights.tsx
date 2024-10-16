/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import Header from '../components/Header'; // Import the Header component
import FlightFilter from '../components/FlightFilter'; // Import the FlightFilter component

interface Flight {
  id: number;
  origin: string;
  destination: string;
  date: string;
}

const flightData: Flight[] = [
  { id: 1, origin: 'New York', destination: 'Los Angeles', date: '2024-10-20' },
  { id: 2, origin: 'Chicago', destination: 'Miami', date: '2024-10-25' },
  { id: 3, origin: 'San Francisco', destination: 'New York', date: '2024-11-01' },
  { id: 4, origin: 'Los Angeles', destination: 'Chicago', date: '2024-11-05' },
];

const FlightsPage = () => {
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>(flightData);

  const handleFilter = (origin: string, destination: string, date: string) => {
    const filtered = flightData.filter((flight) => {
      return (
        (!origin || flight.origin.toLowerCase().includes(origin.toLowerCase())) &&
        (!destination || flight.destination.toLowerCase().includes(destination.toLowerCase())) &&
        (!date || flight.date === date)
      );
    });
    setFilteredFlights(filtered);
  };

  return (
    <>
      <Header /> {/* Add the Header component */}

      <div style={{ padding: '20px' }}>
        <h1>Flight Filter</h1>
        <FlightFilter onFilter={handleFilter} />
        <ul>
          {filteredFlights.length > 0 ? (
            filteredFlights.map((flight) => (
              <li key={flight.id}>
                <strong>Flight {flight.id}:</strong> {flight.origin} to {flight.destination} on {flight.date}
              </li>
            ))
          ) : (
            <p>No flights match your search criteria.</p>
          )}
        </ul>
      </div>
    </>
  );
};

export default FlightsPage;
