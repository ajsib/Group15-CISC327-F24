// server/tests/flight.test.js
import request from 'supertest';
import app from '../server';

describe('Flight API', () => {
  it('should fetch flights based on query parameters', async () => {
    const response = await request(app)
      .get('/api/flights')
      .query({ origin_id: 1, destination_id: 2, departureDate: '2024-11-15' });
      
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.flights)).toBe(true);
  });

  it('should paginate flight results', async () => {
    const response = await request(app)
      .get('/api/flights')
      .query({ page: 1, limit: 5 });
      
    expect(response.status).toBe(200);
    expect(response.body.flights.length).toBeLessThanOrEqual(5);
  });

  it('should return populated origin and destination data in flights', async () => {
    const response = await request(app)
      .get('/api/flights')
      .query({ origin_id: 1, destination_id: 2 });

    const flights = response.body.flights;
    expect(response.status).toBe(200);
    expect(flights.length).toBeGreaterThan(0);
    flights.forEach(flight => {
      expect(flight.origin).toHaveProperty('id');
      expect(flight.destination).toHaveProperty('id');
    });
  });

  it('should return an error if no flights match the criteria', async () => {
    const response = await request(app)
      .get('/api/flights')
      .query({ origin_id: 9999, destination_id: 9999 });
      
    expect(response.status).toBe(200);
    expect(response.body.flights).toEqual([]);
  });
});
