describe('Search Results Page Tests', () => {
    beforeEach(() => {
      // Load the search results page with example query parameters
      cy.visit(
        'http://localhost:3000/search-results?origin_code=YYZ&destination_code=YVR&departureDate=2024-10-21&returnDate=2024-10-25&adults=1'
      );
    });
  
    it('should display flight search results when valid query parameters are provided', () => {
      // Ensure the page is rendering results by checking for flight card elements
      cy.get('[data-testid="flight-card"]').should('exist').and('be.visible');
    });
  
    it('should show a message when no flights are available', () => {
      // Intercept API call to simulate no flights returned
      cy.intercept('GET', '/api/search-results*', { flights: [] }).as('fetchNoFlights');
  
      // Reload the page with the intercept
      cy.reload();
  
      // Check for the message that appears when no results are found
      cy.contains('No flights found').should('be.visible');
    });
  
    it('should validate that required query parameters are present', () => {
      // Visit the page without any query parameters
      cy.visit('/search-results');
  
      // Verify that an appropriate error message or fallback behavior is displayed
      cy.contains('Invalid search parameters').should('be.visible');
    });
  
    it('should show accurate details for a specific flight card', () => {
      // Mock a specific response from the search API
      cy.intercept('GET', '/api/search-results*', {
        flights: [
          {
            id: 1,
            origin: { code: 'YYZ', city: 'Toronto', country: 'Canada' },
            destination: { code: 'YVR', city: 'Vancouver', country: 'Canada' },
            departureDate: '2024-10-21',
            departureTime: '08:00 AM',
            arrivalTime: '10:00 AM',
            price: 300,
          },
        ],
      }).as('fetchFlights');
  
      // Reload to apply the mock response
      cy.reload();
  
      // Check that the specific flight details are correctly displayed
      cy.contains('Toronto (YYZ) → Vancouver (YVR)').should('be.visible');
      cy.contains('Departure: 08:00 AM').should('be.visible');
      cy.contains('Arrival: 10:00 AM').should('be.visible');
      cy.contains('$300').should('be.visible');
    });
  });
  