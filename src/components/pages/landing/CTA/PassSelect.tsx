/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Users, Plus, Minus } from 'phosphor-react';

interface PassSelectProps {
  value: {
    adults: number;
    children: number;
    seniors: number;
  };
  onChange: (value: { adults: number; children: number; seniors: number }) => void;
}

const triggerButtonStyles = css`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 8px;
  padding: 8px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
`;

const passSelectStyles = css`
  position: absolute;
  background-color: var(--color-component-bg);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  margin-top: 8px;
  padding: 8px;
  z-index: 1000;
  max-width: 300px;
`;

const passengerGroupStyles = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const counterStyles = css`
  display: flex;
  align-items: center;
  gap: 8px;

  button {
    background: none;
    border: none;
    cursor: pointer;
  }

  span {
    width: 24px;
    text-align: center;
  }
`;

const closeButtonStyles = css`
  text-align: center;
  cursor: pointer;
  color: var(--color-link);
  margin-top: 8px;
`;

export default function PassSelect({ value, onChange }: PassSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  const totalPassengers = value.adults + value.children + value.seniors;

  let label = '';
  if (totalPassengers === 1) {
    if (value.adults === 1) label = '1 Adult';
    else if (value.children === 1) label = '1 Child';
    else if (value.seniors === 1) label = '1 Senior';
  } else {
    label = `${totalPassengers} Passengers`;
  }

  const handleButtonClick = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setDropdownPosition({ top: rect.bottom + window.scrollY, left: rect.left });
    }
    setIsOpen(true);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return (
    <div ref={triggerRef}>
      <div css={triggerButtonStyles} onClick={handleButtonClick}>
        <Users size={24} />
        <span>{label}</span>
      </div>

      {isOpen &&
        createPortal(
          <div
            css={passSelectStyles}
            ref={ref}
            style={{ top: dropdownPosition.top, left: dropdownPosition.left }}
          >
            {['Adults', 'Children', 'Seniors'].map((type) => (
              <div css={passengerGroupStyles} key={type}>
                <span>{type}</span>
                <div css={counterStyles}>
                  <button
                    onClick={() =>
                      onChange({
                        ...value,
                        [type.toLowerCase()]: Math.max(0, value[type.toLowerCase() as keyof typeof value] - 1),
                      })
                    }
                  >
                    <Minus size={16} />
                  </button>
                  <span>{value[type.toLowerCase() as keyof typeof value]}</span>
                  <button
                    onClick={() =>
                      onChange({
                        ...value,
                        [type.toLowerCase()]: value[type.toLowerCase() as keyof typeof value] + 1,
                      })
                    }
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            ))}
            <div css={closeButtonStyles} onClick={() => setIsOpen(false)}>
              Close
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
