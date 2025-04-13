
import React from 'react';
import { API_CONFIG } from '../config/api';
import { AlertCircle, CheckCircle } from 'lucide-react';

const InstallationHelp = () => {
  return (
    <div className="mt-2 p-3 bg-background/80 rounded-md text-sm">
      <h4 className="font-semibold mb-2">Backend Installation Guide</h4>
      <p className="mb-2">Follow these steps to set up the Riffusion backend:</p>
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
      
      <div className="mt-4 border-t pt-3 border-border/40">
        <h5 className="font-medium mb-2">Troubleshooting Tips</h5>
        <ul className="space-y-1.5">
          <li className="flex items-start">
            <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 mr-1.5 flex-shrink-0" />
            <span>If you see CUDA errors, try <code className="bg-muted px-1 rounded">export CUDA_VISIBLE_DEVICES=-1</code> to use CPU</span>
          </li>
          <li className="flex items-start">
            <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 mr-1.5 flex-shrink-0" />
            <span>For GPU memory errors, reduce batch size in the Riffusion config</span>
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
