"""
externalAPIsService.py

This module contains functions for calling external APIs such as LinkedIn, Crunchbase,
and Carta. Each function is responsible for:
- Sending the request with proper headers/credentials.
- Parsing the response.
- Handling rate limits and errors gracefully.

Best Practices:
1. Store API credentials and keys securely (e.g., AWS SSM Parameter Store, Secrets Manager),
   and retrieve them at runtime rather than hardcoding them.
2. Wrap calls in try/except blocks to handle network or service errors and apply appropriate
   retry or backoff strategies for rate limits.
3. Return simple, structured data (e.g., dictionaries, lists) to the caller, leaving display
   logic to higher layers.
4. Log or raise detailed exceptions but avoid exposing sensitive data in error messages.
"""

import os
import requests
import time
import logging

# Example environment variables for API keys or tokens:
LINKEDIN_API_KEY = os.environ.get("GFVRHO_LINKEDIN_API_KEY", "CHANGE_ME")
CRUNCHBASE_API_KEY = os.environ.get("GFVRHO_CRUNCHBASE_API_KEY", "CHANGE_ME")
CARTA_API_KEY = os.environ.get("GFVRHO_CARTA_API_KEY", "CHANGE_ME")

# Optional: Could define a basic exponential backoff function for rate limit handling
def exponential_backoff(retry_count):
    """
    Simple exponential backoff formula: 2^retry_count seconds, up to a reasonable limit.
    """
    delay = min(2 ** retry_count, 60)  # Cap at 60 seconds
    time.sleep(delay)

def call_linkedin_api(company_name: str) -> dict:
    """
    Calls LinkedIn's API to gather data about a particular company.

    :param company_name: The name of the company to look up.
    :return: A dictionary containing parsed LinkedIn data.
    :raises Exception: If the request fails or if LinkedIn's API returns an error.
    """
    # Placeholder endpoint and logic for demonstration. Adjust to LinkedIn's actual APIs.
    endpoint = f"https://api.linkedin.com/v2/organization?name={company_name}"
    headers = {
        "Authorization": f"Bearer {LINKEDIN_API_KEY}",
        "Accept": "application/json"
    }

    retry_count = 0
    while retry_count < 3:
        try:
            response = requests.get(endpoint, headers=headers, timeout=10)
            if response.status_code == 200:
                data = response.json()
                # Parse the data as needed. For now, return the entire JSON as a dictionary.
                return data
            elif response.status_code == 429:
                # Handle rate limiting
                logging.warning("LinkedIn API rate limit reached. Applying backoff.")
                exponential_backoff(retry_count)
                retry_count += 1
            else:
                # Non-recoverable error
                error_message = f"LinkedIn API returned status code {response.status_code}: {response.text}"
                raise Exception(error_message)
        except requests.RequestException as e:
            # Network or other error
            logging.error(f"LinkedIn API call failed: {str(e)}")
            exponential_backoff(retry_count)
            retry_count += 1

    raise Exception("Failed to call LinkedIn API after multiple attempts.")

def call_crunchbase_api(company_name: str) -> dict:
    """
    Calls Crunchbase's API to gather data about a particular company.

    :param company_name: The name of the company to look up.
    :return: A dictionary containing parsed Crunchbase data.
    :raises Exception: If the request fails or if Crunchbase's API returns an error.
    """
    # Placeholder endpoint and logic for demonstration. Adjust to Crunchbase's actual APIs.
    endpoint = f"https://api.crunchbase.com/v3.1/organizations?name={company_name}"
    headers = {
        "X-CB-User-Key": CRUNCHBASE_API_KEY,
        "Accept": "application/json"
    }

    retry_count = 0
    while retry_count < 3:
        try:
            response = requests.get(endpoint, headers=headers, timeout=10)
            if response.status_code == 200:
                data = response.json()
                return data
            elif response.status_code == 429:
                # Handle rate limiting
                logging.warning("Crunchbase API rate limit reached. Applying backoff.")
                exponential_backoff(retry_count)
                retry_count += 1
            else:
                error_message = f"Crunchbase API returned status code {response.status_code}: {response.text}"
                raise Exception(error_message)
        except requests.RequestException as e:
            logging.error(f"Crunchbase API call failed: {str(e)}")
            exponential_backoff(retry_count)
            retry_count += 1

    raise Exception("Failed to call Crunchbase API after multiple attempts.")

def call_carta_api(company_name: str) -> dict:
    """
    Calls Carta's API to gather data related to a particular company's cap table
    or investment readiness.

    :param company_name: The name of the company to look up.
    :return: A dictionary containing parsed Carta data.
    :raises Exception: If the request fails or if Carta's API returns an error.
    """
    # Placeholder endpoint. Replace with Carta's real endpoint or integration.
    endpoint = f"https://api.carta.com/v1/company?name={company_name}"
    headers = {
        "Authorization": f"Bearer {CARTA_API_KEY}",
        "Accept": "application/json"
    }

    retry_count = 0
    while retry_count < 3:
        try:
            response = requests.get(endpoint, headers=headers, timeout=10)
            if response.status_code == 200:
                data = response.json()
                return data
            elif response.status_code == 429:
                logging.warning("Carta API rate limit reached. Applying backoff.")
                exponential_backoff(retry_count)
                retry_count += 1
            else:
                error_message = f"Carta API returned status code {response.status_code}: {response.text}"
                raise Exception(error_message)
        except requests.RequestException as e:
            logging.error(f"Carta API call failed: {str(e)}")
            exponential_backoff(retry_count)
            retry_count += 1

    raise Exception("Failed to call Carta API after multiple attempts.")
