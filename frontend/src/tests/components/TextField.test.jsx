// frontend/src/tests/components/TextField.test.jsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TextField from '../../components/Form/TextField';

describe('TextField Component', () => {
  test('renders the TextField component with default props', () => {
    render(<TextField label="Username" />);
    const inputElement = screen.getByLabelText('Username');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveClass('border', 'rounded-md');
  });

  test('renders a placeholder when provided', () => {
    render(<TextField label="Email" placeholder="Enter your email" />);
    const inputElement = screen.getByPlaceholderText('Enter your email');
    expect(inputElement).toBeInTheDocument();
  });

  test('calls onChange when typing', () => {
    const handleChange = jest.fn();
    render(<TextField label="Password" onChange={handleChange} />);
    const inputElement = screen.getByLabelText('Password');
    fireEvent.change(inputElement, { target: { value: 'secret123' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(inputElement.value).toBe('secret123');
  });

  test('renders as disabled when disabled prop is passed', () => {
    render(<TextField label="Disabled Field" disabled />);
    const inputElement = screen.getByLabelText('Disabled Field');
    expect(inputElement).toBeDisabled();
  });

  test('displays an error message when error prop is provided', () => {
    render(<TextField label="Email" error="Invalid email address" />);
    const errorElement = screen.getByText('Invalid email address');
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveClass('text-red-500');
  });
});
