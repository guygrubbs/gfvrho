#!/bin/bash

# cleanup.sh - Script to clean up temporary resources and logs
# Author: gfvrho Team
# Description: Removes temporary artifacts, build files, and logs generated during deployment processes.

set -e

# Define directories and files to clean
TEMP_DIRS=(
    "./cdk.out"
    "./node_modules"
    "./temp"
)
LOG_FILES=(
    "./logs/*.log"
    "./cdk*.log"
)

echo "Starting cleanup process..."

# Remove temporary directories
for dir in "${TEMP_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        echo "Removing temporary directory: $dir"
        rm -rf "$dir"
    else
        echo "Directory $dir does not exist. Skipping..."
    fi
done

# Remove log files
for log in "${LOG_FILES[@]}"; do
    if compgen -G "$log" > /dev/null; then
        echo "🗑️ Removing log files: $log"
        rm -f "$log"
    else
        echo "No log files matching $log found. Skipping..."
    fi
done

# Clear npm cache (optional)
echo "🛠️ Clearing npm cache..."
npm cache clean --force || echo "Failed to clear npm cache. Skipping..."

# Clear Docker dangling images (if applicable)
if command -v docker &> /dev/null; then
    echo "Cleaning up Docker dangling images..."
    docker image prune -f || echo "Failed to clean Docker images. Skipping..."
else
    echo "Docker not installed. Skipping Docker cleanup..."
fi

echo "Cleanup completed successfully!"
