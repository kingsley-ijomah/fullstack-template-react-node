describe('Login', () => {
  afterEach(() => {
    cy.resetTestDatabase();
    cy.registerUser({
      email: 'peter.obi@test.com',
      password: '123456',
    });
  });

  // test that submit is when terms are not accepted
  it('should not login a user when email is not registered', () => {
    // console.log('cypress env:', Cypress.env());
    // navigate to register page
    cy.visit('/login');
    // attempt to submit
    cy.get('[data-testid="submit"]').click();
    // check user remains on login page
    cy.url().should('include', '/login');
    // check that error message `Email or password is incorrect` is displayed
    cy.get('[data-testid="error"]').should('contain', 'Email or password is incorrect');
  });

  // test successful registration
  it('should login a user and redirect to home page', () => {
    // navigate to register page
    cy.visit('/login');

    // fill out form
    cy.get('[data-testid="email"]').type('peter.obi@test.com');
    cy.get('[data-testid="password"]').type('123456');
    cy.get('[data-testid="submit"]').click();

    // check that user is redirected to home page
    cy.url().should('include', '/');
  });

  // test submit when remember me is not checked
  it('should not be checked when you revist the login page', () => {
    // navigate to register page
    cy.visit('/login');

    // fill out form
    cy.get('[data-testid="email"]').type('peter.obi@test.com');
    cy.get('[data-testid="password"]').type('123456');
    cy.get('[data-testid="submit"]').click();

    // check that user is redirected to home page
    cy.url().should('include', '/');

    // logout user
    cy.get('[data-testid="logout"]').click();

    // visit login page
    cy.visit('/login');

    // check that remember me is not checked
    cy.get('[data-testid="remember-me"]').should('not.be.checked');

  });

  // test submit when remember me is checked
  it('should be checked when you revist the login page', () => {
    // navigate to register page
    cy.visit('/login');

    // fill out form
    cy.get('[data-testid="email"]').type('peter.obi@test.com');
    cy.get('[data-testid="password"]').type('123456');
    cy.get('[data-testid="remember-me"]').check();

    cy.get('[data-testid="submit"]').click();

    // check that user is redirected to home page
    cy.url().should('include', '/');

    // logout user
    cy.get('[data-testid="logout"]').click();

    // visit login page
    cy.visit('/login');

    // check that the remember me is checked
    cy.get('[data-testid="remember-me"]').should('be.checked');
  });
});
