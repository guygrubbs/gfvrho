# backend/src/tests/controllers/userController.test.py

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


def test_get_user_profile_success(client, test_user):
    """
    Test retrieving a user profile successfully.
    """
    response = client.get(f'/api/users/{test_user.id}')
    assert response.status_code == 200
    data = response.get_json()
    assert "email" in data
    assert data["email"] == test_user.email
    assert "username" in data
    assert data["username"] == test_user.username


def test_get_user_profile_not_found(client):
    """
    Test retrieving a non-existent user profile.
    """
    response = client.get('/api/users/99999')
    assert response.status_code == 404
    data = response.get_json()
    assert "error" in data
    assert data["error"] == "User not found"


def test_update_user_profile_success(client, test_user):
    """
    Test updating a user profile successfully.
    """
    response = client.put(f'/api/users/{test_user.id}', json={
        "username": "updateduser",
        "email": "updateduser@example.com"
    })
    assert response.status_code == 200
    data = response.get_json()
    assert "message" in data
    assert data["message"] == "User updated successfully"


def test_update_user_profile_not_found(client):
    """
    Test updating a non-existent user profile.
    """
    response = client.put('/api/users/99999', json={
        "username": "ghostuser",
        "email": "ghostuser@example.com"
    })
    assert response.status_code == 404
    data = response.get_json()
    assert "error" in data
    assert data["error"] == "User not found"


def test_delete_user_success(client, test_user):
    """
    Test deleting a user successfully.
    """
    response = client.delete(f'/api/users/{test_user.id}')
    assert response.status_code == 200
    data = response.get_json()
    assert "message" in data
    assert data["message"] == "User deleted successfully"


def test_delete_user_not_found(client):
    """
    Test deleting a non-existent user.
    """
    response = client.delete('/api/users/99999')
    assert response.status_code == 404
    data = response.get_json()
    assert "error" in data
    assert data["error"] == "User not found"
