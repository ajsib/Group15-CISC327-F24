/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

// Define interface for props
interface WelcomeMessageProps {
  welcomeMessage: string;
  username: string;
}

// CSS for the component
const messageStyles = css`
  text-align: center;
  h1 {
    font-size: 4rem;
    margin-bottom: 20px;
    color: #333;
  }
  p {
    font-size: 1.5rem;
    color: #666;
  }
  .username {
    font-weight: bold;
    color: #0070f3;
  }
`;

// Functional Component
const WelcomeMessage = ({ welcomeMessage, username }: WelcomeMessageProps) => (
  <div css={messageStyles}>
    <h1>{welcomeMessage}</h1>
    <p>Welcome, <span className="username">{username}</span>!</p>
  </div>
);

export default WelcomeMessage;
