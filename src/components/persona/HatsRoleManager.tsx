import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { 
  Plus, 
  Trash2, 
  Sparkles, 
  Loader2, 
  ChevronDown, 
  ChevronUp,
  Lightbulb,
  Wrench,
  GraduationCap,
  Zap
} from 'lucide-react';
import { useEmployeeHats, useCreateHat, useUpdateHat, useDeleteHat } from '@/hooks/useEmployeePersonas';
import { supabase } from '@/integrations/supabase/client';
import type { EmployeeHat, EmployeePersona, HatAISuggestions } from '@/types/employee-persona';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface HatsRoleManagerProps {
  persona: EmployeePersona;
}

export function HatsRoleManager({ persona }: HatsRoleManagerProps) {
  const { data: hats = [], isLoading } = useEmployeeHats(persona.id);
  const createHat = useCreateHat();
  const updateHat = useUpdateHat();
  const deleteHat = useDeleteHat();
  
  const [newHatName, setNewHatName] = useState('');
  const [newHatDescription, setNewHatDescription] = useState('');
  const [expandedHat, setExpandedHat] = useState<string | null>(null);
  const [generatingSuggestions, setGeneratingSuggestions] = useState<string | null>(null);

  const totalTimePercentage = hats.reduce((sum, hat) => sum + (hat.time_percentage || 0), 0);

  const handleAddHat = async () => {
    if (!newHatName.trim()) return;
    
    await createHat.mutateAsync({
      persona_id: persona.id,
      name: newHatName,
      description: newHatDescription,
    });
    
    setNewHatName('');
    setNewHatDescription('');
  };

  const handleUpdateHat = async (hat: EmployeeHat, updates: Partial<EmployeeHat>) => {
    await updateHat.mutateAsync({
      id: hat.id,
      personaId: persona.id,
      updates,
    });
  };

  const handleDeleteHat = async (hatId: string) => {
    await deleteHat.mutateAsync({ id: hatId, personaId: persona.id });
  };

  const handleGenerateSuggestions = async (hat: EmployeeHat) => {
    setGeneratingSuggestions(hat.id);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-persona-prompts', {
        body: {
          type: 'hat_suggestions',
          persona: {
            name: persona.name,
            job_title: persona.job_title,
            department: persona.department,
            skills: persona.skills,
            expertise_areas: persona.expertise_areas,
            communication_style: persona.communication_style,
            work_preferences: persona.work_preferences,
          },
          hat: {
            name: hat.name,
            description: hat.description,
            responsibilities: hat.responsibilities,
            key_tasks: hat.key_tasks,
            tools: hat.tools,
            time_percentage: hat.time_percentage,
          },
        },
      });

      if (error) {
        if (error.message.includes('429')) {
          toast.error('Rate limit reached. Please wait a moment and try again.');
        } else if (error.message.includes('402')) {
          toast.error('AI credits depleted. Please add credits to continue.');
        } else {
          throw error;
        }
        return;
      }

      if (data?.suggestions) {
        await handleUpdateHat(hat, { ai_suggestions: data.suggestions });
        toast.success('AI suggestions generated!');
      }
    } catch (err) {
      console.error('Failed to generate suggestions:', err);
      toast.error('Failed to generate suggestions');
    } finally {
      setGeneratingSuggestions(null);
    }
  };

  const addArrayItem = async (hat: EmployeeHat, field: 'responsibilities' | 'key_tasks' | 'stakeholders' | 'tools', value: string) => {
    if (!value.trim()) return;
    const currentArray = hat[field] || [];
    await handleUpdateHat(hat, { [field]: [...currentArray, value.trim()] });
  };

  const removeArrayItem = async (hat: EmployeeHat, field: 'responsibilities' | 'key_tasks' | 'stakeholders' | 'tools', index: number) => {
    const currentArray = hat[field] || [];
    await handleUpdateHat(hat, { [field]: currentArray.filter((_, i) => i !== index) });
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Time Allocation Overview */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Time Allocation</CardTitle>
          <CardDescription>
            How time is distributed across different roles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Total Allocated</span>
              <span className={cn(
                "font-medium",
                totalTimePercentage > 100 ? "text-destructive" : "text-muted-foreground"
              )}>
                {totalTimePercentage}%
              </span>
            </div>
            <Progress 
              value={Math.min(totalTimePercentage, 100)} 
              className={cn(totalTimePercentage > 100 && "[&>div]:bg-destructive")}
            />
            {totalTimePercentage > 100 && (
              <p className="text-sm text-destructive">
                Time allocation exceeds 100%. Consider adjusting role percentages.
              </p>
            )}
          </div>
          
          {hats.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {hats.map((hat) => (
                <Badge key={hat.id} variant="secondary" className="text-xs">
                  {hat.name}: {hat.time_percentage}%
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add New Hat */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Add New Role</CardTitle>
          <CardDescription>
            Define a new hat/responsibility for this employee
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="hatName">Role Name</Label>
              <Input
                id="hatName"
                placeholder="e.g., Project Manager"
                value={newHatName}
                onChange={(e) => setNewHatName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hatDescription">Description</Label>
              <Input
                id="hatDescription"
                placeholder="Brief description of this role"
                value={newHatDescription}
                onChange={(e) => setNewHatDescription(e.target.value)}
              />
            </div>
          </div>
          <Button 
            onClick={handleAddHat} 
            disabled={!newHatName.trim() || createHat.isPending}
          >
            {createHat.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Plus className="mr-2 h-4 w-4" />
            )}
            Add Role
          </Button>
        </CardContent>
      </Card>

      {/* Hats List */}
      <div className="space-y-4">
        {hats.map((hat) => (
          <HatCard
            key={hat.id}
            hat={hat}
            isExpanded={expandedHat === hat.id}
            onToggle={() => setExpandedHat(expandedHat === hat.id ? null : hat.id)}
            onUpdate={(updates) => handleUpdateHat(hat, updates)}
            onDelete={() => handleDeleteHat(hat.id)}
            onGenerateSuggestions={() => handleGenerateSuggestions(hat)}
            isGenerating={generatingSuggestions === hat.id}
            addArrayItem={(field, value) => addArrayItem(hat, field, value)}
            removeArrayItem={(field, index) => removeArrayItem(hat, field, index)}
          />
        ))}

        {hats.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-3 mb-4">
                <Plus className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-medium">No roles defined yet</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Add roles to define the different hats this employee wears
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

interface HatCardProps {
  hat: EmployeeHat;
  isExpanded: boolean;
  onToggle: () => void;
  onUpdate: (updates: Partial<EmployeeHat>) => void;
  onDelete: () => void;
  onGenerateSuggestions: () => void;
  isGenerating: boolean;
  addArrayItem: (field: 'responsibilities' | 'key_tasks' | 'stakeholders' | 'tools', value: string) => void;
  removeArrayItem: (field: 'responsibilities' | 'key_tasks' | 'stakeholders' | 'tools', index: number) => void;
}

function HatCard({ 
  hat, 
  isExpanded, 
  onToggle, 
  onUpdate, 
  onDelete, 
  onGenerateSuggestions,
  isGenerating,
  addArrayItem,
  removeArrayItem,
}: HatCardProps) {
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const suggestions = hat.ai_suggestions as HatAISuggestions;

  const handleAddItem = (field: 'responsibilities' | 'key_tasks' | 'stakeholders' | 'tools') => {
    const value = inputValues[field];
    if (value?.trim()) {
      addArrayItem(field, value);
      setInputValues(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Collapsible open={isExpanded} onOpenChange={onToggle}>
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <div>
                <CardTitle className="text-base">{hat.name}</CardTitle>
                {hat.description && (
                  <CardDescription className="text-sm">{hat.description}</CardDescription>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{hat.time_percentage}% time</Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={onGenerateSuggestions}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onDelete}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CollapsibleContent>
          <CardContent className="space-y-6 pt-0">
            {/* Time Allocation Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Time Allocation</Label>
                <span className="text-sm font-medium">{hat.time_percentage}%</span>
              </div>
              <Slider
                value={[hat.time_percentage]}
                onValueChange={([value]) => onUpdate({ time_percentage: value })}
                min={5}
                max={100}
                step={5}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={hat.description || ''}
                onChange={(e) => onUpdate({ description: e.target.value })}
                placeholder="Describe this role in detail..."
                rows={2}
              />
            </div>

            {/* Array Fields */}
            <ArrayField
              label="Responsibilities"
              items={hat.responsibilities || []}
              inputValue={inputValues.responsibilities || ''}
              onInputChange={(v) => setInputValues(prev => ({ ...prev, responsibilities: v }))}
              onAdd={() => handleAddItem('responsibilities')}
              onRemove={(i) => removeArrayItem('responsibilities', i)}
              placeholder="Add a responsibility..."
            />

            <ArrayField
              label="Key Tasks"
              items={hat.key_tasks || []}
              inputValue={inputValues.key_tasks || ''}
              onInputChange={(v) => setInputValues(prev => ({ ...prev, key_tasks: v }))}
              onAdd={() => handleAddItem('key_tasks')}
              onRemove={(i) => removeArrayItem('key_tasks', i)}
              placeholder="Add a key task..."
            />

            <ArrayField
              label="Stakeholders"
              items={hat.stakeholders || []}
              inputValue={inputValues.stakeholders || ''}
              onInputChange={(v) => setInputValues(prev => ({ ...prev, stakeholders: v }))}
              onAdd={() => handleAddItem('stakeholders')}
              onRemove={(i) => removeArrayItem('stakeholders', i)}
              placeholder="Add a stakeholder..."
            />

            <ArrayField
              label="Tools Used"
              items={hat.tools || []}
              inputValue={inputValues.tools || ''}
              onInputChange={(v) => setInputValues(prev => ({ ...prev, tools: v }))}
              onAdd={() => handleAddItem('tools')}
              onRemove={(i) => removeArrayItem('tools', i)}
              placeholder="Add a tool..."
            />

            {/* AI Suggestions */}
            {suggestions && Object.keys(suggestions).length > 0 && (
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="font-medium text-sm">AI Suggestions</span>
                </div>

                {suggestions.efficiency_tips && suggestions.efficiency_tips.length > 0 && (
                  <SuggestionSection
                    icon={<Lightbulb className="h-4 w-4" />}
                    title="Efficiency Tips"
                    items={suggestions.efficiency_tips}
                  />
                )}

                {suggestions.automation_opportunities && suggestions.automation_opportunities.length > 0 && (
                  <SuggestionSection
                    icon={<Zap className="h-4 w-4" />}
                    title="Automation Opportunities"
                    items={suggestions.automation_opportunities}
                  />
                )}

                {suggestions.skill_gaps && suggestions.skill_gaps.length > 0 && (
                  <SuggestionSection
                    icon={<GraduationCap className="h-4 w-4" />}
                    title="Skill Gaps"
                    items={suggestions.skill_gaps}
                  />
                )}

                {suggestions.recommended_tools && suggestions.recommended_tools.length > 0 && (
                  <SuggestionSection
                    icon={<Wrench className="h-4 w-4" />}
                    title="Recommended Tools"
                    items={suggestions.recommended_tools}
                  />
                )}
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}

interface ArrayFieldProps {
  label: string;
  items: string[];
  inputValue: string;
  onInputChange: (value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  placeholder: string;
}

function ArrayField({ label, items, inputValue, onInputChange, onAdd, onRemove, placeholder }: ArrayFieldProps) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder={placeholder}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), onAdd())}
        />
        <Button type="button" variant="outline" size="sm" onClick={onAdd}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      {items.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {items.map((item, index) => (
            <Badge key={index} variant="secondary" className="gap-1">
              {item}
              <button
                onClick={() => onRemove(index)}
                className="ml-1 hover:text-destructive"
              >
                ×
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

interface SuggestionSectionProps {
  icon: React.ReactNode;
  title: string;
  items: string[];
}

function SuggestionSection({ icon, title, items }: SuggestionSectionProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        {icon}
        {title}
      </div>
      <ul className="text-sm space-y-1 ml-6">
        {items.map((item, i) => (
          <li key={i} className="list-disc">{item}</li>
        ))}
      </ul>
    </div>
  );
}
