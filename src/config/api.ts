
// API configuration for Riffusion
export const API_CONFIG = {
  // Base URL for the Riffusion API - change this if your API is running on a different host/port
  BASE_URL: 'http://localhost:8000/api',
  
  // Endpoints
  ENDPOINTS: {
    HEALTH: '/health',
    GENERATE: '/generate',
    SPECTROGRAM: '/spectrogram',
    AUDIO: '/audio'
  }
};
