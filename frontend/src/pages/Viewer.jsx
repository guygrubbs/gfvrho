// frontend/src/pages/Viewer.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button/Button';
import { getReports } from '../services/reportService';

const Viewer = () => {
    const { reportId } = useParams();
    const [reportUrl, setReportUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchReport() {
            try {
                setLoading(true);
                const reportData = await getReports(reportId);
                if (reportData && reportData.pdf_url) {
                    setReportUrl(reportData.pdf_url);
                } else {
                    throw new Error('Report not found.');
                }
            } catch (err) {
                console.error('Failed to fetch report:', err);
                setError('Failed to load the report. Please try again later.');
            } finally {
                setLoading(false);
            }
        }

        fetchReport();
    }, [reportId]);

    const handleDownload = () => {
        if (reportUrl) {
            const link = document.createElement('a');
            link.href = reportUrl;
            link.download = `report_${reportId}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Report Viewer',
                text: 'Check out this report from GFVRHO.',
                url: reportUrl,
            }).catch((err) => console.error('Error sharing report:', err));
        } else {
            alert('Share functionality is not supported in your browser.');
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
            {/* Header */}
            <Header />

            {/* Main Content */}
            <main className="flex-1 container mx-auto px-6 py-12">
                <h1 className="text-3xl font-bold text-[#003366] mb-6">Report Viewer</h1>

                {loading ? (
                    <p className="text-center text-gray-500">Loading report...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : (
                    <div className="flex flex-col items-center">
                        <iframe
                            src={reportUrl}
                            title="Report PDF"
                            className="w-full md:w-3/4 h-[500px] border border-gray-300 rounded-md"
                        ></iframe>
                        <div className="mt-6 flex gap-4">
                            <Button
                                text="Download Report"
                                onClick={handleDownload}
                                className="bg-[#00A676] text-white hover:bg-[#007A5C]"
                            />
                            <Button
                                text="Share Report"
                                onClick={handleShare}
                                className="bg-[#003366] text-white hover:bg-[#002244]"
                            />
                        </div>
                    </div>
                )}
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Viewer;
