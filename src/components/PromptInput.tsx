
import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Wand2, Music, Guitar } from 'lucide-react';
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

  const genres = [
    { name: "Jazz", prompt: "smooth jazz piano with saxophone" },
    { name: "Blues", prompt: "blues guitar with harmonica" },
    { name: "Rock", prompt: "classic rock guitar riff with drums" },
    { name: "Folk", prompt: "acoustic folk guitar with violin" },
    { name: "Reggae", prompt: "reggae rhythm with bass and drums" },
    { name: "Pop", prompt: "upbeat pop melody with synth" },
    { name: "Movie Theme", prompt: "epic orchestral movie soundtrack" }
  ];

  const handleGenreClick = (genrePrompt: string) => {
    setPrompt(genrePrompt);
  };

  return (
    <div className="w-full space-y-4">
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
      
      <div className="w-full">
        <p className="text-sm text-muted-foreground mb-2">Quick genres:</p>
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <Button
              key={genre.name}
              variant="outline"
              size="sm"
              className="transition-all duration-200 hover:bg-accent/50 hover:border-primary/50 hover:text-primary"
              onClick={() => handleGenreClick(genre.prompt)}
              disabled={isGenerating}
            >
              {genre.name === "Rock" || genre.name === "Folk" || genre.name === "Blues" ? (
                <Guitar className="mr-1 h-3.5 w-3.5" />
              ) : (
                <Music className="mr-1 h-3.5 w-3.5" />
              )}
              {genre.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromptInput;
