import { motion } from 'framer-motion';
import { Sparkles, Settings, Cloud, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SplashStepProps {
  onGetStarted: () => void;
}

export function SplashStep({ onGetStarted }: SplashStepProps) {
  const featureIcons = [
    { icon: Sparkles, label: 'AI Integration' },
    { icon: Settings, label: 'Smart Config' },
    { icon: Cloud, label: 'Cloud Sync' },
    { icon: ShieldCheck, label: 'Secure' },
  ];

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-onboarding-dark">
      {/* Abstract Network Visualization Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px]">
          {/* Animated mesh/network effect */}
          <svg viewBox="0 0 400 400" className="w-full h-full opacity-60">
            <defs>
              <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="hsl(180 100% 50%)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="hsl(180 100% 50%)" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(180 100% 50%)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="hsl(260 100% 60%)" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            
            {/* Network lines */}
            {[
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
            ].map((line, i) => (
              <motion.line
                key={i}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke="url(#lineGradient)"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: i * 0.1 }}
              />
            ))}
            
            {/* Network nodes */}
            {[
              { cx: 50, cy: 100 }, { cx: 150, cy: 80 }, { cx: 250, cy: 120 }, { cx: 350, cy: 100 },
              { cx: 100, cy: 180 }, { cx: 200, cy: 160 }, { cx: 300, cy: 200 },
              { cx: 80, cy: 260 }, { cx: 180, cy: 240 }, { cx: 280, cy: 280 }, { cx: 350, cy: 260 },
              { cx: 120, cy: 320 }, { cx: 220, cy: 300 }, { cx: 320, cy: 340 },
            ].map((node, i) => (
              <motion.circle
                key={i}
                cx={node.cx}
                cy={node.cy}
                r="4"
                fill="hsl(180 100% 50%)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.05 }}
              >
                <animate
                  attributeName="opacity"
                  values="0.5;1;0.5"
                  dur={`${2 + Math.random()}s`}
                  repeatCount="indefinite"
                />
              </motion.circle>
            ))}
          </svg>
        </div>
        
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
              <div className="p-2 rounded-full bg-white/5">
                <item.icon className="w-5 h-5 text-muted-foreground" />
              </div>
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
          <div className="w-8 h-1.5 rounded-full bg-primary" />
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
            className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg shadow-primary/25"
          >
            Get Started
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
