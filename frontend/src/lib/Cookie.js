import cookie from 'js-cookie';

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

// export all functions
export { setCookie, removeCookie, getCookie };
