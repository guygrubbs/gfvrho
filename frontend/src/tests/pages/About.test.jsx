// src/tests/pages/About.test.jsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../../pages/About';
import '@testing-library/jest-dom'; // Ensure Jest matchers are available

// Mock teamData
jest.mock('../../data/teamData', () => [
    {
        id: 1,
        name: 'Test User 1',
        role: 'Developer',
        bio: 'Test bio for user 1.',
        image: '/images/test1.jpg',
    },
    {
        id: 2,
        name: 'Test User 2',
        role: 'Designer',
        bio: 'Test bio for user 2.',
        image: '/images/test2.jpg',
    },
    {
        id: 3,
        name: 'Test User 3',
        role: 'Analyst',
        bio: 'Test bio for user 3.',
        image: null, // Missing image
    },
]);

describe('About Page', () => {
    test('renders About page title and description', () => {
        render(<About />);

        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('About Us');
        expect(screen.getByText(/Welcome to our platform!/i)).toBeInTheDocument();
    });

    test('renders team section title', () => {
        render(<About />);

        expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Meet Our Team');
    });

    test('displays all team members', () => {
        render(<About />);

        expect(screen.getByText('Test User 1')).toBeInTheDocument();
        expect(screen.getByText('Developer')).toBeInTheDocument();
        expect(screen.getByText('Test bio for user 1.')).toBeInTheDocument();

        expect(screen.getByText('Test User 2')).toBeInTheDocument();
        expect(screen.getByText('Designer')).toBeInTheDocument();
        expect(screen.getByText('Test bio for user 2.')).toBeInTheDocument();

        expect(screen.getByText('Test User 3')).toBeInTheDocument();
        expect(screen.getByText('Analyst')).toBeInTheDocument();
        expect(screen.getByText('Test bio for user 3.')).toBeInTheDocument();
    });

    test('renders default image for team member if image is missing', () => {
        render(<About />);

        const imageElement = screen.getByAltText('Test User 3');
        expect(imageElement).toHaveAttribute('src', '/default-avatar.png');
    });
});
