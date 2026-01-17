import { cn } from '@/lib/utils';
import { Check, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { OnboardingStep } from '@/types/onboarding';

interface OnboardingProgressProps {
  steps: OnboardingStep[];
  currentStep: number;
  onStepClick?: (step: number) => void;
  completedSteps?: string[];
}

export function OnboardingProgress({
  steps,
  currentStep,
  onStepClick,
  completedSteps = [],
}: OnboardingProgressProps) {
  const progress = ((currentStep) / (steps.length - 1)) * 100;

  return (
    <div className="relative">
      {/* Progress bar background */}
      <div className="absolute left-0 top-5 h-0.5 w-full bg-muted">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-accent"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>

      {/* Steps */}
      <nav className="relative flex justify-between">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id) || index < currentStep;
          const isCurrent = index === currentStep;
          const isClickable = onStepClick && index <= currentStep;

          return (
            <motion.button
              key={step.id}
              onClick={() => isClickable && onStepClick(index)}
              disabled={!isClickable}
              className={cn(
                'group flex flex-col items-center gap-2',
                isClickable && 'cursor-pointer'
              )}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Step circle */}
              <motion.div
                className={cn(
                  'relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300',
                  isCompleted && 'border-primary bg-primary text-primary-foreground',
                  isCurrent && 'border-primary bg-primary/10',
                  !isCompleted && !isCurrent && 'border-muted-foreground/30 bg-background'
                )}
                whileHover={isClickable ? { scale: 1.1 } : undefined}
                whileTap={isClickable ? { scale: 0.95 } : undefined}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5" />
                ) : isCurrent ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles className="h-5 w-5 text-primary" />
                  </motion.div>
                ) : (
                  <span className="text-sm font-medium text-muted-foreground">
                    {index + 1}
                  </span>
                )}

                {/* Active pulse ring */}
                {isCurrent && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-primary"
                    animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.div>

              {/* Step label */}
              <div className="text-center">
                <p
                  className={cn(
                    'text-xs font-medium transition-colors',
                    isCurrent && 'text-primary',
                    isCompleted && 'text-foreground',
                    !isCompleted && !isCurrent && 'text-muted-foreground'
                  )}
                >
                  {step.title}
                </p>
                <p className="hidden text-[10px] text-muted-foreground md:block">
                  {step.description}
                </p>
              </div>
            </motion.button>
          );
        })}
      </nav>
    </div>
  );
}
