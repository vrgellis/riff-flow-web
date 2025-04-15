
import React from 'react';
import Spectrogram from './Spectrogram';
import AudioPlayer from './AudioPlayer';
import { Generation } from '../hooks/useAudioGeneration';

interface VisualizationSectionProps {
  generation: Generation | null;
  isGenerating: boolean;
}

const VisualizationSection: React.FC<VisualizationSectionProps> = ({ 
  generation, 
  isGenerating 
}) => {
  return (
    <div className="md:col-span-2 space-y-6">
      <Spectrogram 
        imageUrl={generation?.imageUrl} 
        isGenerating={isGenerating} 
      />
      
      <AudioPlayer audioUrl={generation?.audioUrl} />
    </div>
  );
};

export default VisualizationSection;
