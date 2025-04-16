
import React, { useState } from 'react';
import { API_CONFIG } from '../config/api';
import { AlertCircle, CheckCircle, Copy, Terminal, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner';

const InstallationHelp = () => {
  const [platform, setPlatform] = useState<'windows' | 'mac_linux'>('windows');

  const copyToClipboard = (commands: string[]) => {
    const text = commands.join('\n');
    navigator.clipboard.writeText(text);
    toast.success('Commands copied to clipboard!');
  };

  const platformCommands = platform === 'windows' 
    ? API_CONFIG.INSTALLATION_HELP.ONE_CLICK_SETUP.WINDOWS
    : API_CONFIG.INSTALLATION_HELP.ONE_CLICK_SETUP.MAC_LINUX;

  return (
    <div className="mt-2 p-3 bg-background/80 rounded-md text-sm">
      <h4 className="font-semibold mb-2">Backend Installation Guide</h4>
      
      <div className="mb-3 p-3 bg-amber-100 border border-amber-300 rounded-md">
        <div className="flex items-start space-x-2">
          <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-amber-800">Common CLIPImageProcessor Error</p>
            <p className="text-amber-700 text-xs mt-1">
              If you're seeing <code className="bg-amber-200 px-1 rounded">AttributeError: module transformers has no attribute CLIPImageProcessor</code>, 
              use the specific package versions in our fix script:
            </p>
            <ul className="list-disc list-inside text-amber-700 text-xs mt-1 ml-2">
              <li>transformers==4.19.2 (not newer versions)</li>
              <li>diffusers==0.9.0</li>
              <li>Install CLIP directly from GitHub</li>
            </ul>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="quick" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-2">
          <TabsTrigger value="quick">Quick Setup</TabsTrigger>
          <TabsTrigger value="manual">Manual Setup</TabsTrigger>
        </TabsList>
        
        <TabsContent value="quick">
          <div className="mb-3">
            <p className="mb-2">Select your platform and run these commands to set up the Riffusion backend:</p>
            
            <div className="flex gap-2 mb-3">
              <Button 
                variant={platform === 'windows' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setPlatform('windows')}
              >
                Windows
              </Button>
              <Button 
                variant={platform === 'mac_linux' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setPlatform('mac_linux')}
              >
                Mac/Linux
              </Button>
            </div>
            
            <div className="relative">
              <div className="bg-black/80 text-green-400 p-2 rounded font-mono text-xs mt-1 mb-2">
                {platformCommands.map((cmd, i) => (
                  <div key={i}>{cmd}</div>
                ))}
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="absolute top-2 right-2 h-6 w-6 p-0"
                onClick={() => copyToClipboard(platformCommands)}
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
            
            <div className="flex items-start mt-3 text-xs">
              <Terminal className="h-4 w-4 text-primary mt-0.5 mr-1.5 flex-shrink-0" />
              <span>Run these commands in your terminal to clone, set up, and start the Riffusion server automatically.</span>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="manual">
          <ol className="list-decimal pl-5 space-y-1">
            <li>Clone the repo: <code className="bg-muted px-1 rounded">git clone {API_CONFIG.INSTALLATION_HELP.GITHUB_REPO}</code></li>
            <li>Install specific package versions:</li>
            <div className="bg-black/80 text-green-400 p-2 rounded font-mono text-xs mt-1 mb-2">
              {API_CONFIG.INSTALLATION_HELP.DEPENDENCY_FIXES.map((cmd, i) => (
                <div key={i}>{cmd}</div>
              ))}
            </div>
            <li>Start the server: <code className="bg-muted px-1 rounded">{API_CONFIG.INSTALLATION_HELP.START_SERVER}</code></li>
            <li>Ensure the server runs on port 8000 (default)</li>
            <li>Verify the API is running by checking <code className="bg-muted px-1 rounded">http://localhost:8000/api/health</code></li>
          </ol>
        </TabsContent>
      </Tabs>
      
      <div className="mt-4 border-t pt-3 border-border/40">
        <h5 className="font-medium mb-2">Troubleshooting Tips</h5>
        <ul className="space-y-1.5">
          <li className="flex items-start">
            <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 mr-1.5 flex-shrink-0" />
            <span>If you see CUDA errors, try <code className="bg-muted px-1 rounded">export CUDA_VISIBLE_DEVICES=-1</code> to use CPU</span>
          </li>
          <li className="flex items-start">
            <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 mr-1.5 flex-shrink-0" />
            <span>For ffmpeg errors, install <code className="bg-muted px-1 rounded">pip install imageio-ffmpeg</code></span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-1.5 flex-shrink-0" />
            <span>Verify connection by checking API health at <code className="bg-muted px-1 rounded">http://localhost:8000/api/health</code></span>
          </li>
        </ul>
      </div>
      
      <p className="mt-2 text-xs text-muted-foreground">More help: <a href={API_CONFIG.INSTALLATION_HELP.GITHUB_REPO} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Riffusion GitHub</a></p>
    </div>
  );
};

export default InstallationHelp;
