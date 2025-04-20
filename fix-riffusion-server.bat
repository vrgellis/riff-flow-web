
@echo off
setlocal

echo === RiffFlow Backend Fix Script ===
echo.

REM Activate virtual environment
call riffusion-env\Scripts\activate

echo Step 1: Installing correct package versions...
echo.

REM Uninstall problematic packages first
pip uninstall -y transformers diffusers accelerate huggingface_hub

REM Install specific package versions known to work with Riffusion
pip install transformers==4.19.2 diffusers==0.9.0 accelerate==0.12.0 huggingface_hub==0.11.1 
pip install ftfy==6.1.1 pydub==0.25.1 ffmpeg-python
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
echo Step 4: Starting Riffusion server with proper network configuration...
echo.
echo Starting server with host 0.0.0.0 to make it accessible from all interfaces...
python riffusion\riffusion\server.py --host 0.0.0.0 --port 8000

echo.
echo If the server started successfully, open another terminal and run 'npm run dev' to start the frontend.
