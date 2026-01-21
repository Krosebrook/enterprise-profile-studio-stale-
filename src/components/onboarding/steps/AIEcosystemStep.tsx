import { motion } from 'framer-motion';
import { Zap, ArrowRight, Sparkles, Cloud, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

interface AIEcosystem {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  glowColor: string;
  enabled: boolean;
}

interface AIEcosystemStepProps {
  ecosystems: AIEcosystem[];
  onToggle: (id: string) => void;
  onContinue: () => void;
  onSkip: () => void;
}

const defaultEcosystems: AIEcosystem[] = [
  {
    id: 'openai',
    name: 'OpenAI',
    description: 'Sync ChatGPT history & GPTs.',
    icon: <Zap className="w-6 h-6 text-emerald-400" />,
    iconBg: 'bg-emerald-500/20',
    glowColor: 'shadow-emerald-500/30',
    enabled: true,
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    description: 'Link Workspace AI & Pro data.',
    icon: <ArrowRight className="w-6 h-6 text-purple-400" />,
    iconBg: 'bg-purple-500/20',
    glowColor: 'shadow-purple-500/30',
    enabled: false,
  },
  {
    id: 'copilot',
    name: 'MS Copilot',
    description: 'Integrate 365 business context.',
    icon: <Cloud className="w-6 h-6 text-cyan-400" />,
    iconBg: 'bg-cyan-500/20',
    glowColor: 'shadow-cyan-500/30',
    enabled: true,
  },
  {
    id: 'claude',
    name: 'Claude',
    description: 'Access projects & writing styles.',
    icon: <Sparkles className="w-6 h-6 text-amber-400" />,
    iconBg: 'bg-amber-500/20',
    glowColor: 'shadow-amber-500/30',
    enabled: false,
  },
];

export function AIEcosystemStep({
  ecosystems = defaultEcosystems,
  onToggle,
  onContinue,
  onSkip,
}: AIEcosystemStepProps) {
  return (
    <div className="flex flex-col min-h-full px-6 py-4">
      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-3">
          Integrate Your <span className="text-primary">AI Brain</span>
        </h1>
        <p className="text-muted-foreground text-base">
          Select the ecosystems you use most. We'll securely sync your profiles and preferences.
        </p>
      </motion.div>

      {/* Ecosystem Cards */}
      <div className="flex flex-col gap-4 flex-1">
        {ecosystems.map((ecosystem, index) => (
          <motion.div
            key={ecosystem.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={cn(
              'flex items-center gap-4 p-4 rounded-xl border transition-all duration-300',
              ecosystem.enabled
                ? 'border-primary/50 bg-white/5 shadow-lg'
                : 'border-white/10 bg-white/[0.02]'
            )}
          >
            {/* Icon */}
            <div className={cn('p-3 rounded-xl', ecosystem.iconBg)}>
              {ecosystem.icon}
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="text-white font-semibold">{ecosystem.name}</h3>
              <p className="text-muted-foreground text-sm">{ecosystem.description}</p>
            </div>

            {/* Toggle */}
            <Switch
              checked={ecosystem.enabled}
              onCheckedChange={() => onToggle(ecosystem.id)}
              className="data-[state=checked]:bg-primary"
            />
          </motion.div>
        ))}
      </div>

      {/* Security Badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex items-center justify-center gap-2 py-6 text-muted-foreground"
      >
        <Lock className="w-4 h-4" />
        <span className="text-xs uppercase tracking-wider font-medium">
          End-to-End Encrypted Connection
        </span>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="space-y-3"
      >
        <Button
          onClick={onContinue}
          className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 text-white rounded-xl"
        >
          Continue
        </Button>
        <button
          onClick={onSkip}
          className="w-full py-3 text-muted-foreground hover:text-white transition-colors text-sm"
        >
          Skip for now
        </button>
      </motion.div>
    </div>
  );
}
