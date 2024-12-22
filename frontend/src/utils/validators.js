// frontend/src/utils/validators.js

/**
 * Input validation utilities for the frontend application.
 * Provides reusable functions for common validation scenarios.
 */

/**
 * Validate if an email address is in a valid format.
 * @param {string} email - The email address to validate.
 * @returns {boolean} True if the email is valid, false otherwise.
 */
export const isValidEmail = (email) => {
    if (!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  /**
   * Validate if a password meets security requirements.
   * @param {string} password - The password to validate.
   * @returns {boolean} True if the password is strong, false otherwise.
   */
  export const isValidPassword = (password) => {
    if (!password) return false;
    // At least 8 characters, one uppercase, one lowercase, one number, and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };
  
  /**
   * Validate if a text input meets a minimum length requirement.
   * @param {string} text - The text to validate.
   * @param {number} minLength - Minimum required length.
   * @returns {boolean} True if the text meets the minimum length, false otherwise.
   */
  export const isValidText = (text, minLength = 1) => {
    if (!text) return false;
    return text.trim().length >= minLength;
  };
  
  /**
   * Validate if a field is non-empty.
   * @param {string|number} value - The value to validate.
   * @returns {boolean} True if the value is not empty, false otherwise.
   */
  export const isNotEmpty = (value) => {
    return value !== undefined && value !== null && value.toString().trim() !== '';
  };
  
  /**
   * Validate if a number is within a specified range.
   * @param {number} number - The number to validate.
   * @param {number} min - Minimum value.
   * @param {number} max - Maximum value.
   * @returns {boolean} True if the number is within the range, false otherwise.
   */
  export const isNumberInRange = (number, min, max) => {
    if (typeof number !== 'number') return false;
    return number >= min && number <= max;
  };
  
  /**
   * Validate if a phone number is in a valid format.
   * @param {string} phone - The phone number to validate.
   * @returns {boolean} True if the phone number is valid, false otherwise.
   */
  export const isValidPhoneNumber = (phone) => {
    if (!phone) return false;
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone);
  };
  
  /**
   * Validate if a URL is valid.
   * @param {string} url - The URL to validate.
   * @returns {boolean} True if the URL is valid, false otherwise.
   */
  export const isValidURL = (url) => {
    if (!url) return false;
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };
  