import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Home from './pages/Home';
import Register from './pages/Register';
import Users from './pages/Users';
import Login from './pages/Login';
import Logout from './pages/Logout';
import EditUser from './pages/EditUser';
import ForgotPasssword from './pages/ForgotPasssword';
import ResetPasssword from './pages/ResetPasssword';
import DeleteUser from './pages/DeleteUser';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('codehance-token'); // move to .env
    if (token) {
      setLoggedIn(true);
    }
  }, [loggedIn]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      if (loggedIn) {
        <>
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<EditUser />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/delete-user/:id" element={<DeleteUser />} />
        </>
      } else {
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPasssword />} />
        </>
      }
      <Route path="/reset-password" element={<ResetPasssword />} />

      {/* {loggedIn ? null : <Route path="/register" element={<Register />} />} */}
    </Routes>
  );
}

export default App;
