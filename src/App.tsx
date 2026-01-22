import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AnimatedRoutes } from "@/components/layout/AnimatedRoutes";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { KeyboardShortcutsHelp } from "@/components/ui/KeyboardShortcutsHelp";
import { PWAInstallPrompt, PWAUpdatePrompt, OfflineIndicator } from "@/components/pwa";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors
        if (error instanceof Error && error.message.includes('4')) {
          return false;
        }
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* PWA Components */}
          <OfflineIndicator />
          <PWAInstallPrompt />
          <PWAUpdatePrompt />
          
          {/* Core App */}
          <CommandPalette />
          <KeyboardShortcutsHelp />
          <AnimatedRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
