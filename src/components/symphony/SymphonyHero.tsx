import { motion } from 'framer-motion';
import { Sparkles, Workflow, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export function SymphonyHero() {
  const navigate = useNavigate();
  
  return (
    <section className="relative overflow-hidden">
      {/* Hero gradient background */}
      <div className="absolute inset-0 hero-gradient opacity-90 dark:opacity-20" />
      <div className="absolute inset-0 hero-gradient-dark opacity-0 dark:opacity-90" />
      
      {/* Animated orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-cyan-accent/20 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: '-10%', left: '10%' }}
        />
        <motion.div
          className="absolute w-80 h-80 rounded-full bg-purple-accent/20 blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: '20%', right: '5%' }}
        />
      </div>
      
      {/* Content */}
      <div className="relative container py-20 lg:py-28">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium text-white"
          >
            <Sparkles className="w-4 h-4 text-cyan-accent" />
            <span>11-Agent Symphony Architecture</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white"
          >
            Orchestrate Your
            <span className="text-gradient-rainbow block mt-2">AI Workforce</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/80 max-w-2xl mx-auto"
          >
            A 6-phase workflow system with 11 specialized AI agents, each with defined RACI responsibilities for seamless enterprise automation.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <Button 
              size="lg" 
              className="btn-premium"
              onClick={() => navigate('/personas')}
            >
              <Users className="w-4 h-4 mr-2" />
              View Agent Roster
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/20 text-white hover:bg-white/10"
              onClick={() => navigate('/knowledge')}
            >
              <Workflow className="w-4 h-4 mr-2" />
              Explore Workflows
            </Button>
          </motion.div>
          
          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-8 pt-8 text-white/60"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-white">11</div>
              <div className="text-sm">AI Agents</div>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white">6</div>
              <div className="text-sm">Phases</div>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white">4</div>
              <div className="text-sm">RACI Roles</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
