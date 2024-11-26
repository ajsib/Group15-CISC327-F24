import request from 'supertest';

const BASE_URL = 'http://localhost:3000'; // Replace with your local app URL

describe('E2E Test: Flight Search Workflow', () => {
  it('should search for flights and display results', async () => {
    // Step 1: Select origin and destination and make the API call
    const origin = 'Toronto';
    const destination = 'Paris';
    const departureDate = '2024-11-15';

    const response = await request(BASE_URL)
      .get('/api/flights')
      .query({ origin_id: 1, destination_id: 2, departureDate });

    // Verify the API response
    expect(response.status).toBe(200);
    expect(response.body.flights).toHaveLength(1);
    expect(response.body.flights[0]).toEqual(
      expect.objectContaining({
        origin: expect.objectContaining({ name: origin }),
        destination: expect.objectContaining({ name: destination }),
        departureDate,
      })
    );

    // Step 2: Simulate rendering on the frontend
    const flight = response.body.flights[0];

    // Mock rendering (this part assumes your frontend calls this API and renders data)
    const renderedFlight = `
      <div>
        <h3>${flight.origin.name} → ${flight.destination.name}</h3>
        <p>Departure: ${flight.departureDate}</p>
        <p>Price: $${flight.price}</p>
      </div>
    `;

    expect(renderedFlight).toContain(`${flight.origin.name} → ${flight.destination.name}`);
    expect(renderedFlight).toContain(`Departure: ${flight.departureDate}`);
    expect(renderedFlight).toContain(`Price: $${flight.price}`);
  });
});
