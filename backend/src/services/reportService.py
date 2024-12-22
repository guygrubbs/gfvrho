"""
reportService.py

This module provides business logic for creating and retrieving reports.
It interacts with:
- llmService.py to generate report content
- pdfGenerator.py to produce a PDF
- paymentService.py to verify if the user has paid for the requested tier

Best Practices:
- Keep this module focused on the workflow of creating/retrieving reports without duplicating logic
  from other services (LLM, payment, or database).
- Integrate with dbClient.py for database operations and models for schema definitions.
"""

from sqlalchemy.orm import Session
from backend.src.db.dbClient import get_db_session
from backend.src.models.Report import Report
from backend.src.services import llmService, paymentService
from backend.src.utils import pdfGenerator

def create_report(user_id: int, tier: int) -> Report:
    """
    Creates a new report for a user. The workflow:
    1. Verify payment for the requested tier (paymentService).
    2. Generate report content with llmService.
    3. Generate a PDF using pdfGenerator.
    4. Save the new report record (with PDF URL) to the database.
    
    :param user_id: The ID of the user requesting the report.
    :param tier: An integer specifying the report tier (1, 2, 3).
    :return: The newly created Report object.
    :raises ValueError: If the payment is not verified.
    """
    # 1. Check payment status.
    if not paymentService.verify_payment(user_id, tier):
        raise ValueError("Payment not verified for the requested tier.")

    # 2. Generate report content using the LLM service.
    # In a real scenario, you might pass additional user or market data to the LLM.
    report_content = llmService.generate_report_content(tier, userData={}, marketData={})

    # 3. Generate a PDF (the function returns the URL or path to the uploaded PDF).
    pdf_url = pdfGenerator.generate_pdf(
        content=report_content,
        watermark_text=f"gfvrho Tier {tier} Report"
    )

    db: Session
    with get_db_session() as db:
        # 4. Save the new report record to the database.
        new_report = Report(
            user_id=user_id,
            tier=tier,
            pdf_url=pdf_url,
            payment_status="PAID"  # We assume verification means it's paid
        )
        db.add(new_report)
        db.commit()
        db.refresh(new_report)

        return new_report

def get_report_by_id(report_id: int) -> Report:
    """
    Retrieves a specific report by its ID.
    
    :param report_id: The ID of the report to retrieve.
    :return: The Report object if found, else None.
    """
    db: Session
    with get_db_session() as db:
        report = db.query(Report).filter(Report.id == report_id).first()
        return report

def get_reports_for_user(user_id: int) -> list:
    """
    Retrieves all reports created by a specific user.
    
    :param user_id: The ID of the user.
    :return: A list of Report objects for the given user.
    """
    db: Session
    with get_db_session() as db:
        reports = db.query(Report).filter(Report.user_id == user_id).all()
        return reports
