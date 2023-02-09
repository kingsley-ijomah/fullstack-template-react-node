import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Errors from '../components/errors';
import { Link } from 'react-router-dom';
import Nav from '../components/nav';
import axiosInstance from '../lib/axiosInstance';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    // create user object
    const user = {
      email,
      password,
    };

    try {
      // send user object to backend
      const response = await axiosInstance.post('/login', user);

      // save token to local storage, this will be removed on window close or logout
      // read code in frontend/src/pages/Logout.jsx to see how to remove token on window close
      localStorage.setItem('codehance-token', response.data.token); // short lived

      // redirect to users page
      navigate('/users');
    } catch (error) {
      setErrors(error.response);
    }
  };

  return (
    <div>
      <Nav />
      
      <h1>Login</h1>

      <Errors errors={errors} />

      <form onSubmit={handleSubmit}>
        <p>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            placeholder="Email"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
          />
        </p>

        <p>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            placeholder="Password"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
          />
        </p>

        <p>
          <button type="submit">Login</button>
        </p>
      </form>
      <p>Don't have an account? <Link to='/register'>Register Here</Link> or <Link to='/forgot-password'>Forgot Password?</Link></p>
    </div>
  );
}
