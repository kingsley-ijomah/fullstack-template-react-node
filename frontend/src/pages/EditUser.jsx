import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Errors from '../components/errors';
import axiosInstance from '../lib/axiosInstance';

export default function EditUser() {
  const navigate = useNavigate(); // navigate to other pages

  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const { id } = useParams(); // get id from url

  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get(`/users/${id}`);

      setFirstName(response.data.first_name);
      setLastName(response.data.last_name);
      setEmail(response.data.email);
    } catch (error) {
      setErrors(error.response);
    }
  };

  useEffect(() => {
    fetchUser();
  });

  const editUser = async (e) => {
    e.preventDefault();

    const user = {
      first_name,
      last_name,
      email,
    };

    try {
      await axiosInstance.put(`/users/${id}`, user);
      navigate('/users');
    } catch (error) {
      setErrors(error.response);
    }
  };
  return (
    <>
      <h2 style={{ textDecoration: 'underline' }}>Edit User</h2>

      <Errors errors={errors} />

      <form onSubmit={editUser}>
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
