# backend/src/controllers/userController.py

from flask import Blueprint, request, jsonify
from services.userService import get_user_profile, update_user_profile
from middlewares.authMiddleware import auth_required

# Create a Blueprint for user routes
user_bp = Blueprint('user', __name__, url_prefix='/api/user')


@user_bp.route('/profile', methods=['GET'])
@auth_required
def get_profile(current_user):
    """
    Get user profile details.
    """
    try:
        user_profile = get_user_profile(current_user.id)
        return jsonify({
            "status": "success",
            "data": user_profile
        }), 200
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


@user_bp.route('/profile', methods=['PUT'])
@auth_required
def update_profile(current_user):
    """
    Update user profile details.
    """
    try:
        data = request.get_json()
        updated_profile = update_user_profile(current_user.id, data)
        return jsonify({
            "status": "success",
            "data": updated_profile
        }), 200
    except ValueError as ve:
        return jsonify({
            "status": "error",
            "message": str(ve)
        }), 400
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": "Failed to update profile"
        }), 500


@user_bp.route('/health', methods=['GET'])
def health_check():
    """
    Health check endpoint for user controller.
    """
    return jsonify({
        "status": "success",
        "message": "User controller is operational"
    }), 200
