// add a button on the bottom that links to pages/index.tsx

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const containerStyles = css`
  max-width: 600px;
  margin: 0 auto;
  padding: 40px;
  text-align: center;
  font-family: Arial, sans-serif;
`;

const titleStyles = css`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const summaryStyles = css`
  background-color: var(--color-component-bg);
  padding: 20px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  margin-bottom: 20px;
`;

const detailStyles = css`
  font-size: 16px;
  margin: 10px 0;
`;

const referenceStyles = css`
  font-size: 18px;
  font-weight: bold;
  color: var(--color-primary);
  margin: 20px 0;
`;

const buttonStyles = css`
  padding: 12px 24px;
  background-color: var(--color-primary);
  color: var(--color-component-bg);
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  width: 100px;
  text-align: center;

  &:hover {
    background-color: var(--color-secondary);
  }
`;

export default function ConfirmationPage() {
  const router = useRouter();

  // Retrieve booking data from the query
  const {
    origin_code,
    destination_code,
    departureDate,
    returnDate,
    adults,
    children,
    seniors,
    totalPrice,
    bookingReference,
  } = router.query;

  const handleHomeClick = () => {
    router.push('/');
  };

  return (
    <div css={containerStyles}>
      <h1 css={titleStyles}>Booking Confirmation</h1>
      <div css={summaryStyles}>
        <p css={detailStyles}>
          <strong>From:</strong> {origin_code}
        </p>
        <p css={detailStyles}>
          <strong>To:</strong> {destination_code}
        </p>
        <p css={detailStyles}>
          <strong>Departure Date:</strong> {departureDate}
        </p>
        {returnDate && (
          <p css={detailStyles}>
            <strong>Return Date:</strong> {returnDate}
          </p>
        )}
        <p css={detailStyles}>
          <strong>Passengers:</strong> {adults} Adults, {children} Children, {seniors} Seniors
        </p>
        <p css={detailStyles}>
          <strong>Total Price:</strong> ${totalPrice}
        </p>
        <p css={referenceStyles}>Booking Reference: {bookingReference}</p>
      </div>
      <button css={buttonStyles} onClick={handleHomeClick}>
        Home
      </button>
    </div>
  );
}
