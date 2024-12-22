# backend/src/tests/services/userService.test.py

import pytest
from sqlalchemy.orm import Session
from src.services.userService import UserService
from src.models.User import User
from src.db.dbClient import get_db_session
from werkzeug.security import generate_password_hash, check_password_hash


@pytest.fixture
def db_session():
    """
    Create a temporary database session for testing.
    """
    with get_db_session() as session:
        yield session


@pytest.fixture
def test_user(db_session):
    """
    Create a test user for service tests.
    """
    user = User(
        email="testuser@example.com",
        username="testuser",
        password_hash=generate_password_hash("password123")
    )
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    yield user
    db_session.delete(user)
    db_session.commit()


def test_get_user_by_id(db_session, test_user):
    """
    Test retrieving a user by ID.
    """
    user = UserService.get_user_by_id(test_user.id)
    assert user is not None
    assert user.email == "testuser@example.com"
    assert user.username == "testuser"


def test_get_user_by_id_not_found():
    """
    Test retrieving a user by a non-existent ID.
    """
    user = UserService.get_user_by_id(99999)
    assert user is None


def test_get_user_by_email(db_session, test_user):
    """
    Test retrieving a user by email.
    """
    user = UserService.get_user_by_email("testuser@example.com")
    assert user is not None
    assert user.username == "testuser"


def test_get_user_by_email_not_found():
    """
    Test retrieving a user by a non-existent email.
    """
    user = UserService.get_user_by_email("nonexistent@example.com")
    assert user is None


def test_update_user_profile_success(db_session, test_user):
    """
    Test updating a user profile successfully.
    """
    updated_user = UserService.update_user_profile(
        test_user.id, username="updateduser", email="updated@example.com"
    )
    assert updated_user is not None
    assert updated_user.username == "updateduser"
    assert updated_user.email == "updated@example.com"


def test_update_user_profile_not_found():
    """
    Test updating a non-existent user profile.
    """
    updated_user = UserService.update_user_profile(99999, username="ghostuser")
    assert updated_user is None


def test_delete_user_success(db_session, test_user):
    """
    Test deleting a user successfully.
    """
    result = UserService.delete_user(test_user.id)
    assert result is True
    user = UserService.get_user_by_id(test_user.id)
    assert user is None


def test_delete_user_not_found():
    """
    Test deleting a non-existent user.
    """
    result = UserService.delete_user(99999)
    assert result is False


def test_list_users(db_session, test_user):
    """
    Test listing users with pagination.
    """
    users = UserService.list_users(limit=10, offset=0)
    assert len(users) >= 1
    assert any(user.id == test_user.id for user in users)
