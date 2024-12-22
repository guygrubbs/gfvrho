"""
authRoutes.py

This file registers routes for user authentication by attaching the blueprint
defined in authController.py. It does not contain any direct business logic or
JSON responses, relying entirely on the controller for handling requests.
"""

from backend.src.controllers.authController import auth_bp

def register_auth_routes(app):
    """
    Registers the auth_bp blueprint under the '/auth' prefix.
    """
    app.register_blueprint(auth_bp, url_prefix="/auth")
