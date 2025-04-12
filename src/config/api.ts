
// API configuration for Riffusion
export const API_CONFIG = {
  // Base URL for the Riffusion API - change this if your API is running on a different host/port
  BASE_URL: 'http://localhost:8000',
  
  // Endpoints
  ENDPOINTS: {
    HEALTH: '/api/health',
    GENERATE: '/api/generate',
    SPECTROGRAM: '/api/spectrogram',
    AUDIO: '/api/audio'
  }
};
