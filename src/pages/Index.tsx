
import React from 'react';
import Header from '../components/Header';
import PromptInput from '../components/PromptInput';
import DemoModeBanner from '../components/DemoModeBanner';
import VisualizationSection from '../components/VisualizationSection';
import ControlPanel from '../components/ControlPanel';
import { useAudioGeneration } from '../hooks/useAudioGeneration';
import { API_CONFIG } from '../config/api';

const Index = () => {
  const {
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
  } = useAudioGeneration();

  return (
    <div className="min-h-screen app-gradient text-foreground">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Header apiStatus={apiStatus} />
        
        <main className="mt-8">
          {API_CONFIG.DEMO_MODE && <DemoModeBanner />}
          
          <div className="w-full glass-panel rounded-lg p-6 mb-8">
            <PromptInput onGenerate={generateMusic} isGenerating={isGenerating} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <VisualizationSection 
              generation={currentGeneration} 
              isGenerating={isGenerating} 
            />
            
            <ControlPanel 
              generationParams={generationParams}
              setDenoising={setDenoising}
              setSeedValue={setSeedValue}
              setModel={setModel}
              isGenerating={isGenerating}
              history={history}
              onPlay={handlePlay}
              onDelete={handleDelete}
              apiStatus={apiStatus}
            />
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
