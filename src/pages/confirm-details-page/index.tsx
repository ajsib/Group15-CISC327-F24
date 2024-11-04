// src/pages/ConfirmDetailsPage.tsx

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import { useRouter } from 'next/router';

const pageStyles = css`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: var(--color-component-bg);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  font-family: Arial, sans-serif;
  color: var(--color-text);
`;

const sectionStyles = css`
  margin-bottom: 20px;
`;

const labelStyles = css`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
`;

const inputStyles = css`
  width: 100%;
  padding: 8px;
  margin-bottom: 12px;
`;

const buttonStyles = css`
  background-color: var(--color-primary);
  color: var(--color-component-bg);
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: var(--color-secondary);
  }
`;

export default function ConfirmDetailsPage() {
  const router = useRouter();
  const { origin_id, destination_id, departureDate, returnDate, adults, children, seniors } = router.query;

  const [seat, setSeat] = useState('');
  const [bags, setBags] = useState(0);

  const handleContinue = () => {
    router.push({
      pathname: '/payment',
      query: {
        origin_id,
        destination_id,
        departureDate,
        returnDate,
        adults,
        children,
        seniors,
        seat,
        bags,
      },
    });
  };

  return (
    <div css={pageStyles}>
      <h1>Confirm Your Details</h1>

      <div css={sectionStyles}>
        <label css={labelStyles}>Select Seat</label>
        <input
          type="text"
          css={inputStyles}
          placeholder="Enter preferred seat (e.g., 12A)"
          value={seat}
          onChange={(e) => setSeat(e.target.value)}
        />
      </div>

      <div css={sectionStyles}>
        <label css={labelStyles}>Number of Bags</label>
        <input
          type="number"
          css={inputStyles}
          value={bags}
          onChange={(e) => setBags(Math.max(0, parseInt(e.target.value)))}
          min="0"
        />
      </div>

      <button css={buttonStyles} onClick={handleContinue}>
        Continue to Payment
      </button>
    </div>
  );
}