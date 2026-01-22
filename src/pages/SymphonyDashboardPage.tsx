import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SymphonyHero } from '@/components/symphony/SymphonyHero';
import { SymphonyPhaseGrid } from '@/components/symphony/SymphonyPhaseGrid';
import { SymphonyAgentNetwork } from '@/components/symphony/SymphonyAgentNetwork';
import { SymphonyRACIMatrix } from '@/components/symphony/SymphonyRACIMatrix';
import { SymphonyMetricsBar } from '@/components/symphony/SymphonyMetricsBar';
import { ZoneConfigWizard } from '@/components/symphony/ZoneConfigWizard';
import { Button } from '@/components/ui/button';
import { useSymphonyData } from '@/hooks/useSymphonyData';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, Sparkles } from 'lucide-react';

export default function SymphonyDashboardPage() {
  const { user } = useAuth();
  const { 
    agents, 
    phases, 
    tasks, 
    isLoading, 
    hasData, 
    initializeData, 
    isInitializing 
  } = useSymphonyData();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section with gradient background */}
        <SymphonyHero />
        
        {/* Metrics Bar with real-time data */}
        <SymphonyMetricsBar 
          agents={agents} 
          phases={phases} 
          tasks={tasks}
          isLoading={isLoading}
        />
        
        {/* Initialize Data Button for authenticated users without data */}
        {user && !hasData && !isLoading && (
          <div className="container py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card-light dark:glass-card rounded-2xl p-8 text-center"
            >
              <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-display text-xl font-bold mb-2">Initialize Your Symphony</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Set up your personalized 11-agent Symphony with 6 workflow phases to start orchestrating your AI workforce.
              </p>
              <Button 
                onClick={() => initializeData()}
                disabled={isInitializing}
                className="btn-premium"
              >
                {isInitializing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Initializing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Initialize Symphony Data
                  </>
                )}
              </Button>
            </motion.div>
          </div>
        )}
        
        {/* Main Content */}
        <div className="container py-12 space-y-16">
          {/* Zone Configuration */}
          <div className="flex justify-end">
            <ZoneConfigWizard onComplete={(config) => console.log('Zone config:', config)} />
          </div>
          
          {/* Agent Network Visualization */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <SymphonyAgentNetwork agents={agents} tasks={tasks} />
          </motion.section>
          
          {/* 6-Phase Workflow Grid */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <SymphonyPhaseGrid phases={phases} />
          </motion.section>
          
          {/* RACI Matrix */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <SymphonyRACIMatrix />
          </motion.section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
