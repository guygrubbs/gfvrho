import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TextField from '../../components/Form/TextField';

describe('TextField Component', () => {
  test('renders the TextField component with default props', () => {
    render(<TextField label="Username" name="username" />);
    const inputElement = screen.getByLabelText('Username');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveClass('border', 'rounded');
  });

  test('renders a placeholder when provided', () => {
    render(<TextField label="Email" name="email" placeholder="Enter your email" />);
    const inputElement = screen.getByPlaceholderText('Enter your email');
    expect(inputElement).toBeInTheDocument();
  });

  test('calls onChange when typing', () => {
    const TestComponent = () => {
      const [value, setValue] = useState('');
      return (
        <TextField
          label="Password"
          name="password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      );
    };

    render(<TestComponent />);
    const inputElement = screen.getByLabelText('Password');
    fireEvent.change(inputElement, { target: { value: 'secret123' } });
    expect(inputElement).toHaveValue('secret123');
  });

  test('renders as disabled when disabled prop is passed', () => {
    render(<TextField label="Disabled Field" name="disabledField" disabled />);
    const inputElement = screen.getByLabelText('Disabled Field');
    expect(inputElement).toBeDisabled();
  });

  test('displays an error message when error prop is provided', () => {
    render(<TextField label="Email" name="email" error="Invalid email address" />);
    const errorElement = screen.getByTestId('error-message');
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveClass('text-red-500');
    expect(errorElement).toHaveTextContent('Invalid email address');
  });
});
