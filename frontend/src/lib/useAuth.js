import { useContext, useState, useEffect } from 'react';
import { setCookie, removeCookie, getCookie, isTokenExpired } from './Cookie';
import { AuthContext } from '../contexts/AuthContext';

const KEY = 'token';
const REMEMBER_ME = 'rememberMe';
const YEAR = 365;
const FOUR_HOURS = 4 / 24; // 4 hours

const useAuth = () => {
  const { setAuth } = useContext(AuthContext);
  const [rememberMe, setRememberMe] = useState(false);

  const token = getCookie(KEY);

  const signIn = (token) => {
    setAuth(true);
    setCookie(KEY, token, rememberMe ? YEAR : FOUR_HOURS);
    if (rememberMe) {
      setCookie(REMEMBER_ME, true, YEAR);
    }
  };

  // Check if the user has checked the remember me checkbox
  // and set the state accordingly
  useEffect(() => {
    setRememberMe(getCookie(REMEMBER_ME) ? true : false);
  }, []);

  const signOut = () => {
    setAuth(false);
    removeCookie(KEY);
  };

  const isSignedIn = () => {
    if (isExpired(token) || !token) {
      signOut();
      return false;
    }
    return true;
  };

  const isExpired = (token) => {
    return (token ? true : false) && isTokenExpired(token);
  };

  return { token, rememberMe, setRememberMe, isSignedIn, signIn, signOut };
};

export default useAuth;
