import React from 'react';
import Nav from '../../components/nav';
import Errors from '../../components/errors';
import { useState } from 'react';
import useFetch from '../../lib/useFetch';

export default function ForgotPasssword() {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [handleFetch] = useFetch(
    '/forgot-password',
    'POST',
    (response) => {
      setMessage(response.message);
    },
    (fetchErrors) => {
      setErrors(fetchErrors);
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    // set loading to true
    setLoading(true);
    // make request
    handleFetch({ email });
    // set loading to false
    setLoading(false);
  };

  return (
    <>
      <Nav />

      <h1>Forgot Password</h1>

      <Errors errors={errors} />

      <p>{message}</p>

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
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Submit'}
          </button>
        </p>
      </form>
    </>
  );
}
