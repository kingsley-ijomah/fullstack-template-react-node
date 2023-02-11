import cookie from 'js-cookie';
import jwt_decode from 'jwt-decode';

// set JWT token in cookie (expires in 4 hours)
const setCookie = (key, token) => {
  cookie.set(key, token, { expires: 4 / 24 }); // 4 hours
};

// remove JWT token from cookie
const removeCookie = (key) => {
  cookie.remove(key);
};

// get JWT token from cookie
const getCookie = (key) => {
  // check if we are in the browser
  return cookie.get(key);
};

// check token expired
const isTokenExpired = (token) => {
  const decoded = jwt_decode(token);
  const currentTime = Date.now() / 1000; // to get in milliseconds
  return decoded.exp < currentTime;
};


// export all functions
export { isTokenExpired, setCookie, removeCookie, getCookie };
