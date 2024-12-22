# backend/src/tests/models/reportModel.test.py

import pytest
from sqlalchemy.exc import IntegrityError
from db.dbConfig import SessionLocal
from models.Report import Report
from models.User import User
from datetime import datetime

# Fixture for setting up and tearing down the database session
@pytest.fixture
def db_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.rollback()
        session.close()


# Test: Report model requires mandatory fields
def test_report_required_fields(db_session):
    report = Report(
        tier=1,
        pdf_url="https://example.com/report.pdf",
        payment_status="Paid",
    )
    with pytest.raises(IntegrityError):
        db_session.add(report)
        db_session.commit()


# Test: Report relationship with User model
def test_report_user_relationship(db_session):
    user = User(
        email="test@example.com",
        username="testuser",
        password_hash="hashedpassword"
    )
    db_session.add(user)
    db_session.commit()

    report = Report(
        user_id=user.id,
        tier=2,
        pdf_url="https://example.com/report.pdf",
        payment_status="Paid",
        created_at=datetime.utcnow()
    )
    db_session.add(report)
    db_session.commit()

    fetched_report = db_session.query(Report).filter_by(user_id=user.id).first()
    assert fetched_report is not None
    assert fetched_report.user_id == user.id
    assert fetched_report.payment_status == "Paid"


# Test: Report payment_status field constraints
def test_report_payment_status_constraints(db_session):
    user = User(
        email="test2@example.com",
        username="testuser2",
        password_hash="hashedpassword2"
    )
    db_session.add(user)
    db_session.commit()

    invalid_report = Report(
        user_id=user.id,
        tier=2,
        pdf_url="https://example.com/report.pdf",
        payment_status="InvalidStatus",  # Invalid payment status
        created_at=datetime.now()
    )
    with pytest.raises(IntegrityError):
        db_session.add(invalid_report)
        db_session.commit()
