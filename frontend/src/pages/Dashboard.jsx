// Dashboard.jsx

import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import reportService from '../services/reportService';

/**
 * Dashboard Page
 * Displays user-specific reports and allows interaction with reports.
 */
const Dashboard = () => {
    const { user, loading: authLoading } = useAuth(); // Access user and loading state from AuthContext
    const [reports, setReports] = useState([]); // Stores fetched reports
    const [loading, setLoading] = useState(true); // Tracks report loading state
    const [error, setError] = useState(null); // Tracks API errors
    const [searchQuery, setSearchQuery] = useState(''); // Tracks search input

    /**
     * Fetch Reports
     * Retrieves reports from the backend
     */
    const fetchReports = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await reportService.getReports();
            setReports(data);
        } catch (err) {
            console.error('Failed to fetch reports:', err);
            setError('Failed to load reports. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    /**
     * Filter Reports by Search Query
     * @param {string} query - Search query string
     */
    const filteredReports = reports.filter((report) =>
        report.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    /**
     * Effect Hook - Fetch Reports on Component Mount
     */
    useEffect(() => {
        if (user) {
            fetchReports();
        }
    }, [user]);

    if (authLoading || loading) {
        return <Loader />;
    }

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search reports..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="p-2 border rounded-md w-full"
                />
            </div>
            {filteredReports.length === 0 ? (
                <p className="text-gray-500">No reports found.</p>
            ) : (
                <ul className="space-y-2">
                    {filteredReports.map((report) => (
                        <li key={report.id} className="p-4 border rounded-md shadow-md">
                            <h2 className="text-lg font-semibold">{report.title}</h2>
                            <p className="text-sm text-gray-500">{report.description}</p>
                        </li>
                    ))}
                </ul>
            )}
            <button
                onClick={fetchReports}
                className="mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
                Refresh Reports
            </button>
        </div>
    );
};

export default Dashboard;
