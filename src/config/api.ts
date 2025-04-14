
// API configuration for Riffusion
export const API_CONFIG = {
  // Enable demo mode to use mock data instead of trying to connect to a local server
  // Auto-switches to demo mode if API is unavailable
  DEMO_MODE: false,
  
  // Base URL for the Riffusion API - change this if your API is running on a different host/port
  BASE_URL: 'http://localhost:8000',
  
  // Endpoints
  ENDPOINTS: {
    HEALTH: '/api/health',
    GENERATE: '/api/generate',
    SPECTROGRAM: '/api/spectrogram',
    AUDIO: '/api/audio'
  },
  
  // Demo data for using the app without a backend
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
  
  // Backend installation instructions
  INSTALLATION_HELP: {
    DEPENDENCY_FIXES: [
      "pip install huggingface_hub==0.11.1",
      "pip install diffusers==0.9.0",
      "pip install accelerate==0.12.0",
      "pip install transformers==4.23.1"
    ],
    START_SERVER: "python -m riffusion.server",
    GITHUB_REPO: "https://github.com/riffusion/riffusion",
    ONE_CLICK_SETUP: {
      WINDOWS: [
        "git clone https://github.com/riffusion/riffusion",
        "cd riffusion",
        "python -m venv venv",
        "venv\\Scripts\\activate",
        "pip install -e .",
        "pip install huggingface_hub==0.11.1 diffusers==0.9.0 accelerate==0.12.0 transformers==4.23.1",
        "python -m riffusion.server"
      ],
      MAC_LINUX: [
        "git clone https://github.com/riffusion/riffusion",
        "cd riffusion",
        "python -m venv venv",
        "source venv/bin/activate",
        "pip install -e .",
        "pip install huggingface_hub==0.11.1 diffusers==0.9.0 accelerate==0.12.0 transformers==4.23.1",
        "python -m riffusion.server"
      ]
    }
  }
};
