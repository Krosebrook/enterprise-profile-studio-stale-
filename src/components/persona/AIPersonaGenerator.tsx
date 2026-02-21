import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Sparkles, Loader2, Wand2, Brain, Zap, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AIPersonaGeneratorProps {
  onGenerated: (personaData: GeneratedPersonaData) => void;
  trigger?: React.ReactNode;
  externalOpen?: boolean;
  onExternalOpenChange?: (open: boolean) => void;
}

export interface GeneratedPersonaData {
  communication_style: {
    formality: 'casual' | 'balanced' | 'formal';
    detail_level: 'concise' | 'balanced' | 'detailed';
    examples_preference: 'minimal' | 'moderate' | 'extensive';
    technical_depth: 'simplified' | 'balanced' | 'technical';
  };
  work_preferences: {
    focus_time: 'morning' | 'afternoon' | 'evening' | 'flexible';
    collaboration_style: 'async' | 'realtime' | 'mixed';
    decision_making: 'data_driven' | 'intuitive' | 'collaborative';
    feedback_preference: 'direct' | 'diplomatic' | 'coaching';
  };
  skills: string[];
  expertise_areas: string[];
  tools_used: string[];
  pain_points: string[];
  goals: string[];
  ai_interaction_style: 'concise' | 'balanced' | 'comprehensive';
  preferred_response_length: 'short' | 'medium' | 'long';
  preferred_tone: 'casual' | 'professional' | 'formal';
}

const DEPARTMENTS = [
  'Engineering',
  'Product',
  'Design',
  'Marketing',
  'Sales',
  'Customer Success',
  'Operations',
  'Finance',
  'Human Resources',
  'Legal',
  'Information Security',
  'IT Support',
  'Executive',
  'Research',
  'Data Science',
];

export function AIPersonaGenerator({ onGenerated, trigger, externalOpen, onExternalOpenChange }: AIPersonaGeneratorProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen = (v: boolean) => {
    if (onExternalOpenChange) onExternalOpenChange(v);
    setInternalOpen(v);
  };
  const [isGenerating, setIsGenerating] = useState(false);
  const [step, setStep] = useState<'input' | 'generating' | 'success'>('input');
  const [jobTitle, setJobTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [additionalContext, setAdditionalContext] = useState('');

  const handleGenerate = async () => {
    if (!jobTitle || !department) {
      toast({
        title: 'Missing Information',
        description: 'Please enter both job title and department.',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);
    setStep('generating');

    try {
      const { data, error } = await supabase.functions.invoke('generate-persona', {
        body: {
          job_title: jobTitle,
          department,
          additional_context: additionalContext || undefined,
        },
      });

      if (error) throw error;

      if (data?.success && data?.persona) {
        setStep('success');
        setTimeout(() => {
          onGenerated(data.persona);
          setOpen(false);
          setStep('input');
          setJobTitle('');
          setDepartment('');
          setAdditionalContext('');
          toast({
            title: 'Persona Generated!',
            description: `AI-powered profile for ${jobTitle} in ${department} is ready.`,
          });
        }, 1500);
      } else {
        throw new Error(data?.error || 'Failed to generate persona');
      }
    } catch (err) {
      console.error('Generation error:', err);
      toast({
        title: 'Generation Failed',
        description: err instanceof Error ? err.message : 'Failed to generate persona. Please try again.',
        variant: 'destructive',
      });
      setStep('input');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="gap-2 border-primary/30 hover:border-primary/60">
            <Sparkles className="h-4 w-4 text-primary" />
            AI Generate
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <Brain className="h-4 w-4 text-primary" />
            </div>
            AI Persona Generator
          </DialogTitle>
          <DialogDescription>
            Enter a job title and department, and AI will generate a complete persona profile with communication style, skills, and preferences.
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {step === 'input' && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4 py-4"
            >
              <div className="space-y-2">
                <Label htmlFor="job-title">Job Title *</Label>
                <Input
                  id="job-title"
                  placeholder="e.g., Senior Product Manager"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {DEPARTMENTS.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="context">Additional Context (Optional)</Label>
                <Textarea
                  id="context"
                  placeholder="e.g., Works remotely, manages a team of 5, focuses on B2B products..."
                  value={additionalContext}
                  onChange={(e) => setAdditionalContext(e.target.value)}
                  rows={3}
                />
              </div>

              <Button
                onClick={handleGenerate}
                disabled={!jobTitle || !department}
                className="w-full gap-2 primary-gradient border-0"
              >
                <Wand2 className="h-4 w-4" />
                Generate Persona
              </Button>
            </motion.div>
          )}

          {step === 'generating' && (
            <motion.div
              key="generating"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="py-12 flex flex-col items-center justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse" />
                <motion.div
                  className="relative h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="h-8 w-8 text-primary-foreground" />
                </motion.div>
              </div>
              <h3 className="mt-6 text-lg font-semibold">Generating Persona</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Analyzing {jobTitle} in {department}...
              </p>
              <div className="flex gap-1 mt-4">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="h-2 w-2 rounded-full bg-primary"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 flex flex-col items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 10, stiffness: 200 }}
                className="h-16 w-16 rounded-full bg-green-500/20 flex items-center justify-center"
              >
                <Check className="h-8 w-8 text-green-500" />
              </motion.div>
              <h3 className="mt-6 text-lg font-semibold text-green-600">Persona Generated!</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Applying to your persona...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
