/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Link from 'next/link';

// Define styles for the header using Emotion
const headerStyles = css`
  background-color: #0070f3;
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;

  a {
    color: white;
    text-decoration: none;
    margin: 0 10px;
    font-weight: bold;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

// Header component
const Header = () => {
  return (
    <header css={headerStyles}>
      {/* Left side of the header */}
      <div>
        <Link href="/">Home</Link>
        <Link href="/flights">Flights</Link>
      </div>

      {/* Right side of the header */}
      <div>
        <Link href="/test">Play Hangman</Link>
      </div>
    </header>
  );
};

export default Header;
