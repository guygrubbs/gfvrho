// frontend/src/tests/pages/Dashboard.test.jsx

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from '../../pages/Dashboard';
import * as reportService from '../../services/reportService';

// Mock reportService
jest.mock('../../services/reportService', () => ({
  getReports: jest.fn(),
}));

describe('Dashboard Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the Dashboard page with a title', () => {
    render(<Dashboard />);
    const titleElement = screen.getByRole('heading', { name: /Dashboard/i });
    expect(titleElement).toBeInTheDocument();
  });

  test('fetches and displays reports on load', async () => {
    // Mocking API response
    reportService.getReports.mockResolvedValue([
      { id: 1, title: 'Report 1', status: 'Completed' },
      { id: 2, title: 'Report 2', status: 'In Progress' },
    ]);

    render(<Dashboard />);

    expect(reportService.getReports).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(screen.getByText('Report 1')).toBeInTheDocument();
      expect(screen.getByText('Completed')).toBeInTheDocument();
      expect(screen.getByText('Report 2')).toBeInTheDocument();
      expect(screen.getByText('In Progress')).toBeInTheDocument();
    });
  });

  test('displays an error message if fetching reports fails', async () => {
    // Mocking API error
    reportService.getReports.mockRejectedValue(new Error('Failed to fetch reports'));

    render(<Dashboard />);

    expect(reportService.getReports).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(screen.getByText('Failed to load reports. Please try again later.')).toBeInTheDocument();
    });
  });

  test('shows a loading indicator while fetching reports', () => {
    reportService.getReports.mockReturnValue(new Promise(() => {})); // Simulate pending state

    render(<Dashboard />);
    const loadingElement = screen.getByText('Loading reports...');
    expect(loadingElement).toBeInTheDocument();
  });
});
