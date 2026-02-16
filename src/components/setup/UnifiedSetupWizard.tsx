import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  User,
  Building2,
  Sparkles,
  Check,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Rocket,
  Wand2,
  BrainCircuit,
  HardHat,
} from 'lucide-react';
import { useUnifiedSetup } from '@/hooks/useUnifiedSetup';
import { cn } from '@/lib/utils';

const DEPARTMENTS = [
  'Engineering', 'Product', 'Design', 'Marketing', 'Sales',
  'Finance', 'HR', 'Operations', 'Legal', 'IT',
  'InfoSec', 'Customer Success', 'Data Science', 'Executive', 'Other',
];

const INDUSTRIES = [
  'Technology', 'Finance', 'Healthcare', 'Education', 'Manufacturing',
  'Retail', 'Media', 'Consulting', 'Government', 'Non-profit', 'Other',
];

type WizardStep = 'welcome' | 'personal' | 'company' | 'generating' | 'review';

const stepMeta: Record<WizardStep, { label: string; icon: React.ReactNode }> = {
  welcome: { label: 'Welcome', icon: <Rocket className="h-5 w-5" /> },
  personal: { label: 'About You', icon: <User className="h-5 w-5" /> },
  company: { label: 'Your Org', icon: <Building2 className="h-5 w-5" /> },
  generating: { label: 'AI Magic', icon: <Wand2 className="h-5 w-5" /> },
  review: { label: 'Review', icon: <Check className="h-5 w-5" /> },
};

const STEP_ORDER: WizardStep[] = ['welcome', 'personal', 'company', 'generating', 'review'];

