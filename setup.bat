
@echo off
setlocal

REM Create Python virtual environment
python -m venv riffusion-env
call riffusion-env\Scripts\activate

REM Clone Riffusion if not exists
if not exist "riffusion" (
    git clone https://github.com/riffusion/riffusion.git
)

REM Install Riffusion dependencies
cd riffusion
pip install -e .
pip install huggingface_hub==0.11.1 diffusers==0.9.0 accelerate==0.12.0 transformers==4.23.1 diffusers[torch]==0.9.0 ftfy==6.1.1 pydub==0.25.1

REM Return to project root
cd ..

REM Install frontend dependencies
npm install

REM Add PYTHONPATH environment variable to include the current directory
set PYTHONPATH=%PYTHONPATH%;%CD%

REM Start backend
start /B python riffusion\riffusion\server.py

REM Start frontend
npm run dev
