
export const API_CONFIG = {
  DEMO_MODE: false, // Set to false to use the backend server
  BASE_URL: 'http://localhost:8000',
  ENDPOINTS: {
    GENERATE: '/api/generate',
    HEALTH: '/api/health',
    SPECTROGRAM: '/api/spectrogram',
    AUDIO: '/api/audio'
  },
  DEMO_DATA: {
    AUDIO_URLS: [
      'https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3',
      'https://assets.mixkit.co/music/preview/mixkit-hip-hop-02-738.mp3',
      'https://assets.mixkit.co/music/preview/mixkit-dreaming-big-31.mp3',
      'https://assets.mixkit.co/music/preview/mixkit-driving-ambition-32.mp3',
      'https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3'
    ],
    IMAGE_URLS: [
      'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=640&auto=format&fit=crop&crop=entropy&cs=tinysrgb',
      'https://images.unsplash.com/photo-1535587566541-97121a128dc5?q=80&w=640&auto=format&fit=crop&crop=entropy&cs=tinysrgb',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=640&auto=format&fit=crop&crop=entropy&cs=tinysrgb',
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=640&auto=format&fit=crop&crop=entropy&cs=tinysrgb',
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=640&auto=format&fit=crop&crop=entropy&cs=tinysrgb'
    ]
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
