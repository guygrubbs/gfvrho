// AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';

// Create AuthContext
export const AuthContext = createContext(null);

/**
 * Custom Hook for using AuthContext
 * Ensures the hook is used within an AuthProvider
 */
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

/**
 * AuthProvider Component
 * Manages user authentication state and provides auth-related functions
 */
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Stores user details
    const [loading, setLoading] = useState(true); // Tracks loading state

    /**
     * Simulate Authentication Check
     * Replace this with a real authentication API call in production
     */
    useEffect(() => {
        const authenticateUser = async () => {
            try {
                // Example API Call (Replace with real logic)
                setTimeout(() => {
                    setUser({ name: 'Test User', email: 'test@example.com' });
                    setLoading(false);
                }, 1000);
            } catch (error) {
                console.error('Failed to authenticate user:', error);
                setLoading(false);
            }
        };

        authenticateUser();
    }, []);

    /**
     * Login Function
     * @param {Object} userData - User data after successful authentication
     */
    const login = (userData) => {
        setUser(userData);
    };

    /**
     * Logout Function
     * Clears user session
     */
    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
