// frontend/src/components/Header.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="bg-navy-700 text-white py-4 px-6 shadow-md">
            <nav className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-xl font-bold">
                    GFVRHO
                </Link>

                {/* Navigation Links */}
                <ul className="flex space-x-6">
                    <li>
                        <Link to="/" className="hover:text-emerald-400">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" className="hover:text-emerald-400">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link to="/features" className="hover:text-emerald-400">
                            Features
                        </Link>
                    </li>
                    {user ? (
                        <>
                            <li>
                                <Link to="/dashboard" className="hover:text-emerald-400">
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link to="/viewer/sample-report" className="hover:text-emerald-400">
                                    Viewer
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="text-red-400 hover:text-red-300"
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <li>
                            <Link to="/login" className="hover:text-emerald-400">
                                Login
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
