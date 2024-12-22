"""
errorMiddleware.py

This file provides a global error-handling mechanism for the Flask application.
It registers custom error handlers for common HTTP errors (like 404) and for
unexpected exceptions. Each handler returns a JSON response indicating the error.

Best Practices:
1. Return consistent JSON structures for errors across the application.
2. Log errors in production to detect and troubleshoot issues (e.g., using a logging framework).
3. Avoid exposing sensitive debug info in production responses.
"""

from flask import jsonify

def register_error_handlers(app):
    """
    Registers global error handlers on the provided Flask app.
    Call this function in server.py (or wherever the Flask app is initialized).

    Example usage:
        from backend.src.middlewares.errorMiddleware import register_error_handlers
        app = Flask(__name__)
        register_error_handlers(app)
    """

    @app.errorhandler(404)
    def not_found_handler(e):
        """
        Handle 404 Not Found errors globally, returning JSON instead of HTML.
        """
        return jsonify({"error": "Resource not found"}), 404

    @app.errorhandler(403)
    def forbidden_handler(e):
        """
        Handle 403 Forbidden errors globally, returning JSON.
        """
        return jsonify({"error": "Forbidden"}), 403

    @app.errorhandler(401)
    def unauthorized_handler(e):
        """
        Handle 401 Unauthorized errors globally, returning JSON.
        """
        return jsonify({"error": "Unauthorized"}), 401

    @app.errorhandler(500)
    def internal_server_error_handler(e):
        """
        Handle unexpected 500 Internal Server Errors globally.
        """
        return jsonify({"error": "An unexpected error occurred"}), 500

    @app.errorhandler(Exception)
    def generic_exception_handler(e):
        """
        A catch-all for any uncaught exception.
        In production, you might want to separate 500 from other exceptions,
        or log them differently for debugging.
        """
        return jsonify({"error": str(e)}), 500
