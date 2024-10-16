// Import necessary modules and hooks from React and other dependencies
import { useState } from 'react';

/** 
 * Interface representing a flight object. 
 * We define the shape of a flight with three properties:
 * - `id`: a unique identifier for each flight
 * - `origin`: the city where the flight departs from
 * - `destination`: the city where the flight arrives
 * - `date`: the date of the flight
 */
interface Flight {
  id: number;
  origin: string;
  destination: string;
  date: string;
}

/**
 * Mock flight data to simulate the data you'd typically fetch from an API.
 * This is just hard-coded data for demonstration purposes.
 */
const flightData: Flight[] = [
  { id: 1, origin: 'New York', destination: 'Los Angeles', date: '2024-10-20' },
  { id: 2, origin: 'Chicago', destination: 'Miami', date: '2024-10-25' },
  { id: 3, origin: 'San Francisco', destination: 'New York', date: '2024-11-01' },
  { id: 4, origin: 'Los Angeles', destination: 'Chicago', date: '2024-11-05' },
];

// Define the main functional component for the Flights Page
// This component will render a filter bar and display filtered flight data
const FlightsPage: React.FC = () => {
  // Define states to store the current filter values
  const [origin, setOrigin] = useState<string>(''); // State for origin filter
  const [destination, setDestination] = useState<string>(''); // State for destination filter
  const [date, setDate] = useState<string>(''); // State for flight date filter

  /**
   * The `filteredFlights` array is dynamically updated based on the current values
   * of `origin`, `destination`, and `date`. The `filter` function returns only the 
   * flights that match the filter criteria.
   */
  const filteredFlights = flightData.filter((flight) => {
    return (
      // Check if the origin matches the filter (or if the filter is empty)
      (origin === '' || flight.origin.toLowerCase().includes(origin.toLowerCase())) &&
      // Check if the destination matches the filter (or if the filter is empty)
      (destination === '' || flight.destination.toLowerCase().includes(destination.toLowerCase())) &&
      // Check if the flight date matches the filter (or if the filter is empty)
      (date === '' || flight.date === date)
    );
  });

  // JSX structure of the Flights Page
  return (
    <div style={{ padding: '20px' }}> {/* Main container with padding for styling */}
      <h1>Flight Filter</h1> {/* Page title */}

      {/* Filter Bar */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        {/* Origin Filter */}
        <input
          type="text"
          placeholder="Origin" // Placeholder text inside the input field
          value={origin} // The input value is tied to the `origin` state
          onChange={(e) => setOrigin(e.target.value)} // Update the state when the input value changes
          style={{ padding: '10px', width: '200px' }} // Basic styling
        />

        {/* Destination Filter */}
        <input
          type="text"
          placeholder="Destination" // Placeholder text for the destination input
          value={destination} // The input value is tied to the `destination` state
          onChange={(e) => setDestination(e.target.value)} // Update the state when the input value changes
          style={{ padding: '10px', width: '200px' }} // Basic styling
        />

        {/* Date Filter */}
        <input
          type="date"
          value={date} // The input value is tied to the `date` state
          onChange={(e) => setDate(e.target.value)} // Update the state when the input value changes
          style={{ padding: '10px' }} // Basic styling for the date input
        />

        {/* Clear Filters Button */}
        <button
          onClick={() => { setOrigin(''); setDestination(''); setDate(''); }} // Reset all filters when clicked
          style={{ padding: '10px' }} // Basic button styling
        >
          Clear Filters {/* Button text */}
        </button>
      </div>

      {/* Display the list of filtered flights */}
      {filteredFlights.length > 0 ? ( // If there are filtered flights, display them
        <ul>
          {filteredFlights.map((flight) => (
            <li key={flight.id} style={{ marginBottom: '10px' }}>
              {/* Flight details for each flight */}
              <strong>Flight {flight.id}:</strong> {flight.origin} to {flight.destination} on {flight.date}
            </li>
          ))}
        </ul>
      ) : (
        <p>No flights match your search criteria.</p> // If no flights match, display this message
      )}
    </div>
  );
};

// Export the component as the default export, so it can be used in other parts of the application
export default FlightsPage;
