
@echo off
setlocal

echo === RiffFlow Backend Fix Script ===
echo.

REM Activate virtual environment
call riffusion-env\Scripts\activate

echo Step 1: Installing correct package versions...
echo.

REM Completely uninstall problematic packages first
pip uninstall -y transformers diffusers accelerate huggingface_hub

REM Use a specific order of installation that's known to work
pip install transformers==4.19.2
pip install diffusers==0.9.0
pip install accelerate==0.12.0
pip install huggingface_hub==0.11.1

REM Install additional required packages
pip install ftfy==6.1.1 pydub==0.25.1
pip install git+https://github.com/openai/CLIP.git

REM Install and configure ffmpeg properly
echo.
echo Step 2: Configuring ffmpeg...
echo.
pip install imageio-ffmpeg

REM Download ffmpeg binary for Windows
echo Downloading ffmpeg binary...
powershell -Command "Invoke-WebRequest -Uri 'https://github.com/BtbN/FFmpeg-Builds/releases/download/latest/ffmpeg-master-latest-win64-gpl.zip' -OutFile 'ffmpeg.zip'"
echo Extracting ffmpeg...
powershell -Command "Expand-Archive -Force -Path 'ffmpeg.zip' -DestinationPath 'ffmpeg'"
echo Adding ffmpeg to PATH...
set PATH=%PATH%;%CD%\ffmpeg\ffmpeg-master-latest-win64-gpl\bin

REM Set PYTHONPATH to include the current directory
set PYTHONPATH=%PYTHONPATH%;%CD%

REM Turn off demo mode in the frontend
echo.
echo Step 3: Disabling demo mode in frontend...
echo.
powershell -Command "(Get-Content src\config\api.ts) -replace 'DEMO_MODE: true', 'DEMO_MODE: false' | Set-Content src\config\api.ts"

REM Configure the server to listen on all interfaces to ensure it's accessible
echo.
echo Step 4: Installing specific patch for CLIPImageProcessor issue...
echo.

REM Create a patch file that fixes the CLIPImageProcessor import
echo Creating patch file for riffusion_pipeline.py...
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

echo.
echo Step 5: Starting Riffusion server with proper network configuration...
echo.
echo Starting server with host 0.0.0.0 to make it accessible from all interfaces...
python riffusion\riffusion\server.py --host 0.0.0.0 --port 8000

echo.
echo If the server started successfully, open another terminal and run 'npm run dev' to start the frontend.
