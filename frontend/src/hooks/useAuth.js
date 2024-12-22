// frontend/src/hooks/useAuth.js

import { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

/**
 * useAuth - Custom hook for managing authentication guards.
 * 
 * ### Features:
 * - Protect routes by validating authentication status.
 * - Redirect unauthenticated users to the login page.
 * - Preserve the intended route for post-login redirection.
 */
const useAuth = () => {
    const { isAuthenticated, loading, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (loading) return; // Prevent redirect while auth state is still loading

        if (!isAuthenticated) {
            // Store the current location to redirect after successful login
            navigate('/login', { state: { from: location } });
        }
    }, [isAuthenticated, loading, navigate, location]);

    /**
     * getRedirectPath - Determine the post-login redirection path.
     * @returns {string} Path to redirect after successful login.
     */
    const getRedirectPath = () => {
        return location.state?.from?.pathname || '/dashboard';
    };

    return { isAuthenticated, user, loading, getRedirectPath };
};

export default useAuth;
