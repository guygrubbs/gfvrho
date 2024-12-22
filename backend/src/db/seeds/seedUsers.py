# backend/src/db/seeds/seedUsers.py

from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from datetime import datetime
from werkzeug.security import generate_password_hash
from src.models.User import User

# Database connection string
DATABASE_URL = 'postgresql://user:password@localhost:5432/dbname'  # Replace with your database details

# Initialize Database Session
engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
session = Session()

def seed_users():
    """
    Insert initial user data into the database.
    """
    try:
        # Sample User Data
        initial_users = [
            {
                "email": "admin@example.com",
                "username": "admin",
                "password": "admin123",
                "created_at": datetime.now()
            },
            {
                "email": "user1@example.com",
                "username": "user1",
                "password": "userpassword1",
                "created_at": datetime.now()
            },
            {
                "email": "user2@example.com",
                "username": "user2",
                "password": "userpassword2",
                "created_at": datetime.now()
            }
        ]

        # Insert Data
        for user_data in initial_users:
            user = User(
                email=user_data['email'],
                username=user_data['username'],
                password_hash=generate_password_hash(user_data['password']),
                created_at=user_data['created_at']
            )
            session.add(user)

        session.commit()
        print("Seed data for users inserted successfully.")
    except Exception as e:
        session.rollback()
        print(f"Failed to insert seed data for users: {e}")
    finally:
        session.close()


if __name__ == '__main__':
    print("Seeding Users Data...")
    seed_users()
