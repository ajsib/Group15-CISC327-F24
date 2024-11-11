import mongoose from 'mongoose';
import request from 'supertest';
import app from '../server.js';
import { expect } from 'chai';

describe('Destination API', () => {
  before(async () => {
    await mongoose.connection.collection('destinations').deleteMany({});
  });

  it('should fetch all destinations', async () => {
    const response = await request(app).get('/api/destinations');
    expect(response.status).to.equal(200);
    expect(Array.isArray(response.body)).to.be.true;
  });

  it('should return an empty array if no destinations are found', async () => {
    const response = await request(app).get('/api/destinations');
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal([]);
  });
});

after(async () => {
  await mongoose.connection.close();
  process.exit();
});
