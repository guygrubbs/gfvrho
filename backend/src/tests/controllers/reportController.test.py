# backend/src/tests/controllers/reportController.test.py

import pytest
from flask import Flask
from src.server import app
from src.models.Report import Report
from src.models.User import User
from src.db.dbClient import get_db_session
from werkzeug.security import generate_password_hash


@pytest.fixture
def client():
    """
    Create a Flask test client for API testing.
    """
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client


@pytest.fixture
def test_user():
    """
    Create a test user in the database.
    """
    with get_db_session() as session:
        user = User(
            email="reportuser@example.com",
            username="reportuser",
            password_hash=generate_password_hash("password123")
        )
        session.add(user)
        session.commit()
        yield user
        session.delete(user)
        session.commit()


@pytest.fixture
def test_report(test_user):
    """
    Create a test report in the database linked to the test user.
    """
    with get_db_session() as session:
        report = Report(
            user_id=test_user.id,
            tier=1,
            pdf_url="https://example.com/report.pdf",
            payment_status="paid"
        )
        session.add(report)
        session.commit()
        yield report
        session.delete(report)
        session.commit()


def test_create_report_success(client, test_user):
    """
    Test creating a new report successfully.
    """
    response = client.post('/api/reports/create', json={
        "user_id": test_user.id,
        "tier": 2
    })
    assert response.status_code == 201
    data = response.get_json()
    assert "message" in data
    assert data["message"] == "Report created successfully"


def test_create_report_invalid_user(client):
    """
    Test creating a report with an invalid user ID.
    """
    response = client.post('/api/reports/create', json={
        "user_id": 99999,
        "tier": 1
    })
    assert response.status_code == 400
    data = response.get_json()
    assert "error" in data
    assert data["error"] == "Invalid user ID"


def test_get_report_success(client, test_report):
    """
    Test retrieving an existing report.
    """
    response = client.get(f'/api/reports/{test_report.id}')
    assert response.status_code == 200
    data = response.get_json()
    assert "pdf_url" in data
    assert data["pdf_url"] == "https://example.com/report.pdf"


def test_get_report_not_found(client):
    """
    Test retrieving a non-existent report.
    """
    response = client.get('/api/reports/99999')
    assert response.status_code == 404
    data = response.get_json()
    assert "error" in data
    assert data["error"] == "Report not found"


def test_list_user_reports(client, test_user, test_report):
    """
    Test listing reports for a specific user.
    """
    response = client.get(f'/api/reports/user/{test_user.id}')
    assert response.status_code == 200
    data = response.get_json()
    assert isinstance(data, list)
    assert len(data) >= 1
    assert data[0]["pdf_url"] == "https://example.com/report.pdf"
