// frontend/src/pages/Dashboard.jsx

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button/Button';
import TextField from '../components/Form/TextField';
import { getReports } from '../services/reportService';

const Dashboard = () => {
    const [reports, setReports] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchReports() {
            try {
                setLoading(true);
                const fetchedReports = await getReports();
                setReports(fetchedReports);
            } catch (error) {
                console.error('Failed to fetch reports:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchReports();
    }, []);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleFilter = (event) => {
        setFilter(event.target.value);
    };

    const filteredReports = reports.filter((report) => {
        const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filter === 'All' || report.status === filter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
            {/* Header Section */}
            <Header />

            {/* Main Content */}
            <main className="flex-1 container mx-auto px-6 py-12">
                <h1 className="text-4xl font-bold text-[#003366] mb-8">VC Dashboard</h1>
                
                {/* Filters and Search */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                    <TextField
                        placeholder="Search Reports..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="w-full md:w-1/3"
                    />
                    <select
                        value={filter}
                        onChange={handleFilter}
                        className="w-full md:w-1/4 border border-gray-300 rounded-md p-2"
                    >
                        <option value="All">All</option>
                        <option value="Completed">Completed</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                    </select>
                    <Button text="Refresh" onClick={() => window.location.reload()} />
                </div>

                {/* Reports Table */}
                {loading ? (
                    <p className="text-center text-gray-500">Loading reports...</p>
                ) : filteredReports.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse bg-white shadow-md rounded-md">
                            <thead className="bg-[#003366] text-white">
                                <tr>
                                    <th className="py-2 px-4 text-left">Report ID</th>
                                    <th className="py-2 px-4 text-left">Title</th>
                                    <th className="py-2 px-4 text-left">Status</th>
                                    <th className="py-2 px-4 text-left">Created At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredReports.map((report) => (
                                    <tr key={report.id} className="hover:bg-gray-100">
                                        <td className="py-2 px-4">{report.id}</td>
                                        <td className="py-2 px-4">{report.title}</td>
                                        <td className="py-2 px-4">{report.status}</td>
                                        <td className="py-2 px-4">{new Date(report.created_at).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No reports found.</p>
                )}
            </main>

            {/* Footer Section */}
            <Footer />
        </div>
    );
};

export default Dashboard;
