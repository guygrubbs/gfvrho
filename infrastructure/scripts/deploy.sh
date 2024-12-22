#!/bin/bash

# infrastructure/scripts/deploy.sh

set -e  # Exit immediately if a command exits with a non-zero status
set -o pipefail  # Ensure pipeline errors are captured

# Variables
AWS_REGION="us-east-1"
ECS_CLUSTER="gfvrho-cluster"
ECS_BACKEND_SERVICE="gfvrho-backend-service"
FRONTEND_BUCKET="gfvrho-frontend-bucket"
CDK_APP_PATH="../infrastructure/cdk"
BACKEND_IMAGE="gfvrho-backend"
FRONTEND_BUILD_PATH="../frontend/build"
AWS_ACCOUNT_ID="123456789012"

# Function to display usage
usage() {
  echo "Usage: $0 {frontend|backend|infrastructure|all}"
  exit 1
}

# Deploy Infrastructure
deploy_infrastructure() {
  echo "Starting AWS Infrastructure Deployment..."
  cd "$CDK_APP_PATH"
  npm install
  npx cdk deploy --require-approval never
  echo "Infrastructure Deployment Completed."
  cd -
}

# Deploy Frontend
deploy_frontend() {
  echo "Deploying Frontend to S3..."
  aws s3 sync "$FRONTEND_BUILD_PATH" "s3://$FRONTEND_BUCKET" --delete

  echo "Invalidating CloudFront Cache..."
  CLOUDFRONT_ID=$(aws cloudfront list-distributions --query "DistributionList.Items[?Comment=='gfvrho-frontend'].Id" --output text)
  aws cloudfront create-invalidation --distribution-id "$CLOUDFRONT_ID" --paths "/*"

  echo "Frontend Deployment Completed."
}

# Deploy Backend
deploy_backend() {
  echo "Logging into AWS ECR..."
  aws ecr get-login-password --region "$AWS_REGION" | docker login --username AWS --password-stdin "$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com"

  echo "Tagging and Pushing Backend Docker Image..."
  docker tag "$BACKEND_IMAGE:latest" "$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$BACKEND_IMAGE:latest"
  docker push "$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$BACKEND_IMAGE:latest"

  echo "Updating ECS Backend Service..."
  aws ecs update-service \
    --cluster "$ECS_CLUSTER" \
    --service "$ECS_BACKEND_SERVICE" \
    --force-new-deployment

  echo "Backend Deployment Completed."
}

# Verify Deployment
verify_deployment() {
  echo "Verifying ECS Backend Service Status..."
  aws ecs describe-services \
    --cluster "$ECS_CLUSTER" \
    --services "$ECS_BACKEND_SERVICE" \
    --query "services[0].deployments[0].status" \
    --output text

  echo "Verifying CloudFront Deployment Status..."
  aws cloudfront list-invalidations \
    --distribution-id "$CLOUDFRONT_ID" \
    --query "InvalidationList.Items[0].Status" \
    --output text

  echo "Deployment Verification Completed."
}

# Main Logic
case "$1" in
  frontend)
    deploy_frontend
    verify_deployment
    ;;
  backend)
    deploy_backend
    verify_deployment
    ;;
  infrastructure)
    deploy_infrastructure
    verify_deployment
    ;;
  all)
    deploy_infrastructure
    deploy_frontend
    deploy_backend
    verify_deployment
    ;;
  *)
    usage
    ;;
esac

echo "Deployment Process Completed Successfully."
