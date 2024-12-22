# backend/src/tests/services/authService.test.py

import pytest
from unittest.mock import patch, MagicMock
from services.authService import register_user, login_user, refresh_token
from models.User import User
from db.dbConfig import SessionLocal
from werkzeug.security import generate_password_hash, check_password_hash


# Fixture for database session
@pytest.fixture
def db_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.rollback()
        session.close()


# Test: User Registration
def test_register_user(db_session):
    """
    Test user registration functionality.
    """
    user_data = {
        "email": "test_register@example.com",
        "username": "testuser",
        "password": "StrongPassword123!"
    }
    user = register_user(user_data['email'], user_data['username'], user_data['password'])

    assert user is not None
    assert user.email == user_data['email']
    assert user.username == user_data['username']
    assert check_password_hash(user.password_hash, user_data['password'])


# Test: User Login Success
def test_login_user_success(db_session):
    """
    Test successful user login.
    """
    hashed_password = generate_password_hash("ValidPassword123!")
    user = User(
        email="login_success@example.com",
        username="loginuser",
        password_hash=hashed_password
    )
    db_session.add(user)
    db_session.commit()

    result = login_user("login_success@example.com", "ValidPassword123!")
    assert result is not None
    assert "token" in result


# Test: User Login Failure (Invalid Password)
def test_login_user_invalid_password(db_session):
    """
    Test login with an invalid password.
    """
    hashed_password = generate_password_hash("CorrectPassword123!")
    user = User(
        email="login_invalid@example.com",
        username="loginfail",
        password_hash=hashed_password
    )
    db_session.add(user)
    db_session.commit()

    result = login_user("login_invalid@example.com", "WrongPassword123!")
    assert result is None


# Test: User Login Failure (User Not Found)
def test_login_user_not_found(db_session):
    """
    Test login with a non-existing user.
    """
    result = login_user("nonexistent@example.com", "RandomPassword123!")
    assert result is None


# Test: Token Refresh Success
@patch("services.authService.verify_token")
@patch("services.authService.generate_token")
def test_refresh_token_success(mock_generate_token, mock_verify_token):
    """
    Test successful token refresh.
    """
    mock_verify_token.return_value = {"user_id": 1}
    mock_generate_token.return_value = "new_token_string"

    new_token = refresh_token("valid_refresh_token")
    assert new_token == "new_token_string"


# Test: Token Refresh Failure
@patch("services.authService.verify_token")
def test_refresh_token_failure(mock_verify_token):
    """
    Test token refresh failure due to invalid token.
    """
    mock_verify_token.return_value = None

    new_token = refresh_token("invalid_refresh_token")
    assert new_token is None
