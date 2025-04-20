
import React, { useState } from 'react';
import { Alert, AlertDescription } from "../components/ui/alert";
import { Button } from "../components/ui/button";
import { AlertTriangle, HelpCircle, RefreshCw, ExternalLink, Terminal } from "lucide-react";
import InstallationHelp from './InstallationHelp';
import { API_CONFIG } from '../config/api';

const DemoModeBanner = () => {
  const [showInstallHelp, setShowInstallHelp] = useState(false);

  const toggleInstallHelp = () => {
    setShowInstallHelp(!showInstallHelp);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleRunFixScript = () => {
    // This can only provide guidance as we can't actually run the script from the browser
    alert("Please open a command prompt in your project directory and run 'fix-riffusion-server.bat', then restart your frontend with 'npm run dev'");
  };

  return (
    <div className="w-full glass-panel rounded-lg p-4 mb-6 bg-amber-500/20 border border-amber-500/30">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-amber-600 mr-2" />
            <p className="font-medium text-amber-700">
              {API_CONFIG.DEMO_MODE ? 
                "Demo Mode Active — Using pre-recorded sample audio" : 
                "API Connection Issue — Using pre-recorded sample audio"}
            </p>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleRunFixScript}
              className="text-amber-700 border-amber-500/50 hover:bg-amber-500/10"
            >
              <Terminal className="h-4 w-4 mr-1" />
              Fix Server
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleRefresh}
              className="text-amber-700 border-amber-500/50 hover:bg-amber-500/10"
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Reconnect
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleInstallHelp}
              className="text-amber-700 border-amber-500/50 hover:bg-amber-500/10"
            >
              <HelpCircle className="h-4 w-4 mr-1" />
              {showInstallHelp ? "Hide Help" : "Setup Help"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-amber-700 border-amber-500/50 hover:bg-amber-500/10"
              onClick={() => window.open('https://github.com/riffusion/riffusion/issues', '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              Issues
            </Button>
          </div>
        </div>

        {showInstallHelp && <InstallationHelp />}
      </div>
    </div>
  );
};

export default DemoModeBanner;
