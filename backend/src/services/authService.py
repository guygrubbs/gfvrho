"""
authService.py

This module provides user authentication-related functionality, including:
- User registration
- Login
- OAuth token handling (e.g., for Amazon OAuth)
It integrates with the User model to verify credentials and uses dbClient.py to obtain
database sessions.

Best Practices:
- Store sensitive information (like JWT secrets or OAuth client secrets) securely
  (e.g., in AWS Secrets Manager or SSM Parameter Store).
- Always hash user passwords before saving them to the database. Never store plaintext passwords.
- Use secure libraries like bcrypt or passlib for hashing. Shown here as an example.
- Token handling (e.g., JWT issuance, refresh logic) should be carefully managed to prevent security risks.
"""

import os
import bcrypt
import jwt
import datetime
from sqlalchemy.orm import Session
from backend.src.db.dbClient import get_db_session
from backend.src.models.User import User

# Example environment variables for secret keys and OAuth:
JWT_SECRET = os.environ.get("GFVRHO_JWT_SECRET", "CHANGE_ME")  
JWT_ALGORITHM = os.environ.get("GFVRHO_JWT_ALGORITHM", "HS256")
JWT_EXPIRATION_SECONDS = int(os.environ.get("GFVRHO_JWT_EXPIRATION_SECONDS", 3600))

# If you have OAuth client credentials (e.g., for Amazon OAuth), set them similarly:
AMAZON_OAUTH_CLIENT_ID = os.environ.get("GFVRHO_AMAZON_OAUTH_CLIENT_ID", "CHANGE_ME")
AMAZON_OAUTH_CLIENT_SECRET = os.environ.get("GFVRHO_AMAZON_OAUTH_CLIENT_SECRET", "CHANGE_ME")

def register_user(email: str, username: str, password: str):
    """
    Registers a new user by creating a record in the database with a hashed password.
    Raises an exception if the email or username is already in use.
    
    :param email: The email address for the new user (unique).
    :param username: The desired username (unique).
    :param password: The plaintext password to be hashed and stored.
    :return: The created User object.
    """
    db: Session
    with get_db_session() as db:
        existing_user = db.query(User).filter(
            (User.email == email) | (User.username == username)
        ).first()
        if existing_user:
            raise ValueError("Email or username already in use.")

        # Hash the password before storing.
        hashed_pw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        
        new_user = User(
            email=email,
            username=username,
            password_hash=hashed_pw.decode('utf-8')
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        return new_user

def login_user(email: str, password: str) -> str:
    """
    Verifies a user's email and password, returning a JWT access token on success.
    Raises an exception if authentication fails.
    
    :param email: The user's email address.
    :param password: The plaintext password to verify.
    :return: A JWT access token as a string.
    """
    with get_db_session() as db:
        db: Session
        user = db.query(User).filter(User.email == email).first()
        if not user:
            raise ValueError("Invalid email or password.")

        # Compare hashed password with provided plaintext password.
        if not bcrypt.checkpw(password.encode('utf-8'), user.password_hash.encode('utf-8')):
            raise ValueError("Invalid email or password.")

        # Create JWT token on successful authentication.
        token = _generate_jwt_token({"user_id": user.id, "email": user.email})
        return token

def handle_amazon_oauth_callback(oauth_code: str):
    """
    Placeholder example for handling an Amazon OAuth callback.
    In production, this function would:
    1. Exchange the oauth_code for an access token via Amazon's OAuth endpoints.
    2. Fetch user profile info (e.g., name, email).
    3. Upsert user in DB or link them to an existing account.
    4. Return a JWT token or session indicating the user is authenticated.

    :param oauth_code: The authorization code returned by Amazon during OAuth callback.
    :return: A JWT or session token for the authenticated user.
    """
    # Example pseudo-logic (not actual code):
    # 1. Post to Amazon's token endpoint with (client_id, client_secret, oauth_code).
    # 2. Receive access token, fetch user profile.
    # 3. Check if user exists by email -> If not, create one.
    # 4. Return our own JWT.

    # This is a placeholder. Implementation will vary by Amazon's OAuth specs.
    raise NotImplementedError("Amazon OAuth flow not yet implemented.")

def _generate_jwt_token(payload: dict) -> str:
    """
    Generates a JWT token with the given payload, signed with the server's secret key.
    Token expiration is controlled by JWT_EXPIRATION_SECONDS.

    :param payload: A dictionary of claims (e.g., user_id, email).
    :return: A signed JWT token as a string.
    """
    expire = datetime.datetime.utcnow() + datetime.timedelta(seconds=JWT_EXPIRATION_SECONDS)
    payload.update({"exp": expire})
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    # For PyJWT v2.x, jwt.encode returns a string. For v1.x, it returns bytes.
    # Ensure we consistently return a string:
    if isinstance(token, bytes):
        token = token.decode('utf-8')
    return token
