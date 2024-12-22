// frontend/src/components/Loader.jsx

import React from 'react';

/**
 * Loader Component
 * 
 * A reusable loader component to indicate async loading states across the application.
 * 
 * Requirements:
 * - Ensure reusability across pages.
 * - Handle loading states efficiently.
 */
const Loader = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
            <span className="ml-4 text-gray-600 text-lg">Loading...</span>
        </div>
    );
};

export default Loader;
