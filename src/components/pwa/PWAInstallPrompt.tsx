import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Smartphone, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { usePWA } from '@/hooks/usePWA';

export function PWAInstallPrompt() {
  const { isInstallable, isInstalled, promptInstall } = usePWA();
  const [isDismissed, setIsDismissed] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  // Check if user previously dismissed
  useEffect(() => {
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (dismissed) {
      const dismissedDate = new Date(dismissed);
      const daysSinceDismissed = (Date.now() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24);
      // Show again after 7 days
      if (daysSinceDismissed < 7) {
        setIsDismissed(true);
      }
    }
  }, []);

  const handleInstall = async () => {
    setIsInstalling(true);
    const installed = await promptInstall();
    setIsInstalling(false);
    
    if (!installed) {
      // User declined, don't show again for a while
      handleDismiss();
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('pwa-install-dismissed', new Date().toISOString());
  };

  if (!isInstallable || isInstalled || isDismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm"
      >
        <Card className="border-primary/20 bg-card/95 backdrop-blur-lg shadow-2xl">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Download className="h-5 w-5 text-primary" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground">Install INT OS</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Install for faster access, offline support, and a native app experience.
                </p>
                
                <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <Smartphone className="h-3.5 w-3.5" />
                  <span>Mobile</span>
                  <span className="text-border">•</span>
                  <Monitor className="h-3.5 w-3.5" />
                  <span>Desktop</span>
                </div>
                
                <div className="mt-4 flex gap-2">
                  <Button 
                    size="sm" 
                    onClick={handleInstall}
                    disabled={isInstalling}
                    className="flex-1"
                  >
                    {isInstalling ? 'Installing...' : 'Install'}
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={handleDismiss}
                  >
                    Not now
                  </Button>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 shrink-0"
                onClick={handleDismiss}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
