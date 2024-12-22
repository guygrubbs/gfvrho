/**
 * reportService.js
 *
 * This service handles API calls related to generating and retrieving reports:
 * - requestReport(tier): Calls POST /api/report/create to request a new report.
 * - getReports(): Calls GET /api/report/all to fetch all reports for the current user.
 *
 * It integrates with the gfvrho submission form and VC dashboard pages, and
 * uses apiClient.js for HTTP calls.
 */

import apiClient from './apiClient';

/**
 * Requests the creation of a new report at a given tier.
 * Expects the backend to handle payment checks and LLM/PDF generation logic.
 *
 * @param {number} tier - The tier of the report (1, 2, or 3).
 * @return {Promise<object>} The newly created report object.
 * @throws {Error} If the request fails or the backend returns an error.
 */
export async function requestReport(tier) {
  try {
    const response = await apiClient.post('/api/report/create', { tier });
    return response.data; // Expected to be the newly created report
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error(error.message || 'Failed to request a new report.');
    }
  }
}

/**
 * Retrieves all reports for the authenticated user.
 *
 * @return {Promise<Array>} Array of report objects.
 * @throws {Error} If the request fails or the backend returns an error.
 */
export async function getReports() {
  try {
    const response = await apiClient.get('/api/report/all');
    return response.data; // Expected to be an array of reports
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error(error.message || 'Failed to fetch reports.');
    }
  }
}
