
export const API_CONFIG = {
  BASE_URL: 'http://localhost:8000',
  ENDPOINTS: {
    GENERATE: '/api/generate',
    HEALTH: '/api/health'
  },
  INSTALLATION_HELP: {
    GITHUB_REPO: 'https://github.com/riffusion/riffusion.git',
    START_SERVER: 'python riffusion/riffusion/server.py',
    DEPENDENCY_FIXES: [
      'pip install huggingface_hub==0.11.1',
      'pip install diffusers==0.9.0',
      'pip install accelerate==0.12.0',
      'pip install transformers==4.23.1'
    ],
    ONE_CLICK_SETUP: {
      WINDOWS: [
        'git clone https://github.com/riffusion/riffusion.git',
        'python -m venv riffusion-env',
        'riffusion-env\\Scripts\\activate',
        'cd riffusion',
        'pip install -e .',
        'pip install huggingface_hub==0.11.1 diffusers==0.9.0 accelerate==0.12.0 transformers==4.23.1',
        'cd ..',
        'python riffusion\\riffusion\\server.py'
      ],
      MAC_LINUX: [
        'git clone https://github.com/riffusion/riffusion.git',
        'python3 -m venv riffusion-env',
        'source riffusion-env/bin/activate',
        'cd riffusion',
        'pip install -e .',
        'pip install huggingface_hub==0.11.1 diffusers==0.9.0 accelerate==0.12.0 transformers==4.23.1',
        'cd ..',
        'python riffusion/riffusion/server.py'
      ]
    }
  }
};
