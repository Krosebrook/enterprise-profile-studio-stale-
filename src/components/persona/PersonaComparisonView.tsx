import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
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
import { useEmployeePersonas } from '@/hooks/useEmployeePersonas';
import { 
  GitCompare, 
  User, 
  MessageSquare, 
  Target, 
  Briefcase, 
  Brain,
  Check,
  X,
  Minus,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { EmployeePersona } from '@/types/employee-persona';

interface PersonaComparisonViewProps {
  trigger?: React.ReactNode;
}

const COMPARISON_SECTIONS = [
  { id: 'basic', title: 'Basic Info', icon: User },
  { id: 'communication', title: 'Communication Style', icon: MessageSquare },
  { id: 'work', title: 'Work Preferences', icon: Briefcase },
  { id: 'skills', title: 'Skills & Expertise', icon: Target },
  { id: 'ai', title: 'AI Preferences', icon: Brain },
];

const DEPARTMENT_COLORS: Record<string, string> = {
  'Engineering': 'bg-blue-500',
  'Product': 'bg-purple-500',
  'Design': 'bg-pink-500',
  'Marketing': 'bg-orange-500',
  'Sales': 'bg-green-500',
  'Operations': 'bg-yellow-500',
  'Finance': 'bg-emerald-500',
  'HR': 'bg-red-500',
  'IT': 'bg-cyan-500',
  'default': 'bg-gray-500',
};

function getDepartmentColor(department?: string) {
  if (!department) return DEPARTMENT_COLORS.default;
  for (const [key, color] of Object.entries(DEPARTMENT_COLORS)) {
    if (department.toLowerCase().includes(key.toLowerCase())) return color;
  }
  return DEPARTMENT_COLORS.default;
}

function ComparisonIndicator({ value1, value2, type = 'match' }: { value1: any; value2: any; type?: 'match' | 'compare' }) {
  const isMatch = value1 === value2;
  if (type === 'match') {
    return isMatch ? (
      <Check className="h-4 w-4 text-green-500" />
    ) : (
      <X className="h-4 w-4 text-red-400" />
    );
  }
  return <Minus className="h-4 w-4 text-muted-foreground" />;
}

function PersonaColumn({ persona, index }: { persona: EmployeePersona; index: number }) {
  const commStyle = persona.communication_style as any || {};
  const workPrefs = persona.work_preferences as any || {};

  return (
    <div className="flex-1 min-w-[280px] space-y-4">
      {/* Header */}
      <div className="p-4 rounded-xl bg-muted/50 border border-border/50">
        <div className="flex items-center gap-3 mb-3">
          <div className={cn(
            'h-10 w-10 rounded-xl flex items-center justify-center text-white font-bold',
            getDepartmentColor(persona.department)
          )}>
            {persona.name?.charAt(0) || '?'}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="font-semibold truncate">{persona.name}</h4>
            <p className="text-sm text-muted-foreground truncate">{persona.job_title || 'No title'}</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs">
          {persona.department || 'No department'}
        </Badge>
      </div>

      {/* Communication Style */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-primary" />
            Communication
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Formality</span>
            <span className="capitalize">{commStyle.formality || 'balanced'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Detail Level</span>
            <span className="capitalize">{commStyle.detail_level || 'balanced'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Technical Depth</span>
            <span className="capitalize">{commStyle.technical_depth || 'balanced'}</span>
          </div>
        </CardContent>
      </Card>

      {/* Work Preferences */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-primary" />
            Work Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Focus Time</span>
            <span className="capitalize">{workPrefs.focus_time || 'flexible'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Collaboration</span>
            <span className="capitalize">{workPrefs.collaboration_style || 'mixed'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Decision Making</span>
            <span className="capitalize">{workPrefs.decision_making || 'collaborative'}</span>
          </div>
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            Skills
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-1">
            {(persona.skills || []).slice(0, 6).map((skill, i) => (
              <Badge key={i} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
            {(persona.skills || []).length > 6 && (
              <Badge variant="secondary" className="text-xs">
                +{persona.skills!.length - 6}
              </Badge>
            )}
            {(!persona.skills || persona.skills.length === 0) && (
              <span className="text-xs text-muted-foreground">No skills added</span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* AI Preferences */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Brain className="h-4 w-4 text-primary" />
            AI Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Interaction Style</span>
            <span className="capitalize">{persona.ai_interaction_style || 'balanced'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Response Length</span>
            <span className="capitalize">{persona.preferred_response_length || 'medium'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tone</span>
            <span className="capitalize">{persona.preferred_tone || 'professional'}</span>
          </div>
        </CardContent>
      </Card>

      {/* Goals */}
      {persona.goals && persona.goals.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-xs space-y-1.5">
              {persona.goals.slice(0, 3).map((goal, i) => (
                <li key={i} className="flex items-start gap-2">
                  <ChevronRight className="h-3 w-3 mt-0.5 text-primary shrink-0" />
                  <span className="text-muted-foreground">{goal}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export function PersonaComparisonView({ trigger }: PersonaComparisonViewProps) {
  const [open, setOpen] = useState(false);
  const { data: personas = [] } = useEmployeePersonas();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const selectedPersonas = useMemo(() => {
    return selectedIds
      .map(id => personas.find(p => p.id === id))
      .filter((p): p is EmployeePersona => p !== undefined);
  }, [selectedIds, personas]);

  const availablePersonas = useMemo(() => {
    return personas.filter(p => !selectedIds.includes(p.id));
  }, [personas, selectedIds]);

  const handleAddPersona = (id: string) => {
    if (selectedIds.length < 3 && !selectedIds.includes(id)) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleRemovePersona = (id: string) => {
    setSelectedIds(selectedIds.filter(i => i !== id));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="gap-2">
            <GitCompare className="h-4 w-4" />
            Compare Personas
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <GitCompare className="h-5 w-5 text-primary" />
            Compare Personas
          </DialogTitle>
          <DialogDescription>
            Select 2-3 personas to compare their communication styles, work preferences, and capabilities side-by-side.
          </DialogDescription>
        </DialogHeader>

        {/* Persona Selector */}
        <div className="flex flex-wrap items-center gap-2 py-4 border-b">
          <span className="text-sm text-muted-foreground">Comparing:</span>
          {selectedPersonas.map((persona, i) => (
            <Badge 
              key={persona.id} 
              variant="secondary" 
              className="gap-1 pr-1"
            >
              {persona.name}
              <button
                onClick={() => handleRemovePersona(persona.id)}
                className="ml-1 hover:bg-destructive/20 rounded p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {selectedIds.length < 3 && (
            <Select onValueChange={handleAddPersona}>
              <SelectTrigger className="w-[180px] h-8 text-sm">
                <SelectValue placeholder="Add persona..." />
              </SelectTrigger>
              <SelectContent>
                {availablePersonas.map((persona) => (
                  <SelectItem key={persona.id} value={persona.id}>
                    {persona.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Comparison View */}
        <ScrollArea className="h-[60vh] pr-4">
          <AnimatePresence mode="wait">
            {selectedPersonas.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                  <GitCompare className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold mb-1">No Personas Selected</h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Select 2-3 personas from the dropdown above to compare their profiles side-by-side.
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-4 pb-4"
              >
                {selectedPersonas.map((persona, index) => (
                  <PersonaColumn key={persona.id} persona={persona} index={index} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
