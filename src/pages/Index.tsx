import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import PromptInput from '../components/PromptInput';
import Spectrogram from '../components/Spectrogram';
import AudioPlayer from '../components/AudioPlayer';
import GenerationControls from '../components/GenerationControls';
import HistoryItem from '../components/HistoryItem';
import { Separator } from '../components/ui/separator';
import { toast } from 'sonner';
import { API_CONFIG } from '../config/api';

interface Generation {
  id: string;
  prompt: string;
  imageUrl: string;
  audioUrl: string;
  seed: string;
  timestamp: Date;
}

const Index = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentGeneration, setCurrentGeneration] = useState<Generation | null>(null);
  const [history, setHistory] = useState<Generation[]>([]);
  const [apiStatus, setApiStatus] = useState<'online' | 'offline' | 'checking'>('checking');
  
  // Generation parameters
  const [denoising, setDenoising] = useState(0.75);
  const [seedValue, setSeedValue] = useState('');
  const [model, setModel] = useState('v1');

  // Check API status on component mount and periodically
  useEffect(() => {
    if (API_CONFIG.DEMO_MODE) {
      setApiStatus('offline'); // Set to offline mode when demo mode is enabled
      toast.info('Running in demo mode. No backend server required.');
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
        toast.success('Generated in demo mode! (Using sample audio)');
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

  return (
    <div className="min-h-screen app-gradient text-foreground">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Header apiStatus={apiStatus} />
        
        <main className="mt-8">
          {API_CONFIG.DEMO_MODE && (
            <div className="w-full glass-panel rounded-lg p-4 mb-6 bg-amber-500/20 border border-amber-500/30">
              <p className="text-center text-sm">
                <strong>Demo Mode Active:</strong> Using sample audio files. No backend server required.
              </p>
            </div>
          )}
          
          <div className="w-full glass-panel rounded-lg p-6 mb-8">
            <PromptInput onGenerate={generateMusic} isGenerating={isGenerating} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Spectrogram 
                imageUrl={currentGeneration?.imageUrl} 
                isGenerating={isGenerating} 
              />
              
              <AudioPlayer audioUrl={currentGeneration?.audioUrl} />
            </div>
            
            <div className="space-y-6">
              <GenerationControls 
                denoising={denoising}
                setDenoising={setDenoising}
                seedValue={seedValue}
                setSeedValue={setSeedValue}
                model={model}
                setModel={setModel}
                isGenerating={isGenerating}
              />
              
              {history.length > 0 && (
                <div className="glass-panel rounded-lg p-4">
                  <h3 className="text-md font-semibold mb-4">Generation History</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-3">
                    {history.map(item => (
                      <HistoryItem
                        key={item.id}
                        id={item.id}
                        prompt={item.prompt}
                        imageUrl={item.imageUrl}
                        audioUrl={item.audioUrl}
                        onPlay={() => handlePlay(item)}
                        onDelete={() => handleDelete(item.id)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
        
        <footer className="mt-20 mb-4 text-center text-sm text-muted-foreground">
          <p>RiffFlow - Text-to-Music Generation | Inspired by Riffusion</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
