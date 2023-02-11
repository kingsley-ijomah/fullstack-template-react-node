import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from './useAuth';
// import { AuthContext } from '../contexts/AuthContext';

const AxiosInstance = () => {
  const { token } = useAuth();
  // const { isAuthenticated } = React.useContext(AuthContext);
  // console.log('isAuthenticated', isAuthenticated);

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
