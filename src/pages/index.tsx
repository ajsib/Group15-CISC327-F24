/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Header from '../components/Header'; // Import Header component
import WelcomeMessage from '../components/WelcomeMessage';
import CallToActionButton from '../components/CallToActionButton';

// CSS for the overall page layout
const welcomePageStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f8ff; /* Light blue background */
  padding-top: 60px; /* Add space for the header */
`;

// CSS for the Hangman button
const hangmanButtonStyles = css`
  margin-top: 20px;
  background-color: #ff6347; /* Tomato color for the button */
  color: white;
  padding: 15px 30px;
  font-size: 1.2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e5533d; /* Darker red on hover */
  }
`;

// Main functional component for the landing page
const WelcomePage = ({ welcomeMessage, username }: { welcomeMessage: string; username: string }) => {
  return (
    <>
      <Header /> {/* Add the Header component */}

      <div css={welcomePageStyles}>
        {/* Display the welcome message and username */}
        <WelcomeMessage welcomeMessage={welcomeMessage} username={username} />

        {/* Button to navigate to the flights page */}
        <CallToActionButton />

        {/* Add a button to navigate to the Hangman game (index2.tsx) */}
        <Link href="/test" passHref>
          <button css={hangmanButtonStyles}>
            Play Hangman
          </button>
        </Link>
      </div>
    </>
  );
};

// Server-side rendering to provide props to the page
export const getServerSideProps: GetServerSideProps = async () => {
  const welcomeMessage = 'Welcome to the Flight Booking App';
  const username = 'Guest'; // Static username for now, can be fetched dynamically

  return {
    props: {
      welcomeMessage,
      username,
    },
  };
};

export default WelcomePage;
