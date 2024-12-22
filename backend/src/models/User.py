"""
User.py

This module defines the User model using SQLAlchemy. It includes only the model
definition (no migration logic). The User model has:
- id (primary key)
- email
- username
- password_hash
- created_at
- updated_at

Best Practices:
- Keep model definitions minimal and avoid mixing with migration or business logic.
- Use environment variables or a secure vault to store sensitive data (like passwords),
  and store only hashed passwords in the database.
"""

import datetime
from sqlalchemy import (
    Column, Integer, String, DateTime
)
from sqlalchemy.sql import func
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    """
    SQLAlchemy model for application users.

    Fields:
        id (int): Primary key.
        email (str): Unique email address of the user.
        username (str): Unique username for the user.
        password_hash (str): Hashed password.
        created_at (DateTime): Timestamp when the record was created.
        updated_at (DateTime): Timestamp when the record was last updated.
    """
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, nullable=False, index=True)
    username = Column(String, unique=True, nullable=False, index=True)
    password_hash = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
