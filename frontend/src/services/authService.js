/**
 * authService.js
 *
 * This service handles user authentication flows for gfvrho. It uses the
 * apiClient.js for HTTP requests and processes any tokens or error responses
 * from the backend.
 *
 * Requirements:
 * - login(email, password): Calls /api/auth/login to authenticate.
 * - On success, can store the JWT or token if needed.
 * - On error, throw an appropriate error message.
 */

import apiClient from './apiClient';

/**
 * Attempts to log in a user with the given email and password.
 * On success, returns a token or any relevant data from the server.
 * On error, throws an error for the caller to handle.
 *
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @throws {Error} On invalid credentials or network issues.
 */
export async function login(email, password) {
  try {
    const response = await apiClient.post('/api/auth/login', { email, password });
    if (response && response.data) {
      // For example, if the server returns { token: '...' } in response.data
      const { token } = response.data;
      // Optionally store the token in localStorage or any other storage.
      localStorage.setItem('gfvrho_token', token);
      return token;
    } else {
      throw new Error('Login failed: Invalid response from server.');
    }
  } catch (error) {
    // The error could be a network error or a 4xx/5xx response from the server.
    // Decide whether to throw a custom error message based on error.response or error.message.
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error(error.message || 'An error occurred during login.');
    }
  }
}
