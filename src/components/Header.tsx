
import React from 'react';
import { Music4, Waveform, RefreshCw } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface HeaderProps {
  apiStatus?: 'online' | 'offline' | 'checking';
}

const Header: React.FC<HeaderProps> = ({ apiStatus = 'checking' }) => {
  const handleRefreshStatus = () => {
    window.location.reload();
  };

  return (
    <header className="w-full flex flex-col space-y-2 md:flex-row md:space-y-0 md:items-center md:justify-between">
      <div className="flex items-center space-x-2">
        <Music4 className="h-8 w-8 text-primary animate-float" />
        <h1 className="text-2xl font-bold tracking-tight">RiffFlow</h1>
        <Waveform className="h-5 w-5 text-primary/80" />
      </div>
      
      <div className="flex items-center space-x-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center space-x-2">
                <Badge 
                  variant={
                    apiStatus === 'online' ? 'default' : 
                    apiStatus === 'offline' ? 'destructive' : 
                    'outline'
                  }
                  className={
                    apiStatus === 'online' ? 'bg-green-600 hover:bg-green-700' : 
                    apiStatus === 'checking' ? 'animate-pulse' : ''
                  }
                >
                  {apiStatus === 'online' ? 'API Connected' : 
                   apiStatus === 'offline' ? 'API Offline' : 
                   'Checking API...'}
                </Badge>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8" 
                  onClick={handleRefreshStatus}
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {apiStatus === 'online' ? 'Riffusion API is connected and ready to generate music.' : 
                 apiStatus === 'offline' ? 'Riffusion API is not reachable. Make sure your local server is running.' : 
                 'Checking connection to Riffusion API...'}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </header>
  );
};

export default Header;
