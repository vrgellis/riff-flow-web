
# RiffFlow - AI Music Generation

RiffFlow is a complete AI music generation application with both frontend and backend components.

## 🚀 Quick Setup (One-Click Installation)

### Prerequisites
- Python 3.8 or higher
- pip
- git
- (Optional) CUDA-capable GPU for faster generation

### Automatic Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/riffflow.git
cd riffflow

# Run the setup script
./setup.sh  # For Mac/Linux
setup.bat   # For Windows
```

### Manual Installation Steps

#### Backend Setup
1. Create a virtual environment
2. Install Riffusion dependencies
3. Start the Riffusion server

#### Frontend Setup
1. Install Node.js dependencies
2. Start the development server

## 💻 Development

### Running in Development Mode
```bash
# Start backend server
python -m riffusion.server

# In another terminal, start frontend
npm run dev
```

## 🛠 Troubleshooting
- Ensure all dependencies are installed
- Check that ports 8000 (backend) and 8080 (frontend) are available
- Verify Python and Node.js versions

## 📦 Technologies
- React
- TypeScript
- Vite
- Tailwind CSS
- Riffusion (AI Music Generation)
- Python
```

Next, I'll create setup scripts for automatic installation:

<lov-write file_path="setup.sh">
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
