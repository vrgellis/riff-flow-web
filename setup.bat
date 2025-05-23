
@echo off
setlocal

echo === RiffFlow Setup Script ===
echo.

REM Check if Python is installed and available in PATH
where python >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Python is not installed or not available in your PATH.
    echo Please install Python 3.8 or newer from https://www.python.org/downloads/
    echo Make sure to check "Add Python to PATH" during installation.
    echo.
    echo Press any key to exit...
    pause >nul
    exit /b 1
)

echo Python found:
python --version

REM Create Python virtual environment
echo Creating Python virtual environment...
python -m venv riffusion-env
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to create virtual environment.
    echo Make sure you have the 'venv' module installed.
    echo Try running: python -m pip install --upgrade pip virtualenv
    echo.
    echo Press any key to exit...
    pause >nul
    exit /b 1
)

call riffusion-env\Scripts\activate
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to activate virtual environment.
    echo.
    echo Press any key to exit...
    pause >nul
    exit /b 1
)

REM Clone Riffusion if not exists
if not exist "riffusion" (
    echo Cloning Riffusion repository...
    git clone https://github.com/riffusion/riffusion.git
    if %ERRORLEVEL% NEQ 0 (
        echo ERROR: Failed to clone repository.
        echo Make sure git is installed and you have internet access.
        echo.
        echo Press any key to exit...
        pause >nul
        exit /b 1
    )
)

REM Install Riffusion dependencies with proper error handling
echo Installing Riffusion dependencies...
cd riffusion
pip install -e .
if %ERRORLEVEL% NEQ 0 (
    echo WARNING: There was an issue with the core installation.
    echo Continuing with specific package installations...
)

REM Install specific versions of packages known to work
echo Installing specific package versions known to work with Riffusion...
pip install transformers==4.19.2
pip install diffusers==0.9.0
pip install accelerate==0.12.0
pip install huggingface_hub==0.11.1
pip install ftfy==6.1.1 pydub==0.25.1
pip install git+https://github.com/openai/CLIP.git

REM Create a patch file that fixes the CLIPImageProcessor import
echo Creating patch for CLIPImageProcessor issue...
(
echo from transformers.models.clip.image_processing_clip import CLIPImageProcessor
echo import os
echo import torch
echo import numpy as np
echo from PIL import Image
echo from diffusers.pipeline_utils import DiffusionPipeline
echo.
echo # Rest of the file remains unchanged...
) > riffusion_patch.py

REM Patch the main file
echo Applying patch to riffusion_pipeline.py...
powershell -Command "Get-Content riffusion\riffusion\riffusion_pipeline.py | Select-Object -Skip 5 | Out-File -Encoding UTF8 riffusion_temp.py"
powershell -Command "Get-Content riffusion_patch.py, riffusion_temp.py | Out-File -Encoding UTF8 riffusion\riffusion\riffusion_pipeline.py"
del riffusion_patch.py
del riffusion_temp.py

REM Return to project root
cd ..

REM Install frontend dependencies
echo Installing frontend dependencies...
npm install

REM Add PYTHONPATH environment variable to include the current directory
echo Setting PYTHONPATH to include current directory...
set PYTHONPATH=%PYTHONPATH%;%CD%

REM Turn off demo mode in the frontend
echo Disabling demo mode in frontend...
powershell -Command "(Get-Content src\config\api.ts) -replace 'DEMO_MODE: true', 'DEMO_MODE: false' | Set-Content src\config\api.ts"

REM Start backend in separate window
echo.
echo Starting Riffusion backend server...
start "Riffusion Backend" cmd /c "riffusion-env\Scripts\activate && python riffusion\riffusion\server.py --host 0.0.0.0 --port 8000"

REM Wait a moment for backend to start
timeout /t 5 /nobreak

REM Start frontend
echo.
echo Starting frontend development server...
npm run dev

