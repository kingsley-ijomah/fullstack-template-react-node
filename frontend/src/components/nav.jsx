import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../lib/useAuth';

export default function Nav() {
  const { isSignedIn } = useAuth();

  return (
    <div>
      <Link to="/">Home</Link>
      {!isSignedIn() ? null : <Link to="/users"> | Users</Link>}
      {isSignedIn() ? null : <Link to="/register"> | Register</Link>}
      {!isSignedIn() ? <Link to="/login"> | Login</Link> : <Link to="/logout"> | Logout</Link>}
    </div>
  );
}
