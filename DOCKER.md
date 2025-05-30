
# RiffFlow Docker Setup

This setup runs RiffFlow in Docker containers, eliminating Python path issues and providing a clean, isolated environment.

## Prerequisites

- Docker Desktop installed and running
- At least 8GB of free disk space (for AI models)
- Good internet connection (for initial model download)

## Quick Start

### Windows
```cmd
docker-start.bat
```

### Mac/Linux
```bash
chmod +x docker-start.sh
./docker-start.sh
```

## Manual Docker Commands

### Build and Run
```bash
# Build and start all services
docker-compose up --build

# Run in background
docker-compose up -d --build

# View logs
docker-compose logs -f
```

### Development Mode
```bash
# Use development compose file with volume mounts
docker-compose -f docker-compose.dev.yml up --build
```

### Useful Commands
```bash
# Stop all services
docker-compose down

# Remove containers and volumes
docker-compose down -v

# View running containers
docker ps

# Access backend container shell
docker-compose exec backend bash

# View backend logs
docker-compose logs backend

# View frontend logs
docker-compose logs frontend
```

## How It Works

1. **Backend Container**: 
   - Runs Python 3.9 with all Riffusion dependencies
   - Downloads AI models on first run (~4-6GB)
   - Models are cached in a Docker volume for reuse
   - Exposes API on port 8000

2. **Frontend Container**:
   - Runs Node.js with the React app
   - Connects to backend automatically
   - Exposes web interface on port 8080

## First Run

The first time you run this, it will:
1. Download and build Docker images (~10-15 minutes)
2. Download AI models (~5-10 minutes depending on connection)
3. Start both services

Subsequent runs are much faster as everything is cached.

## Accessing the Application

Once running, open your browser to:
- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:8000

## Troubleshooting

### Out of Space
The AI models require ~6GB of space. Check available disk space:
```bash
docker system df
```

### Slow Downloads
Model downloads can be slow. Check progress:
```bash
docker-compose logs backend
```

### Port Conflicts
If ports 8000 or 8080 are in use, modify the ports in `docker-compose.yml`:
```yaml
ports:
  - "9000:8000"  # Use port 9000 instead
```

### Rebuilding
To force a complete rebuild:
```bash
docker-compose down -v
docker-compose up --build
```
