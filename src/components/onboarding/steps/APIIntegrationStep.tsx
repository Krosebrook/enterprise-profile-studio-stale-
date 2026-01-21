import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Check, Copy, HelpCircle, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface APIKey {
  id: string;
  name: string;
  icon: React.ReactNode;
  iconBg: string;
  value: string;
  status: 'empty' | 'pending' | 'validated' | 'error';
  helpUrl?: string;
  lastUpdated?: string;
}

interface APIIntegrationStepProps {
  apiKeys: APIKey[];
  onUpdateKey: (id: string, value: string) => void;
  onValidate: (id: string) => Promise<void>;
  onComplete: () => void;
  onSkip: () => void;
}

const defaultApiKeys: APIKey[] = [
  {
    id: 'openai',
    name: 'OpenAI',
    icon: <div className="w-6 h-6 rounded bg-teal-600 flex items-center justify-center text-white text-xs font-bold">AI</div>,
    iconBg: 'bg-teal-500/20',
    value: '',
    status: 'validated',
    lastUpdated: '2m ago',
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    icon: <div className="w-6 h-6 rounded bg-orange-500 flex items-center justify-center text-white text-xs font-bold">C</div>,
    iconBg: 'bg-orange-500/20',
    value: 'sk-ant-api03-...',
    status: 'pending',
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    icon: <div className="w-6 h-6 rounded bg-slate-500 flex items-center justify-center text-white text-xs font-bold">G</div>,
    iconBg: 'bg-slate-500/20',
    value: '',
    status: 'empty',
  },
];

export function APIIntegrationStep({
  apiKeys = defaultApiKeys,
  onUpdateKey,
  onValidate,
  onComplete,
  onSkip,
}: APIIntegrationStepProps) {
  const [showValues, setShowValues] = useState<Record<string, boolean>>({});

  const toggleShowValue = (id: string) => {
    setShowValues(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
    toast.success('Copied to clipboard');
  };

  const getStatusBadge = (status: APIKey['status']) => {
    switch (status) {
      case 'validated':
        return (
          <span className="flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-500/20 px-2 py-1 rounded-full">
            <Check className="w-3 h-3" />
            VALIDATED
          </span>
        );
      case 'error':
        return (
          <span className="text-xs font-medium text-red-400 bg-red-500/20 px-2 py-1 rounded-full">
            ERROR
          </span>
        );
      case 'pending':
        return (
          <Button
            variant="outline"
            size="sm"
            className="h-7 text-xs border-primary/50 text-primary hover:bg-primary/10"
            onClick={() => onValidate(apiKeys.find(k => k.status === 'pending')?.id || '')}
          >
            Validate
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-full px-6 py-4">
      {/* Progress indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center gap-2 mb-6"
      >
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn(
              'h-1 rounded-full transition-all',
              i === 3 ? 'w-8 bg-primary' : 'w-8 bg-white/20'
            )}
          />
        ))}
      </motion.div>

      {/* Shield Icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex justify-center mb-6"
      >
        <div className="p-4 rounded-full bg-primary/20">
          <ShieldCheck className="w-8 h-8 text-primary" />
        </div>
      </motion.div>

      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-2xl font-bold text-white mb-2">
          Secure Your Connections
        </h1>
        <p className="text-muted-foreground text-sm">
          Your keys are encrypted locally on your device and never stored on our servers.
        </p>
      </motion.div>

      {/* API Key Cards */}
      <div className="flex flex-col gap-4 flex-1">
        {apiKeys.map((apiKey, index) => (
          <motion.div
            key={apiKey.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={cn(
              'rounded-xl border p-4 transition-all',
              apiKey.status === 'validated'
                ? 'border-primary/30 bg-white/5'
                : 'border-white/10 bg-white/[0.02]'
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={cn('p-2 rounded-lg', apiKey.iconBg)}>
                  {apiKey.icon}
                </div>
                <h3 className="text-white font-semibold">{apiKey.name}</h3>
              </div>
              {getStatusBadge(apiKey.status)}
            </div>

            {/* Input Field */}
            <div className="relative mb-3">
              <Input
                type={showValues[apiKey.id] ? 'text' : 'password'}
                placeholder="Enter API Key"
                value={apiKey.value}
                onChange={(e) => onUpdateKey(apiKey.id, e.target.value)}
                className="bg-white/5 border-white/10 text-white pr-20 font-mono text-sm"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <button
                  onClick={() => toggleShowValue(apiKey.id)}
                  className="p-1.5 hover:bg-white/10 rounded transition-colors"
                >
                  {showValues[apiKey.id] ? (
                    <EyeOff className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
                <button
                  onClick={() => copyToClipboard(apiKey.value)}
                  className="p-1.5 hover:bg-white/10 rounded transition-colors"
                >
                  <Copy className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <button className="flex items-center gap-1 text-xs text-primary hover:underline">
                <HelpCircle className="w-3 h-3" />
                Where do I find my key?
              </button>
              {apiKey.lastUpdated && (
                <span className="text-xs text-muted-foreground">
                  Updated {apiKey.lastUpdated}
                </span>
              )}
            </div>
          </motion.div>
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
          onClick={onComplete}
          className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 text-white rounded-xl"
        >
          Complete Setup
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
