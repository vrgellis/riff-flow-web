
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

REM Install ffmpeg if necessary
echo.
echo Step 2: Configuring ffmpeg...
echo.
pip install imageio-ffmpeg

REM Set PYTHONPATH to include the current directory
set PYTHONPATH=%PYTHONPATH%;%CD%

REM Turn off demo mode in the frontend
echo.
echo Step 3: Disabling demo mode in frontend...
echo.
powershell -Command "(Get-Content src\config\api.ts) -replace 'DEMO_MODE: true', 'DEMO_MODE: false' | Set-Content src\config\api.ts"

echo.
echo Step 4: Starting Riffusion server on http://localhost:8000...
echo.
python riffusion\riffusion\server.py

echo.
echo If the server started successfully, open another terminal and run 'npm run dev' to start the frontend.

