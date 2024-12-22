# backend/src/tests/services/reportService.test.py

import pytest
from unittest.mock import patch, MagicMock
from services.reportService import create_report, get_report
from models.Report import Report
from db.dbConfig import SessionLocal
from datetime import datetime


# Fixture for database session
@pytest.fixture
def db_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.rollback()
        session.close()


# Test: Report Creation Success
@patch("services.reportService.llmService.generate_report_content")
@patch("services.reportService.pdfGenerator.generate_pdf")
@patch("services.reportService.upload_to_s3")
def test_create_report_success(mock_upload_to_s3, mock_generate_pdf, mock_generate_report_content, db_session):
    """
    Test successful report creation.
    """
    # Mock dependencies
    mock_generate_report_content.return_value = "Generated report content"
    mock_generate_pdf.return_value = "/tmp/report.pdf"
    mock_upload_to_s3.return_value = "https://s3-bucket-url/report.pdf"

    report = create_report(
        user_id=1,
        tier=2,
        payment_status="Paid"
    )

    assert report is not None
    assert report.user_id == 1
    assert report.tier == 2
    assert report.payment_status == "Paid"
    assert report.pdf_url == "https://s3-bucket-url/report.pdf"


# Test: Report Retrieval Success
def test_get_report_success(db_session):
    """
    Test successful retrieval of an existing report.
    """
    # Create a test report
    report = Report(
        user_id=1,
        tier=1,
        pdf_url="https://s3-bucket-url/test-report.pdf",
        payment_status="Paid",
        created_at=datetime.utcnow()
    )
    db_session.add(report)
    db_session.commit()
    db_session.refresh(report)

    fetched_report = get_report(report.id)

    assert fetched_report is not None
    assert fetched_report.id == report.id
    assert fetched_report.pdf_url == "https://s3-bucket-url/test-report.pdf"


# Test: Report Retrieval Failure (Non-existent Report)
def test_get_report_not_found(db_session):
    """
    Test retrieval failure when report does not exist.
    """
    fetched_report = get_report(99999)  # ID that d
