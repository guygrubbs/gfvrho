# backend/src/__mocks__/mockData.py

# Mock User Data
MOCK_USERS = [
    {
        "id": 1,
        "email": "user1@example.com",
        "username": "user1",
        "password_hash": "hashed_password_1",
        "created_at": "2024-01-01T12:00:00",
        "updated_at": "2024-01-02T12:00:00"
    },
    {
        "id": 2,
        "email": "user2@example.com",
        "username": "user2",
        "password_hash": "hashed_password_2",
        "created_at": "2024-01-03T14:30:00",
        "updated_at": "2024-01-04T16:45:00"
    }
]

# Mock Report Data
MOCK_REPORTS = [
    {
        "id": 101,
        "user_id": 1,
        "tier": 1,
        "created_at": "2024-01-05T09:15:00",
        "pdf_url": "https://s3.amazonaws.com/mock-reports/report1.pdf",
        "payment_status": "completed"
    },
    {
        "id": 102,
        "user_id": 2,
        "tier": 2,
        "created_at": "2024-01-06T10:25:00",
        "pdf_url": "https://s3.amazonaws.com/mock-reports/report2.pdf",
        "payment_status": "pending"
    }
]

# Mock Authentication Tokens
MOCK_AUTH_TOKENS = {
    "valid_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expired_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...expired"
}

# Mock Payment Data
MOCK_PAYMENTS = [
    {
        "user_id": 1,
        "report_id": 101,
        "amount": 99.99,
        "currency": "USD",
        "status": "completed",
        "transaction_id": "txn_abc123"
    },
    {
        "user_id": 2,
        "report_id": 102,
        "amount": 199.99,
        "currency": "USD",
        "status": "pending",
        "transaction_id": "txn_def456"
    }
]

# Mock External API Data
MOCK_EXTERNAL_API_RESPONSES = {
    "linkedin": {
        "company_profile": {
            "name": "Startup Inc.",
            "industry": "Technology",
            "funding_stage": "Series A"
        }
    },
    "crunchbase": {
        "company_profile": {
            "valuation": "10M USD",
            "founded_year": 2020
        }
    }
}
