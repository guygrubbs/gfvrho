// frontend/src/tests/components/Button.test.jsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '../../components/Button/Button';

describe('Button Component', () => {
  test('renders the Button component with default props', () => {
    render(<Button>Click Me</Button>);
    const buttonElement = screen.getByRole('button', { name: /Click Me/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('px-4', 'py-2', 'bg-[#00A676]', 'text-white');
  });

  test('renders a primary button with correct styles', () => {
    render(<Button variant="primary">Primary Button</Button>);
    const buttonElement = screen.getByRole('button', { name: /Primary Button/i });
    expect(buttonElement).toHaveClass('bg-[#00A676]', 'text-white');
  });

  test('renders a secondary button with correct styles', () => {
    render(<Button variant="secondary">Secondary Button</Button>);
    const buttonElement = screen.getByRole('button', { name: /Secondary Button/i });
    expect(buttonElement).toHaveClass('bg-[#003366]', 'text-white');
  });

  test('renders a light button with correct styles', () => {
    render(<Button variant="light">Light Button</Button>);
    const buttonElement = screen.getByRole('button', { name: /Light Button/i });
    expect(buttonElement).toHaveClass('bg-[#EFEFEF]', 'text-[#003366]');
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    const buttonElement = screen.getByRole('button', { name: /Click Me/i });
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('disables the button when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);
    const buttonElement = screen.getByRole('button', { name: /Disabled Button/i });
    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveClass('opacity-50', 'cursor-not-allowed');
  });

  test('applies inline style correctly', () => {
    render(<Button>Styled Button</Button>);
    const buttonElement = screen.getByRole('button', { name: /Styled Button/i });
    expect(buttonElement).toHaveStyle('font-family: Open Sans');
  });
});
