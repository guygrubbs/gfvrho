// frontend/src/tests/services/authService.test.js

import axios from 'axios';
import authService from '../../services/authService';

// Mock Axios
jest.mock('axios');

describe('authService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('login() sends credentials and returns a token on success', async () => {
    const mockResponse = {
      data: { token: 'mocked-token' },
    };

    axios.post.mockResolvedValue(mockResponse);

    const result = await authService.login('test@example.com', 'password123');

    expect(axios.post).toHaveBeenCalledWith('/api/auth/login', {
      email: 'test@example.com',
      password: 'password123',
    });
    expect(result).toEqual('mocked-token');
  });

  test('login() throws an error on failure', async () => {
    axios.post.mockRejectedValue(new Error('Invalid credentials'));

    await expect(authService.login('wrong@example.com', 'wrongpassword')).rejects.toThrow(
      'Invalid credentials'
    );
    expect(axios.post).toHaveBeenCalledWith('/api/auth/login', {
      email: 'wrong@example.com',
      password: 'wrongpassword',
    });
  });

  test('logout() removes token from localStorage', () => {
    localStorage.setItem('token', 'mocked-token');
    authService.logout();
    expect(localStorage.getItem('token')).toBeNull();
  });

  test('isAuthenticated() returns true if token exists', () => {
    localStorage.setItem('token', 'mocked-token');
    expect(authService.isAuthenticated()).toBe(true);
  });

  test('isAuthenticated() returns false if token does not exist', () => {
    localStorage.removeItem('token');
    expect(authService.isAuthenticated()).toBe(false);
  });
});
