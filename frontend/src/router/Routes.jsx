// frontend/src/router/Routes.jsx

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Lazy-loaded components for better performance
const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Features = lazy(() => import('../pages/Features'));
const Login = lazy(() => import('../pages/Login'));
const Viewer = lazy(() => import('../pages/Viewer'));
const NotFound = lazy(() => import('../pages/NotFound'));

/**
 * ProtectedRoute Component
 * Ensures only authenticated users can access protected routes
 */
const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

/**
 * Application Routes Configuration
 */
const AppRoutes = () => {
    return (
        <Router>
            <Header />
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} exact />
                    <Route path="/about" element={<About />} exact />
                    <Route path="/features" element={<Features />} exact />
                    <Route path="/login" element={<Login />} exact />

                    {/* Protected Routes */}
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                        exact
                    />
                    <Route
                        path="/viewer/:reportId"
                        element={
                            <ProtectedRoute>
                                <Viewer />
                            </ProtectedRoute>
                        }
                        exact
                    />

                    {/* Fallback 404 Route */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
            <Footer />
        </Router>
    );
};

export default AppRoutes;
