
import React from 'react';

interface SpectrogramProps {
  imageUrl?: string;
  isGenerating: boolean;
}

const Spectrogram: React.FC<SpectrogramProps> = ({ imageUrl, isGenerating }) => {
  return (
    <div className="relative w-full aspect-square max-w-md mx-auto rounded-lg overflow-hidden shadow-lg transition-all duration-500 hover:shadow-xl">
      <div className={`absolute inset-0 spectrogram-gradient opacity-20 ${isGenerating ? 'animate-pulse-glow' : ''}`} />
      
      {imageUrl ? (
        <div className="relative w-full h-full overflow-hidden">
          <img 
            src={imageUrl} 
            alt="Audio spectrogram" 
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center glass-panel">
          {isGenerating ? (
            <div className="text-center">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              <p className="mt-4 text-muted-foreground animate-pulse">Generating audio...</p>
            </div>
          ) : (
            <div className="text-center p-6 transform transition-transform duration-500 hover:scale-105">
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
