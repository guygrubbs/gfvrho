// frontend/src/tests/pages/Viewer.test.jsx

import { render, screen } from '@testing-library/react';
import Viewer from '../../pages/Viewer';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

// Mock dependencies
jest.mock('../../services/apiClient', () => ({
    get: jest.fn(() => Promise.resolve({ data: 'mock-pdf-url' })),
}));

describe('Viewer Page', () => {
    it('renders the Viewer page correctly', () => {
        render(<Viewer />);
        expect(screen.getByText('Report Viewer')).toBeInTheDocument();
    });

    it('displays a loading state while fetching the PDF', async () => {
        render(<Viewer />);
        expect(screen.getByText('Loading report...')).toBeInTheDocument();
    });

    it('renders the PDF iframe when loaded successfully', async () => {
        render(<Viewer />);
        const iframe = await screen.findByTitle('PDF Viewer');
        expect(iframe).toBeInTheDocument();
    });

    it('handles PDF load errors gracefully', async () => {
        jest.mock('../../services/apiClient', () => ({
            get: jest.fn(() => Promise.reject(new Error('Failed to load PDF'))),
        }));

        render(<Viewer />);
        const errorText = await screen.findByText('Failed to load the report. Please try again.');
        expect(errorText).toBeInTheDocument();
    });

    it('triggers download functionality on button click', async () => {
        render(<Viewer />);
        const downloadButton = screen.getByRole('button', { name: /Download Report/i });
        expect(downloadButton).toBeInTheDocument();

        userEvent.click(downloadButton);
        expect(window.location.href).toContain('mock-pdf-url');
    });
});
