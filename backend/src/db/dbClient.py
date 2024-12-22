"""
dbClient.py

This module sets up and manages a connection to the PostgreSQL database using SQLAlchemy.
It exposes a get_db_session() function that returns a SQLAlchemy session object for
interacting with the database.

Best Practices:
- Keep connection logic centralized here and avoid duplicating it in models or migrations.
- Store sensitive credentials (username, password) in environment variables or a secure vault
  (e.g., AWS Secrets Manager) and retrieve them programmatically.
- Do not define models or perform migrations here; that logic belongs in separate modules.
"""

import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# In a production environment, store these credentials in a secure location like AWS Secrets Manager or SSM.
# The placeholders below can be replaced by environment variables or a config file.
DB_USER = os.environ.get("GFVRHO_DB_USER", "postgres")
DB_PASSWORD = os.environ.get("GFVRHO_DB_PASSWORD", "postgres")
DB_HOST = os.environ.get("GFVRHO_DB_HOST", "localhost")
DB_PORT = os.environ.get("GFVRHO_DB_PORT", "5432")
DB_NAME = os.environ.get("GFVRHO_DB_NAME", "gfvrho")

# Construct the database URL for PostgreSQL.
DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# Create an engine and session factory.
# - echo=False to silence SQL debug logs in production; set True for debugging if needed.
engine = create_engine(DATABASE_URL, echo=False)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db_session():
    """
    Creates and returns a new SQLAlchemy session.

    Usage:
        with get_db_session() as session:
            # Perform database operations here
            ...
    """
    # For a context-managed approach:
    #     with get_db_session() as session:
    #         ...
    # you might define a context manager. For now, this function simply
    # returns the SessionLocal instance.
    return SessionLocal()
