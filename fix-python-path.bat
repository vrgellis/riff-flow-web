
@echo off
setlocal

REM Activate virtual environment
call riffusion-env\Scripts\activate

REM Install missing packages if needed
pip install transformers==4.23.1 ftfy==6.1.1 pydub==0.25.1 ffmpeg-python
pip install git+https://github.com/openai/CLIP.git
pip install --upgrade huggingface_hub==0.11.1 diffusers==0.9.0 accelerate==0.12.0

REM Set PYTHONPATH to include the current directory
set PYTHONPATH=%PYTHONPATH%;%CD%

REM Start the Riffusion server
python riffusion\riffusion\server.py

echo If the server started successfully, open another terminal and run 'npm run dev' to start the frontend.
