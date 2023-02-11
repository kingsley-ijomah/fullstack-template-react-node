import React, { createContext, useState, useEffect } from "react";
import useAuth from '../lib/useAuth'

export const AuthContext = React.createContext({
  isAuthenticated: false,
  setAuth: () => {},
});

const AuthProvider = ({ children }) => {
  const { isSignedIn } = useAuth();
  const [isAuthenticated, setAuth] = React.useState(isSignedIn());

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
