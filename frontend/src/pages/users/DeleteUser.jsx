import React from 'react';
import useFetch from '../../lib/useFetch';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Errors from '../../components/errors';
import { useParams } from 'react-router-dom';

export default function DeleteUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  // get user data
  const [handleFetch] = useFetch(
    `/users/${id}`,
    'GET',
    (response) => {
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

  // make request to delete user
  // on success, navigate to users page
  // on failure, set errors
  const [handleDelete] = useFetch(
    `/users/${id}`,
    'DELETE',
    () => {
      navigate('/users');
    },
    (fetchErrors) => {
      setErrors(fetchErrors);
    }
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    // make request
    handleDelete();
  };

  return (
    <>
      <Errors errors={errors} />

      <h1>Delete User</h1>
      <p>
        Are you sure you want to delete: <b>{email}</b>?
      </p>
      <button onClick={onSubmit}>Delete</button>
    </>
  );
}
