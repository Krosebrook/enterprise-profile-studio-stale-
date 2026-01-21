import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEmployeePersona, useUpdatePersona } from '@/hooks/useEmployeePersonas';
import { PersonaBuilderWizard } from '@/components/persona/PersonaBuilderWizard';
import { HatsRoleManager } from '@/components/persona/HatsRoleManager';
import { EcosystemExportPanel } from '@/components/persona/EcosystemExportPanel';
import { AIPersonaGenerator, GeneratedPersonaData } from '@/components/persona/AIPersonaGenerator';
import { ArrowLeft, User, HardHat, Download, Loader2, Sparkles } from 'lucide-react';
import type { EmployeePersona } from '@/types/employee-persona';

export default function PersonaBuilderPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: persona, isLoading } = useEmployeePersona(id);
  const updatePersona = useUpdatePersona();
  const [activeTab, setActiveTab] = useState('profile');

  const handleUpdate = async (updates: Partial<EmployeePersona>) => {
    if (!id) return;
    await updatePersona.mutateAsync({ id, updates });
  };

  const handleAIGenerated = async (data: GeneratedPersonaData) => {
    if (!id) return;
    await updatePersona.mutateAsync({
      id,
      updates: {
        communication_style: data.communication_style,
        work_preferences: data.work_preferences,
        skills: data.skills,
        expertise_areas: data.expertise_areas,
        tools_used: data.tools_used,
        pain_points: data.pain_points,
        goals: data.goals,
        ai_interaction_style: data.ai_interaction_style,
        preferred_response_length: data.preferred_response_length,
        preferred_tone: data.preferred_tone,
      },
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!persona) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Persona not found</p>
        <Button variant="outline" onClick={() => navigate('/personas')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Personas
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-12 pt-20">
      <div className="container max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate('/personas')} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Personas
          </Button>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl font-bold">{persona.name}</h1>
              <p className="mt-1 text-muted-foreground">
                {persona.job_title && persona.department 
                  ? `${persona.job_title} • ${persona.department}`
                  : 'Configure your AI persona profile'}
              </p>
            </div>
            <AIPersonaGenerator 
              onGenerated={handleAIGenerated}
              trigger={
                <Button variant="outline" className="gap-2 border-primary/30 hover:border-primary/60 hover:bg-primary/5">
                  <Sparkles className="h-4 w-4 text-primary" />
                  AI Auto-Fill
                </Button>
              }
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="hats" className="gap-2">
              <HardHat className="h-4 w-4" />
              Roles (Hats)
            </TabsTrigger>
            <TabsTrigger value="export" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <PersonaBuilderWizard 
              persona={persona} 
              onUpdate={handleUpdate}
              isSaving={updatePersona.isPending}
            />
          </TabsContent>

          <TabsContent value="hats">
            <HatsRoleManager persona={persona} />
          </TabsContent>

          <TabsContent value="export">
            <EcosystemExportPanel persona={persona} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
