// components/pages/search-results/SearchHeader.tsx

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

interface SearchHeaderProps {
  query: any;
}

const headerStyles = css`
  text-align: center;
  padding: 16px;
  background-color: var(--color-component-bg);
  border-bottom: 1px solid var(--color-border);
`;

const infoBarStyles = css`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  background-color: var(--color-background);
  border-bottom: 1px solid var(--color-border);

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }
`;

export default function SearchHeader({ query }: SearchHeaderProps) {
  const { origin, destination, departureDate } = query;

  return (
    <>
      <h1 css={headerStyles}>Flight Search Results</h1>
      <div css={infoBarStyles}>
        <h2>Select Departing Flight</h2>
        <div>
          {origin} to {destination} | {departureDate}
        </div>
      </div>
    </>
  );
}
