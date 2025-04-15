
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

  useEffect(() => {
    if (API_CONFIG.DEMO_MODE) {
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
      setApiStatus('offline');
      return;
    }
    
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.HEALTH}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      setApiStatus(response.ok ? 'online' : 'offline');
    } catch (error) {
      console.error('API health check failed:', error);
      setApiStatus('offline');
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
      if (API_CONFIG.DEMO_MODE) {
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
        toast.info('Generated in demo mode! (Using sample audio files)');
        setIsGenerating(false);
        return;
      }
      
      // Real API implementation (only used if demo mode is false)
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GENERATE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          seed,
          denoising_strength: denoising,
          model_version: model,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      
      const newGeneration: Generation = {
        id: `gen-${Date.now()}`,
        prompt,
        imageUrl: data.image_url || `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SPECTROGRAM}/${data.id}.png`,
        audioUrl: data.audio_url || `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUDIO}/${data.id}.wav`,
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
    handleDelete
  };
};
