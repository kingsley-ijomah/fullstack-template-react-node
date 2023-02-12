import React, { useState } from 'react';
import Errors from '../../components/errors';
import Nav from '../../components/nav';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../lib/useFetch';

export default function Register() {
  const navigate = useNavigate();
  // registration form
  const [first_name, setFirstname] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [accept_terms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState({});

  // use useFetch hook to make request to register user
  // on success, navigate to login page
  // on failure, set errors
  const [handleFetch] = useFetch(
    '/users',
    'POST',
    () => {
      navigate('/login');
    },
    (fetchErrors) => {
      setErrors(fetchErrors);
    }
  );

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page refresh

    // create user object
    const user = {
      first_name,
      last_name,
      email,
      password,
      confirm_password,
    };

    // make request
    handleFetch(user);
  };

  return (
    <>
      <Nav />

      <h2>Register</h2>

      <Errors errors={errors} />

      <form onSubmit={handleSubmit}>
        <p>
          <input
            placeholder="First Name"
            type="text"
            id="firstname"
            value={first_name}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </p>

        <p>
          <input
            placeholder="Last Name"
            type="text"
            id="lastname"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
          />
        </p>

        <p>
          <input
            placeholder="Email"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </p>

        <p>
          <input
            placeholder="Password"
            type="password"
            autoComplete="off"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </p>

        <p>
          <input
            placeholder="Confirm Password"
            type="password"
            autoComplete="off"
            id="confirm_password"
            value={confirm_password}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </p>

        <p>
          <input
            type="checkbox"
            id="accept_terms"
            checked={accept_terms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
          />
          <label htmlFor="accept_terms">
            I accept the <a href="#">terms of service</a>
          </label>
        </p>

        <p>
          <button type="submit" disabled={!accept_terms}>
            Register
          </button>
        </p>
      </form>
    </>
  );
}
