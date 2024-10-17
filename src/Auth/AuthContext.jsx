/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail'));

  const login = (token, email) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userEmail', email);
    setIsAuthenticated(true);
    setUserEmail(email);
  };

  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setUserEmail(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
