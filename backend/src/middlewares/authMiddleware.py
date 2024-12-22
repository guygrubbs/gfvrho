"""
authMiddleware.py

This file provides middleware logic for verifying OAuth tokens (or JWTs) on protected routes.
It defines a decorator function, token_required, that can be applied to any Flask route
to enforce authentication.

Best Practices:
1. Store and retrieve secret keys or OAuth credentials from a secure location (e.g., AWS SSM or Secrets Manager).
2. Provide clear error messages and status codes when tokens are missing or invalid.
3. Avoid duplicating database or token logic here. Use a service or utility to validate/parse tokens if needed.
"""

import os
import jwt
from functools import wraps
from flask import request, jsonify
from backend.src.db.dbClient import get_db_session
from backend.src.models.User import User

JWT_SECRET = os.environ.get("GFVRHO_JWT_SECRET", "CHANGE_ME")
JWT_ALGORITHM = os.environ.get("GFVRHO_JWT_ALGORITHM", "HS256")

def token_required(f):
    """
    A decorator to protect Flask endpoints by requiring a valid token.
    Usage:
        @token_required
        def protected_route(current_user, ...):
            # Route logic

    The 'current_user' argument is injected automatically if the token is valid.
    """
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get('Authorization', None)
        if not auth_header:
            return jsonify({"error": "Authorization header is missing"}), 401

        # Typical format is "Bearer <token>"
        parts = auth_header.split()
        if len(parts) != 2 or parts[0].lower() != "bearer":
            return jsonify({"error": "Invalid Authorization header format"}), 401

        token = parts[1]

        try:
            # Decode the token. Raises exceptions if invalid or expired.
            payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
            user_id = payload.get("user_id")

            # Fetch the user from the database. If user not found, deny access.
            with get_db_session() as db:
                user = db.query(User).filter(User.id == user_id).first()
                if not user:
                    return jsonify({"error": "User does not exist"}), 401

            # Pass the user to the endpoint as the first argument
            return f(user, *args, **kwargs)
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token has expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token"}), 401
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    return decorated
