import { useState } from 'react';

interface FlightFilterProps {
  onFilter: (origin: string, destination: string, date: string) => void;
}

const FlightFilter = ({ onFilter }: FlightFilterProps) => {
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [date, setDate] = useState<string>('');

  const handleFilter = () => {
    onFilter(origin, destination, date);
  };

  return (
    <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
      <input
        type="text"
        placeholder="Origin"
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
        style={{ padding: '10px', width: '200px' }}
      />
      <input
        type="text"
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        style={{ padding: '10px', width: '200px' }}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{ padding: '10px' }}
      />
      <button onClick={handleFilter} style={{ padding: '10px' }}>
        Apply Filters
      </button>
      <button onClick={() => { setOrigin(''); setDestination(''); setDate(''); handleFilter(); }} style={{ padding: '10px' }}>
        Clear Filters
      </button>
    </div>
  );
};

export default FlightFilter;
