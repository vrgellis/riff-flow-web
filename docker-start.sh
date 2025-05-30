
#!/bin/bash
set -e

echo "=== RiffFlow Docker Setup ==="
echo

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "ERROR: Docker is not installed or not available in your PATH."
    echo "Please install Docker from https://www.docker.com/get-started/"
    echo
    exit 1
fi

echo "Docker found:"
docker --version
echo

# Check if Docker is running
if ! docker info &> /dev/null; then
    echo "ERROR: Docker is not running."
    echo "Please start Docker and try again."
    echo
    exit 1
fi

echo "Docker is running."
echo

# Set demo mode to false for Docker setup
echo "Configuring API settings for Docker..."
sed -i.bak 's/DEMO_MODE: true/DEMO_MODE: false/g' src/config/api.ts
sed -i.bak "s|BASE_URL: 'http://localhost:8000'|BASE_URL: 'http://localhost:8000'|g" src/config/api.ts

echo "Building and starting Docker containers..."
echo "This may take several minutes on first run as it downloads models..."
echo

# Build and start containers
docker-compose up --build

echo
echo "Docker containers have been stopped."
echo "To restart, run: docker-compose up"
echo "To rebuild, run: docker-compose up --build"
echo
