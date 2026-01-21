import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Settings, Cloud, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SplashStepProps {
  onGetStarted: () => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

interface Node {
  cx: number;
  cy: number;
  pulseDelay: number;
}

interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export function SplashStep({ onGetStarted }: SplashStepProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const featureIcons = [
    { icon: Sparkles, label: 'AI Integration' },
    { icon: Settings, label: 'Smart Config' },
    { icon: Cloud, label: 'Cloud Sync' },
    { icon: ShieldCheck, label: 'Secure' },
  ];

  // Generate random particles
  const particles: Particle[] = useMemo(() => 
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    })), []
  );

  // Network nodes with pulse animation delays
  const nodes: Node[] = useMemo(() => [
    { cx: 50, cy: 100, pulseDelay: 0 },
    { cx: 150, cy: 80, pulseDelay: 0.2 },
    { cx: 250, cy: 120, pulseDelay: 0.4 },
    { cx: 350, cy: 100, pulseDelay: 0.6 },
    { cx: 100, cy: 180, pulseDelay: 0.3 },
    { cx: 200, cy: 160, pulseDelay: 0.5 },
    { cx: 300, cy: 200, pulseDelay: 0.7 },
    { cx: 80, cy: 260, pulseDelay: 0.1 },
    { cx: 180, cy: 240, pulseDelay: 0.4 },
    { cx: 280, cy: 280, pulseDelay: 0.6 },
    { cx: 350, cy: 260, pulseDelay: 0.8 },
    { cx: 120, cy: 320, pulseDelay: 0.2 },
    { cx: 220, cy: 300, pulseDelay: 0.5 },
    { cx: 320, cy: 340, pulseDelay: 0.7 },
  ], []);

  // Network lines
  const lines: Line[] = useMemo(() => [
    { x1: 50, y1: 100, x2: 150, y2: 80 },
    { x1: 150, y1: 80, x2: 250, y2: 120 },
    { x1: 250, y1: 120, x2: 350, y2: 100 },
    { x1: 100, y1: 180, x2: 200, y2: 160 },
    { x1: 200, y1: 160, x2: 300, y2: 200 },
    { x1: 80, y1: 260, x2: 180, y2: 240 },
    { x1: 180, y1: 240, x2: 280, y2: 280 },
    { x1: 280, y1: 280, x2: 350, y2: 260 },
    { x1: 120, y1: 320, x2: 220, y2: 300 },
    { x1: 220, y1: 300, x2: 320, y2: 340 },
    { x1: 150, y1: 80, x2: 100, y2: 180 },
    { x1: 250, y1: 120, x2: 300, y2: 200 },
    { x1: 200, y1: 160, x2: 180, y2: 240 },
    { x1: 180, y1: 240, x2: 220, y2: 300 },
  ], []);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-onboarding-dark">
      {/* Floating Particles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {mounted && particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-primary/30"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Abstract Network Visualization */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px]">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <defs>
            <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(180 100% 60%)" stopOpacity="1" />
              <stop offset="50%" stopColor="hsl(180 100% 50%)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="hsl(180 100% 50%)" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(180 100% 50%)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="hsl(260 100% 60%)" stopOpacity="0.3" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Animated network lines with traveling pulse */}
          {lines.map((line, i) => (
            <g key={`line-${i}`}>
              {/* Base line */}
              <motion.line
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke="url(#lineGradient)"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{ duration: 1.5, delay: i * 0.08 }}
              />
              {/* Animated pulse traveling along the line */}
              <motion.circle
                r="2"
                fill="hsl(180 100% 70%)"
                filter="url(#glow)"
                initial={{ opacity: 0 }}
                animate={{
                  cx: [line.x1, line.x2],
                  cy: [line.y1, line.y2],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  delay: 2 + i * 0.3,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "linear",
                }}
              />
            </g>
          ))}
          
          {/* Glowing network nodes */}
          {nodes.map((node, i) => (
            <g key={`node-${i}`}>
              {/* Outer glow */}
              <motion.circle
                cx={node.cx}
                cy={node.cy}
                r="12"
                fill="url(#nodeGlow)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ 
                  duration: 2,
                  delay: node.pulseDelay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              {/* Core node */}
              <motion.circle
                cx={node.cx}
                cy={node.cy}
                r="4"
                fill="hsl(180 100% 60%)"
                filter="url(#glow)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.05 }}
              />
            </g>
          ))}
        </svg>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-onboarding-dark via-transparent to-onboarding-dark/80" />
      </div>

      {/* Content */}
      <div className="relative flex flex-1 flex-col justify-end pb-8 px-6">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
            Your Unified AI
            <br />
            Identity
          </h1>
          <p className="text-muted-foreground text-lg max-w-xs mx-auto">
            Manage OpenAI, Google, Microsoft, and Anthropic in one professional hub.
          </p>
        </motion.div>

        {/* Feature Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex justify-center gap-8 mb-8"
        >
          {featureIcons.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 1.4 + index * 0.1 }}
              className="flex flex-col items-center gap-2"
            >
              <motion.div 
                className="p-2 rounded-full bg-white/5 border border-white/10"
                whileHover={{ scale: 1.1, borderColor: 'rgba(139, 92, 246, 0.5)' }}
              >
                <item.icon className="w-5 h-5 text-muted-foreground" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Carousel dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="flex justify-center gap-2 mb-8"
        >
          <motion.div 
            className="w-8 h-1.5 rounded-full bg-primary"
            layoutId="carouselIndicator"
          />
          <div className="w-2 h-1.5 rounded-full bg-white/20" />
          <div className="w-2 h-1.5 rounded-full bg-white/20" />
        </motion.div>

        {/* Get Started Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          <Button
            onClick={onGetStarted}
            className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg shadow-primary/25 relative overflow-hidden group"
          >
            <span className="relative z-10">Get Started</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 1.5, delay: 2.5, repeat: Infinity, repeatDelay: 3 }}
            />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
