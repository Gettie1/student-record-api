echo "Stopping the application..."
echo ""
echo "Choose the environment to stop the application in:"
echo "1. Stop in Development mode"
echo "2. Stop in Production mode"
echo "3. Stop in both (Development and Production)"
echo ""
read -p "Enter your choice (1 ,2 or 3): " choice

case $choice in
    1)
        echo "Stopping application in development environment..."
        docker compose down
        echo "Application stopped in Development environment."
        ;;
    2)
        echo "Stopping application in Production environment..."
        docker compose -f docker-compose.prod.yaml down
        echo "Application stopped in Production environment."
        ;;
    3)
        echo "Stopping application in both Development and Production environments..."
        docker compose down
        docker compose -f docker-compose.prod.yaml down
        echo "Application stopped in both Development and Production environments."
        ;;
    *)
        echo "Invalid choice. Please run the script again and choose 1, 2, or 3."
        exit 1
        ;;
esac
echo ""