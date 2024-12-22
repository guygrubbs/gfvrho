// frontend/src/tests/pages/Viewer.test.jsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Viewer from '../../pages/Viewer';
import '@testing-library/jest-dom/extend-expect';

// Mock API call if the Viewer fetches PDFs dynamically
jest.mock('../../services/apiClient', () => ({
    get: jest.fn(() => Promise.resolve({ data: 'mocked-pdf-data' })),
}));

describe('Viewer Page Tests', () => {
    test('renders Viewer page with PDF content', async () => {
        render(
            <MemoryRouter initialEntries={['/viewer/123']}>
                <Routes>
                    <Route path="/viewer/:id" element={<Viewer />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText(/Loading PDF/i)).toBeInTheDocument();

        // Mock PDF rendering confirmation
        // Assume that PDF component has rendered successfully
        expect(await screen.findByText(/PDF Loaded Successfully/i)).toBeInTheDocument();
    });

    test('handles missing PDF gracefully', async () => {
        jest.mock('../../services/apiClient', () => ({
            get: jest.fn(() => Promise.reject(new Error('PDF not found'))),
        }));

        render(
            <MemoryRouter initialEntries={['/viewer/invalid-id']}>
                <Routes>
                    <Route path="/viewer/:id" element={<Viewer />} />
                </Routes>
            </MemoryRouter>
        );

        expect(await screen.findByText(/Failed to load PDF/i)).toBeInTheDocument();
    });

    test('validates dynamic route parameter is passed correctly', () => {
        const testId = '456';

        render(
            <MemoryRouter initialEntries={[`/viewer/${testId}`]}>
                <Routes>
                    <Route
                        path="/viewer/:id"
                        element={<Viewer />}
                    />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText(`Viewing PDF with ID: ${testId}`)).toBeInTheDocument();
    });
});
