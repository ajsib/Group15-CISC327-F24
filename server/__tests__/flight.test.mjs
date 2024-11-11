import request from 'supertest';
import app from '../server.js';
import { expect } from 'chai';

describe('Flight API', () => {
  it('should fetch flights based on query parameters', async () => {
    const response = await request(app)
      .get('/api/flights')
      .query({ origin_id: 1, destination_id: 2, departureDate: '2024-11-15' });
      
    expect(response.status).to.equal(200);
    expect(Array.isArray(response.body.flights)).to.be.true;
  });

  it('should paginate flight results', async () => {
    const response = await request(app)
      .get('/api/flights')
      .query({ page: 1, limit: 5 });
      
    expect(response.status).to.equal(200);
    expect(response.body.flights.length).to.be.at.most(5);
  });

  it('should return populated origin and destination data in flights', async () => {
    const response = await request(app)
      .get('/api/flights')
      .query({ origin_id: 1, destination_id: 2 });

    const flights = response.body.flights;
    expect(response.status).to.equal(200);
    expect(flights.length).to.be.greaterThan(0);
    flights.forEach(flight => {
      expect(flight.origin).to.have.property('id');
      expect(flight.destination).to.have.property('id');
    });
  });

  it('should return an empty array if no flights match the criteria', async () => {
    const response = await request(app)
      .get('/api/flights')
      .query({ origin_id: 9999, destination_id: 9999 });
      
    expect(response.status).to.equal(200);
    expect(response.body.flights).to.deep.equal([]);
  });
});
