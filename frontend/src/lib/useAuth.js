import { useContext, useState, useEffect } from 'react';
import { setCookie, removeCookie, getCookie, isTokenExpired } from './Cookie';
import { AuthContext } from '../contexts/AuthContext';

const KEY = 'token';
const REMEMBER_ME = 'rememberMe';

const useAuth = () => {
  const { setAuth } = useContext(AuthContext);
  const [rememberMe, setRememberMe] = useState(false);

  const token = getCookie(KEY);

  const signIn = (token) => {
    setAuth(true);
    setCookie(KEY, token, rememberMe ? 365 : 4 / 24); // 4 hours or 1 year
    if (rememberMe) {
      setCookie(REMEMBER_ME, true, 365);
    }
  };

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
