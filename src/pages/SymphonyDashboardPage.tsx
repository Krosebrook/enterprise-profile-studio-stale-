import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SymphonyHero } from '@/components/symphony/SymphonyHero';
import { SymphonyPhaseGrid } from '@/components/symphony/SymphonyPhaseGrid';
import { SymphonyAgentNetwork } from '@/components/symphony/SymphonyAgentNetwork';
import { SymphonyRACIMatrix } from '@/components/symphony/SymphonyRACIMatrix';
import { SymphonyMetricsBar } from '@/components/symphony/SymphonyMetricsBar';

export default function SymphonyDashboardPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section with gradient background */}
        <SymphonyHero />
        
        {/* Metrics Bar */}
        <SymphonyMetricsBar />
        
        {/* Main Content */}
        <div className="container py-12 space-y-16">
          {/* Agent Network Visualization */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <SymphonyAgentNetwork />
          </motion.section>
          
          {/* 6-Phase Workflow Grid */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <SymphonyPhaseGrid />
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
