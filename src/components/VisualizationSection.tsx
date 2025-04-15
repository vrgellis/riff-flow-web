
import React from 'react';
import Spectrogram from './Spectrogram';
import AudioPlayer from './AudioPlayer';
import { Generation } from '../hooks/useAudioGeneration';
import { AlertTriangle } from 'lucide-react';

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
      
      {/* Connection status indicator */}
      {!generation && !isGenerating && (
        <div className="p-4 bg-amber-100 border border-amber-300 rounded-md flex items-center">
          <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
          <p className="text-amber-800 text-sm">
            Waiting for content... If you're seeing "unable to connect", please check that both the frontend and backend servers are running.
          </p>
        </div>
      )}
    </div>
  );
};

export default VisualizationSection;
