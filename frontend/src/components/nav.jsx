import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('codehance-token'); // move to .env
    if (token) {
      setLoggedIn(true);
    }
  }, [loggedIn]);

  return (
    <div>
      <Link to="/">Home</Link>
      {!loggedIn ? null : <Link to="/users"> | Users</Link>}
      {loggedIn ? null : <Link to="/register"> | Register</Link>}
      {loggedIn ? null : <Link to="/login"> | Login</Link>}
      {!loggedIn ? null : <Link to="/logout"> | Logout</Link>}
    </div>
  );
}
