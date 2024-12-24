import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import useAuth from '../hooks/useAuth';
import TextField from '../components/Form/TextField';

/**
 * Login Page Component
 * Handles user login functionality.
 */
const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login: authLogin } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const userData = await login(formData.email, formData.password);
            authLogin(userData); // Update auth context with user data
            navigate('/dashboard'); // Redirect to Dashboard
        } catch (err) {
            setError(err.message || 'Failed to login. Please try again.');
        }
    };

    return (
        <div className="login-page">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    error={error && 'Invalid email'}
                />
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter your password"
                    error={error && 'Invalid password'}
                />
                {error && <p className="error text-red-500">{error}</p>}
                <button type="submit" className="bg-[#00A676] text-white px-4 py-2 rounded">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
