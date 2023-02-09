import { useState } from 'react';
import cookie from 'js-cookie';

const useCookie = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const cookieValue = cookie.get(key);
      return cookieValue ? JSON.parse(cookieValue) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setCookie = (newValue) => {
    try {
      cookie.set(key, JSON.stringify(newValue), { expires: 365 });
      setValue(newValue);
    } catch (error) {
      console.error(error);
    }
  };

  return [value, setCookie];
};

export default useCookie;
