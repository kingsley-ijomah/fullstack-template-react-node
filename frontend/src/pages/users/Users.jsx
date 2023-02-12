import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Errors from '../../components/errors';
import Nav from '../../components/nav';
import useFetch from '../../lib/useFetch';

export default function Users() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({});

  // use useFetch hook to make request to get all users
  // on success, set users
  // on failure, set errors
  const [handleFetch] = useFetch(
    '/users',
    'GET',
    (fetchedUsers) => {
      setUsers(fetchedUsers);
    },
    (fetchErrors) => {
      setErrors(fetchErrors);
    }
  );

  // fetch users on mount
  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <>
      <Nav />

      <h2 style={{ textDecoration: 'underline' }}>
        List of users from backend
      </h2>

      <Errors errors={errors} />

      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => navigate(`/delete-user/${user.id}`)}>
                  Delete
                </button>
                <button onClick={() => navigate(`/users/${user.id}`)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
