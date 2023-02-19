describe('Home', () => {
  afterEach(() => {
    cy.resetTestDatabase();
  });

  it('should find the home page', () => {
    cy.visit('/');
    cy.url().should('include', '/');
  });
});