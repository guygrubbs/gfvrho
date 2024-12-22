# backend/src/db/migrations/20240101_initial_migration.py

from alembic import op
import sqlalchemy as sa
from werkzeug.security import generate_password_hash

# Migration Identifiers
revision = '20240101_initial_migration'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    """
    Apply the initial database schema migration.
    """
    # Create Users Table
    op.create_table(
        'users',
        sa.Column('id', sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column('email', sa.String(255), unique=True, nullable=False),
        sa.Column('username', sa.String(50), nullable=False),
        sa.Column('password_hash', sa.String(255), nullable=False),
        sa.Column('created_at', sa.DateTime(), server_default=sa.func.now(), nullable=False),
        sa.Column('updated_at', sa.DateTime(), server_default=sa.func.now(), onupdate=sa.func.now(), nullable=False)
    )

    # Create Reports Table
    op.create_table(
        'reports',
        sa.Column('id', sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column('user_id', sa.Integer(), sa.ForeignKey('users.id'), nullable=False),
        sa.Column('tier', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(), server_default=sa.func.now(), nullable=False),
        sa.Column('pdf_url', sa.String(255), nullable=True),
        sa.Column('payment_status', sa.String(50), nullable=False, default='unpaid')
    )

    # Insert Initial Seed Data
    seed_data()


def downgrade():
    """
    Revert the initial database schema migration.
    """
    op.drop_table('reports')
    op.drop_table('users')


def seed_data():
    """
    Insert initial seed data into the database.
    """
    from sqlalchemy.orm import sessionmaker
    from sqlalchemy import create_engine

    # Database connection string
    DATABASE_URL = 'postgresql://user:password@localhost:5432/dbname'  # Update this with actual DB URL
    engine = create_engine(DATABASE_URL)
    Session = sessionmaker(bind=engine)
    session = Session()

    try:
        # Insert initial users
        hashed_password = generate_password_hash('admin123')
        session.execute(
            sa.text(
                "INSERT INTO users (email, username, password_hash) "
                "VALUES (:email, :username, :password_hash)"
            ),
            {"email": "admin@example.com", "username": "admin", "password_hash": hashed_password}
        )

        # Insert initial reports
        session.execute(
            sa.text(
                "INSERT INTO reports (user_id, tier, pdf_url, payment_status) "
                "VALUES (:user_id, :tier, :pdf_url, :payment_status)"
            ),
            {"user_id": 1, "tier": 1, "pdf_url": "http://example.com/sample.pdf", "payment_status": "paid"}
        )

        session.commit()
        print("Seed data inserted successfully.")
    except Exception as e:
        session.rollback()
        print(f"Failed to insert seed data: {e}")
    finally:
        session.close()
