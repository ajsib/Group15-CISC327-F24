/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'; // Emotion for styling
import Link from 'next/link';
import Header from '../components/header'; // Keep the Header component

// CSS for the overall page layout
const pageContainerStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 60px;
  font-family: Arial, sans-serif;
`;

// CSS for the airline section (header)
const airlineSectionStyles = css`
  width: 100%;
  background-color: #f0f0f0;
  padding: 40px 0;
  text-align: center;
  border-bottom: 2px solid #0070f3;
  position: relative; /* Added for positioning Sign In */

  h1 {
    margin: 0;
    font-size: 2.5rem;
    color: #333;
  }

  p {
    font-size: 1.2rem;
    color: #666;
  }

  .sign-in {
    position: absolute;
    right: 20px;
    top: 20px;
    font-weight: bold;
    color: #0070f3; /* Added a color */
    cursor: pointer;
    text-decoration: none;

    &:hover {
      color: #005bb5; /* Darken on hover */
    }
  }
`;

// CSS for the flight search form
const searchFormStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;

  .search-form {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;
    align-items: center;
    width: 80%;

    input,
    select {
      padding: 10px;
      font-size: 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
      font-size: 0.9rem;
      color: #333;
    }

    .full-width {
      grid-column: span 3;
    }
  }

  .search-button {
    background-color: #0070f3;
    color: white;
    padding: 15px 30px;
    font-size: 1.2rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #005bb5;
    }
  }
`;

// Main functional component for the landing page
const LandingPage = () => {
  return (
    <>
      <Header /> {/* Keep the Header */}

      <div css={pageContainerStyles}>
        {/* Airline Section */}
        <div css={airlineSectionStyles}>
          <h1>Airline Name</h1>
          <p>Find your next dream destination</p>
          {/* Fixed the Next.js Link component usage */}
          <Link href="/sign-in" className="sign-in">
            Sign In
          </Link>
        </div>

        {/* Flight Search Form */}
        <div css={searchFormStyles}>
          <div className="search-form">
            {/* Origin Input */}
            <div>
              <label htmlFor="origin">Origin</label>
              <input type="text" id="origin" placeholder="Origin" />
            </div>

            {/* Destination Input */}
            <div>
              <label htmlFor="destination">Destination</label>
              <input type="text" id="destination" placeholder="Destination" />
            </div>

            {/* Date Inputs */}
            <div>
              <label htmlFor="departure-date">Departure Date</label>
              <input type="date" id="departure-date" />
            </div>

            <div>
              <label htmlFor="return-date">Return Date</label>
              <input type="date" id="return-date" />
            </div>

            {/* Passenger Input */}
            <div>
              <label htmlFor="passengers">Passengers</label>
              <select id="passengers">
                <option value="1">1 Adult</option>
                <option value="2">2 Adults</option>
                <option value="3">3 Adults</option>
              </select>
            </div>

            {/* One-Way Option */}
            <div>
              <label>
                <input type="checkbox" />
                One Way
              </label>
            </div>

            {/* Search Button */}
            <button className="search-button full-width">Search Available Flights</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
