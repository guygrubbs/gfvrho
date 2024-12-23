/**
 * AuthContext.jsx
 *
 * This file exports an AuthContext and AuthProvider, providing a global state
 * for user authentication. It monitors authentication status, user information,
 * and integrates with authService to log in or out.
 *
 * Usage:
 *   import { AuthProvider } from '../context/AuthContext';
 *   <AuthProvider>
 *     <App />
 *   </AuthProvider>
 *
 * Best Practices:
 * 1. Limit storing sensitive info in the client; store only what’s needed (e.g., token, user ID).
 * 2. Use secure cookies or more robust storage if needed for JWT tokens.
 */

import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as authService from '../services/authService';

// Create a context for authentication
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);    // Store basic user info (e.g., email, role)
  const [token, setToken] = useState(null);  // Store JWT or session token
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check localStorage (or other storage) on mount to see if a token already exists
    const storedToken = localStorage.getItem('gfvrho_token');
    if (storedToken) {
      setToken(storedToken);
      // Optionally decode or validate token here, then set user or isAuthenticated
      setIsAuthenticated(true);
      // If you have an endpoint to fetch user profile by token, you could call it here
    }
  }, []);

  // This function is typically called after a successful login
  const handleLogin = (tokenValue, userInfo = null) => {
    setToken(tokenValue);
    localStorage.setItem('gfvrho_token', tokenValue);
    setIsAuthenticated(true);
    if (userInfo) {
      setUser(userInfo);
    }
  };

  // This function handles logout: clearing the token from state and storage
  const handleLogout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('gfvrho_token');
  };

  // The context value exposes important auth-related data and functions to consumers
  const value = {
    user,
    token,
    isAuthenticated,
    handleLogin,
    handleLogout,
    setUser,  // If you need to update user info from other components
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
