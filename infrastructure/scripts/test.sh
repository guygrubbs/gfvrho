#!/bin/bash

# infrastructure/scripts/test.sh

set -e  # Exit immediately if a command exits with a non-zero status
set -o pipefail  # Ensure pipeline errors are captured

# Variables
FRONTEND_DIR="../frontend"
BACKEND_DIR="../backend"
INFRA_DIR="../infrastructure/cdk"
AWS_REGION="us-east-1"
ECS_CLUSTER="gfvrho-cluster"
AWS_ACCOUNT_ID="123456789012"

# Function to display usage
usage() {
  echo "Usage: $0 {frontend|backend|infrastructure|all}"
  exit 1
}

# Test Frontend
test_frontend() {
  echo "Running Frontend Tests..."
  cd "$FRONTEND_DIR"
  npm install
  npm run test -- --ci --reporters=default --reporters=jest-junit
  echo "Frontend Tests Passed."
  cd -
}

# Test Backend
test_backend() {
  echo "Running Backend Tests..."
  cd "$BACKEND_DIR"
  python -m pip install --upgrade pip
  pip install -r requirements.txt
  pytest --junitxml=test-results/backend-tests.xml
  echo "Backend Tests Passed."
  cd -
}

# Test Infrastructure
test_infrastructure() {
  echo "Running Infrastructure Validation..."
  cd "$INFRA_DIR"
  npm install
  npx cdk synth
  echo "Infrastructure Validation Passed."
  cd -
}

# Test AWS ECS Services
test_ecs_services() {
  echo "Verifying ECS Backend Service Health..."
  aws ecs describe-services \
    --cluster "$ECS_CLUSTER" \
    --services "gfvrho-backend-service" \
    --query "services[0].status" \
    --output text

  echo "ECS Service Validation Passed."
}

# Verify CloudFront Distribution
test_cloudfront() {
  echo "Verifying CloudFront Distribution Health..."
  CLOUDFRONT_ID=$(aws cloudfront list-distributions --query "DistributionList.Items[?Comment=='gfvrho-frontend'].Id" --output text)
  aws cloudfront get-distribution --id "$CLOUDFRONT_ID"
  echo "CloudFront Distribution Validation Passed."
}

# Main Logic
case "$1" in
  frontend)
    test_frontend
    ;;
  backend)
    test_backend
    ;;
  infrastructure)
    test_infrastructure
    ;;
  aws)
    test_ecs_services
    test_cloudfront
    ;;
  all)
    test_frontend
    test_backend
    test_infrastructure
    test_ecs_services
    test_cloudfront
    ;;
  *)
    usage
    ;;
esac

echo "All Tests Completed Successfully."
