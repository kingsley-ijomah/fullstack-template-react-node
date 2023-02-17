import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Nav() {
  const auth = useContext(AuthContext);
  return (
    <div>
      <Link to="/">Home</Link>

      {!auth.isAuthenticated && (
        <>
          <Link to="/register">| Register</Link>
          <Link to="/login">| Login</Link>
        </>
      )}

      {auth.isAuthenticated && (
        <>
          <Link to="/users"> | Users</Link>
          <Link to="/logout">| Logout</Link>
        </>
      )}
    </div>
  );
}
