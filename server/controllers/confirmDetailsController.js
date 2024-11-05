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

// Define other styles as they are...

export default function ConfirmDetailsPage() {
  const router = useRouter();
  const { origin_id, destination_id, departureDate, returnDate, adults, children, seniors, flightId } = router.query;

  const [seat, setSeat] = useState('');
  const [bags, setBags] = useState(0);

  const handleContinue = async () => {
    try {
      const response = await fetch('/api/confirm-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          flightId,
          seat,
          bags,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Flight details confirmed:', data);
        // Navigate to payment page after successful confirmation
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
      } else {
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
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
