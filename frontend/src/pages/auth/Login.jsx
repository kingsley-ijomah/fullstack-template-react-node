import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Errors from '../../components/errors';
import { Link } from 'react-router-dom';
import Nav from '../../components/nav';
import useFetch from '../../lib/useFetch';
import useAuth from '../../lib/useAuth';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  // get auth context
  const { signIn, rememberMe, setRememberMe } = useAuth();

  // use useFetch hook to make request to login user
  // on success, navigate to users page
  // on failure, set errors
  const [handleFetch] = useFetch(
    '/login',
    'POST',
    (response) => {
      signIn(response.token);
      navigate('/');
    },
    (fetchErrors) => {
      setErrors(fetchErrors);
    }
  );

  const handleSubmit = async (e) => {
    // prevent page refresh
    e.preventDefault();
    // save remembe me cookie
    setRememberMe(rememberMe);
    // make request
    handleFetch({ email, password });
  };

  return (
    <div>
      <Nav />

      <h1>Login</h1>

      <Errors errors={errors} />

      <form data-testid="form" onSubmit={handleSubmit}>
        <p>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            placeholder="Email"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            data-testid="email"
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
            data-testid="password"
          />
        </p>

        <p>
          <button type="submit" data-testid="submit">
            Login
          </button>
        </p>

        <p>
          <label>
            <input
              type="checkbox"
              name="rememberMe"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              data-testid="rememberMe"
            />
            Remember Me
          </label>
        </p>
      </form>
      <p>
        Don't have an account?{' '}
        <Link to="/register" data-testid="register">
          Register Here
        </Link>{' '}
        or{' '}
        <Link to="/forgot-password" data-testid="forgot-password">
          Forgot Password?
        </Link>
      </p>
    </div>
  );
}
