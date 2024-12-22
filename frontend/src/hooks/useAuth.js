/**
 * useAuth.js
 *
 * A custom hook that allows components to easily consume AuthContext.
 * Components can then call, for example:
 *   const { isAuthenticated, handleLogin, handleLogout } = useAuth();
 *
 * This encourages a cleaner, simpler pattern for authentication-related logic
 * across both VC dashboards and startup submission pages.
 */

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
