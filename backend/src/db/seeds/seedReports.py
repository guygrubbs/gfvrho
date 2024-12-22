# backend/src/db/seeds/seedReports.py

from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from datetime import datetime
from src.models.Report import Report

# Database connection string
DATABASE_URL = 'postgresql://user:password@localhost:5432/dbname'  # Replace with your database details

# Initialize Database Session
engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
session = Session()

def seed_reports():
    """
    Insert initial report data into the database.
    """
    try:
        # Sample Report Data
        initial_reports = [
            {
                "user_id": 1,
                "tier": 1,
                "pdf_url": "https://example.com/report1.pdf",
                "payment_status": "paid",
                "created_at": datetime.now()
            },
            {
                "user_id": 2,
                "tier": 2,
                "pdf_url": "https://example.com/report2.pdf",
                "payment_status": "unpaid",
                "created_at": datetime.now()
            },
            {
                "user_id": 3,
                "tier": 3,
                "pdf_url": "https://example.com/report3.pdf",
                "payment_status": "paid",
                "created_at": datetime.now()
            }
        ]

        # Insert Data
        for report_data in initial_reports:
            report = Report(
                user_id=report_data['user_id'],
                tier=report_data['tier'],
                pdf_url=report_data['pdf_url'],
                payment_status=report_data['payment_status'],
                created_at=report_data['created_at']
            )
            session.add(report)

        session.commit()
        print("Seed data for reports inserted successfully.")
    except Exception as e:
        session.rollback()
        print(f"Failed to insert seed data for reports: {e}")
    finally:
        session.close()


if __name__ == '__main__':
    print("Seeding Reports Data...")
    seed_reports()
