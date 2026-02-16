import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Users, BookOpen, BarChart3, BrainCircuit, Layers, ArrowRight, X, Check, ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const TOUR_STEPS = [
  {
    icon: Users,
    title: 'AI Personas',
    description: 'Your AI persona was just created! Visit the Persona Builder to refine skills, goals, and role hats.',
    link: '/personas',
  },
  {
    icon: BookOpen,
    title: 'Knowledge Base',
    description: 'Store and organize docs, playbooks, and research. AI can generate documents for you too.',
    link: '/knowledge',
  },
  {
    icon: BrainCircuit,
    title: 'AI Platform Explorer',
    description: 'Compare AI platforms, run assessments, and get tailored recommendations for your org.',
    link: '/ai-explorer',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Track profile views, engagement, and AI usage across your workspace.',
    link: '/analytics',
  },
  {
    icon: Layers,
    title: 'Enterprise Profiles',
    description: 'Create polished company profiles to share with partners and clients.',
    link: '/dashboard',
  },
];

interface FeatureTourProps {
  onDismiss: () => void;
}

export function FeatureTour({ onDismiss }: FeatureTourProps) {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const isLast = currentStep === TOUR_STEPS.length - 1;
  const step = TOUR_STEPS[currentStep];
  const Icon = step.icon;

  const handleExplore = () => {
    onDismiss();
    navigate(step.link);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-lg"
    >
      {/* Dismiss button */}
      <button
        onClick={onDismiss}
        className="absolute right-3 top-3 z-10 rounded-full p-1.5 text-muted-foreground hover:bg-muted transition-colors"
      >
        <X className="h-4 w-4" />
      </button>

      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent px-6 pt-5 pb-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          🎉 Setup Complete — Quick Tour
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Here's what you can do next ({currentStep + 1}/{TOUR_STEPS.length})
        </p>
      </div>

      {/* Step content */}
      <div className="px-6 py-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.2 }}
            className="flex items-start gap-4"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{step.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
              <Button
                variant="link"
                size="sm"
                onClick={handleExplore}
                className="mt-2 h-auto p-0 text-primary gap-1"
              >
                Explore {step.title}
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress dots + actions */}
      <div className="flex items-center justify-between border-t border-border/50 px-6 py-4">
        <div className="flex gap-1.5">
          {TOUR_STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentStep(i)}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                i === currentStep ? 'w-6 bg-primary' : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
              )}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={onDismiss}>
            Skip Tour
          </Button>
          {isLast ? (
            <Button size="sm" onClick={onDismiss} className="gap-1.5">
              <Check className="h-3.5 w-3.5" />
              Got It
            </Button>
          ) : (
            <Button size="sm" onClick={() => setCurrentStep(s => s + 1)} className="gap-1.5">
              Next
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
