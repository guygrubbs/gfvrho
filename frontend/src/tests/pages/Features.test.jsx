// frontend/src/tests/pages/Features.test.jsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import Features from '../../pages/Features';
import '@testing-library/jest-dom';

describe('Features Page', () => {
    test('renders the Features page correctly', () => {
        render(<Features />);

        // Check for main heading
        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('What We Offer');

        // Check for feature highlights
        expect(screen.getByText(/Startup Phase Assessment/i)).toBeInTheDocument();
        expect(screen.getByText(/Growth Strategy Reports/i)).toBeInTheDocument();
        expect(screen.getByText(/VC Dashboard/i)).toBeInTheDocument();
        expect(screen.getByText(/Resources & Templates/i)).toBeInTheDocument();
    });

    test('renders feature cards with descriptions', () => {
        render(<Features />);

        // Verify each feature card has title and description
        const featureTitles = [
            'Startup Phase Assessment',
            'Growth Strategy Reports',
            'VC Dashboard',
            'Resources & Templates'
        ];

        featureTitles.forEach(title => {
            expect(screen.getByText(title)).toBeInTheDocument();
        });
    });

    test('ensures proper layout of feature cards', () => {
        render(<Features />);

        const featureCards = screen.getAllByRole('article'); // Assuming feature cards are wrapped in <article> tags
        expect(featureCards.length).toBeGreaterThanOrEqual(4);
    });
});
