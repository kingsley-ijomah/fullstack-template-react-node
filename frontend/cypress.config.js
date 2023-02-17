import { defineConfig } from 'cypress';

export default defineConfig({
  // setupNodeEvents can be defined in either
  // the e2e or component configuration
  e2e: {
    setupNodeEvents(on, config) {
      console.log(config) // see everything in here!

      config.baseUrl = 'http://localhost:5173'

      // modify env var value
      config.env.NODE_ENV = 'test'

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
