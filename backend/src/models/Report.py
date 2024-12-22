"""
Report.py

This module defines the Report model using SQLAlchemy. It includes only the model
definition (no migration logic). The Report model has:
- id (primary key)
- user_id (foreign key to users.id)
- tier (int)
- created_at
- pdf_url (string)
- payment_status (string)
- relationship to User model

Best Practices:
- Keep model definitions minimal and avoid mixing with migration or business logic.
- The user_id field references the users table through a ForeignKey.
"""

import datetime
from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    ForeignKey
)
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Report(Base):
    """
    SQLAlchemy model for generated reports.

    Fields:
        id (int): Primary key.
        user_id (int): Foreign key referencing the users table's id.
        tier (int): The tier level of the report (e.g., 1, 2, or 3).
        created_at (DateTime): Timestamp when the report record was created.
        pdf_url (str): URL/path to the generated PDF file.
        payment_status (str): Status of payment for this report (e.g., 'PAID', 'PENDING').

    Relationships:
        user: A relationship to the User model, establishing a one-to-many link
              (one user can have many reports).
    """
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    tier = Column(Integer, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    pdf_url = Column(String, nullable=True)
    payment_status = Column(String, nullable=True)

    # Define the relationship to the User model.
    # The 'User' string must match the name of the class in User.py.
    # 'backref' automatically creates a "reports" attribute on the User class
    # to access all associated reports.
    user = relationship("User", backref="reports")
