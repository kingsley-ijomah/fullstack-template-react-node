import axios from 'axios';
import useAuth from './useAuth';

const AxiosInstance = () => {
  const { token } = useAuth();

  console.log('AxiosInstance', import.meta.env)

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    // If we are running in Cypress, use Cypress.env('NODE_ENV') defined in 
    // cypress.config.js as `test` otherwise use Vite's import.meta.env.VITE_NODE_ENV
    // defined in .env as `development` or `production`
    // backend will use this to determine which database to use (test, development, production)
    'X-Environment':
      typeof Cypress !== 'undefined'
        ? Cypress.env('NODE_ENV')
        : import.meta.env.VITE_NODE_ENV,
  };

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers,
  });

  return [axiosInstance];
};

export default AxiosInstance;
