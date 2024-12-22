# backend/src/config/aws.py

import os
import boto3
from botocore.config import Config
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# AWS Configuration Settings

# AWS Credentials and Region
AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
AWS_REGION = os.getenv('AWS_REGION', 'us-east-1')

# AWS Service Endpoints (if needed for custom configurations)
S3_ENDPOINT = os.getenv('AWS_S3_ENDPOINT', None)
RDS_ENDPOINT = os.getenv('AWS_RDS_ENDPOINT', None)
SES_ENDPOINT = os.getenv('AWS_SES_ENDPOINT', None)

# AWS Services Configuration
aws_config = Config(
    region_name=AWS_REGION,
    retries={
        'max_attempts': 3,
        'mode': 'standard'
    }
)

# S3 Configuration
def get_s3_client():
    """
    Initialize and return an AWS S3 client.
    """
    return boto3.client(
        's3',
        aws_access_key_id=AWS_ACCESS_KEY_ID,
        aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
        region_name=AWS_REGION,
        endpoint_url=S3_ENDPOINT,
        config=aws_config
    )

# RDS Configuration
def get_rds_client():
    """
    Initialize and return an AWS RDS client.
    """
    return boto3.client(
        'rds',
        aws_access_key_id=AWS_ACCESS_KEY_ID,
        aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
        region_name=AWS_REGION,
        endpoint_url=RDS_ENDPOINT,
        config=aws_config
    )

# SES Configuration
def get_ses_client():
    """
    Initialize and return an AWS SES client.
    """
    return boto3.client(
        'ses',
        aws_access_key_id=AWS_ACCESS_KEY_ID,
        aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
        region_name=AWS_REGION,
        endpoint_url=SES_ENDPOINT,
        config=aws_config
    )

# Testing AWS Configurations
if __name__ == '__main__':
    try:
        s3 = get_s3_client()
        print("Successfully connected to AWS S3.")

        rds = get_rds_client()
        print("Successfully connected to AWS RDS.")

        ses = get_ses_client()
        print("Successfully connected to AWS SES.")
    except Exception as e:
        print(f"Error: {e}")
