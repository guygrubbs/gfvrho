"""
reportRoutes.py

This file registers routes for user reports by attaching the blueprint
defined in reportController.py. It does not contain any direct business logic
or JSON responses, relying entirely on the controller for handling requests.
"""

from backend.src.controllers.reportController import report_bp

def register_report_routes(app):
    """
    Registers the report_bp blueprint under the '/report' prefix.
    """
    app.register_blueprint(report_bp, url_prefix="/report")
