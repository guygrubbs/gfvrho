# backend/src/tests/integration/reportIntegration.test.py

import pytest
from flask import Flask
from db.dbConfig import SessionLocal
from models.User import User
from models.Report import Report
from services.authService import create_user
from services.reportService import create_report
from datetime import datetime

# Fixture for test client
@pytest.fixture
def test_client():
    from src.server import app  # Ensure server.py runs Flask app
    
    with app.test_client() as testing_client:
        with app.app_context():
            yield testing_client


# Fixture for test database session
@pytest.fixture
def db_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.rollback()
        session.close()


# Test: End-to-end report generation flow
def test_generate_report_flow(test_client, db_session):
    """
    Validate the end-to-end report generation process.
    """
    # Step 1: Create a test user
    user = User(
        email="test_integration@example.com",
        username="integration_user",
        password_hash="hashedpassword"
    )
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)

    # Step 2: Simulate report creation
    report_data = {
        "user_id": user.id,
        "tier": 2,
        "pdf_url": "https://example.com/report.pdf",
        "payment_status": "Paid",
        "created_at": datetime.utcnow()
    }
    report = Report(**report_data)
    db_session.add(report)
    db_session.commit()
    db_session.refresh(report)

    # Step 3: Fetch the report via API
    response = test_client.get(f"/api/report/{report.id}")
    assert response.status_code == 200
    response_data = response.get_json()
    assert response_data['status'] == 'success'
    assert response_data['data']['id'] == report.id
    assert response_data['data']['user_id'] == user.id


# Test: Validate integration between services and controllers
def test_report_service_controller_integration(test_client, db_session):
    """
    Ensure seamless integration between report service and controller.
    """
    # Step 1: Create a test user
    user = User(
        email="service_integration@example.com",
        username="service_user",
        password_hash="hashedpassword"
    )
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)

    # Step 2: Create a report using the service
    report = create_report(
        user_id=user.id,
        tier=1,
        pdf_url="https://example.com/service-report.pdf",
        payment_status="Paid"
    )
    db_session.refresh(report)

    # Step 3: Fetch the report via the API
    response = test_client.get(f"/api/report/{report.id}")
    assert response.status_code == 200
    response_data = response.get_json()
    assert response_data['status'] == 'success'
    assert response_data['data']['pdf_url'] == "https://example.com/service-report.pdf"
    assert response_data['data']['payment_status'] == "Paid"
