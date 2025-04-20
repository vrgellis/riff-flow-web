
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { API_CONFIG } from '../config/api';

export interface Generation {
  id: string;
  prompt: string;
  imageUrl: string;
  audioUrl: string;
  seed: string;
  timestamp: Date;
}

export interface GenerationParams {
  denoising: number;
  seedValue: string;
  model: string;
}

export const useAudioGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentGeneration, setCurrentGeneration] = useState<Generation | null>(null);
  const [history, setHistory] = useState<Generation[]>([]);
  const [apiStatus, setApiStatus] = useState<'online' | 'offline' | 'checking'>('checking');
  
  // Generation parameters
  const [denoising, setDenoising] = useState(0.75);
  const [seedValue, setSeedValue] = useState('');
  const [model, setModel] = useState('v1');

  // Check API status on component mount
  useEffect(() => {
    if (API_CONFIG.DEMO_MODE) {
      console.log('Running in demo mode - API checks disabled');
      setApiStatus('offline');
      toast.info('Running in demo mode. Using sample audio files only.');
      return;
    }
    
    checkApiStatus();
    
    // Check API status every 30 seconds
    const interval = setInterval(checkApiStatus, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const checkApiStatus = async () => {
    if (API_CONFIG.DEMO_MODE) {
      console.log('Demo mode is active, setting API status to offline');
      setApiStatus('offline');
      return;
    }
    
    try {
      console.log('Checking API status at:', `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.HEALTH}`);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.HEALTH}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        signal: controller.signal,
        mode: 'cors', // Explicitly set CORS mode
      });
      
      clearTimeout(timeoutId);
      
      const isOnline = response.ok;
      console.log('API health check result:', isOnline ? 'online' : 'offline', 'Status:', response.status);
      setApiStatus(isOnline ? 'online' : 'offline');
      
      if (isOnline && apiStatus === 'offline') {
        toast.success('Connected to Riffusion API!');
      }
    } catch (error) {
      console.error('API health check failed:', error);
      setApiStatus('offline');
      
      // Only show the toast if we're transitioning from online to offline
      if (apiStatus === 'online') {
        toast.error('Lost connection to Riffusion API. Running in offline mode.');
      }
    }
  };

  const getRandomElement = <T,>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const generateMusic = async (prompt: string) => {
    setIsGenerating(true);
    
    try {
      const seed = seedValue || Math.floor(Math.random() * 1000000).toString();
      
      // Demo mode implementation
      if (API_CONFIG.DEMO_MODE || apiStatus === 'offline') {
        console.log('Generating in demo mode with prompt:', prompt);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const newGeneration: Generation = {
          id: `gen-${Date.now()}`,
          prompt,
          imageUrl: getRandomElement(API_CONFIG.DEMO_DATA.IMAGE_URLS),
          audioUrl: getRandomElement(API_CONFIG.DEMO_DATA.AUDIO_URLS),
          seed,
          timestamp: new Date()
        };
        
        setCurrentGeneration(newGeneration);
        setHistory(prev => [newGeneration, ...prev]);
        
        if (API_CONFIG.DEMO_MODE) {
          toast.info('Generated in demo mode! (Using sample audio files)');
        } else {
          toast.warning('Generated in offline mode! API server not detected.');
        }
        
        setIsGenerating(false);
        return;
      }
      
      // Real API implementation
      console.log('Generating with real API, prompt:', prompt, 'at URL:', `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GENERATE}`);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout for generation
      
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GENERATE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          seed,
          denoising_strength: denoising,
          model_version: model,
        }),
        signal: controller.signal,
        mode: 'cors', // Explicitly set CORS mode
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        console.error('API request failed with status:', response.status);
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      console.log('API response data:', data);
      
      const newGeneration: Generation = {
        id: `gen-${Date.now()}`,
        prompt,
        imageUrl: `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SPECTROGRAM}/${data.id}.png`,
        audioUrl: `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUDIO}/${data.id}.wav`,
        seed,
        timestamp: new Date()
      };
      
      setCurrentGeneration(newGeneration);
      setHistory(prev => [newGeneration, ...prev]);
      toast.success('Generation complete!');
    } catch (error) {
      console.error('Generation failed:', error);
      toast.error('Failed to generate music. Running in offline mode.');
      
      // Fallback to demo mode if API call fails
      if (!API_CONFIG.DEMO_MODE) {
        const seed = seedValue || Math.floor(Math.random() * 1000000).toString();
        const newGeneration: Generation = {
          id: `gen-${Date.now()}`,
          prompt,
          imageUrl: getRandomElement(API_CONFIG.DEMO_DATA.IMAGE_URLS),
          audioUrl: getRandomElement(API_CONFIG.DEMO_DATA.AUDIO_URLS),
          seed,
          timestamp: new Date()
        };
        
        setCurrentGeneration(newGeneration);
        setHistory(prev => [newGeneration, ...prev]);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePlay = (generation: Generation) => {
    setCurrentGeneration(generation);
  };

  const handleDelete = (generationId: string) => {
    setHistory(prev => prev.filter(item => item.id !== generationId));
    if (currentGeneration?.id === generationId) {
      setCurrentGeneration(null);
    }
  };
  
  const generationParams: GenerationParams = {
    denoising,
    seedValue,
    model
  };

  return {
    isGenerating,
    currentGeneration,
    history,
    apiStatus,
    generationParams,
    setDenoising,
    setSeedValue,
    setModel,
    generateMusic,
    handlePlay,
    handleDelete,
    checkApiStatus
  };
};
