"""
reportController.py

This module defines the Flask controller for user reports. It provides endpoints
to create a new report and retrieve existing reports. It delegates the core logic
to reportService.py and ensures the user is authenticated (and, implicitly, that
payment status is verified for paid tiers).

Best Practices:
- Return consistent JSON structures for both success and error scenarios.
- Use appropriate HTTP status codes.
- Keep controller logic simple, focusing on request/response handling. 
  Let reportService handle business logic.
"""

from flask import Blueprint, request, jsonify
from backend.src.services import reportService
from backend.src.middlewares.authMiddleware import token_required  # Example import if needed

report_bp = Blueprint("report_bp", __name__)

@report_bp.route("/create", methods=["POST"])
@token_required  # Example: if you have a decorator that enforces auth, attach it here
def create_report(current_user):
    """
    Creates a new report for the authenticated user.

    Expects JSON data with:
        {
            "tier": 2  // or 3, for example
        }

    Steps:
    1. Validate the request data (tier).
    2. Call reportService.create_report with current_user.id and tier.
    3. Return the created report as JSON.

    If payment verification fails (handled inside the service), raise an error.
    Return 201 if created successfully.
    """
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid JSON payload"}), 400

    tier = data.get("tier")
    if not tier:
        return jsonify({"error": "Missing 'tier' in request payload"}), 400

    try:
        new_report = reportService.create_report(user_id=current_user.id, tier=tier)
        return jsonify({
            "id": new_report.id,
            "tier": new_report.tier,
            "pdf_url": new_report.pdf_url,
            "created_at": str(new_report.created_at),  # Convert datetime to string
            "payment_status": new_report.payment_status
        }), 201
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@report_bp.route("/<int:report_id>", methods=["GET"])
@token_required  # Example: enforce auth
def get_report(current_user, report_id):
    """
    Retrieves a specific report by its ID.
    Ensures that the report belongs to the authenticated user or that
    the user is allowed to view it.

    Returns 404 if the report does not exist or if the user is not authorized.
    """
    try:
        report = reportService.get_report_by_id(report_id)
        if not report:
            return jsonify({"error": "Report not found"}), 404

        if report.user_id != current_user.id:
            return jsonify({"error": "Unauthorized access to this report"}), 403

        return jsonify({
            "id": report.id,
            "tier": report.tier,
            "pdf_url": report.pdf_url,
            "created_at": str(report.created_at),
            "payment_status": report.payment_status
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@report_bp.route("/all", methods=["GET"])
@token_required
def get_all_reports(current_user):
    """
    Retrieves all reports for the authenticated user.
    Returns 200 with a list of report objects if found, or an empty list otherwise.
    """
    try:
        reports = reportService.get_reports_for_user(user_id=current_user.id)
        results = []
        for r in reports:
            results.append({
                "id": r.id,
                "tier": r.tier,
                "pdf_url": r.pdf_url,
                "created_at": str(r.created_at),
                "payment_status": r.payment_status
            })
        return jsonify(results), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
