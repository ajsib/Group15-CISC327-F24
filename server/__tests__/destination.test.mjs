// server/tests/destination.test.js
import request from 'supertest';
import app from '../server'; // Make sure your server export is configured to be importable

describe('Destination API', () => {
  it('should fetch all destinations', async () => {
    const response = await request(app).get('/api/destinations');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should return an empty array if no destinations are found', async () => {
    // Modify data or mock database if needed for an empty state test
    const response = await request(app).get('/api/destinations');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});
