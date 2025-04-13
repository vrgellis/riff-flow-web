
import React from 'react';
import HistoryItem from './HistoryItem';

interface Generation {
  id: string;
  prompt: string;
  imageUrl: string;
  audioUrl: string;
  seed: string;
  timestamp: Date;
}

interface GenerationHistoryProps {
  history: Generation[];
  onPlay: (generation: Generation) => void;
  onDelete: (id: string) => void;
}

const GenerationHistory: React.FC<GenerationHistoryProps> = ({ 
  history, 
  onPlay, 
  onDelete 
}) => {
  if (history.length === 0) {
    return null;
  }

  return (
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
            onPlay={() => onPlay(item)}
            onDelete={() => onDelete(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default GenerationHistory;
