/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { GetServerSideProps } from 'next';

// Define a simple interface for the quote
interface SurpriseProps {
  quote: string;
  author: string;
}

// CSS styles using Emotion
const surprisePageStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #e0f7fa;
  font-family: 'Arial', sans-serif;

  h1 {
    color: #006064;
    font-size: 2.5rem;
    margin-bottom: 20px;
  }

  p {
    font-size: 1.25rem;
    color: #004d40;
    text-align: center;
    margin-bottom: 15px;
  }

  .author {
    font-size: 1rem;
    font-weight: bold;
    color: #00796b;
  }

  .new-quote-button {
    padding: 10px 20px;
    font-size: 1rem;
    background-color: #004d40;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #003d33;
    }
  }
`;

// List of quotes for the surprise
const quotes = [
  { quote: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
  { quote: 'Success is not final, failure is not fatal: It is the courage to continue that counts.', author: 'Winston Churchill' },
  { quote: 'Believe you can and you’re halfway there.', author: 'Theodore Roosevelt' },
  { quote: 'The harder you work for something, the greater you’ll feel when you achieve it.', author: 'Anonymous' },
  { quote: 'Don’t stop when you’re tired. Stop when you’re done.', author: 'Wesley Snipes' },
  { quote: 'Act as if what you do makes a difference. It does.', author: 'William James' },
  { quote: 'Your time is limited, so don’t waste it living someone else’s life.', author: 'Steve Jobs' },
];

// Main functional component for the Surprise Page
const SurprisePage = ({ quote, author }: SurpriseProps) => {
  return (
    <div css={surprisePageStyles}>
      <h1>Inspirational Quote of the Day</h1>
      <p>"{quote}"</p>
      <p className="author">- {author}</p>
      <button className="new-quote-button" onClick={() => window.location.reload()}>
        Get Another Quote
      </button>
    </div>
  );
};

// Server-side rendering to provide a random quote on each request
export const getServerSideProps: GetServerSideProps = async () => {
  // Pick a random quote from the list
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const { quote, author } = quotes[randomIndex];

  // Return the quote and author as props
  return {
    props: {
      quote,
      author,
    },
  };
};

export default SurprisePage;
