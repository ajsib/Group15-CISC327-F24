describe('Homepage Tests', () => {
  beforeEach(() => {
    // Visit the homepage before each test
    cy.visit('http://localhost:3000');
  });

  it('should load the hero section with a background image and content', () => {
    // Ensure the hero section is visible
    cy.get('section').should('exist').and('be.visible');

    // Check the hero title and subtitle
    cy.contains('Your Airline Name').should('be.visible');
    cy.contains('Find your next dream destination').should('be.visible');

    // Verify the airplane icon is present
    cy.get('svg').should('have.attr', 'data-icon', 'airplane');
  });

  it('should open the origin dropdown and select an airport', () => {
    // Click the origin dropdown
    cy.contains('Origin').click();

    // Verify the search input appears
    cy.get('input[placeholder="Search by airport name, city, or code"]').should(
      'be.visible'
    );

    // Search for "Toronto"
    cy.get('input[placeholder="Search by airport name, city, or code"]').type(
      'Toronto'
    );

    // Select the Toronto option
    cy.contains('Toronto Pearson International Airport').click();

    // Verify the selected value is displayed
    cy.contains('Toronto (YYZ)').should('be.visible');
  });

  it('should open the destination dropdown and select an airport', () => {
    // Click the destination dropdown
    cy.contains('Destination').click();

    // Search for "Vancouver"
    cy.get('input[placeholder="Search by airport name, city, or code"]').type(
      'Vancouver'
    );

    // Select the Vancouver option
    cy.contains('Vancouver International Airport').click();

    // Verify the selected value is displayed
    cy.contains('Vancouver (YVR)').should('be.visible');
  });

  it('should select departure and return dates', () => {
    // Set departure date
    cy.get('input#departureDate').type('2024-10-21');
    cy.get('input#departureDate').should('have.value', '2024-10-21');

    // Set return date
    cy.get('input#returnDate').type('2024-10-25');
    cy.get('input#returnDate').should('have.value', '2024-10-25');
  });

  it('should add passengers and perform a flight search', () => {
    // Open the passenger selector
    cy.contains('1 Adult').click();

    // Increase the number of adults
    cy.get('button[aria-label="Increase Adults"]').click();
    cy.contains('2 Passengers').should('be.visible');

    // Close the passenger selector
    cy.contains('Close').click();

    // Submit the form
    cy.contains('Search Flights').click();

    // Verify the URL includes the correct query parameters
    cy.url().should('include', '/search-results');
    cy.url().should('include', 'origin_code=YYZ');
    cy.url().should('include', 'destination_code=YVR');
    cy.url().should('include', 'departureDate=2024-10-21');
    cy.url().should('include', 'returnDate=2024-10-25');
    cy.url().should('include', 'adults=2');
  });
});
