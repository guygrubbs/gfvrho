// frontend/src/pages/Viewer.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import Loader from '../components/Loader';

// PDF Worker Configuration
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Viewer = () => {
    const { pdfId } = useParams();
    const [pdfUrl, setPdfUrl] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPDF = async () => {
            try {
                if (!pdfId) {
                    throw new Error('PDF ID is missing in the URL parameters.');
                }
                // Mocked API call for demonstration
                const fetchedUrl = `/api/reports/${pdfId}.pdf`;
                setPdfUrl(fetchedUrl);
            } catch (err) {
                setError(err.message || 'Failed to load the PDF file.');
            } finally {
                setLoading(false);
            }
        };

        fetchPDF();
    }, [pdfId]);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const handleDownload = () => {
        if (pdfUrl) {
            const link = document.createElement('a');
            link.href = pdfUrl;
            link.download = `report-${pdfId}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-600 font-semibold">{error}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">PDF Viewer</h1>
            <div className="flex justify-center mb-4">
                <button
                    onClick={handleDownload}
                    className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition"
                >
                    Download PDF
                </button>
            </div>
            {pdfUrl ? (
                <div className="flex justify-center overflow-auto border border-gray-300 rounded-md shadow-md">
                    <Document
                        file={pdfUrl}
                        onLoadSuccess={onDocumentLoadSuccess}
                        onLoadError={() => setError('Failed to load PDF content.')}
                    >
                        {Array.from(new Array(numPages), (el, index) => (
                            <Page
                                key={`page_${index + 1}`}
                                pageNumber={index + 1}
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                            />
                        ))}
                    </Document>
                </div>
            ) : (
                <p className="text-gray-600 text-center">No PDF file available.</p>
            )}
        </div>
    );
};

export default Viewer;
