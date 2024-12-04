describe('Flight Search Tests', () => {
    beforeEach(() => {
      // Open the flight search results page with predefined query parameters
      cy.visit('http://localhost:3000/search-results?origin_code=YYZ&destination_code=YVR&departureDate=2024-10-21&returnDate=2024-10-25&adults=2');
    });
  
    it('should ensure the flight search page loads correctly', () => {
      // Confirm that the page header or banner is displayed as expected
      cy.contains('Select Departing Flight').should('be.visible');
      cy.contains('Toronto (YYZ) to Vancouver (YVR)').should('be.visible');
      cy.contains('2024-10-21').should('be.visible');
    });
  
    it('should display a list of available flights', () => {
      // Verify that flight cards are displayed on the page
      cy.get('.flight-card').should('exist').and('have.length.greaterThan', 0);
  
      // Validate key details within the first flight card
      cy.get('.flight-card').first().within(() => {
        cy.contains('Departure').should('exist');
        cy.contains('Arrival').should('exist');
        cy.contains('Price').should('exist');
      });
    });
  
    it('should allow the user to select a flight', () => {
      // Choose the first flight from the list
      cy.get('.flight-card').first().within(() => {
        cy.contains('Book').click();
      });
  
      // Confirm redirection to the next step in the process (e.g., confirmation or return flight selection)
      cy.url().should('include', 'confirm-details');
    });
  
    it('should show a message when no flights match the search', () => {
      // Load the search page with parameters that do not match any flights
      cy.visit('http://localhost:3000/search-results?origin_code=XXX&destination_code=YYY&departureDate=2024-10-21');
      
      // Check that an appropriate message is displayed
      cy.contains('No flights available for the selected date.').should('be.visible');
    });
  
    it('should load more results when the "Load More" button is clicked', () => {
      // Confirm the presence of the "Load More" button
      cy.contains('Load More').should('be.visible');
  
      // Trigger the button to load additional flights
      cy.contains('Load More').click();
  
      // Validate that the number of displayed flight cards increases
      cy.get('.flight-card').should('have.length.greaterThan', 5);
    });
  });