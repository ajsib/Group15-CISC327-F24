/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';

const dropdownStyles = css`
  width: 100%;
  position: relative;

  input {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f7f7f7;
    color: black; /* Text inside input field */
  }

  .dropdown-menu {
    position: absolute;
    width: 100%;
    background-color: white; /* Background of dropdown list */
    border: 1px solid #ccc;
    border-radius: 8px;
    max-height: 200px;
    overflow-y: auto;
    z-index: 1000;
  }

  .dropdown-item {
    padding: 10px;
    font-size: 1rem;
    cursor: pointer;
    color: black; /* Text color of dropdown items */
    background-color: white; /* Ensure background is white */

    &:hover {
      background-color: #f0f0f0; /* Hover effect for better UI */
    }
  }
`;

export default function DropdownSelect({
  label,
  id,
  onSelect,
}: {
  label: string;
  id: string;
  onSelect: (option: string) => void;
}) {
  const [searchTerm, setSearchTerm] = useState<string>(''); // Ensure the type is string
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]); // Ensure filteredOptions is an array of strings

  const options: string[] = [
    'New York',
    'Los Angeles',
    'London',
    'Paris',
    'Tokyo',
    'Toronto',
    'Dubai',
    'Sydney',
    'Frankfurt',
    'Mumbai',
  ]; // Example options

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Live filtering of the options
    setFilteredOptions(
      options.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <div css={dropdownStyles}>
      <label htmlFor={id}>{label}</label>
      <input
        type="text"
        id={id}
        value={searchTerm}
        onChange={handleInputChange}
        placeholder={`Enter ${label}`}
      />
      {filteredOptions.length > 0 && (
        <div className="dropdown-menu">
          {filteredOptions.map((option, index) => (
            <div
              key={index}
              className="dropdown-item"
              onClick={() => {
                onSelect(option);
                setSearchTerm(option); // Set the selected option in the input
                setFilteredOptions([]); // Clear the dropdown after selection
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
