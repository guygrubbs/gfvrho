#!/bin/bash

# infrastructure/scripts/build.sh

set -e  # Exit immediately if a command exits with a non-zero status
set -o pipefail  # Ensure pipeline errors are captured

# Variables
APP_NAME="gfvrho"
AWS_REGION="us-east-1"
ECS_CLUSTER="gfvrho-cluster"
ECS_SERVICE="gfvrho-backend-service"
FRONTEND_BUCKET="gfvrho-frontend-bucket"
BACKEND_IMAGE="gfvrho-backend"
FRONTEND_DIR="../frontend"
BACKEND_DIR="../backend"
INFRA_DIR="../infrastructure/cdk"

# Function to display usage
usage() {
  echo "Usage: $0 {frontend|backend|infrastructure|all}"
  exit 1
}

# Build Frontend
build_frontend() {
  echo "Building Frontend..."
  cd "$FRONTEND_DIR"
  npm install
  npm run build
  echo "Frontend Build Complete."
  cd -
}

# Build Backend
build_backend() {
  echo "Building Backend Docker Image..."
  cd "$BACKEND_DIR"
  docker build -t "$BACKEND_IMAGE:latest" .
  echo "Backend Build Complete."
  cd -
}

# Deploy Infrastructure
deploy_infrastructure() {
  echo "Deploying Infrastructure using AWS CDK..."
  cd "$INFRA_DIR"
  npm install
  npx cdk deploy --require-approval never
  echo "Infrastructure Deployment Complete."
  cd -
}

# Run Tests
run_tests() {
  echo "Running Tests..."
  cd "$BACKEND_DIR"
  pytest
  echo "Tests Passed."
  cd "$FRONTEND_DIR"
  npm run test
  echo "Frontend Tests Passed."
  cd -
}

# Deploy Frontend
deploy_frontend() {
  echo "Deploying Frontend to S3..."
  aws s3 sync "$FRONTEND_DIR/build" "s3://$FRONTEND_BUCKET" --delete
  echo "Frontend Deployed to S3."

  echo "Invalidating CloudFront Cache..."
  CLOUDFRONT_ID=$(aws cloudfront list-distributions --query "DistributionList.Items[?Comment=='gfvrho-frontend'].Id" --output text)
  aws cloudfront create-invalidation --distribution-id "$CLOUDFRONT_ID" --paths "/*"
  echo "CloudFront Cache Invalidated."
}

# Deploy Backend
deploy_backend() {
  echo "Pushing Backend Docker Image to AWS ECR..."
  aws ecr get-login-password --region "$AWS_REGION" | docker login --username AWS --password-stdin "<aws_account_id>.dkr.ecr.$AWS_REGION.amazonaws.com"
  docker tag "$BACKEND_IMAGE:latest" "<aws_account_id>.dkr.ecr.$AWS_REGION.amazonaws.com/$BACKEND_IMAGE:latest"
  docker push "<aws_account_id>.dkr.ecr.$AWS_REGION.amazonaws.com/$BACKEND_IMAGE:latest"
  echo "Backend Image Pushed to ECR."

  echo "Updating ECS Service..."
  aws ecs update-service --cluster "$ECS_CLUSTER" --service "$ECS_SERVICE" --force-new-deployment
  echo "ECS Service Updated."
}

# Main Logic
case "$1" in
  frontend)
    build_frontend
    run_tests
    deploy_frontend
    ;;
  backend)
    build_backend
    run_tests
    deploy_backend
    ;;
  infrastructure)
    deploy_infrastructure
    ;;
  all)
    build_frontend
    build_backend
    run_tests
    deploy_infrastructure
    deploy_frontend
    deploy_backend
    ;;
  *)
    usage
    ;;
esac

echo "Build and Deployment Process Completed Successfully!"
