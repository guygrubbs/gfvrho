# backend/src/utils/errorHandler.py

"""
Description:
Ensure consistent error handling across backend services.

Requirements:
- Standardize error responses.
- Ensure HTTP status codes are accurate.

Integration:
- Validate integration with `authController`, `reportController`, and `userController`.
- Ensure unhandled errors are logged properly.
"""

import logging
from flask import jsonify
from werkzeug.exceptions import HTTPException

# Initialize Logger
logger = logging.getLogger(__name__)


class ApiError(Exception):
    """
    Custom API Exception class for controlled error handling.
    """
    def __init__(self, message, status_code=400):
        super().__init__(message)
        self.message = message
        self.status_code = status_code


def handle_api_error(error):
    """
    Handles custom ApiError exceptions.
    """
    logger.error(f"API Error: {error.message}")
    response = {
        "error": {
            "message": error.message,
            "status_code": error.status_code
        }
    }
    return jsonify(response), error.status_code


def handle_http_exception(error):
    """
    Handles standard HTTP exceptions.
    """
    logger.error(f"HTTP Exception: {error.description}")
    response = {
        "error": {
            "message": error.description,
            "status_code": error.code
        }
    }
    return jsonify(response), error.code


def handle_unexpected_exception(error):
    """
    Handles unexpected exceptions (500 Internal Server Error).
    """
    logger.exception("Unexpected Server Error")
    response = {
        "error": {
            "message": "An unexpected error occurred. Please try again later.",
            "status_code": 500
        }
    }
    return jsonify(response), 500


# Integration with Flask app
def register_error_handlers(app):
    """
    Register error handlers with the Flask application.
    """
    app.register_error_handler(ApiError, handle_api_error)
    app.register_error_handler(HTTPException, handle_http_exception)
    app.register_error_handler(Exception, handle_unexpected_exception)
