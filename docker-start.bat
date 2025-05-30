
@echo off
setlocal

echo === RiffFlow Docker Setup ===
echo.

REM Check if Docker is installed
where docker >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Docker is not installed or not available in your PATH.
    echo Please install Docker Desktop from https://www.docker.com/products/docker-desktop/
    echo.
    echo Press any key to exit...
    pause >nul
    exit /b 1
)

echo Docker found:
docker --version
echo.

REM Check if Docker is running
docker info >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Docker is not running.
    echo Please start Docker Desktop and try again.
    echo.
    echo Press any key to exit...
    pause >nul
    exit /b 1
)

echo Docker is running.
echo.

REM Set demo mode to false for Docker setup
echo Configuring API settings for Docker...
powershell -Command "(Get-Content src\config\api.ts) -replace 'DEMO_MODE: true', 'DEMO_MODE: false' | Set-Content src\config\api.ts"
powershell -Command "(Get-Content src\config\api.ts) -replace 'BASE_URL: ''http://localhost:8000''', 'BASE_URL: ''http://localhost:8000''' | Set-Content src\config\api.ts"

echo Building and starting Docker containers...
echo This may take several minutes on first run as it downloads models...
echo.

REM Build and start containers
docker-compose up --build

echo.
echo Docker containers have been stopped.
echo To restart, run: docker-compose up
echo To rebuild, run: docker-compose up --build
echo.
pause
