import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { OnboardingProgress } from './OnboardingProgress';
import { WelcomeStep } from './steps/WelcomeStep';
import { DealSourcingStep } from './steps/DealSourcingStep';
import { PortfolioGoalsStep } from './steps/PortfolioGoalsStep';
import { CommunityStep } from './steps/CommunityStep';
import { ReviewStep } from './steps/ReviewStep';
import { useOnboarding } from '@/hooks/useOnboarding';
import { OnboardingStep } from '@/types/onboarding';
import { 
  ArrowLeft, ArrowRight, Check, Loader2, SkipForward,
  Rocket, Target, Briefcase, Users, CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';

const wizardSteps: OnboardingStep[] = [
  { 
    id: 'welcome', 
    title: 'Welcome', 
    description: 'About you',
    icon: <Rocket className="h-5 w-5" />
  },
  { 
    id: 'deal-sourcing', 
    title: 'Deal Sourcing', 
    description: 'Investment criteria',
    icon: <Target className="h-5 w-5" />
  },
  { 
    id: 'portfolio', 
    title: 'Portfolio Goals', 
    description: 'Your objectives',
    icon: <Briefcase className="h-5 w-5" />
  },
  { 
    id: 'community', 
    title: 'Community', 
    description: 'Preferences',
    icon: <Users className="h-5 w-5" />,
    isOptional: true
  },
  { 
    id: 'review', 
    title: 'Review', 
    description: 'Confirm & go',
    icon: <CheckCircle2 className="h-5 w-5" />
  },
];

export function OnboardingWizard() {
  const navigate = useNavigate();
  const {
    profile,
    currentStep,
    isSaving,
    updateSection,
    nextStep,
    prevStep,
    skipStep,
    completeOnboarding,
    setCurrentStep,
  } = useOnboarding();

  const [direction, setDirection] = useState(1);

  const handleNext = () => {
    setDirection(1);
    nextStep();
  };

  const handleBack = () => {
    setDirection(-1);
    prevStep();
  };

  const handleSkip = () => {
    setDirection(1);
    skipStep(wizardSteps[currentStep].id);
  };

  const handleComplete = async () => {
    const success = await completeOnboarding();
    if (success) {
      navigate('/dashboard');
    }
  };

  const handleEditSection = (step: number) => {
    setDirection(step > currentStep ? 1 : -1);
    setCurrentStep(step);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <WelcomeStep
            data={profile.welcome}
            onChange={(data) => updateSection('welcome', data)}
          />
        );
      case 1:
        return (
          <DealSourcingStep
            data={profile.dealSourcing}
            onChange={(data) => updateSection('dealSourcing', data)}
            welcomeData={profile.welcome}
          />
        );
      case 2:
        return (
          <PortfolioGoalsStep
            data={profile.portfolioGoals}
            onChange={(data) => updateSection('portfolioGoals', data)}
          />
        );
      case 3:
        return (
          <CommunityStep
            data={profile.communityPreferences}
            onChange={(data) => updateSection('communityPreferences', data)}
          />
        );
      case 4:
        return (
          <ReviewStep
            profile={profile}
            onEditSection={handleEditSection}
          />
        );
      default:
        return null;
    }
  };

  const isLastStep = currentStep === wizardSteps.length - 1;
  const isFirstStep = currentStep === 0;
  const currentStepConfig = wizardSteps[currentStep];

  // Validation for each step
  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return profile.welcome.fullName.trim().length > 0;
      case 1:
        return profile.dealSourcing.targetIndustries.length > 0;
      case 2:
        return true; // Optional defaults are fine
      case 3:
        return true; // Optional
      case 4:
        return true; // Review is always valid
      default:
        return true;
    }
  };

  const completedSteps = wizardSteps
    .filter((_, i) => i < currentStep)
    .map(s => s.id);

  return (
    <div className="min-h-screen bg-background pb-24 pt-8">
      <div className="container max-w-3xl">
        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <OnboardingProgress
            steps={wizardSteps}
            currentStep={currentStep}
            onStepClick={handleEditSection}
            completedSteps={completedSteps}
          />
        </motion.div>

        {/* Step Content */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            initial={{ opacity: 0, x: direction * 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -50 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="fixed bottom-0 left-0 right-0 border-t border-border bg-background/95 backdrop-blur"
        >
          <div className="container flex max-w-3xl items-center justify-between py-4">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={isFirstStep}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            <div className="flex items-center gap-3">
              {/* Skip button for optional steps */}
              {currentStepConfig?.isOptional && !isLastStep && (
                <Button
                  variant="ghost"
                  onClick={handleSkip}
                  className="gap-2 text-muted-foreground"
                >
                  <SkipForward className="h-4 w-4" />
                  Skip
                </Button>
              )}

              {isLastStep ? (
                <Button
                  onClick={handleComplete}
                  disabled={isSaving}
                  className="gap-2 primary-gradient border-0"
                >
                  {isSaving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Check className="h-4 w-4" />
                  )}
                  Complete Setup
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className={cn(
                    'gap-2',
                    isStepValid() && 'primary-gradient border-0'
                  )}
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
