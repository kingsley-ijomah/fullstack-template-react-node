describe('Forgot Password', () => {
  beforeEach(() => {
    cy.resetTestDatabase();
    cy.registerUser({
      email: 'tester@xzycoqf2.com' // use a fake email
    });
  });

  it('should send reset password email', () => {
    cy.registerUser({
      email: 'tester@xzycoqf2.com' // use a fake email
    });

    // visit forgot password page
    cy.visit('/forgot-password');

    // fill in email
    cy.get('[data-testid=email]').type('tester@xzycoqf2.com');
    cy.get('[data-testid=submit]').click();

    // check for success message
    cy.contains('Email sent successfully!').should('be.visible');
  });

  it('should not send reset password email with wrong email', () => {
    // visit forgot password page
    cy.visit('/forgot-password');

    // fill in email
    cy.get('[data-testid=email]').type('different@email.com');
    cy.get('[data-testid=submit]').click();

    // check for error message
    cy.contains('Email does not exist').should('be.visible');
  });
});