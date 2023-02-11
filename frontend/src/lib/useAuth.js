import React, { useContext } from 'react';
import { setCookie, removeCookie, getCookie, isTokenExpired } from './Cookie';
import { AuthContext } from '../contexts/AuthContext';

const KEY = 'token';

const useAuth = () => {
  const { setAuth } = useContext(AuthContext);

  const token = getCookie(KEY);

  const signIn = (token) => {
    setAuth(true);
    setCookie(KEY, token);
  };

  const signOut = () => {
    setAuth(false);
    removeCookie(KEY);
  };

  const isSignedIn = () => {
    if (isExpired(token)) {
      signOut();
      return false;
    }
    return true;
  };

  const isExpired = (token) => {
    return (token ? true : false) && isTokenExpired(token);
  };

  return { token, isSignedIn, signIn, signOut };
};

export default useAuth;
