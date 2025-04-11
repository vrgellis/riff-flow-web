
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, Volume2 } from 'lucide-react';
import { Slider } from '../components/ui/slider';
import { Button } from '../components/ui/button';

interface AudioPlayerProps {
  audioUrl?: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioUrl && audioRef.current) {
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, [audioUrl]);

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const restart = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    setCurrentTime(0);
    if (!isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className={`w-full glass-panel rounded-lg p-4 ${!audioUrl ? 'opacity-50 pointer-events-none' : ''}`}>
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
        />
      )}
      
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">{formatTime(currentTime)}</span>
          <span className="text-sm text-muted-foreground">{formatTime(duration)}</span>
        </div>
        
        <Slider
          value={[currentTime]}
          max={duration || 100}
          step={0.01}
          className="cursor-pointer"
          onValueChange={(value) => {
            if (audioRef.current) {
              audioRef.current.currentTime = value[0];
              setCurrentTime(value[0]);
            }
          }}
        />
        
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={restart}
              disabled={!audioUrl}
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            
            <Button
              variant="default"
              size="icon"
              className="h-10 w-10 rounded-full bg-primary hover:bg-primary/90"
              onClick={togglePlayPause}
              disabled={!audioUrl}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5 ml-0.5" />
              )}
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Volume2 className="h-4 w-4 text-muted-foreground" />
            <Slider
              value={[volume]}
              max={100}
              step={1}
              className="w-24 cursor-pointer"
              onValueChange={handleVolumeChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
