// frontend/src/services/apiClient.js

import axios from 'axios';

// Base configuration for the API client
const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api',
    timeout: 10000, // Timeout after 10 seconds
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor
apiClient.interceptors.request.use(
    (config) => {
        // Attach authentication token if available
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

// Response Interceptor
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Handle unauthorized access
            if (error.response.status === 401) {
                localStorage.removeItem('authToken');
                window.location.href = '/login';
            }
            console.error('Response Error:', error.response.data);
        } else if (error.request) {
            // Handle no response from server
            console.error('No Response:', error.request);
        } else {
            // General error
            console.error('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

// Exported HTTP methods
const api = {
    get: (url, params = {}) => apiClient.get(url, { params }),
    post: (url, data) => apiClient.post(url, data),
    put: (url, data) => apiClient.put(url, data),
    patch: (url, data) => apiClient.patch(url, data),
    delete: (url) => apiClient.delete(url),
};

export default api;
