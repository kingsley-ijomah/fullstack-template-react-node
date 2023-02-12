import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Register from './pages/users/Register';
import Users from './pages/users/Users';
import Login from './pages/auth/Login';
import Logout from './pages/auth/Logout';
import EditUser from './pages/users/EditUser';
import ForgotPasssword from './pages/auth/ForgotPasssword';
import ResetPasssword from './pages/auth/ResetPasssword';
import DeleteUser from './pages/users/DeleteUser';
import PrivateRoute from './lib/PrivateRoute';
import AuthProvider from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPasssword />} />
          <Route path="/reset-password" element={<ResetPasssword />} />
          <Route path="/logout" element={<Logout />} />
          {/* Private Routes */}
          <Route exact path="/" element={<PrivateRoute />}>
            <Route exact path="/users" element={<Users />} />
            <Route path="/users/:id" element={<EditUser />} />
            <Route path="/delete-user/:id" element={<DeleteUser />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
