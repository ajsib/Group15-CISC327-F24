/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Link from 'next/link';

// CSS for the button
const buttonStyles = css`
  background-color: #0070f3;
  color: white;
  padding: 15px 30px;
  font-size: 1.2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #005bb5;
  }
`;

// Functional Component
const CallToActionButton = () => (
  <Link href="/flights" passHref>
    <button css={buttonStyles}>
      View Flights
    </button>
  </Link>
);

export default CallToActionButton;
