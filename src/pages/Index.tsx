
import React, { useState } from 'react';
import Header from '../components/Header';
import PromptInput from '../components/PromptInput';
import Spectrogram from '../components/Spectrogram';
import AudioPlayer from '../components/AudioPlayer';
import GenerationControls from '../components/GenerationControls';
import HistoryItem from '../components/HistoryItem';
import { Separator } from '../components/ui/separator';
import { toast } from 'sonner';

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
  
  // Generation parameters
  const [denoising, setDenoising] = useState(0.75);
  const [seedValue, setSeedValue] = useState('');
  const [model, setModel] = useState('v1');

  // Riffusion API URL - adjust this to your local setup
  const RIFFUSION_API_URL = 'http://localhost:8000/api';

  const generateMusic = async (prompt: string) => {
    setIsGenerating(true);
    
    try {
      const seed = seedValue || Math.floor(Math.random() * 1000000).toString();
      
      // Call to Riffusion API
      const response = await fetch(`${RIFFUSION_API_URL}/generate`, {
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
        imageUrl: data.image_url || `${RIFFUSION_API_URL}/spectrogram/${data.id}.png`,
        audioUrl: data.audio_url || `${RIFFUSION_API_URL}/audio/${data.id}.wav`,
        seed,
        timestamp: new Date()
      };
      
      setCurrentGeneration(newGeneration);
      setHistory(prev => [newGeneration, ...prev]);
      toast.success('Generation complete!');
    } catch (error) {
      console.error('Generation failed:', error);
      toast.error('Failed to generate music. Please check if Riffusion API is running.');
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
        <Header />
        
        <main className="mt-8">
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
