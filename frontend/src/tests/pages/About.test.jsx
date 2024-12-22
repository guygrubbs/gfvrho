// frontend/src/tests/pages/About.test.jsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../../pages/About';
import '@testing-library/jest-dom';

describe('About Page', () => {
    test('renders the About page correctly', () => {
        render(<About />);
        
        // Check for main heading
        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('About Us');

        // Check for company mission section
        expect(screen.getByText(/our mission/i)).toBeInTheDocument();

        // Check for team section
        expect(screen.getByText(/meet our team/i)).toBeInTheDocument();
    });

    test('displays the correct company description', () => {
        render(<About />);

        // Check if the description is rendered
        expect(
            screen.getByText(/We are dedicated to empowering startups and enabling smarter investments/i)
        ).toBeInTheDocument();
    });

    test('renders team member profiles if provided', () => {
        const mockTeam = [
            { id: 1, name: 'Alice Smith', role: 'CEO' },
            { id: 2, name: 'Bob Johnson', role: 'CTO' }
        ];

        render(<About team={mockTeam} />);

        // Check team member names
        expect(screen.getByText('Alice Smith')).toBeInTheDocument();
        expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
    });
});
