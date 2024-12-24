// Dashboard.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from '../../pages/Dashboard';
import { AuthContext } from '../../context/AuthContext';
import * as reportService from '../../services/reportService';

// Mock reportService
jest.mock('../../services/reportService', () => ({
    getReports: jest.fn(),
}));

describe('Dashboard Page', () => {
    const mockAuthContextValue = {
        user: { name: 'Test User' },
        loading: false,
        login: jest.fn(),
        logout: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders loading state initially', async () => {
        reportService.getReports.mockResolvedValueOnce([]);
        render(
            <AuthContext.Provider value={mockAuthContextValue}>
                <Dashboard />
            </AuthContext.Provider>
        );

        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });

    test('displays error message on API failure', async () => {
        reportService.getReports.mockRejectedValueOnce(new Error('Failed to fetch reports'));
        render(
            <AuthContext.Provider value={mockAuthContextValue}>
                <Dashboard />
            </AuthContext.Provider>
        );

        await waitFor(() => {
            expect(screen.getByText(/Failed to fetch reports/i)).toBeInTheDocument();
        });
    });

    test('displays reports fetched from API', async () => {
        reportService.getReports.mockResolvedValueOnce([
            { id: 1, title: 'Report 1' },
            { id: 2, title: 'Report 2' },
        ]);

        render(
            <AuthContext.Provider value={mockAuthContextValue}>
                <Dashboard />
            </AuthContext.Provider>
        );

        await waitFor(() => {
            expect(screen.getByText('Report 1')).toBeInTheDocument();
            expect(screen.getByText('Report 2')).toBeInTheDocument();
        });
    });
});
