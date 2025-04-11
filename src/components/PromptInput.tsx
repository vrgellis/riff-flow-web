
import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Wand2 } from 'lucide-react';
import { toast } from 'sonner';

interface PromptInputProps {
  onGenerate: (prompt: string) => void;
  isGenerating: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({ onGenerate, isGenerating }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() === '') {
      toast.error('Please enter a prompt');
      return;
    }
    onGenerate(prompt);
  };

  const placeholder = "Try 'jazz piano with drums', 'synth melody', 'rock guitar solo'...";

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col space-y-2">
        <label htmlFor="prompt" className="text-sm font-medium">
          Describe the music you want to create
        </label>
        <div className="flex space-x-2">
          <Input
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-background border-secondary"
            disabled={isGenerating}
          />
          <Button 
            type="submit" 
            disabled={isGenerating}
            className="bg-primary hover:bg-primary/90 transition-colors"
          >
            <Wand2 className="mr-2 h-4 w-4" />
            {isGenerating ? 'Generating...' : 'Generate'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default PromptInput;
