#!/bin/bash
# This script is used to start the application with the correct environment variables

echo "Starting the application..."
echo "Setting environment variables..."
echo ""
echo "Choose the environment to run the application in:"
echo "1. Development"
echo "2. Production"
echo ""
read -p "Enter your choice (1 or 2): " choice

case $choice in
    1)
        echo "Setting environment variables for Development..."
        docker compose up -d --build
        echo "Application started in Development mode."
        ;;
    2)
        echo "Setting environment variables for Production..."
        docker compose -f docker-compose.prod.yaml up -d --build
        echo "Application started in Production mode."
        ;;
    *)
        echo "Invalid choice. Please run the script again and choose 1 or 2."
        exit 1
        ;;
esac
echo ""