import { defineConfig } from 'cypress';

import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  // setupNodeEvents can be defined in either
  // the e2e or component configuration
  e2e: {
    setupNodeEvents(on, config) {
      config.baseUrl = process.env.VITE_FRONTEND_URL

      // these are access as e.g. Cypress.env('NODE_ENV')
      config.env.NODE_ENV = process.env.VITE_TEST_NODE_ENV
      config.env.API_BASE_URL = process.env.VITE_API_URL

      // IMPORTANT return the updated config object
      return config
    },
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
});
