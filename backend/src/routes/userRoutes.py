"""
userRoutes.py

This file registers routes for user-specific endpoints (e.g., profile updates),
attaching the blueprint defined in userController.py. It does not contain any 
direct business logic or JSON responses, relying entirely on the controller.
"""

# If you have a userController, import the blueprint here
# from backend.src.controllers.userController import user_bp

def register_user_routes(app):
    """
    Registers the user_bp blueprint under the '/user' prefix.

    NOTE: If you have not yet created a userController.py or user_bp,
    you'll need to implement those before calling this function.
    """
    # Example usage:
    # app.register_blueprint(user_bp, url_prefix="/user")

    pass  # Placeholder until userController is defined
