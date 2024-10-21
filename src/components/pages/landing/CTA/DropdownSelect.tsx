/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AirplaneTakeoff, AirplaneLanding } from 'phosphor-react';

interface Airport {
  code: string;
  city: string;
  country: string;
  airport: string;
}

interface DropdownSelectProps {
  type: 'origin' | 'destination';
  value: string;
  onSelect: (value: string) => void;
}

const buttonStyles = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  cursor: pointer;
  padding: 8px;
  font-size: 24px;
  font-weight: bold;
  color: var(--color-text);
`;

const mainTextStyles = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const mainTextStyleMuted = css`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--color-muted);
`;

const subtitleStyles = css`
  font-size: 14px;
  color: var(--color-muted);
`;

const dropdownMenuStyles = css`
  position: absolute;
  background-color: var(--color-component-bg);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  z-index: 1000;
  width: 400px;
  max-height: 300px;
  overflow-y: auto;
`;

const searchInputStyles = css`
  width: calc(100% - 30px);
  padding: 15px;
  margin: 15px;
  font-family: inherit;
  font-size: 16px;
`;

const infoTextStyles = css`
  padding: 8px;
  font-size: 14px;
  color: var(--color-muted);
`;

const dropdownItemStyles = css`
  padding: 8px;
  cursor: pointer;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  background-color: var(--color-component-bg);

  &:last-of-type {
    border-bottom: none;
  }

  &:hover, &.selected {
    background-color: var(--color-accent);
    color: var(--color-component-bg);
  }
`;

const airportCodeStyles = css`
  font-size: 18px;
  font-weight: bold;
`;

const airportCityStyles = css`
  font-size: 16px;
`;

const airportNameStyles = css`
  font-size: 14px;
  color: var(--color-muted);
`;

export default function DropdownSelect({ type, value, onSelect }: DropdownSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<Airport[]>([]);
  const [selectedAirport, setSelectedAirport] = useState<Airport | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  const options: Airport[] = [
    { code: 'CDG', city: 'Paris', country: 'France', airport: 'Charles de Gaulle Airport' },
    { code: 'LHR', city: 'London', country: 'United Kingdom', airport: 'Heathrow Airport' },
    { code: 'JFK', city: 'New York', country: 'United States', airport: 'John F. Kennedy International Airport' },
    // Add more airports as needed
  ];

  const buttonRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const icon = type === 'origin' ? <AirplaneTakeoff size={32} /> : <AirplaneLanding size={32} />;
  const placeholderText = type === 'origin' ? 'Origin' : 'Destination';

  const handleButtonClick = () => {
    setIsOpen(true);
    setInputValue('');
    setFilteredOptions(options); // Show all options initially

    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setInputValue(input);

    const filtered = options.filter((option) =>
      option.city.toLowerCase().includes(input.toLowerCase()) ||
      option.country.toLowerCase().includes(input.toLowerCase()) ||
      option.airport.toLowerCase().includes(input.toLowerCase()) ||
      option.code.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const handleSelect = (option: Airport) => {
    setSelectedAirport(option);
    const displayValue = `${option.city} (${option.code})`;
    onSelect(displayValue);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const DropdownMenu = () => (
    <div
      css={dropdownMenuStyles}
      ref={dropdownRef}
      style={{ top: dropdownPosition.top, left: dropdownPosition.left, position: 'absolute' }}
    >
      <input
        type="text"
        css={searchInputStyles}
        placeholder={`Search by airport name, city, or code`}
        value={inputValue}
        onChange={handleInputChange}
        autoFocus
      />
      <div css={infoTextStyles}>You can search by airport name, city, or airport code.</div>
      {filteredOptions.length > 0 ? (
        filteredOptions.map((option) => (
          <div
            key={option.code}
            css={dropdownItemStyles}
            className={selectedAirport?.code === option.code ? 'selected' : ''}
            onClick={() => handleSelect(option)}
          >
            <span css={airportCodeStyles}>{option.code}</span>
            <span css={airportCityStyles}>{option.city}, {option.country}</span>
            <span css={airportNameStyles}>{option.airport}</span>
          </div>
        ))
      ) : (
        <div css={infoTextStyles}>No results found.</div>
      )}
    </div>
  );

  return (
    <div ref={buttonRef} css={buttonStyles}>
      <div css={mainTextStyles} onClick={handleButtonClick}>
        {icon}
        <span>{selectedAirport ? `${selectedAirport.city} (${selectedAirport.code})` : <span css={mainTextStyleMuted}>{placeholderText}</span>}</span>
      </div>
      {selectedAirport ? (
        <div css={subtitleStyles}>{selectedAirport.airport}</div>
      ) : (
        <div css={subtitleStyles}>Click to select</div>
      )}

      {isOpen && createPortal(<DropdownMenu />, document.body)}
    </div>
  );
}
