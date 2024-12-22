// frontend/src/router/Routes.jsx

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Page Components
import Home from '../pages/Home';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import About from '../pages/About';
import Features from '../pages/Features';
import Viewer from '../pages/Viewer';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token'); // Example auth check
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Application Routes
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/features" element={<Features />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/viewer"
        element={
          <ProtectedRoute>
            <Viewer />
          </ProtectedRoute>
        }
      />

      {/* Catch-All Route */}
      <Route path="*" element={<div className="text-center text-red-500 mt-8">404 - Page Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;
