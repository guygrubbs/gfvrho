# backend/src/tests/models/userModel.test.py

import pytest
from sqlalchemy.exc import IntegrityError
from db.dbConfig import SessionLocal
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


# Test: User model requires mandatory fields
def test_user_required_fields(db_session):
    user = User(
        email=None,  # Missing required field
        username=None,  # Missing required field
        password_hash="hashedpassword"
    )
    with pytest.raises(IntegrityError):
        db_session.add(user)
        db_session.commit()


# Test: User email uniqueness
def test_user_email_uniqueness(db_session):
    user1 = User(
        email="unique@example.com",
        username="user1",
        password_hash="hashedpassword"
    )
    db_session.add(user1)
    db_session.commit()

    user2 = User(
        email="unique@example.com",  # Duplicate email
        username="user2",
        password_hash="hashedpassword"
    )
    with pytest.raises(IntegrityError):
        db_session.add(user2)
        db_session.commit()


# Test: User username uniqueness
def test_user_username_uniqueness(db_session):
    user1 = User(
        email="user1@example.com",
        username="uniqueusername",
        password_hash="hashedpassword"
    )
    db_session.add(user1)
    db_session.commit()

    user2 = User(
        email="user2@example.com",
        username="uniqueusername",  # Duplicate username
        password_hash="hashedpassword"
    )
    with pytest.raises(IntegrityError):
        db_session.add(user2)
        db_session.commit()


# Test: User model default timestamps
def test_user_timestamps(db_session):
    user = User(
        email="timestamp@example.com",
        username="timestampuser",
        password_hash="hashedpassword"
    )
    db_session.add(user)
    db_session.commit()

    fetched_user = db_session.query(User).filter_by(email="timestamp@example.com").first()
    assert fetched_user is not None
    assert isinstance(fetched_user.created_at, datetime)
    assert isinstance(fetched_user.updated_at, datetime)
