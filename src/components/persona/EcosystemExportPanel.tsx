import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Bot, 
  Sparkles, 
  Zap, 
  Loader2, 
  Copy, 
  Check,
  Download,
  RefreshCw
} from 'lucide-react';
import { useEcosystemExports, useSaveEcosystemExport, useEmployeeHats } from '@/hooks/useEmployeePersonas';
import { supabase } from '@/integrations/supabase/client';
import type { EmployeePersona, EcosystemExport } from '@/types/employee-persona';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface EcosystemExportPanelProps {
  persona: EmployeePersona;
}

const ECOSYSTEMS = [
  { 
    id: 'claude' as const, 
    name: 'Claude', 
    subtitle: 'Anthropic', 
    icon: Bot, 
    color: 'bg-orange-500',
    description: 'System prompt for Claude conversations'
  },
  { 
    id: 'copilot' as const, 
    name: 'Microsoft Copilot', 
    subtitle: 'Microsoft 365', 
    icon: Sparkles, 
    color: 'bg-blue-500',
    description: 'Custom instructions for Copilot'
  },
  { 
    id: 'gemini' as const, 
    name: 'Google Gemini', 
    subtitle: 'Google Workspace', 
    icon: Zap, 
    color: 'bg-purple-500',
    description: 'Context configuration for Gemini'
  },
];

