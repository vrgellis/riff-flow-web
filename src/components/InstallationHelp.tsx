
import React from 'react';
import { API_CONFIG } from '../config/api';

const InstallationHelp = () => {
  return (
    <div className="mt-2 p-3 bg-background/80 rounded-md text-sm">
      <h4 className="font-semibold mb-2">Backend Installation Guide</h4>
      <p className="mb-2">To enable real music generation, install the Riffusion backend:</p>
      <ol className="list-decimal pl-5 space-y-1">
        <li>Clone the repo: <code className="bg-muted px-1 rounded">git clone {API_CONFIG.INSTALLATION_HELP.GITHUB_REPO}</code></li>
        <li>Install specific package versions:</li>
        <div className="bg-black/80 text-green-400 p-2 rounded font-mono text-xs mt-1 mb-2">
          {API_CONFIG.INSTALLATION_HELP.DEPENDENCY_FIXES.map((cmd, i) => (
            <div key={i}>{cmd}</div>
          ))}
        </div>
        <li>Start the server: <code className="bg-muted px-1 rounded">{API_CONFIG.INSTALLATION_HELP.START_SERVER}</code></li>
        <li>Set <code className="bg-muted px-1 rounded">DEMO_MODE: false</code> in <code className="bg-muted px-1 rounded">src/config/api.ts</code></li>
      </ol>
      <p className="mt-2 text-xs text-muted-foreground">More help: <a href={API_CONFIG.INSTALLATION_HELP.GITHUB_REPO} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Riffusion GitHub</a></p>
    </div>
  );
};

export default InstallationHelp;
