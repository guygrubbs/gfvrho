// frontend/src/tests/pages/Login.test.jsx

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../../pages/Login';
import AuthContext from '../../context/AuthContext';

describe('Login Page Tests', () => {
    let mockLogin;

    beforeEach(() => {
        mockLogin = jest.fn();
    });

    const renderLoginPage = () => {
        render(
            <AuthContext.Provider value={{ login: mockLogin, isAuthenticated: false }}>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </AuthContext.Provider>
        );
    };

    test('renders login page with necessary fields and button', () => {
        renderLoginPage();

        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    test('displays error on empty form submission', async () => {
        renderLoginPage();

        const loginButton = screen.getByRole('button', { name: /login/i });
        fireEvent.click(loginButton);

        expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
        expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
    });

    test('calls login function with valid credentials', async () => {
        renderLoginPage();

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);
        const loginButton = screen.getByRole('button', { name: /login/i });

        fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith('user@example.com', 'password123');
        });
    });

    test('displays error on invalid credentials', async () => {
        mockLogin.mockRejectedValueOnce(new Error('Invalid credentials'));
        renderLoginPage();

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);
        const loginButton = screen.getByRole('button', { name: /login/i });

        fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
        fireEvent.click(loginButton);

        expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument();
    });

    test('redirects user to dashboard on successful login', async () => {
        mockLogin.mockResolvedValueOnce();
        const mockNavigate = jest.fn();

        jest.mock('react-router-dom', () => ({
            ...jest.requireActual('react-router-dom'),
            useNavigate: () => mockNavigate,
        }));

        renderLoginPage();

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);
        const loginButton = screen.getByRole('button', { name: /login/i });

        fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
        });
    });

    test('disables login button during API request', async () => {
        mockLogin.mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 1000)));
        renderLoginPage();

        const loginButton = screen.getByRole('button', { name: /login/i });
        expect(loginButton).not.toBeDisabled();

        fireEvent.click(loginButton);
        expect(loginButton).toBeDisabled();
    });
});
