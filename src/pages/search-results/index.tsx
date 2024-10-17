import { useRouter } from 'next/router';

export default function SearchResults() {
  const router = useRouter();
  const { origin, destination, departureDate, returnDate, adults, children, seniors, oneWay } = router.query;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Search Results</h1>
      <p><strong>Origin:</strong> {origin}</p>
      <p><strong>Destination:</strong> {destination}</p>
      <p><strong>Departure Date:</strong> {departureDate}</p>
      {oneWay !== 'true' && <p><strong>Return Date:</strong> {returnDate}</p>}
      <p><strong>Adults:</strong> {adults}</p>
      <p><strong>Children:</strong> {children}</p>
      <p><strong>Seniors:</strong> {seniors}</p>
      {oneWay === 'true' && <p><strong>Trip Type:</strong> One Way</p>}
    </div>
  );
}
