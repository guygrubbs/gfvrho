"""
authController.py

This module defines the Flask controller for user authentication. It includes endpoints
for user signup, login, and optional logout. It delegates core logic to authService.py
and returns JSON responses following standard REST conventions.

Best Practices:
- Return consistent JSON structures for both success and error scenarios.
- Use appropriate HTTP status codes (201 for resource creation, 200 for success,
  400 or 401 for client errors, etc.).
- Avoid duplicating business logic handled in authService.py. This file should focus
  on request parsing, HTTP status codes, and JSON responses.

Usage:
    from flask import Blueprint
    from backend.src.controllers.authController import auth_bp
    app.register_blueprint(auth_bp, url_prefix="/auth")
"""

from flask import Blueprint, request, jsonify, make_response
from backend.src.services import authService

auth_bp = Blueprint("auth_bp", __name__)

@auth_bp.route("/signup", methods=["POST"])
def signup():
    """
    Registers a new user.
    Expects JSON data with fields: email, username, and password.
    Returns 201 on success, along with the newly created user (minus the password hash).
    Returns 400 if the email/username is already taken or if input validation fails.
    """
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid JSON payload"}), 400

    email = data.get("email")
    username = data.get("username")
    password = data.get("password")

    if not email or not username or not password:
        return jsonify({"error": "Missing required fields"}), 400

    try:
        new_user = authService.register_user(email, username, password)
        # Return the user info without the password hash
        return jsonify({
            "id": new_user.id,
            "email": new_user.email,
            "username": new_user.username
        }), 201
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@auth_bp.route("/login", methods=["POST"])
def login():
    """
    Logs in an existing user.
    Expects JSON data with fields: email and password.
    Returns 200 on success, with a JWT token in the response body.
    Returns 400 or 401 if authentication fails.
    """
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid JSON payload"}), 400

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Missing email or password"}), 400

    try:
        token = authService.login_user(email, password)
        return jsonify({"token": token}), 200
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@auth_bp.route("/logout", methods=["POST"])
def logout():
    """
    Example logout endpoint.
    In a stateless JWT scenario, logout often requires token blacklisting
    or client-side token removal. This is a placeholder that can be expanded.

    Returns 200 to indicate the logout request was processed.
    """
    # In a stateless JWT environment, the client typically discards the token.
    # If using server-side session management, you might clear session data here.
    return make_response(jsonify({"message": "Logged out successfully"}), 200)
