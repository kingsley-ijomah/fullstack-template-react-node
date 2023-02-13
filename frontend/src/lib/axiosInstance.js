import axios from 'axios';
import useAuth from './useAuth';

const AxiosInstance = () => {
  const { token } = useAuth();

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers,
  });

  return [axiosInstance];
};

export default AxiosInstance;
