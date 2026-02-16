import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  User, 
  MessageSquare, 
  Target,
  Brain,
  Loader2,
  FileUp
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { DocumentImportDialog } from '@/components/shared/DocumentImportDialog';
import { BatchDocumentImportDialog } from '@/components/shared/BatchDocumentImportDialog';
import type { PersonaExtractionData } from '@/hooks/useDocumentExtraction';
import type { 
  EmployeePersona, 
  CommunicationStyle, 
  WorkPreferences,
  COMMUNICATION_STYLES
} from '@/types/employee-persona';

interface PersonaBuilderWizardProps {
  persona: EmployeePersona;
  onUpdate: (updates: Partial<EmployeePersona>) => Promise<void>;
  isSaving: boolean;
}

const STEPS = [
  { id: 'basic', title: 'Basic Info', icon: User, description: 'Name, title, department' },
  { id: 'communication', title: 'Communication', icon: MessageSquare, description: 'How they prefer to communicate' },
  { id: 'goals', title: 'Goals & Pain Points', icon: Target, description: 'What they want to achieve' },
  { id: 'ai', title: 'AI Preferences', icon: Brain, description: 'How AI should interact' },
];

export function PersonaBuilderWizard({ persona, onUpdate, isSaving }: PersonaBuilderWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [localData, setLocalData] = useState({
    name: persona.name || '',
    email: persona.email || '',
    department: persona.department || '',
    job_title: persona.job_title || '',
    communication_style: persona.communication_style || {
      formality: 'balanced',
      detail_level: 'balanced',
      examples_preference: 'moderate',
      technical_depth: 'balanced',
    },
    work_preferences: persona.work_preferences || {
      focus_time: 'flexible',
      collaboration_style: 'mixed',
      decision_making: 'collaborative',
      feedback_preference: 'direct',
    },
    pain_points: persona.pain_points || [],
    goals: persona.goals || [],
    skills: persona.skills || [],
    expertise_areas: persona.expertise_areas || [],
    tools_used: persona.tools_used || [],
    ai_interaction_style: persona.ai_interaction_style || 'balanced',
    preferred_response_length: persona.preferred_response_length || 'medium',
    preferred_tone: persona.preferred_tone || 'professional',
  });

  const [newPainPoint, setNewPainPoint] = useState('');
  const [newGoal, setNewGoal] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [newExpertise, setNewExpertise] = useState('');
  const [newTool, setNewTool] = useState('');

  // Handle data extraction from document import
  const handleDocumentExtraction = (data: PersonaExtractionData) => {
    setLocalData(prev => ({
      ...prev,
      name: data.name || prev.name,
      email: data.email || prev.email,
      job_title: data.job_title || prev.job_title,
      department: data.department || prev.department,
      skills: data.skills?.length ? [...prev.skills, ...data.skills.filter(s => !prev.skills.includes(s))] : prev.skills,
      expertise_areas: data.expertise_areas?.length ? [...prev.expertise_areas, ...data.expertise_areas.filter(e => !prev.expertise_areas.includes(e))] : prev.expertise_areas,
      tools_used: data.tools_used?.length ? [...prev.tools_used, ...data.tools_used.filter(t => !prev.tools_used.includes(t))] : prev.tools_used,
      goals: data.goals?.length ? [...prev.goals, ...data.goals.filter(g => !prev.goals.includes(g))] : prev.goals,
      pain_points: data.pain_points?.length ? [...prev.pain_points, ...data.pain_points.filter(p => !prev.pain_points.includes(p))] : prev.pain_points,
      communication_style: {
        formality: data.communication_style?.formality || prev.communication_style.formality,
        detail_level: data.communication_style?.detail_level || prev.communication_style.detail_level,
        examples_preference: data.communication_style?.examples_preference || prev.communication_style.examples_preference,
        technical_depth: data.communication_style?.technical_depth || prev.communication_style.technical_depth,
      },
      work_preferences: {
        focus_time: data.work_preferences?.focus_time || prev.work_preferences.focus_time,
        collaboration_style: data.work_preferences?.collaboration_style || prev.work_preferences.collaboration_style,
        decision_making: data.work_preferences?.decision_making || prev.work_preferences.decision_making,
        feedback_preference: data.work_preferences?.feedback_preference || prev.work_preferences.feedback_preference,
      },
      ai_interaction_style: data.ai_interaction_style || prev.ai_interaction_style,
      preferred_tone: data.preferred_tone || prev.preferred_tone,
    }));
  };
  const handleNext = async () => {
    if (currentStep < STEPS.length - 1) {
      await onUpdate(localData);
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    await onUpdate({ ...localData, status: 'active' });
  };

  const updateCommunicationStyle = (key: keyof CommunicationStyle, value: string) => {
    setLocalData(prev => ({
      ...prev,
      communication_style: { ...prev.communication_style, [key]: value },
    }));
  };

  const updateWorkPreferences = (key: keyof WorkPreferences, value: string) => {
    setLocalData(prev => ({
      ...prev,
      work_preferences: { ...prev.work_preferences, [key]: value },
    }));
  };

  const addArrayItem = (field: 'pain_points' | 'goals' | 'skills' | 'expertise_areas' | 'tools_used', value: string) => {
    if (!value.trim()) return;
    setLocalData(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), value.trim()],
    }));
  };

  const removeArrayItem = (field: 'pain_points' | 'goals' | 'skills' | 'expertise_areas' | 'tools_used', index: number) => {
    setLocalData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            {/* Import from Document Button */}
            <div className="flex justify-end gap-2">
              <DocumentImportDialog
                extractionType="persona"
                onDataExtracted={(data) => handleDocumentExtraction(data as PersonaExtractionData)}
                trigger={
                  <Button variant="outline" className="gap-2">
                    <FileUp className="h-4 w-4" />
                    Import from Resume/CV
                  </Button>
                }
                title="Import Persona from Document"
                description="Upload a resume, LinkedIn profile, or job description to auto-fill persona fields. Only explicitly stated information will be extracted."
              />
              <BatchDocumentImportDialog
                extractionType="persona"
                onDataExtracted={(data) => handleDocumentExtraction(data as PersonaExtractionData)}
                title="Batch Import — Persona"
                description="Upload multiple documents (resumes, JDs, notes) and merge extracted data into a single persona."
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={localData.name}
                  onChange={(e) => setLocalData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={localData.email}
                  onChange={(e) => setLocalData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="john@company.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="job_title">Job Title</Label>
                <Input
                  id="job_title"
                  value={localData.job_title}
                  onChange={(e) => setLocalData(prev => ({ ...prev, job_title: e.target.value }))}
                  placeholder="Senior Product Manager"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={localData.department}
                  onChange={(e) => setLocalData(prev => ({ ...prev, department: e.target.value }))}
                  placeholder="Product"
                />
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-2">
              <Label>Skills</Label>
              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addArrayItem('skills', newSkill);
                      setNewSkill('');
                    }
                  }}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => { addArrayItem('skills', newSkill); setNewSkill(''); }}
                >
                  Add
                </Button>
              </div>
              {localData.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {localData.skills.map((skill, i) => (
                    <Badge key={i} variant="secondary" className="gap-1">
                      {skill}
                      <button onClick={() => removeArrayItem('skills', i)} className="ml-1 hover:text-destructive">×</button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Expertise Areas */}
            <div className="space-y-2">
              <Label>Expertise Areas</Label>
              <div className="flex gap-2">
                <Input
                  value={newExpertise}
                  onChange={(e) => setNewExpertise(e.target.value)}
                  placeholder="Add an expertise area..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addArrayItem('expertise_areas', newExpertise);
                      setNewExpertise('');
                    }
                  }}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => { addArrayItem('expertise_areas', newExpertise); setNewExpertise(''); }}
                >
                  Add
                </Button>
              </div>
              {localData.expertise_areas.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {localData.expertise_areas.map((area, i) => (
                    <Badge key={i} variant="secondary" className="gap-1">
                      {area}
                      <button onClick={() => removeArrayItem('expertise_areas', i)} className="ml-1 hover:text-destructive">×</button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Tools Used */}
            <div className="space-y-2">
              <Label>Tools Used</Label>
              <div className="flex gap-2">
                <Input
                  value={newTool}
                  onChange={(e) => setNewTool(e.target.value)}
                  placeholder="Add a tool..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addArrayItem('tools_used', newTool);
                      setNewTool('');
                    }
                  }}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => { addArrayItem('tools_used', newTool); setNewTool(''); }}
                >
                  Add
                </Button>
              </div>
              {localData.tools_used.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {localData.tools_used.map((tool, i) => (
                    <Badge key={i} variant="secondary" className="gap-1">
                      {tool}
                      <button onClick={() => removeArrayItem('tools_used', i)} className="ml-1 hover:text-destructive">×</button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Formality */}
              <div className="space-y-3">
                <Label>Formality Level</Label>
                <RadioGroup
                  value={localData.communication_style.formality}
                  onValueChange={(v) => updateCommunicationStyle('formality', v)}
                >
                  {[
                    { value: 'casual', label: 'Casual', desc: 'Friendly and relaxed' },
                    { value: 'balanced', label: 'Balanced', desc: 'Professional but approachable' },
                    { value: 'formal', label: 'Formal', desc: 'Strictly professional' },
                  ].map((opt) => (
                    <div key={opt.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={opt.value} id={`formality-${opt.value}`} />
                      <Label htmlFor={`formality-${opt.value}`} className="flex flex-col">
                        <span>{opt.label}</span>
                        <span className="text-xs text-muted-foreground">{opt.desc}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Detail Level */}
              <div className="space-y-3">
                <Label>Detail Preference</Label>
                <RadioGroup
                  value={localData.communication_style.detail_level}
                  onValueChange={(v) => updateCommunicationStyle('detail_level', v)}
                >
                  {[
                    { value: 'concise', label: 'Concise', desc: 'Brief and to the point' },
                    { value: 'balanced', label: 'Balanced', desc: 'Moderate detail' },
                    { value: 'detailed', label: 'Detailed', desc: 'Comprehensive explanations' },
                  ].map((opt) => (
                    <div key={opt.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={opt.value} id={`detail-${opt.value}`} />
                      <Label htmlFor={`detail-${opt.value}`} className="flex flex-col">
                        <span>{opt.label}</span>
                        <span className="text-xs text-muted-foreground">{opt.desc}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Technical Depth */}
              <div className="space-y-3">
                <Label>Technical Depth</Label>
                <RadioGroup
                  value={localData.communication_style.technical_depth}
                  onValueChange={(v) => updateCommunicationStyle('technical_depth', v)}
                >
                  {[
                    { value: 'simplified', label: 'Simplified', desc: 'Non-technical language' },
                    { value: 'balanced', label: 'Balanced', desc: 'Some technical terms' },
                    { value: 'technical', label: 'Technical', desc: 'Full technical depth' },
                  ].map((opt) => (
                    <div key={opt.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={opt.value} id={`tech-${opt.value}`} />
                      <Label htmlFor={`tech-${opt.value}`} className="flex flex-col">
                        <span>{opt.label}</span>
                        <span className="text-xs text-muted-foreground">{opt.desc}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Examples Preference */}
              <div className="space-y-3">
                <Label>Examples Preference</Label>
                <RadioGroup
                  value={localData.communication_style.examples_preference}
                  onValueChange={(v) => updateCommunicationStyle('examples_preference', v)}
                >
                  {[
                    { value: 'minimal', label: 'Minimal', desc: 'Few examples' },
                    { value: 'moderate', label: 'Moderate', desc: 'Some examples' },
                    { value: 'extensive', label: 'Extensive', desc: 'Many examples' },
                  ].map((opt) => (
                    <div key={opt.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={opt.value} id={`examples-${opt.value}`} />
                      <Label htmlFor={`examples-${opt.value}`} className="flex flex-col">
                        <span>{opt.label}</span>
                        <span className="text-xs text-muted-foreground">{opt.desc}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            {/* Pain Points */}
            <div className="space-y-3">
              <Label>Pain Points</Label>
              <p className="text-sm text-muted-foreground">What challenges do you face in your daily work?</p>
              <div className="flex gap-2">
                <Textarea
                  value={newPainPoint}
                  onChange={(e) => setNewPainPoint(e.target.value)}
                  placeholder="Describe a pain point..."
                  rows={2}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => { addArrayItem('pain_points', newPainPoint); setNewPainPoint(''); }}
                  className="shrink-0"
                >
                  Add
                </Button>
              </div>
              {localData.pain_points.length > 0 && (
                <div className="space-y-2 mt-3">
                  {localData.pain_points.map((point, i) => (
                    <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-muted/50">
                      <span className="flex-1 text-sm">{point}</span>
                      <button 
                        onClick={() => removeArrayItem('pain_points', i)} 
                        className="text-muted-foreground hover:text-destructive"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Goals */}
            <div className="space-y-3">
              <Label>Goals</Label>
              <p className="text-sm text-muted-foreground">What do you want to achieve with AI assistance?</p>
              <div className="flex gap-2">
                <Textarea
                  value={newGoal}
                  onChange={(e) => setNewGoal(e.target.value)}
                  placeholder="Describe a goal..."
                  rows={2}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => { addArrayItem('goals', newGoal); setNewGoal(''); }}
                  className="shrink-0"
                >
                  Add
                </Button>
              </div>
              {localData.goals.length > 0 && (
                <div className="space-y-2 mt-3">
                  {localData.goals.map((goal, i) => (
                    <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-muted/50">
                      <span className="flex-1 text-sm">{goal}</span>
                      <button 
                        onClick={() => removeArrayItem('goals', i)} 
                        className="text-muted-foreground hover:text-destructive"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            {/* AI Interaction Style */}
            <div className="space-y-3">
              <Label>AI Interaction Style</Label>
              <RadioGroup
                onValueChange={(v) => setLocalData(prev => ({ ...prev, ai_interaction_style: v as 'concise' | 'balanced' | 'comprehensive' }))}
              >
                {[
                  { value: 'concise', label: 'Concise', desc: 'Quick, direct answers' },
                  { value: 'balanced', label: 'Balanced', desc: 'Thoughtful responses' },
                  { value: 'comprehensive', label: 'Comprehensive', desc: 'Thorough explanations' },
                ].map((opt) => (
                  <Label
                    key={opt.value}
                    htmlFor={`ai-style-${opt.value}`}
                    className={cn(
                      "flex flex-col items-center justify-center rounded-lg border-2 p-4 cursor-pointer transition-colors",
                      localData.ai_interaction_style === opt.value 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <RadioGroupItem value={opt.value} id={`ai-style-${opt.value}`} className="sr-only" />
                    <span className="font-medium">{opt.label}</span>
                    <span className="text-xs text-muted-foreground text-center">{opt.desc}</span>
                  </Label>
                ))}
              </RadioGroup>
            </div>

            {/* Response Length */}
            <div className="space-y-3">
              <Label>Preferred Response Length</Label>
              <RadioGroup
                onValueChange={(v) => setLocalData(prev => ({ ...prev, preferred_response_length: v as 'short' | 'medium' | 'long' }))}
              >
                {[
                  { value: 'short', label: 'Short', desc: '1-2 paragraphs' },
                  { value: 'medium', label: 'Medium', desc: '3-5 paragraphs' },
                  { value: 'long', label: 'Long', desc: 'Detailed essays' },
                ].map((opt) => (
                  <Label
                    key={opt.value}
                    htmlFor={`length-${opt.value}`}
                    className={cn(
                      "flex flex-col items-center justify-center rounded-lg border-2 p-4 cursor-pointer transition-colors",
                      localData.preferred_response_length === opt.value 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <RadioGroupItem value={opt.value} id={`length-${opt.value}`} className="sr-only" />
                    <span className="font-medium">{opt.label}</span>
                    <span className="text-xs text-muted-foreground text-center">{opt.desc}</span>
                  </Label>
                ))}
              </RadioGroup>
            </div>

            {/* Tone */}
            <div className="space-y-3">
              <Label>Preferred Tone</Label>
              <RadioGroup
                onValueChange={(v) => setLocalData(prev => ({ ...prev, preferred_tone: v as 'casual' | 'professional' | 'formal' }))}
              >
                {[
                  { value: 'casual', label: 'Casual', desc: 'Friendly, conversational' },
                  { value: 'professional', label: 'Professional', desc: 'Business appropriate' },
                  { value: 'formal', label: 'Formal', desc: 'Strictly formal' },
                ].map((opt) => (
                  <Label
                    key={opt.value}
                    htmlFor={`tone-${opt.value}`}
                    className={cn(
                      "flex flex-col items-center justify-center rounded-lg border-2 p-4 cursor-pointer transition-colors",
                      localData.preferred_tone === opt.value 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <RadioGroupItem value={opt.value} id={`tone-${opt.value}`} className="sr-only" />
                    <span className="font-medium">{opt.label}</span>
                    <span className="text-xs text-muted-foreground text-center">{opt.desc}</span>
                  </Label>
                ))}
              </RadioGroup>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-between">
        {STEPS.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <button
              onClick={() => setCurrentStep(index)}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 transition-colors",
                index === currentStep 
                  ? "bg-primary text-primary-foreground" 
                  : index < currentStep 
                    ? "bg-primary/20 text-primary" 
                    : "bg-muted text-muted-foreground"
              )}
            >
              <step.icon className="h-4 w-4" />
              <span className="hidden sm:inline text-sm font-medium">{step.title}</span>
            </button>
            {index < STEPS.length - 1 && (
              <div className={cn(
                "h-px w-8 mx-2",
                index < currentStep ? "bg-primary" : "bg-border"
              )} />
            )}
          </div>
        ))}
      </div>

      {/* Current Step Content */}
      <Card>
        <CardHeader>
          <CardTitle>{STEPS[currentStep].title}</CardTitle>
          <CardDescription>{STEPS[currentStep].description}</CardDescription>
        </CardHeader>
        <CardContent>
          {renderStep()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 0}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        {currentStep === STEPS.length - 1 ? (
          <Button
            onClick={handleComplete}
            disabled={isSaving}
            className="primary-gradient border-0"
          >
            {isSaving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Check className="mr-2 h-4 w-4" />
            )}
            Complete Setup
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            disabled={isSaving}
            className="primary-gradient border-0"
          >
            {isSaving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
