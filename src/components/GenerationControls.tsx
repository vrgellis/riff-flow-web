
import React from 'react';
import { Slider } from '../components/ui/slider';
import { Label } from '../components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../components/ui/select';

interface GenerationControlsProps {
  denoising: number;
  setDenoising: (value: number) => void;
  seedValue: string;
  setSeedValue: (value: string) => void;
  model: string;
  setModel: (value: string) => void;
  isGenerating: boolean;
}

const GenerationControls: React.FC<GenerationControlsProps> = ({
  denoising,
  setDenoising,
  seedValue,
  setSeedValue,
  model,
  setModel,
  isGenerating
}) => {
  return (
    <div className="w-full glass-panel rounded-lg p-4 space-y-4">
      <h3 className="text-md font-semibold">Generation Parameters</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="denoising">Denoising Strength</Label>
            <span className="text-sm text-muted-foreground">{denoising.toFixed(2)}</span>
          </div>
          <Slider
            id="denoising"
            value={[denoising]}
            min={0}
            max={1}
            step={0.01}
            disabled={isGenerating}
            onValueChange={(value) => setDenoising(value[0])}
          />
          <p className="text-xs text-muted-foreground">
            Controls how closely the generated audio follows the prompt
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="seed">Seed Value</Label>
          <input
            id="seed"
            type="text"
            value={seedValue}
            onChange={(e) => setSeedValue(e.target.value)}
            placeholder="Random"
            className="w-full h-10 rounded-md px-3 py-2 bg-secondary text-sm"
            disabled={isGenerating}
          />
          <p className="text-xs text-muted-foreground">
            Use the same seed to create variations of the same audio
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="model">Model</Label>
          <Select
            value={model}
            onValueChange={setModel}
            disabled={isGenerating}
          >
            <SelectTrigger id="model" className="w-full bg-secondary">
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="v1">Riffusion v1</SelectItem>
              <SelectItem value="v2">Riffusion v2</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default GenerationControls;