export function UnifiedSetupWizard() {
  const navigate = useNavigate();
  const {
    data,
    updateData,
    generateProfile,
    isGenerating,
    saveAll,
    isSaving,
  } = useUnifiedSetup();
  const [step, setStep] = useState<WizardStep>('welcome');
  const [direction, setDirection] = useState(1);

  const currentIndex = STEP_ORDER.indexOf(step);

  const goTo = (target: WizardStep) => {
    const targetIdx = STEP_ORDER.indexOf(target);
    setDirection(targetIdx > currentIndex ? 1 : -1);
    setStep(target);
  };

  const handleGenerate = async () => {
    goTo('generating');
    const result = await generateProfile();
    if (result) {
      goTo('review');
    } else {
      goTo('review'); // still go to review, user can edit manually
    }
  };

  const handleFinish = async () => {
    const success = await saveAll();
    if (success) {
      // Fire confetti burst
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['hsl(var(--primary))', '#FFD700', '#FF6B6B', '#4ECDC4', '#A78BFA'],
      });
      // Brief delay so user sees confetti before navigating
      await new Promise(r => setTimeout(r, 800));
      navigate('/dashboard?setup_complete=true');
    }
  };

  const canProceedPersonal = data.fullName.trim() && data.jobTitle.trim() && data.department;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-4">
        {/* Progress bar */}
        {step !== 'welcome' && step !== 'generating' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="sticky top-0 z-50 bg-background/80 backdrop-blur-md pt-6 pb-4"
          >
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={() => {
                  const prev = STEP_ORDER[currentIndex - 1];
                  if (prev && prev !== 'generating') goTo(prev);
                }}
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted transition-colors"
                disabled={currentIndex <= 1}
              >
                <ArrowLeft className="w-4 h-4 text-muted-foreground" />
              </button>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Step {Math.min(currentIndex, 3)} of 3
              </span>
              <div className="w-9" />
            </div>
            <div className="flex gap-2">
              {['personal', 'company', 'review'].map((s, i) => (
                <div
                  key={s}
                  className={cn(
                    'h-1.5 flex-1 rounded-full transition-all duration-300',
                    i < Math.min(currentIndex - 1, 2)
                      ? 'bg-primary'
                      : i === Math.min(currentIndex - 1, 2)
                      ? 'bg-primary/60'
                      : 'bg-muted'
                  )}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Content */}
        <div className="flex-1 flex items-center justify-center py-8">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="w-full"
            >
              {step === 'welcome' && <WelcomeStep onStart={() => goTo('personal')} />}
              {step === 'personal' && (
                <PersonalStep
                  data={data}
                  onChange={updateData}
                  onNext={() => goTo('company')}
                  canProceed={!!canProceedPersonal}
                />
              )}
              {step === 'company' && (
                <CompanyStep
                  data={data}
                  onChange={updateData}
                  onGenerate={handleGenerate}
                />
              )}
              {step === 'generating' && <GeneratingStep />}
              {step === 'review' && (
                <ReviewStep
                  data={data}
                  onFinish={handleFinish}
                  isSaving={isSaving}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// === Welcome ===
function WelcomeStep({ onStart }: { onStart: () => void }) {
  return (
    <div className="text-center space-y-8">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10"
      >
        <BrainCircuit className="h-10 w-10 text-primary" />
      </motion.div>
      <div>
        <h1 className="font-display text-4xl font-bold">Welcome to INT OS</h1>
        <p className="mt-3 text-lg text-muted-foreground max-w-md mx-auto">
          Let's set up your AI workspace. Tell us a bit about yourself and AI will configure everything — persona, roles, and ecosystem preferences.
        </p>
      </div>
      <div className="flex flex-col gap-3 items-center">
        <Button size="lg" onClick={onStart} className="gap-2 px-8">
          Get Started
          <ArrowRight className="h-4 w-4" />
        </Button>
        <p className="text-xs text-muted-foreground">Takes about 2 minutes</p>
      </div>
    </div>
  );
}

// === Personal ===
function PersonalStep({
  data,
  onChange,
  onNext,
  canProceed,
}: {
  data: { fullName: string; jobTitle: string; department: string };
  onChange: (u: Partial<typeof data>) => void;
  onNext: () => void;
  canProceed: boolean;
}) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl font-bold">About You</h2>
        <p className="mt-1 text-muted-foreground">
          This powers your AI persona and role assignments.
        </p>
      </div>
      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            placeholder="Jane Smith"
            value={data.fullName}
            onChange={e => onChange({ fullName: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="jobTitle">Job Title</Label>
          <Input
            id="jobTitle"
            placeholder="Senior Product Manager"
            value={data.jobTitle}
            onChange={e => onChange({ jobTitle: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="department">Department</Label>
          <Select value={data.department} onValueChange={v => onChange({ department: v })}>
            <SelectTrigger>
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              {DEPARTMENTS.map(d => (
                <SelectItem key={d} value={d}>{d}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex justify-end">
        <Button onClick={onNext} disabled={!canProceed} className="gap-2">
          Continue
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// === Company ===
function CompanyStep({
  data,
  onChange,
  onGenerate,
}: {
  data: { companyName: string; industry: string };
  onChange: (u: Partial<typeof data>) => void;
  onGenerate: () => void;
}) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl font-bold">Your Organization</h2>
        <p className="mt-1 text-muted-foreground">
          Optional — helps AI tailor recommendations to your industry.
        </p>
      </div>
      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            placeholder="Acme Corp"
            value={data.companyName}
            onChange={e => onChange({ companyName: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="industry">Industry</Label>
          <Select value={data.industry} onValueChange={v => onChange({ industry: v })}>
            <SelectTrigger>
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              {INDUSTRIES.map(i => (
                <SelectItem key={i} value={i}>{i}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex justify-end gap-3">
        <Button variant="ghost" onClick={onGenerate}>
          Skip & Generate
        </Button>
        <Button onClick={onGenerate} className="gap-2">
          <Sparkles className="h-4 w-4" />
          Generate My Profile
        </Button>
      </div>
    </div>
  );
}

// === Generating ===
function GeneratingStep() {
  const steps = [
    'Analyzing your role...',
    'Mapping skills & expertise...',
    'Creating AI persona...',
    'Assigning role hats...',
    'Configuring ecosystems...',
  ];
  const [activeStep, setActiveStep] = useState(0);

  useState(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1800);
    return () => clearInterval(interval);
  });

  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-8">
      <motion.div
        className="relative h-20 w-20 rounded-2xl bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
        <Sparkles className="h-10 w-10 text-primary-foreground relative z-10" />
      </motion.div>
      <div className="text-center">
        <h2 className="font-display text-2xl font-bold">AI is building your profile</h2>
        <p className="mt-2 text-muted-foreground">This takes a few seconds...</p>
      </div>
      <div className="space-y-3 w-full max-w-sm">
        {steps.map((s, i) => (
          <motion.div
            key={s}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: i <= activeStep ? 1 : 0.3, x: 0 }}
            transition={{ delay: i * 0.3 }}
            className="flex items-center gap-3"
          >
            {i <= activeStep ? (
              <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                {i < activeStep ? (
                  <Check className="h-3 w-3 text-primary" />
                ) : (
                  <Loader2 className="h-3 w-3 text-primary animate-spin" />
                )}
              </div>
            ) : (
              <div className="h-5 w-5 rounded-full bg-muted" />
            )}
            <span className={cn('text-sm', i <= activeStep ? 'text-foreground' : 'text-muted-foreground')}>
              {s}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// === Review ===
function ReviewStep({
  data,
  onFinish,
  isSaving,
}: {
  data: ReturnType<typeof useUnifiedSetup>['data'];
  onFinish: () => void;
  isSaving: boolean;
}) {
  const profile = data.generatedProfile;
  const persona = profile?.persona;
  const hats = profile?.recommended_hats || [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold">Review Your AI Profile</h2>
        <p className="mt-1 text-muted-foreground">
          Here's what AI generated. You can always edit later.
        </p>
      </div>

      <ScrollArea className="max-h-[60vh]">
        <div className="space-y-6 pr-4">
          {/* Personal */}
          <Section title="You" icon={<User className="h-4 w-4" />}>
            <InfoRow label="Name" value={data.fullName} />
            <InfoRow label="Title" value={data.jobTitle} />
            <InfoRow label="Department" value={data.department} />
          </Section>

          {/* Skills */}
          {persona?.skills?.length ? (
            <Section title="Skills & Expertise" icon={<BrainCircuit className="h-4 w-4" />}>
              <TagRow label="Skills" items={persona.skills} />
              <TagRow label="Expertise" items={persona.expertise_areas} />
              <TagRow label="Tools" items={persona.tools_used} />
            </Section>
          ) : null}

          {/* Goals */}
          {persona?.goals?.length ? (
            <Section title="Goals & Challenges" icon={<Rocket className="h-4 w-4" />}>
              <TagRow label="Goals" items={persona.goals} />
              <TagRow label="Pain Points" items={persona.pain_points} />
            </Section>
          ) : null}

          {/* Hats */}
          {hats.length > 0 && (
            <Section title={`${hats.length} Role Hats`} icon={<HardHat className="h-4 w-4" />}>
              <div className="space-y-3">
                {hats.map((hat, i) => (
                  <div key={i} className="p-3 rounded-lg bg-muted/50 border border-border/50">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{hat.name}</span>
                      <Badge variant="secondary" className="text-xs">{hat.time_percentage}%</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{hat.description}</p>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Company */}
          {data.companyName && (
            <Section title="Organization" icon={<Building2 className="h-4 w-4" />}>
              <InfoRow label="Company" value={data.companyName} />
              <InfoRow label="Industry" value={data.industry} />
              {profile?.company?.tagline && <InfoRow label="Tagline" value={profile.company.tagline} />}
            </Section>
          )}
        </div>
      </ScrollArea>

      <Separator />

      <div className="flex justify-end gap-3">
        <Button
          size="lg"
          onClick={onFinish}
          disabled={isSaving}
          className="gap-2 px-8"
        >
          {isSaving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Check className="h-4 w-4" />
          )}
          Complete Setup
        </Button>
      </div>
    </div>
  );
}

// === Helpers ===
function Section({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      <div className="space-y-2 pl-6">{children}</div>
      <Separator className="mt-4" />
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground w-24 shrink-0">{label}</span>
      <span className="text-sm">{value || <span className="italic text-muted-foreground">—</span>}</span>
    </div>
  );
}

function TagRow({ label, items }: { label: string; items?: string[] }) {
  if (!items?.length) return null;
  return (
    <div className="flex items-start gap-2">
      <span className="text-xs text-muted-foreground w-24 shrink-0 pt-0.5">{label}</span>
      <div className="flex flex-wrap gap-1">
        {items.map((item, i) => (
          <Badge key={i} variant="secondary" className="text-xs">{item}</Badge>
        ))}
      </div>
    </div>
  );
}
