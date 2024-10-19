/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Link from 'next/link';

const cardStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #ccc;

  .flight-info {
    flex-grow: 1;
  }

  .book-button {
    background-color: #28a745;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #218838;
    }
  }
`;

type FlightCardProps = {
  flight: {
    id: number;
    origin: string;
    destination: string;
    date: string;
  };
};

const FlightCard = ({ flight }: FlightCardProps) => {
  return (
    <div css={cardStyles}>
      <div className="flight-info">
        <h3>{`Flight from ${flight.origin} to ${flight.destination}`}</h3>
        <p>Date: {flight.date}</p>
      </div>
      <Link href="/booking">
        <button className="book-button">Book</button>
      </Link>
    </div>
  );
};

export default FlightCard;
