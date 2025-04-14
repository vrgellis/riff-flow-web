
#!/bin/bash
set -e

# Create Python virtual environment
python3 -m venv riffusion-env
source riffusion-env/bin/activate

# Clone Riffusion if not exists
if [ ! -d "riffusion" ]; then
    git clone https://github.com/riffusion/riffusion.git
fi

# Install Riffusion dependencies
cd riffusion
pip install -e .
pip install huggingface_hub==0.11.1 diffusers==0.9.0 accelerate==0.12.0 transformers==4.23.1

# Return to project root
cd ..

# Install frontend dependencies
npm install

# Start backend in background
python riffusion/riffusion/server.py &
BACKEND_PID=$!

# Start frontend
npm run dev

# Trap to kill background processes on exit
trap 'kill $BACKEND_PID' EXIT
