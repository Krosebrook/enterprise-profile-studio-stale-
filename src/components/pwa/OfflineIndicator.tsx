import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, CloudOff, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useOnlineStatus } from '@/hooks/usePWA';

export function OfflineIndicator() {
  const isOnline = useOnlineStatus();

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-0 left-0 right-0 z-[100] bg-amber-500 text-amber-950 px-4 py-2"
        >
          <div className="container mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <WifiOff className="h-4 w-4" />
              <span className="text-sm font-medium">
                You're offline. Some features may be limited.
              </span>
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="h-7 text-amber-950 hover:text-amber-950 hover:bg-amber-400"
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="mr-1 h-3 w-3" />
              Retry
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Compact version for use in cards/sections
export function OfflineBadge() {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
      <CloudOff className="h-3 w-3" />
      Offline
    </div>
  );
}
