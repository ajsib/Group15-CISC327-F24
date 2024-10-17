/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import locations from './dummy_locations.json'; // Assuming this JSON file is at this relative path

interface Location {
  code: string;
  city: string;
  country: string;
  airport: string;
}

const inputStyles = css`
  position: relative;
  width: 100%;
  input {
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f7f7f7;
  }
`;

const suggestionsStyles = css`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;

  li {
    padding: 10px;
    cursor: pointer;

    &:hover {
      background-color: #f7f7f7;
    }
  }
`;

interface DropdownSelectProps {
  label: string;
  id: string;
  onSelect: (value: string) => void;
}

export default function DropdownSelect({ label, id, onSelect }: DropdownSelectProps) {
  const [inputValue, setInputValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<Location[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setInputValue(query);

    if (query.length > 1) {
      const filtered = locations.filter(location =>
        location.city.toLowerCase().includes(query.toLowerCase()) ||
        location.code.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleSelect = (location: Location) => {
    setInputValue(`${location.city} (${location.code})`);
    setFilteredSuggestions([]);
    onSelect(location.code);
  };

  return (
    <div css={inputStyles}>
      <label htmlFor={id}>{label}</label>
      <input
        type="text"
        id={id}
        value={inputValue}
        onChange={handleInputChange}
        placeholder={label}
      />
      {filteredSuggestions.length > 0 && (
        <ul css={suggestionsStyles}>
          {filteredSuggestions.map((location, index) => (
            <li key={index} onClick={() => handleSelect(location)}>
              {location.city} ({location.code}) - {location.airport}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
