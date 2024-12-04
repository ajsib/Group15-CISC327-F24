describe('Destination Listing Tests', () => {
    beforeEach(() => {
      // Navigate to the API endpoint to ensure it's accessible
      cy.visit('/api/destinations');
    });
  
    it('should retrieve and display all destinations correctly', () => {
      // Mock the response from the server to include a list of destinations
      cy.intercept('GET', '/api/destinations', {
        body: [
          {
            id: 1,
            code: 'YYZ',
            city: 'Toronto',
            country: 'Canada',
            airport: 'Toronto Pearson International Airport',
          },
          {
            id: 2,
            code: 'YVR',
            city: 'Vancouver',
            country: 'Canada',
            airport: 'Vancouver International Airport',
          },
        ],
      }).as('getDestinations');
  
      // Refresh the page to load the mocked data
      cy.reload();
  
      // Wait for the mock API response and ensure the HTTP status is successful
      cy.wait('@getDestinations').its('response.statusCode').should('eq', 200);
  
      // Verify that the destinations are correctly shown on the page
      cy.contains('Toronto Pearson International Airport').should('be.visible');
      cy.contains('Vancouver International Airport').should('be.visible');
    });
  
    it('should handle an empty database by displaying a proper message', () => {
      // Simulate a scenario where the database has no destinations
      cy.intercept('GET', '/api/destinations', {
        body: [],
      }).as('getEmptyDestinations');
  
      // Reload to fetch the empty data
      cy.reload();
  
      // Wait for the mock response and check the status code
      cy.wait('@getEmptyDestinations').its('response.statusCode').should('eq', 200);
  
      // Ensure the page informs the user that no data is available
      cy.contains('No destinations found').should('be.visible');
    });
  
    it('should show an error message when the server encounters an issue', () => {
      // Mock a server error for the destinations endpoint
      cy.intercept('GET', '/api/destinations', {
        statusCode: 500,
        body: { message: 'Internal Server Error' },
      }).as('getErrorDestinations');
  
      // Reload to simulate the error scenario
      cy.reload();
  
      // Wait for the mock response and verify the error status code
      cy.wait('@getErrorDestinations').its('response.statusCode').should('eq', 500);
  
      // Confirm that an appropriate error message is displayed on the page
      cy.contains('Failed to load destinations. Please try again later.').should('be.visible');
    });
  });
  