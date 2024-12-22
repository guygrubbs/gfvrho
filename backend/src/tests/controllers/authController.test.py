# backend/src/tests/controllers/authController.test.py

import pytest
from flask import Flask
from src.server import app
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
            email="testuser@example.com",
            username="testuser",
            password_hash=generate_password_hash("password123")
        )
        session.add(user)
        session.commit()
        yield user
        session.delete(user)
        session.commit()


def test_signup_success(client):
    """
    Test user signup with valid data.
    """
    response = client.post('/api/auth/signup', json={
        "email": "newuser@example.com",
        "username": "newuser",
        "password": "password123"
    })
    assert response.status_code == 201
    data = response.get_json()
    assert "message" in data
    assert data["message"] == "User created successfully"


def test_signup_existing_email(client, test_user):
    """
    Test user signup with an already existing email.
    """
    response = client.post('/api/auth/signup', json={
        "email": test_user.email,
        "username": "duplicateuser",
        "password": "password123"
    })
    assert response.status_code == 400
    data = response.get_json()
    assert "error" in data
    assert data["error"] == "Email already in use"


def test_login_success(client, test_user):
    """
    Test successful user login.
    """
    response = client.post('/api/auth/login', json={
        "email": test_user.email,
        "password": "password123"
    })
    assert response.status_code == 200
    data = response.get_json()
    assert "token" in data


def test_login_invalid_password(client, test_user):
    """
    Test login with an invalid password.
    """
    response = client.post('/api/auth/login', json={
        "email": test_user.email,
        "password": "wrongpassword"
    })
    assert response.status_code == 401
    data = response.get_json()
    assert "error" in data
    assert data["error"] == "Invalid credentials"


def test_protected_route_without_token(client):
    """
    Test accessing a protected route without providing a token.
    """
    response = client.get('/api/auth/protected')
    assert response.status_code == 401
    data = response.get_json()
    assert "error" in data
    assert data["error"] == "Token is missing"


def test_protected_route_with_invalid_token(client):
    """
    Test accessing a protected route with an invalid token.
    """
    headers = {"Authorization": "Bearer invalidtoken"}
    response = client.get('/api/auth/protected', headers=headers)
    assert response.status_code == 401
    data = response.get_json()
    assert "error" in data
    assert data["error"] == "Invalid token"
