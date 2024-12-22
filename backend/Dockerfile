# Use an official Python runtime as the base image
FROM python:3.9-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory
WORKDIR /app

# Copy requirements.txt and install dependencies
COPY requirements.txt /app/requirements.txt
RUN pip install --upgrade pip \
    && pip install -r requirements.txt

# Copy the backend source code
COPY ./src /app/src

# Expose the port the Flask app runs on
EXPOSE 5000

# Set the entrypoint for the Flask application
CMD ["gunicorn", "-b", "0.0.0.0:5000", "src.server:app"]
