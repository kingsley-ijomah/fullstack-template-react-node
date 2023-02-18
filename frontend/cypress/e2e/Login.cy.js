// {env: {NODE_ENV: 'test'}}
describe('Register', () => {  
  // test that submit is when terms are not accepted
  it('should not register a new user when terms are not accepted', () => {
    // console.log('cypress env:', Cypress.env());
    // navigate to register page
    cy.visit('/register');
    // check that submit is disabled
    cy.get('[data-testid="submit"]').should('be.disabled');
  })

  // test successful registration
  it('should register a new user and redirect to login page', () => {
    // navigate to register page
    cy.visit('/register');

    // fill out form
    cy.get('[data-testid="firstname"]').type('King');
    cy.get('[data-testid="lastname"]').type('Kong');
    cy.get('[data-testid="email"]').type('king26452@testing.com');
    cy.get('[data-testid="password"]').type('123456');
    cy.get('[data-testid="confirm_password"]').type('123456');
    cy.get('[data-testid="accept_terms"]').check();
    cy.get('[data-testid="submit"]').click();

    // check that user is redirected to login page
    cy.url().should('include', '/login');
  });
});
