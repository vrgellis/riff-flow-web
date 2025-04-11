
import React, { useState, useEffect } from 'react';
import { Music, Github, Wifi, WifiOff } from 'lucide-react';

const Header = () => {
  const [isApiConnected, setIsApiConnected] = useState(false);
  
  // Check if Riffusion API is reachable
  useEffect(() => {
    const checkApiConnection = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/health', { 
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setIsApiConnected(response.ok);
      } catch (error) {
        console.error('API connection check failed:', error);
        setIsApiConnected(false);
      }
    };
    
    checkApiConnection();
    const interval = setInterval(checkApiConnection, 30000); // Check every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="w-full p-4 flex justify-between items-center backdrop-blur-sm bg-background/70 sticky top-0 z-10 border-b border-border/40">
      <div className="flex items-center space-x-2 transition-all duration-300 hover:scale-105">
        <Music className="h-8 w-8 text-primary animate-pulse" />
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-300">
          RiffFlow
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1 text-xs">
          {isApiConnected ? (
            <div className="flex items-center text-green-400">
              <Wifi className="h-4 w-4 mr-1" />
              <span>API Connected</span>
            </div>
          ) : (
            <div className="flex items-center text-red-400">
              <WifiOff className="h-4 w-4 mr-1" />
              <span>API Disconnected</span>
            </div>
          )}
        </div>
        <a 
          href="https://github.com/riffusion/riffusion" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center space-x-1 text-xs text-muted-foreground hover:text-primary transition-colors duration-300"
        >
          <Github className="h-4 w-4" />
          <span>Based on Riffusion</span>
        </a>
      </div>
    </header>
  );
};

export default Header;
