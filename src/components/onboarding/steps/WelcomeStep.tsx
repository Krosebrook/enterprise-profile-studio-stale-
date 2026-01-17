import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { OnboardingTooltip } from '../OnboardingTooltip';
import { OnboardingUserProfile } from '@/types/onboarding';
import { Rocket, Sparkles, TrendingUp, Users, Building2, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WelcomeStepProps {
  data: OnboardingUserProfile['welcome'];
  onChange: (data: Partial<OnboardingUserProfile['welcome']>) => void;
}

const roles = [
  { value: 'individual_investor', label: 'Individual Investor', icon: TrendingUp, description: 'Managing personal investments' },
  { value: 'fund_manager', label: 'Fund Manager', icon: Building2, description: 'Running an investment fund' },
  { value: 'family_office', label: 'Family Office', icon: Users, description: 'Managing family wealth' },
  { value: 'institutional', label: 'Institutional', icon: Briefcase, description: 'Representing an institution' },
  { value: 'advisor', label: 'Advisor', icon: Sparkles, description: 'Advising clients on deals' },
] as const;

const experienceLevels = [
  { value: 'novice', label: 'New to Investing', description: 'Just starting out' },
  { value: 'intermediate', label: 'Some Experience', description: '1-5 years' },
  { value: 'experienced', label: 'Experienced', description: '5-10 years' },
  { value: 'expert', label: 'Expert', description: '10+ years' },
] as const;

export function WelcomeStep({ data, onChange }: WelcomeStepProps) {
  return (
    <div className="space-y-8">
      {/* Hero welcome */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-lg"
        >
          <Rocket className="h-8 w-8" />
        </motion.div>
        <h2 className="font-display text-2xl font-bold">Welcome to Your Deal Sourcing Hub</h2>
        <p className="mt-2 text-muted-foreground">
          Let's personalize your experience to help you discover the best opportunities.
        </p>
      </motion.div>

      {/* Name input */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            What should we call you?
            <OnboardingTooltip content="This will be used to personalize your experience throughout the platform." />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Enter your full name"
            value={data.fullName}
            onChange={(e) => onChange({ fullName: e.target.value })}
            className="max-w-md"
          />
        </CardContent>
      </Card>

      {/* Role selection */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            What best describes your role?
            <OnboardingTooltip 
              content="This helps us tailor deal recommendations and features to your needs."
              example="Fund Managers get LP reporting tools, Individual Investors get portfolio tracking."
            />
          </CardTitle>
          <CardDescription>Select the option that best fits your situation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {roles.map((role) => {
              const Icon = role.icon;
              const isSelected = data.role === role.value;
              
              return (
                <motion.button
                  key={role.value}
                  type="button"
                  onClick={() => onChange({ role: role.value })}
                  className={cn(
                    'group relative flex flex-col items-start gap-2 rounded-xl border-2 p-4 text-left transition-all',
                    isSelected
                      ? 'border-primary bg-primary/5 shadow-md'
                      : 'border-border hover:border-primary/50 hover:bg-muted/50'
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-lg transition-colors',
                      isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className={cn('font-medium', isSelected && 'text-primary')}>
                      {role.label}
                    </p>
                    <p className="text-xs text-muted-foreground">{role.description}</p>
                  </div>
                  {isSelected && (
                    <motion.div
                      layoutId="role-indicator"
                      className="absolute right-3 top-3 h-2 w-2 rounded-full bg-primary"
                      initial={false}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Experience level */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            What's your investment experience?
            <OnboardingTooltip 
              content="We'll adjust the complexity of insights and recommendations based on your experience."
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={data.experienceLevel}
            onValueChange={(value) => onChange({ experienceLevel: value as typeof data.experienceLevel })}
            className="grid grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {experienceLevels.map((level) => (
              <Label
                key={level.value}
                htmlFor={level.value}
                className={cn(
                  'flex cursor-pointer flex-col items-center gap-1 rounded-lg border-2 p-4 text-center transition-all',
                  data.experienceLevel === level.value
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                )}
              >
                <RadioGroupItem value={level.value} id={level.value} className="sr-only" />
                <span className="font-medium">{level.label}</span>
                <span className="text-xs text-muted-foreground">{level.description}</span>
              </Label>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  );
}
