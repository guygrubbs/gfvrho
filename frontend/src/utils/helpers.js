// frontend/src/utils/helpers.js

/**
 * Utility helper functions for the frontend application.
 * Centralizes reusable logic such as formatting and parsing utilities.
 */

/**
 * Format a date into a readable string.
 * @param {string|Date} date - The date to format.
 * @returns {string} Formatted date string (e.g., "January 1, 2024").
 */
export const formatDate = (date) => {
    if (!date) return '';
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) return '';
    return parsedDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  /**
   * Capitalize the first letter of a string.
   * @param {string} str - The string to capitalize.
   * @returns {string} String with the first letter capitalized.
   */
  export const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  /**
   * Truncate a string to a specified length and add an ellipsis.
   * @param {string} str - The string to truncate.
   * @param {number} length - Maximum length of the string.
   * @returns {string} Truncated string with ellipsis if necessary.
   */
  export const truncate = (str, length = 100) => {
    if (!str || str.length <= length) return str;
    return str.substring(0, length) + '...';
  };
  
  /**
   * Parse a query string into an object.
   * @param {string} queryString - The query string to parse (e.g., "?key=value").
   * @returns {object} Parsed query string as an object.
   */
  export const parseQueryString = (queryString) => {
    if (!queryString) return {};
    return Object.fromEntries(new URLSearchParams(queryString));
  };
  
  /**
   * Validate if an email address is in a valid format.
   * @param {string} email - The email address to validate.
   * @returns {boolean} True if valid, false otherwise.
   */
  export const isValidEmail = (email) => {
    if (!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  /**
   * Generate a random unique identifier (UUID v4).
   * @returns {string} A UUID string.
   */
  export const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };
  
  /**
   * Debounce a function to prevent excessive calls.
   * @param {function} func - The function to debounce.
   * @param {number} delay - Delay time in milliseconds.
   * @returns {function} Debounced function.
   */
  export const debounce = (func, delay = 300) => {
    let timerId;
    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => func(...args), delay);
    };
  };
  
  /**
   * Convert a number to a currency string.
   * @param {number} amount - The amount to format.
   * @param {string} currency - The currency code (e.g., 'USD').
   * @returns {string} Formatted currency string.
   */
  export const formatCurrency = (amount, currency = 'USD') => {
    if (typeof amount !== 'number') return '';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount);
  };
  