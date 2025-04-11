
import React from 'react';
import { Music, Github } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full p-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Music className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-300">
          RiffFlow
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <a 
          href="https://github.com/riffusion/riffusion" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center space-x-1 text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          <Github className="h-4 w-4" />
          <span>Based on Riffusion</span>
        </a>
      </div>
    </header>
  );
};

export default Header;
