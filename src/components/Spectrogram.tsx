
import React from 'react';

interface SpectrogramProps {
  imageUrl?: string;
  isGenerating: boolean;
}

const Spectrogram: React.FC<SpectrogramProps> = ({ imageUrl, isGenerating }) => {
  return (
    <div className="relative w-full aspect-square max-w-md mx-auto rounded-lg overflow-hidden">
      <div className={`absolute inset-0 spectrogram-gradient opacity-20 ${isGenerating ? 'animate-pulse-glow' : ''}`} />
      
      {imageUrl ? (
        <img 
          src={imageUrl} 
          alt="Audio spectrogram" 
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center glass-panel">
          {isGenerating ? (
            <div className="text-center">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              <p className="mt-4 text-muted-foreground">Generating audio...</p>
            </div>
          ) : (
            <div className="text-center p-6">
              <p className="text-xl font-semibold text-primary">Audio Spectrogram</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Enter a prompt to generate audio and see its spectrogram visualization
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Spectrogram;
