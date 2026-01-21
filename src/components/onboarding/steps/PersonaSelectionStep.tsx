import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, Check, CreditCard, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type PersonaType = 'internal' | 'external';

interface PersonaSelectionStepProps {
  selectedPersona: PersonaType | null;
  onSelect: (persona: PersonaType) => void;
  onContinue: () => void;
}

interface PersonaOption {
  id: PersonaType;
  title: string;
  subtitle: string;
  features: Array<{ icon: React.ReactNode; text: string }>;
  image?: string;
}

const personaOptions: PersonaOption[] = [
  {
    id: 'internal',
    title: 'Internal Team',
    subtitle: 'Shared Ecosystem',
    features: [
      { icon: <Users className="w-4 h-4 text-primary" />, text: 'Work together seamlessly with shared credits and team identities.' },
      { icon: <CreditCard className="w-4 h-4 text-primary" />, text: 'Centralized billing and resource allocation for your department.' },
    ],
  },
  {
    id: 'external',
    title: 'External Client',
    subtitle: 'Independent Branding',
    features: [
      { icon: <Shield className="w-4 h-4 text-muted-foreground" />, text: 'Prioritize privacy and custom branding for individual projects.' },
      { icon: <Building className="w-4 h-4 text-muted-foreground" />, text: 'White-label outputs and client-specific AI configurations.' },
    ],
  },
];

export function PersonaSelectionStep({
  selectedPersona,
  onSelect,
  onContinue,
}: PersonaSelectionStepProps) {
  return (
    <div className="flex flex-col min-h-full px-6 py-4">
      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-3">
          How will you use the app?
        </h1>
        <p className="text-muted-foreground text-base">
          Select the persona that best fits your workflow. You can switch between these later in settings.
        </p>
      </motion.div>

      {/* Persona Cards */}
      <div className="flex flex-col gap-4 flex-1">
        {personaOptions.map((persona, index) => (
          <motion.button
            key={persona.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.15 }}
            onClick={() => onSelect(persona.id)}
            className={cn(
              'relative text-left rounded-xl border p-5 transition-all duration-300',
              selectedPersona === persona.id
                ? 'border-primary bg-primary/5 shadow-lg shadow-primary/20'
                : 'border-white/10 bg-white/[0.02] hover:border-white/20'
            )}
          >
            {/* Abstract network image placeholder */}
            <div className={cn(
              'h-32 rounded-lg mb-4 flex items-center justify-center overflow-hidden',
              selectedPersona === persona.id
                ? 'bg-gradient-to-br from-primary/20 via-purple-500/10 to-pink-500/20'
                : 'bg-white/5'
            )}>
              {/* Simple network visualization */}
              <svg viewBox="0 0 200 100" className="w-full h-full opacity-40">
                <defs>
                  <linearGradient id={`gradient-${persona.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={selectedPersona === persona.id ? 'hsl(260 100% 60%)' : 'hsl(0 0% 50%)'} stopOpacity="0.6" />
                    <stop offset="100%" stopColor={selectedPersona === persona.id ? 'hsl(300 100% 50%)' : 'hsl(0 0% 30%)'} stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                {[
                  { x1: 20, y1: 30, x2: 60, y2: 50 },
                  { x1: 60, y1: 50, x2: 100, y2: 30 },
                  { x1: 100, y1: 30, x2: 140, y2: 50 },
                  { x1: 140, y1: 50, x2: 180, y2: 40 },
                  { x1: 40, y1: 70, x2: 80, y2: 60 },
                  { x1: 80, y1: 60, x2: 120, y2: 70 },
                  { x1: 120, y1: 70, x2: 160, y2: 65 },
                  { x1: 60, y1: 50, x2: 80, y2: 60 },
                  { x1: 100, y1: 30, x2: 120, y2: 70 },
                ].map((line, i) => (
                  <line
                    key={i}
                    x1={line.x1}
                    y1={line.y1}
                    x2={line.x2}
                    y2={line.y2}
                    stroke={`url(#gradient-${persona.id})`}
                    strokeWidth="1"
                  />
                ))}
                {[
                  { cx: 20, cy: 30 }, { cx: 60, cy: 50 }, { cx: 100, cy: 30 },
                  { cx: 140, cy: 50 }, { cx: 180, cy: 40 }, { cx: 40, cy: 70 },
                  { cx: 80, cy: 60 }, { cx: 120, cy: 70 }, { cx: 160, cy: 65 },
                ].map((node, i) => (
                  <circle
                    key={i}
                    cx={node.cx}
                    cy={node.cy}
                    r="3"
                    fill={selectedPersona === persona.id ? 'hsl(260 100% 60%)' : 'hsl(0 0% 50%)'}
                    opacity={0.8}
                  />
                ))}
              </svg>
            </div>

            {/* Header with selection indicator */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-white font-semibold text-lg">{persona.title}</h3>
                <p className="text-primary text-sm">{persona.subtitle}</p>
              </div>
              <div className={cn(
                'w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors',
                selectedPersona === persona.id
                  ? 'bg-primary border-primary'
                  : 'border-white/30 bg-transparent'
              )}>
                {selectedPersona === persona.id && (
                  <Check className="w-4 h-4 text-white" />
                )}
              </div>
            </div>

            {/* Features */}
            <div className="space-y-2">
              {persona.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  {feature.icon}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.text}
                  </p>
                </div>
              ))}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-3 pt-6"
      >
        <Button
          onClick={onContinue}
          disabled={!selectedPersona}
          className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </Button>
        <button className="w-full py-3 text-muted-foreground hover:text-primary transition-colors text-sm">
          Not sure? <span className="text-primary">Learn more about personas</span>
        </button>
      </motion.div>
    </div>
  );
}
