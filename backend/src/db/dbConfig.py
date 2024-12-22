# backend/src/db/dbConfig.py

import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Database Configuration Logic

# Database Credentials
DB_USER = os.getenv('DB_USER', 'postgres')
DB_PASSWORD = os.getenv('DB_PASSWORD', 'password')
DB_HOST = os.getenv('DB_HOST', 'localhost')
DB_PORT = os.getenv('DB_PORT', '5432')
DB_NAME = os.getenv('DB_NAME', 'gfvrho')
DB_ENV = os.getenv('DB_ENV', 'dev')  # Possible values: dev, prod

# Database Connection String
def get_db_url():
    """
    Generate the database connection URL based on the environment.
    """
    if DB_ENV == 'prod':
        return f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    else:
        return f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}_dev"

DATABASE_URL = get_db_url()

# SQLAlchemy Engine and Session
engine = create_engine(
    DATABASE_URL,
    echo=(DB_ENV == 'dev'),  # Enable SQL query logging in development
    pool_size=5,
    max_overflow=10
)

# Create a SessionLocal class for dependency injection
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Testing Database Connection
if __name__ == '__main__':
    try:
        with engine.connect() as connection:
            print("Successfully connected to the database.")
    except Exception as e:
        print(f"Database connection failed: {e}")
