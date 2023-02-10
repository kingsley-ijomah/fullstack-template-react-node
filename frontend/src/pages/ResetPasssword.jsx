import React from 'react';
import Nav from '../components/nav';
import Errors from '../components/errors';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useFetch from '../lib/useFetch';

export default function ForgotPasssword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  // use useFetch hook to make request to reset password
  // on success, navigate to login page
  // on failure, set errors
  const [handleFetch] = useFetch(
    `/reset-password/${searchParams.get('token')}`,
    'POST',
    (response) => {
      setMessage(response.message);
      setLoading(false);
      navigate('/login');
    },
    (error) => {
      setErrors(error);
      setLoading(false);
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    // set loading state
    setLoading(true);
    // make request
    handleFetch({ password, confirmPassword });
  };

  return (
    <>
      <Nav />

      <h1>Reset Password</h1>

      <Errors errors={errors} />

      <p>{message}</p>

      <form onSubmit={handleSubmit}>
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
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            placeholder="Confirm Password"
            autoComplete="off"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </p>

        <p>
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Submit'}
          </button>
        </p>
      </form>
    </>
  );
}
