import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loader from '../components/Loader';

// Lazy-loaded Components
const Home = lazy(() => import('../pages/Home'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Login = lazy(() => import('../pages/Login'));
const Features = lazy(() => import('../pages/Features'));
const Viewer = lazy(() => import('../pages/Viewer'));
const NotFound = lazy(() => import('../pages/NotFound'));

/**
 * Protected Route Component
 * Ensures only authenticated users can access protected routes.
 */
const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" replace />;
};

/**
 * Application Routes
 * Define all application routes with proper configurations.
 */
const AppRoutes = () => {
    return (
        <Router>
            <Header />
            <Suspense fallback={<Loader />}>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/features" element={<Features />} />
                    <Route path="/login" element={<Login />} />

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
                        path="/viewer/:id"
                        element={
                            <ProtectedRoute>
                                <Viewer />
                            </ProtectedRoute>
                        }
                    />

                    {/* Fallback Route */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
            <Footer />
        </Router>
    );
};

export default AppRoutes;
