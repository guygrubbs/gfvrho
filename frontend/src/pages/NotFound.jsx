// frontend/src/pages/NotFound.jsx

import React from 'react';
import { Link } from 'react-router-dom';

/**
 * NotFound Page Component
 * Renders a user-friendly 404 error page with navigation options.
 */
const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-4">
            <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
            <p className="text-lg text-gray-600 mb-6">
                Oops! The page you are looking for does not exist or has been moved.
            </p>
            <Link
                to="/"
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
            >
                Go Back to Homepage
            </Link>
        </div>
    );
};

export default NotFound;
