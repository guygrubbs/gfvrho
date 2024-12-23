import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useParams } from 'react-router-dom';

// Configure PDF.js worker source
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

/**
 * Viewer Page Component
 * Renders PDF documents dynamically based on route parameters.
 */
const Viewer = () => {
    const { fileId } = useParams();
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [error, setError] = useState(null);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const onDocumentLoadError = (err) => {
        console.error('Failed to load PDF:', err);
        setError('Failed to load PDF. Please try again later.');
    };

    const goToNextPage = () => {
        setPageNumber((prevPage) => (prevPage < numPages ? prevPage + 1 : prevPage));
    };

    const goToPreviousPage = () => {
        setPageNumber((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
    };

    return (
        <div className="pdf-viewer">
            <h1>PDF Viewer</h1>
            {error ? (
                <div className="error-message">{error}</div>
            ) : (
                <div>
                    <Document
                        file={`/api/files/${fileId}.pdf`}
                        onLoadSuccess={onDocumentLoadSuccess}
                        onLoadError={onDocumentLoadError}
                    >
                        <Page pageNumber={pageNumber} />
                    </Document>
                    <p>
                        Page {pageNumber} of {numPages || '...'}
                    </p>
                    <div>
                        <button onClick={goToPreviousPage} disabled={pageNumber === 1}>
                            Previous Page
                        </button>
                        <button onClick={goToNextPage} disabled={pageNumber === numPages}>
                            Next Page
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Viewer;
