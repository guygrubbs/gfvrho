# backend/src/services/userService.py

from sqlalchemy.orm import Session
from src.models.User import User
from src.db.dbClient import get_db_session
from werkzeug.security import generate_password_hash
from typing import Optional


class UserService:
    """
    Service class to handle user-related operations such as profile retrieval and updates.
    """

    @staticmethod
    def get_user_by_id(user_id: int) -> Optional[User]:
        """
        Retrieve a user by their ID.

        :param user_id: The ID of the user to retrieve.
        :return: User object if found, else None.
        """
        with get_db_session() as session:
            return session.query(User).filter(User.id == user_id).first()

    @staticmethod
    def get_user_by_email(email: str) -> Optional[User]:
        """
        Retrieve a user by their email.

        :param email: The email of the user to retrieve.
        :return: User object if found, else None.
        """
        with get_db_session() as session:
            return session.query(User).filter(User.email == email).first()

    @staticmethod
    def update_user_profile(user_id: int, **kwargs) -> Optional[User]:
        """
        Update user profile details.

        :param user_id: The ID of the user to update.
        :param kwargs: Fields to update (e.g., username, email, password).
        :return: Updated User object if successful, else None.
        """
        with get_db_session() as session:
            user = session.query(User).filter(User.id == user_id).first()
            if not user:
                return None

            # Update fields if they exist in kwargs
            if 'username' in kwargs:
                user.username = kwargs['username']
            if 'email' in kwargs:
                user.email = kwargs['email']
            if 'password' in kwargs:
                user.password_hash = generate_password_hash(kwargs['password'])

            session.commit()
            session.refresh(user)
            return user

    @staticmethod
    def delete_user(user_id: int) -> bool:
        """
        Delete a user by their ID.

        :param user_id: The ID of the user to delete.
        :return: True if deletion was successful, False otherwise.
        """
        with get_db_session() as session:
            user = session.query(User).filter(User.id == user_id).first()
            if not user:
                return False

            session.delete(user)
            session.commit()
            return True

    @staticmethod
    def list_users(limit: int = 10, offset: int = 0) -> list:
        """
        Retrieve a paginated list of users.

        :param limit: Number of users to retrieve.
        :param offset: Offset for pagination.
        :return: List of User objects.
        """
        with get_db_session() as session:
            return session.query(User).offset(offset).limit(limit).all()
