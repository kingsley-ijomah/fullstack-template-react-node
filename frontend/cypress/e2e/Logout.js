describe('Logout', () => {
  beforeEach(() => {
    cy.resetTestDatabase();
    cy.registerUser({
      email: 'prince@test.com',
      password: '123456',
    });
  });

  // test logout
  it('should logout user', () => {
    // visit login page
    cy.visit('/login');

    // fill in email
    cy.get('[data-testid=email]').type('prince@test.com');
    cy.get('[data-testid=password]').type('123456');
    cy.get('[data-testid=submit]').click();

    // check logout link
    cy.get('[data-testid=logout]').should('be.visible');

    // click logout link
    cy.get('[data-testid=logout]').click();

    // redirect to login page
    cy.url().should('include', '/login');

    // attempt to visit users page
    cy.visit('/users');

    // redirect to login page
    cy.url().should('include', '/login');
  });
});