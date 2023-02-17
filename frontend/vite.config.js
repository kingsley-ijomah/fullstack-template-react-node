import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    plugins: [react()],
    test: {
      globals: true, // enable global variables
      environment: 'jsdom', // use jsdom environment
    },
  };
});
