
@echo off
setlocal

REM Activate virtual environment
call riffusion-env\Scripts\activate

REM Set PYTHONPATH to include the current directory
set PYTHONPATH=%PYTHONPATH%;%CD%

REM Start the server
python riffusion\riffusion\server.py

echo If the server started successfully, open another terminal and run 'npm run dev' to start the frontend.
