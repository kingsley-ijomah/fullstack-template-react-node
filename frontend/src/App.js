import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
