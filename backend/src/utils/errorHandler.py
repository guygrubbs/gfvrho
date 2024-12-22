# backend/src/utils/errorHandler.py

from flask import jsonify
from werkzeug.exceptions import HTTPException


class APIError(Exception):
    """Custom exception for API-related errors."""
    def __init__(self, message, status_code=400):
        super().__init__(message)
        self.message = message
        self.status_code = status_code


def handle_api_error(error):
    """
    Handle custom APIError exceptions.
    """
    response = {
        "error": error.message,
        "status_code": error.status_code
    }
    return jsonify(response), error.status_code


def handle_http_exception(error: HTTPException):
    """
    Handle standard HTTP exceptions from Werkzeug.
    """
    response = {
        "error": error.description,
        "status_code": error.code
    }
    return jsonify(response), error.code


def handle_generic_exception(error):
    """
    Handle all other unhandled exceptions.
    """
    response = {
        "error": "An unexpected error occurred.",
        "details": str(error),
        "status_code": 500
    }
    return jsonify(response), 500


def register_error_handlers(app):
    """
    Register error handlers with the Flask app.
    """
    app.register_error_handler(APIError, handle_api_error)
    app.register_error_handler(HTTPException, handle_http_exception)
    app.register_error_handler(Exception, handle_generic_exception)
