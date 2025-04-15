
import React from 'react';
import GenerationControls from './GenerationControls';
import GenerationHistory from './GenerationHistory';
import { Generation, GenerationParams } from '../hooks/useAudioGeneration';

interface ControlPanelProps {
  generationParams: GenerationParams;
  setDenoising: (value: number) => void;
  setSeedValue: (value: string) => void;
  setModel: (value: string) => void;
  isGenerating: boolean;
  history: Generation[];
  onPlay: (generation: Generation) => void;
  onDelete: (id: string) => void;
  apiStatus: 'online' | 'offline' | 'checking';
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  generationParams,
  setDenoising,
  setSeedValue,
  setModel,
  isGenerating,
  history,
  onPlay,
  onDelete,
  apiStatus
}) => {
  return (
    <div className="space-y-6">
      <GenerationControls 
        denoising={generationParams.denoising}
        setDenoising={setDenoising}
        seedValue={generationParams.seedValue}
        setSeedValue={setSeedValue}
        model={generationParams.model}
        setModel={setModel}
        isGenerating={isGenerating}
      />
      
      {history.length > 0 && (
        <GenerationHistory 
          history={history}
          onPlay={onPlay}
          onDelete={onDelete}
          apiStatus={apiStatus}
        />
      )}
    </div>
  );
};

export default ControlPanel;
