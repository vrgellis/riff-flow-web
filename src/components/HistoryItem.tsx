
import React from 'react';
import { Play, Download, Trash2, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from '../components/ui/tooltip';

interface HistoryItemProps {
  id: string;
  prompt: string;
  imageUrl: string;
  audioUrl: string;
  onPlay: () => void;
  onDelete: () => void;
  isDemoMode?: boolean;
}

const HistoryItem: React.FC<HistoryItemProps> = ({
  prompt,
  imageUrl,
  audioUrl,
  onPlay,
  onDelete,
  isDemoMode = false
}) => {
  return (
    <div className="glass-panel rounded-lg overflow-hidden flex flex-col">
      <div 
        className="h-24 w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="p-3 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <p className="text-sm line-clamp-2 flex-1">{prompt}</p>
          {isDemoMode && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <AlertCircle className="h-3.5 w-3.5 text-amber-500 ml-1 flex-shrink-0" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Sample audio (demo mode)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <div className="flex justify-between mt-auto">
          <Button
            size="sm"
            variant="secondary"
            className="h-8 px-2 bg-secondary/60 hover:bg-secondary"
            onClick={onPlay}
          >
            <Play className="h-3 w-3 mr-1" />
            <span className="text-xs">Play</span>
          </Button>
          
          <div className="flex space-x-1">
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0"
              asChild
            >
              <a href={audioUrl} download>
                <Download className="h-3 w-3" />
              </a>
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 hover:text-destructive"
              onClick={onDelete}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryItem;
