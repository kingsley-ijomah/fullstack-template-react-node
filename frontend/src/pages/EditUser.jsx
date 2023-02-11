import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Errors from '../components/errors';
import useFetch from '../lib/useFetch';

export default function EditUser() {
  const navigate = useNavigate(); // navigate to other pages

  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const { id } = useParams(); // get id from url

  // use useFetch hook to make request to get user
  // on success, set user data
  // on failure, set errors
  const [handleFetch] = useFetch(
    `/users/${id}`,
    'GET',
    (response) => {
      setFirstName(response.first_name);
      setLastName(response.last_name);
      setEmail(response.email);
    },
    (fetchErrors) => {
      setErrors(fetchErrors);
    }
  );

  // call handleFetch on component mount
  useEffect(() => {
    handleFetch();
  }, []);

  // make request to edit user
  // on success, navigate to users page
  // on failure, set errors
  const [handleEdit] = useFetch(
    `/users/${id}`,
    'PUT',
    () => {
      navigate('/users');
    },
    (fetchErrors) => {
      setErrors(fetchErrors);
    }
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    // build user object
    const user = {
      first_name,
      last_name,
      email,
    };
    // make request
    handleEdit(user);
  };
  
  return (
    <>
      <h2 style={{ textDecoration: 'underline' }}>Edit User</h2>

      <Errors errors={errors} />

      <form onSubmit={onSubmit}>
        <p>
          <input
            placeholder="Firstname"
            type="text"
            name="first_name"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </p>
        <p>
          <input
            placeholder="Lastname"
            type="text"
            name="last_name"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
          />
        </p>
        <p>
          <input
            placeholder="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </p>
        <p>
          <button type="submit">Edit User</button>
        </p>
      </form>
    </>
  );
}