export function EcosystemExportPanel({ persona }: EcosystemExportPanelProps) {
  const { data: exports = [], isLoading } = useEcosystemExports(persona.id);
  const { data: hats = [] } = useEmployeeHats(persona.id);
  const saveExport = useSaveEcosystemExport();
  
  const [activeTab, setActiveTab] = useState<'claude' | 'copilot' | 'gemini'>('claude');
  const [generating, setGenerating] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<Record<string, string>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const getExportForEcosystem = (ecosystem: 'claude' | 'copilot' | 'gemini'): EcosystemExport | undefined => {
    return exports.find(e => e.ecosystem === ecosystem && e.export_type === 'system_prompt');
  };

  const getCurrentContent = (ecosystem: 'claude' | 'copilot' | 'gemini'): string => {
    if (editedContent[ecosystem] !== undefined) {
      return editedContent[ecosystem];
    }
    return getExportForEcosystem(ecosystem)?.content || '';
  };

  const handleGenerate = async (ecosystem: 'claude' | 'copilot' | 'gemini') => {
    setGenerating(ecosystem);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-persona-prompts', {
        body: {
          type: ecosystem,
          persona: {
            name: persona.name,
            job_title: persona.job_title,
            department: persona.department,
            communication_style: persona.communication_style,
            work_preferences: persona.work_preferences,
            pain_points: persona.pain_points,
            goals: persona.goals,
            skills: persona.skills,
            expertise_areas: persona.expertise_areas,
            tools_used: persona.tools_used,
            ai_interaction_style: persona.ai_interaction_style,
            preferred_response_length: persona.preferred_response_length,
            preferred_tone: persona.preferred_tone,
          },
          hats: hats.map(hat => ({
            name: hat.name,
            description: hat.description,
            responsibilities: hat.responsibilities,
            key_tasks: hat.key_tasks,
            stakeholders: hat.stakeholders,
            tools: hat.tools,
            time_percentage: hat.time_percentage,
          })),
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

      if (data?.content) {
        setEditedContent(prev => ({ ...prev, [ecosystem]: data.content }));
        
        // Auto-save
        await saveExport.mutateAsync({
          persona_id: persona.id,
          ecosystem,
          export_type: 'system_prompt',
          name: `${persona.name} - ${ecosystem.charAt(0).toUpperCase() + ecosystem.slice(1)} System Prompt`,
          content: data.content,
        });
        
        toast.success(`${ecosystem.charAt(0).toUpperCase() + ecosystem.slice(1)} prompt generated!`);
      }
    } catch (err) {
      console.error('Failed to generate prompt:', err);
      toast.error('Failed to generate prompt');
    } finally {
      setGenerating(null);
    }
  };

  const handleSave = async (ecosystem: 'claude' | 'copilot' | 'gemini') => {
    const content = editedContent[ecosystem];
    if (!content) return;

    await saveExport.mutateAsync({
      persona_id: persona.id,
      ecosystem,
      export_type: 'system_prompt',
      name: `${persona.name} - ${ecosystem.charAt(0).toUpperCase() + ecosystem.slice(1)} System Prompt`,
      content,
    });
  };

  const handleCopy = async (ecosystem: 'claude' | 'copilot' | 'gemini') => {
    const content = getCurrentContent(ecosystem);
    if (!content) return;

    await navigator.clipboard.writeText(content);
    setCopiedId(ecosystem);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownload = (ecosystem: 'claude' | 'copilot' | 'gemini') => {
    const content = getCurrentContent(ecosystem);
    if (!content) return;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${persona.name.toLowerCase().replace(/\s+/g, '-')}-${ecosystem}-prompt.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Downloaded!');
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
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Multi-Ecosystem Export</CardTitle>
        <CardDescription>
          Generate and manage AI prompts for different platforms
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
          <TabsList className="grid w-full grid-cols-3">
            {ECOSYSTEMS.map((eco) => {
              const hasExport = !!getExportForEcosystem(eco.id);
              return (
                <TabsTrigger key={eco.id} value={eco.id} className="relative">
                  <eco.icon className="mr-2 h-4 w-4" />
                  {eco.name}
                  {hasExport && (
                    <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-green-500" />
                  )}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {ECOSYSTEMS.map((eco) => {
            const existingExport = getExportForEcosystem(eco.id);
            const content = getCurrentContent(eco.id);
            const hasChanges = editedContent[eco.id] !== undefined && 
              editedContent[eco.id] !== existingExport?.content;

            return (
              <TabsContent key={eco.id} value={eco.id} className="space-y-4">
                {/* Ecosystem Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg text-white", eco.color)}>
                      <eco.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">{eco.name}</h4>
                      <p className="text-sm text-muted-foreground">{eco.description}</p>
                    </div>
                  </div>
                  {existingExport && (
                    <Badge variant="outline" className="text-xs">
                      v{existingExport.version}
                    </Badge>
                  )}
                </div>

                {/* Content Area */}
                <div className="space-y-3">
                  <Textarea
                    value={content}
                    onChange={(e) => setEditedContent(prev => ({ ...prev, [eco.id]: e.target.value }))}
                    placeholder={`Click "Generate" to create a ${eco.name} system prompt based on the persona profile...`}
                    className="min-h-[300px] font-mono text-sm"
                  />

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={() => handleGenerate(eco.id)}
                      disabled={generating === eco.id}
                      className="primary-gradient border-0"
                    >
                      {generating === eco.id ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : existingExport ? (
                        <RefreshCw className="mr-2 h-4 w-4" />
                      ) : (
                        <Sparkles className="mr-2 h-4 w-4" />
                      )}
                      {existingExport ? 'Regenerate' : 'Generate'}
                    </Button>

                    {content && (
                      <>
                        {hasChanges && (
                          <Button
                            variant="outline"
                            onClick={() => handleSave(eco.id)}
                            disabled={saveExport.isPending}
                          >
                            {saveExport.isPending ? (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                              <Check className="mr-2 h-4 w-4" />
                            )}
                            Save Changes
                          </Button>
                        )}

                        <Button
                          variant="outline"
                          onClick={() => handleCopy(eco.id)}
                        >
                          {copiedId === eco.id ? (
                            <Check className="mr-2 h-4 w-4" />
                          ) : (
                            <Copy className="mr-2 h-4 w-4" />
                          )}
                          Copy
                        </Button>

                        <Button
                          variant="outline"
                          onClick={() => handleDownload(eco.id)}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                {/* Usage Instructions */}
                {content && (
                  <div className="rounded-lg border bg-muted/50 p-4">
                    <h5 className="font-medium text-sm mb-2">How to use this prompt</h5>
                    {eco.id === 'claude' && (
                      <p className="text-sm text-muted-foreground">
                        Paste this as the system prompt when starting a new Claude conversation, 
                        or use it in the Claude API as the system message.
                      </p>
                    )}
                    {eco.id === 'copilot' && (
                      <p className="text-sm text-muted-foreground">
                        Add this to your Microsoft 365 Copilot custom instructions in Settings → 
                        Copilot → Custom instructions.
                      </p>
                    )}
                    {eco.id === 'gemini' && (
                      <p className="text-sm text-muted-foreground">
                        Use this as context when interacting with Google Gemini, or configure it 
                        in Google AI Studio as a system instruction.
                      </p>
                    )}
                  </div>
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      </CardContent>
    </Card>
  );
}
