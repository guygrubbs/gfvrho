import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useParams } from 'react-router-dom';

// Ensure workerSrc is set for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function Viewer() {
    const { pdfId } = useParams(); // Dynamic route parameter for PDF identification
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [error, setError] = useState(null);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
        setError(null);
    };

    const onDocumentLoadError = (error) => {
        console.error('PDF load error:', error);
        setError('Failed to load PDF. Please try again later.');
    };

    const handleNextPage = () => {
        setPageNumber((prevPage) => Math.min(prevPage + 1, numPages));
    };

    const handlePrevPage = () => {
        setPageNumber((prevPage) => Math.max(prevPage - 1, 1));
    };

    return (
        <div className="viewer-container">
            <h2>PDF Viewer</h2>
            {error && <p className="error">{error}</p>}
            <div className="pdf-container">
                <Document
                    file={`/api/pdfs/${pdfId}`} // Backend endpoint for fetching PDF
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={onDocumentLoadError}
                >
                    <Page pageNumber={pageNumber} />
                </Document>
            </div>
            <div className="controls">
                <button onClick={handlePrevPage} disabled={pageNumber <= 1}>
                    Previous Page
                </button>
                <span>
                    Page {pageNumber} of {numPages || '...'}
                </span>
                <button onClick={handleNextPage} disabled={pageNumber >= numPages}>
                    Next Page
                </button>
            </div>
        </div>
    );
}

export default Viewer;
