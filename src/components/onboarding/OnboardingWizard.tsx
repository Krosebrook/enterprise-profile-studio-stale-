import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useOnboarding } from '@/hooks/useOnboarding';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { SplashStep } from './steps/SplashStep';
import { AIEcosystemStep } from './steps/AIEcosystemStep';
import { PersonaSelectionStep } from './steps/PersonaSelectionStep';
import { APIIntegrationStep, APIKey } from './steps/APIIntegrationStep';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type OnboardingStepType = 'splash' | 'ecosystem' | 'persona' | 'api';

interface AIEcosystem {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  glowColor: string;
  enabled: boolean;
}

export function OnboardingWizard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { completeOnboarding, isSaving } = useOnboarding();
  const [currentStep, setCurrentStep] = useState<OnboardingStepType>('splash');
  const [direction, setDirection] = useState(1);
  const [isSavingPreferences, setIsSavingPreferences] = useState(false);
  
  // AI Ecosystem state
  const [ecosystems, setEcosystems] = useState<AIEcosystem[]>([
    {
      id: 'openai',
      name: 'OpenAI',
      description: 'Sync ChatGPT history & GPTs.',
      icon: <span className="text-emerald-400">⚡</span>,
      iconBg: 'bg-emerald-500/20',
      glowColor: 'shadow-emerald-500/30',
      enabled: true,
    },
    {
      id: 'gemini',
      name: 'Google Gemini',
      description: 'Link Workspace AI & Pro data.',
      icon: <span className="text-purple-400">→→</span>,
      iconBg: 'bg-purple-500/20',
      glowColor: 'shadow-purple-500/30',
      enabled: false,
    },
    {
      id: 'copilot',
      name: 'MS Copilot',
      description: 'Integrate 365 business context.',
      icon: <span className="text-cyan-400">☁</span>,
      iconBg: 'bg-cyan-500/20',
      glowColor: 'shadow-cyan-500/30',
      enabled: true,
    },
    {
      id: 'claude',
      name: 'Claude',
      description: 'Access projects & writing styles.',
      icon: <span className="text-amber-400">✦</span>,
      iconBg: 'bg-amber-500/20',
      glowColor: 'shadow-amber-500/30',
      enabled: false,
    },
  ]);
  
  // Persona state
  const [selectedPersona, setSelectedPersona] = useState<'internal' | 'external' | null>(null);
  
  // API Keys state
  const [apiKeys, setApiKeys] = useState<APIKey[]>([
    {
      id: 'openai',
      name: 'OpenAI',
      provider: 'openai',
      icon: <div className="w-6 h-6 rounded bg-teal-600 flex items-center justify-center text-white text-xs font-bold">AI</div>,
      iconBg: 'bg-teal-500/20',
      value: '',
      status: 'empty',
    },
    {
      id: 'anthropic',
      name: 'Anthropic',
      provider: 'anthropic',
      icon: <div className="w-6 h-6 rounded bg-orange-500 flex items-center justify-center text-white text-xs font-bold">C</div>,
      iconBg: 'bg-orange-500/20',
      value: '',
      status: 'empty',
    },
    {
      id: 'gemini',
      name: 'Google Gemini',
      provider: 'gemini',
      icon: <div className="w-6 h-6 rounded bg-slate-500 flex items-center justify-center text-white text-xs font-bold">G</div>,
      iconBg: 'bg-slate-500/20',
      value: '',
      status: 'empty',
    },
  ]);

  const stepOrder: OnboardingStepType[] = ['splash', 'ecosystem', 'persona', 'api'];
  const currentIndex = stepOrder.indexOf(currentStep);

  const goToStep = (step: OnboardingStepType) => {
    const newIndex = stepOrder.indexOf(step);
    setDirection(newIndex > currentIndex ? 1 : -1);
    setCurrentStep(step);
  };

  const goBack = () => {
    if (currentIndex > 0) {
      goToStep(stepOrder[currentIndex - 1]);
    }
  };

  const handleToggleEcosystem = (id: string) => {
    setEcosystems(prev =>
      prev.map(eco =>
        eco.id === id ? { ...eco, enabled: !eco.enabled } : eco
      )
    );
  };

  const handleUpdateApiKey = (id: string, value: string) => {
    setApiKeys(prev =>
      prev.map(key =>
        key.id === id ? { ...key, value, status: value ? 'pending' : 'empty', errorMessage: undefined } : key
      )
    );
  };

  const handleValidationComplete = (id: string, valid: boolean, errorMessage?: string) => {
    setApiKeys(prev =>
      prev.map(key =>
        key.id === id 
          ? { 
              ...key, 
              status: valid ? 'validated' : 'error', 
              lastUpdated: valid ? 'just now' : undefined,
              errorMessage: errorMessage
            } 
          : key
      )
    );
  };

  const saveOnboardingPreferences = async () => {
    if (!user) {
      console.error('No user found');
      return false;
    }

    try {
      setIsSavingPreferences(true);
      
      // Prepare the data to save
      const preferencesData = {
        user_id: user.id,
        persona_type: selectedPersona,
        ai_ecosystems: ecosystems
          .filter(e => e.enabled)
          .map(e => ({ id: e.id, name: e.name })),
        api_keys: apiKeys
          .filter(k => k.status === 'validated')
          .reduce((acc, k) => {
            acc[k.id] = { validated: true, provider: k.provider };
            return acc;
          }, {} as Record<string, { validated: boolean; provider: string }>),
        onboarding_completed: true,
      };

      console.log('Saving onboarding preferences:', preferencesData);

      // Upsert the preferences
      const { error } = await supabase
        .from('user_onboarding_preferences')
        .upsert(preferencesData, {
          onConflict: 'user_id',
        });

      if (error) {
        console.error('Error saving preferences:', error);
        throw error;
      }

      console.log('Onboarding preferences saved successfully');
      return true;
    } catch (error) {
      console.error('Failed to save onboarding preferences:', error);
      return false;
    } finally {
      setIsSavingPreferences(false);
    }
  };

  const handleComplete = async () => {
    // First save the new onboarding preferences
    const preferencesSaved = await saveOnboardingPreferences();
    
    if (!preferencesSaved) {
      toast.error('Failed to save your preferences. Please try again.');
      return;
    }

    // Then complete the existing onboarding flow
    const success = await completeOnboarding();
    if (success) {
      navigate('/dashboard');
    }
  };

  const getStepNumber = () => {
    switch (currentStep) {
      case 'ecosystem': return 2;
      case 'persona': return 3;
      case 'api': return 4;
      default: return 1;
    }
  };

  return (
    <div className="min-h-screen bg-onboarding-dark dark">
      <div className="relative mx-auto flex min-h-screen max-w-md flex-col overflow-hidden">
        {/* Top App Bar - only show after splash */}
        {currentStep !== 'splash' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="sticky top-0 z-50 flex items-center justify-between p-4 pb-2 bg-onboarding-dark/80 backdrop-blur-md"
          >
            <button
              onClick={goBack}
              className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <span className="text-sm font-semibold uppercase tracking-wider text-white/60">
              Step {getStepNumber()} of 4
            </span>
            <div className="w-10" /> {/* Spacer for centering */}
          </motion.div>
        )}

        {/* Progress Bar - only show after splash */}
        {currentStep !== 'splash' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="px-6 pb-4"
          >
            <div className="flex gap-2">
              {stepOrder.slice(1).map((step, index) => (
                <div
                  key={step}
                  className={cn(
                    'h-1 flex-1 rounded-full transition-all duration-300',
                    index < currentIndex
                      ? 'bg-primary'
                      : index === currentIndex - 1
                      ? 'bg-primary'
                      : 'bg-white/20'
                  )}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Step Content */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            initial={{ opacity: 0, x: direction * 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -100 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="flex-1"
          >
            {currentStep === 'splash' && (
              <SplashStep onGetStarted={() => goToStep('ecosystem')} />
            )}
            
            {currentStep === 'ecosystem' && (
              <AIEcosystemStep
                ecosystems={ecosystems}
                onToggle={handleToggleEcosystem}
                onContinue={() => goToStep('persona')}
                onSkip={() => goToStep('persona')}
              />
            )}
            
            {currentStep === 'persona' && (
              <PersonaSelectionStep
                selectedPersona={selectedPersona}
                onSelect={setSelectedPersona}
                onContinue={() => goToStep('api')}
              />
            )}
            
            {currentStep === 'api' && (
              <APIIntegrationStep
                apiKeys={apiKeys}
                onUpdateKey={handleUpdateApiKey}
                onValidationComplete={handleValidationComplete}
                onComplete={handleComplete}
                onSkip={handleComplete}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
