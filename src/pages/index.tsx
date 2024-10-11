/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { GetServerSideProps } from 'next'; // Importing Next.js type for server-side rendering

// Define a simple interface for the welcome message
// This interface ensures that the props `welcomeMessage` and `username` are passed in as strings
interface WelcomeProps {
  welcomeMessage: string; // Message to be displayed as a heading
  username: string; // Username to be displayed in the paragraph
}

// CSS styles using Emotion
// We're using `css` from `@emotion/react` to define styles for the page.
// These styles are scoped to the component and will be applied as a `css` prop.
const welcomePageStyles = css`
  display: flex; /* Flexbox layout for centering */
  flex-direction: column; /* Align items vertically */
  align-items: center; /* Center items horizontally */
  justify-content: center; /* Center items vertically */
  height: 100vh; /* Full height of the viewport */
  background-color: #f5f5f5; /* Light grey background color */
  font-family: Arial, sans-serif; /* Font for the page */

  h1 {
    color: #333; /* Dark grey color for the heading */
    font-size: 3rem; /* Large font size for the heading */
    margin-bottom: 20px; /* Spacing between the heading and paragraph */
  }

  p {
    font-size: 1.5rem; /* Medium font size for the paragraph */
    color: #666; /* Medium grey color for the paragraph */
  }

  /* Class for the username part inside the paragraph */
  .username {
    font-weight: bold; /* Make the username bold */
    color: #0070f3; /* Blue color for the username (Next.js brand color) */
  }
`;

// Main functional component for the Welcome Page
// This component accepts `welcomeMessage` and `username` as props, which are passed down from `getServerSideProps`.
const WelcomePage = ({ welcomeMessage, username }: WelcomeProps) => {
  return (
    // Apply the defined CSS styles to this div using Emotion's `css` prop
    <div css={welcomePageStyles}>
      {/* Display the welcome message as the heading */}
      <h1>{welcomeMessage}</h1>

      {/* Display a welcome message with the username */}
      <p>
        Welcome, <span className="username">{username}</span>!
      </p>
    </div>
  );
};

// Server-side rendering to provide props to the page
// `getServerSideProps` runs on each request to fetch or generate the required data for rendering the page.
export const getServerSideProps: GetServerSideProps = async () => {
  // Fetch or generate the data needed for the welcome page
  // This could be an API call, database query, or static value.
  const welcomeMessage = 'Hello and Welcome to Our Website'; // Static message
  const username = 'John Doe'; // Static username, can be dynamically fetched

  // Return the props for the component
  // These props will be passed to the `WelcomePage` component during rendering.
  return {
    props: {
      welcomeMessage, // Passing the welcome message to the component
      username, // Passing the username to the component
    },
  };
};

// Export the default component for this page
// This is the main component that Next.js will render for this route.
export default WelcomePage;
