/**
 * @file Login.test.jsx
 *
 * Requirements:
 * - Use Jest + React Testing Library.
 * - Render <Login />, simulate form input, test authService.login() call.
 * - Check redirect or error handling.
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// MemoryRouter or a mock for react-router-dom is needed for testing navigation
import { MemoryRouter } from 'react-router-dom';

// Mock the authService to avoid real API calls
import * as authService from '../../services/authService';
jest.mock('../../services/authService');

// Mock useNavigate from react-router-dom
jest.mock('react-router-dom', () => {
  const original = jest.requireActual('react-router-dom');
  return {
    ...original,
    useNavigate: () => jest.fn(),
  };
});

import Login from '../../pages/Login';

describe('Login Page', () => {
  let navigateMock;

  beforeEach(() => {
    // Reset mocks before each test
    authService.login.mockReset();

    // In the actual component, we call `useNavigate()`
    // We'll store that mock here to check calls
    navigateMock = jest.fn();
    // We can override the mock implemented above if needed
    jest.mock('react-router-dom', () => {
      const original = jest.requireActual('react-router-dom');
      return {
        ...original,
        useNavigate: () => navigateMock,
      };
    });
  });

  it('renders the login form', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Check for presence of email/password inputs and the submit button
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('calls authService.login on form submit and navigates on success', async () => {
    // Mock a successful login
    authService.login.mockResolvedValueOnce('fake-jwt-token');

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Fill out the form
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, 'SuperSecret!');
    userEvent.click(submitButton);

    // Wait for the login call to finish
    await waitFor(() => {
      expect(authService.login).toHaveBeenCalledTimes(1);
      expect(authService.login).toHaveBeenCalledWith('test@example.com', 'SuperSecret!');
    });

    // Verify that navigation is called with "/dashboard"
    expect(navigateMock).toHaveBeenCalledWith('/dashboard');
  });

  it('shows an error message if login fails', async () => {
    // Mock a failed login
    authService.login.mockRejectedValueOnce(new Error('Invalid credentials'));

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Fill out the form
    userEvent.type(screen.getByLabelText(/email/i), 'baduser@example.com');
    userEvent.type(screen.getByLabelText(/password/i), 'WrongPassword');
    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Wait for the error to be displayed
    await waitFor(() => {
      expect(authService.login).toHaveBeenCalledTimes(1);
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });

  it('shows an error if email or password is empty', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Leave inputs blank
    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    // An error message should appear without calling authService.login
    await waitFor(() => {
      expect(authService.login).not.toHaveBeenCalled();
      expect(screen.getByText(/please provide both email and password\./i)).toBeInTheDocument();
    });
  });
});
