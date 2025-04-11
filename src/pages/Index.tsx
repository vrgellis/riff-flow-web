
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

// Sample placeholder audio and images for demonstration
const DEMO_AUDIO_URL = 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-0.mp3';
const PLACEHOLDER_IMAGES = [
  'https://miro.medium.com/v2/resize:fit:1400/1*yximehCnSiQJcN7LUIQtEw.png',
  'https://miro.medium.com/v2/resize:fit:1400/1*TnleD2BzfkFMkfx0ZulAHQ.png',
  'https://miro.medium.com/v2/resize:fit:1400/1*0wFVfdJoI-Z1nC7e3zvcPQ.png'
];

const Index = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentGeneration, setCurrentGeneration] = useState<Generation | null>(null);
  const [history, setHistory] = useState<Generation[]>([]);
  
  // Generation parameters
  const [denoising, setDenoising] = useState(0.75);
  const [seedValue, setSeedValue] = useState('');
  const [model, setModel] = useState('v1');

  const generateMusic = async (prompt: string) => {
    setIsGenerating(true);
    
    try {
      // In a real implementation, this would call an API to generate the audio
      // For demo purposes, we'll simulate a network request with setTimeout
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Create a demo generation with a random image from our placeholders
      const randomImage = PLACEHOLDER_IMAGES[Math.floor(Math.random() * PLACEHOLDER_IMAGES.length)];
      const newGeneration: Generation = {
        id: `gen-${Date.now()}`,
        prompt,
        imageUrl: randomImage,
        audioUrl: DEMO_AUDIO_URL,
        seed: seedValue || Math.floor(Math.random() * 1000000).toString(),
        timestamp: new Date()
      };
      
      setCurrentGeneration(newGeneration);
      setHistory(prev => [newGeneration, ...prev]);
      toast.success('Generation complete!');
    } catch (error) {
      console.error('Generation failed:', error);
      toast.error('Failed to generate music. Please try again.');
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
