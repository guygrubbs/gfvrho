# backend/Dockerfile

### Description:
Ensure Dockerfile aligns with deployment requirements.

### Requirements:
- Ensure environment variables are passed correctly.
- Validate build and runtime stages.
- Optimize for production deployment.

### Integration:
- Validate compatibility with `docker-compose.yml`.
- Ensure proper API endpoint configuration.

# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install dependencies
COPY ./requirements.txt /app/requirements.txt
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . /app

# Set environment variables for Flask
ENV FLASK_APP=src.server
ENV FLASK_ENV=production

# Expose the necessary port
EXPOSE 5000

# Start the Flask application
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "src.server:app"]
