// ***********************************************
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//

import axios from 'axios';

const getEnvironment = () => Cypress.env('NODE_ENV');
const getBaseUrl = () => Cypress.env('API_BASE_URL');
const randomEmail = () => `${Math.random().toString(36).substring(2, 15)}@test.com`;

Cypress.Commands.add('callApi', (method, url, data = {}) => {
  // cy get request with headers
  cy.request({
    method: method,
    url: `${getBaseUrl()}/${url}`,
    headers: {
      'X-Environment': getEnvironment(),
    },
    body: data,
  });
});

Cypress.Commands.add('resetTestDatabase', () => {
  cy.callApi('GET', 'reset-test-db').then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.message).to.eq('Database reset successfully');
  });
});

Cypress.Commands.add('registerUser', (submittedUser = {}) => {
  // create user object
  const user = {
    first_name: 'Peter',
    last_name: 'Obi',
    email: randomEmail(),
    password: '123456',
    confirm_password: '123456',
  };

  // merge data with user
  Object.assign(user, submittedUser);

  // make request
  cy.callApi('POST', 'users', user);
});
