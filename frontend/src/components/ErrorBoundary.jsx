// frontend/src/components/ErrorBoundary.jsx

import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Global Error Boundary Component
 * Catches JavaScript errors in the component tree,
 * displays a fallback UI, and logs error details.
 */
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }

    static getDerivedStateFromError(error) {
        // Update state to show fallback UI on error
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // Log error details for debugging or send to an error reporting service
        console.error('ErrorBoundary caught an error:', error, errorInfo);

        if (this.props.onError) {
            this.props.onError(error, errorInfo);
        }
    }

    render() {
        if (this.state.hasError) {
            // Fallback UI
            return (
                <div className="flex items-center justify-center h-screen bg-gray-100 text-center p-4">
                    <div>
                        <h1 className="text-3xl font-bold text-red-600 mb-4">Something went wrong!</h1>
                        <p className="text-lg text-gray-700 mb-4">
                            An unexpected error occurred. Please try refreshing the page or contact support.
                        </p>
                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded-md"
                            onClick={() => window.location.reload()}
                        >
                            Refresh Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired,
    onError: PropTypes.func,
};

export default ErrorBoundary;
