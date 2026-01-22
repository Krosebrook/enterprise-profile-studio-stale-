import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Bot, 
  Sparkles, 
  Zap, 
  Loader2, 
  Copy, 
  Check,
  Download,
  RefreshCw,
  FileText,
  Code,
  Webhook
} from 'lucide-react';
import { useEcosystemExports, useSaveEcosystemExport, useEmployeeHats } from '@/hooks/useEmployeePersonas';
import { supabase } from '@/integrations/supabase/client';
import type { EmployeePersona, EcosystemExport } from '@/types/employee-persona';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { GeneratePersonaDocButton } from './GeneratePersonaDocButton';

interface EcosystemExportPanelProps {
  persona: EmployeePersona;
}

type EcosystemId = 'claude' | 'copilot' | 'gemini' | 'api';

const ECOSYSTEMS: Array<{
  id: EcosystemId;
  name: string;
  subtitle: string;
  icon: typeof Bot;
  color: string;
  description: string;
}> = [
  { 
    id: 'claude', 
    name: 'Claude', 
    subtitle: 'Anthropic', 
    icon: Bot, 
    color: 'bg-orange-500',
    description: 'API key from console.anthropic.com • SDKs for Python/TS/Java/Go/Ruby • Enterprise: AWS Bedrock with IdP integration'
  },
  { 
    id: 'copilot', 
    name: 'Microsoft Copilot', 
    subtitle: 'Microsoft 365', 
    icon: Sparkles, 
    color: 'bg-blue-500',
    description: 'Requires M365 E3/E5 or F1/F3 license + $30/user add-on • Entra ID + MFA required • Purview for sensitivity labels'
  },
  { 
    id: 'gemini', 
    name: 'Google Gemini', 
    subtitle: 'Google Workspace', 
    icon: Zap, 
    color: 'bg-purple-500',
    description: 'Context configuration for Google AI Studio or Workspace AI'
  },
  { 
    id: 'api', 
    name: 'Custom API', 
    subtitle: 'n8n / Webhooks', 
    icon: Webhook, 
    color: 'bg-emerald-500',
    description: 'Structured JSON for n8n workflows, custom integrations, or any AI platform'
  },
];

export function EcosystemExportPanel({ persona }: EcosystemExportPanelProps) {
  const { data: exports = [], isLoading } = useEcosystemExports(persona.id);
  const { data: hats = [] } = useEmployeeHats(persona.id);
  const saveExport = useSaveEcosystemExport();
  
  const [activeTab, setActiveTab] = useState<EcosystemId>('claude');
  const [generating, setGenerating] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<Record<string, string>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const getExportForEcosystem = (ecosystem: EcosystemId): EcosystemExport | undefined => {
    return exports.find(e => e.ecosystem === ecosystem && e.export_type === 'system_prompt');
  };

  const getCurrentContent = (ecosystem: EcosystemId): string => {
    if (editedContent[ecosystem] !== undefined) {
      return editedContent[ecosystem];
    }
    return getExportForEcosystem(ecosystem)?.content || '';
  };

  // Generate structured JSON for API/n8n export
  const generateApiJson = () => {
    const apiConfig = {
      persona: {
        id: persona.id,
        name: persona.name,
        job_title: persona.job_title,
        department: persona.department,
        email: persona.email,
      },
      communication: {
        style: persona.communication_style,
        preferred_tone: persona.preferred_tone,
        response_length: persona.preferred_response_length,
        ai_interaction_style: persona.ai_interaction_style,
      },
      work_context: {
        preferences: persona.work_preferences,
        skills: persona.skills || [],
        expertise_areas: persona.expertise_areas || [],
        tools_used: persona.tools_used || [],
      },
      objectives: {
        goals: persona.goals || [],
        pain_points: persona.pain_points || [],
      },
      roles: hats.map(hat => ({
        name: hat.name,
        description: hat.description,
        time_allocation: hat.time_percentage,
        responsibilities: hat.responsibilities || [],
        key_tasks: hat.key_tasks || [],
        stakeholders: hat.stakeholders || [],
        tools: hat.tools || [],
      })),
      metadata: {
        generated_at: new Date().toISOString(),
        version: '1.0',
        format: 'int-os-persona-v1',
      },
    };
    return JSON.stringify(apiConfig, null, 2);
  };

  const handleGenerate = async (ecosystem: EcosystemId) => {
    setGenerating(ecosystem);
    
    try {
      // For API export, generate JSON locally without AI
      if (ecosystem === 'api') {
        const jsonContent = generateApiJson();
        setEditedContent(prev => ({ ...prev, [ecosystem]: jsonContent }));
        
        await saveExport.mutateAsync({
          persona_id: persona.id,
          ecosystem: ecosystem as any,
          export_type: 'system_prompt',
          name: `${persona.name} - API Configuration`,
          content: jsonContent,
        });
        
        toast.success('API configuration generated!');
        setGenerating(null);
        return;
      }

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
          ecosystem: ecosystem as any,
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

  const handleSave = async (ecosystem: EcosystemId) => {
    const content = editedContent[ecosystem];
    if (!content) return;

    await saveExport.mutateAsync({
      persona_id: persona.id,
      ecosystem: ecosystem as any,
      export_type: 'system_prompt',
      name: `${persona.name} - ${ecosystem.charAt(0).toUpperCase() + ecosystem.slice(1)} ${ecosystem === 'api' ? 'Configuration' : 'System Prompt'}`,
      content,
    });
  };

  const handleCopy = async (ecosystem: EcosystemId) => {
    const content = getCurrentContent(ecosystem);
    if (!content) return;

    await navigator.clipboard.writeText(content);
    setCopiedId(ecosystem);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownload = (ecosystem: EcosystemId) => {
    const content = getCurrentContent(ecosystem);
    if (!content) return;

    const isJson = ecosystem === 'api';
    const blob = new Blob([content], { type: isJson ? 'application/json' : 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${persona.name.toLowerCase().replace(/\s+/g, '-')}-${ecosystem}-${isJson ? 'config.json' : 'prompt.txt'}`;
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
    <div className="space-y-6">
      {/* Knowledge Base Document Export */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Knowledge Base Export
          </CardTitle>
          <CardDescription>
            Generate a comprehensive AI configuration document from this persona's data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Creates a detailed markdown document with all persona settings, communication preferences, 
            and ready-to-use prompts for Claude, Copilot, and Gemini. The document is saved to your 
            Knowledge Base for easy reference and sharing.
          </p>
          <GeneratePersonaDocButton persona={persona} />
        </CardContent>
      </Card>

      <Separator />

      {/* Ecosystem Prompts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Multi-Ecosystem Export</CardTitle>
          <CardDescription>
            Generate and manage AI prompts for different platforms
          </CardDescription>
        </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
          <TabsList className="grid w-full grid-cols-4">
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
                    <h5 className="font-medium text-sm mb-2">How to use this {eco.id === 'api' ? 'configuration' : 'prompt'}</h5>
                    {eco.id === 'claude' && (
                      <div className="text-sm text-muted-foreground space-y-2">
                        <p>Paste this as the system prompt when starting a new Claude conversation, or use it in the Claude API.</p>
                        <p className="text-xs"><strong>Developer Setup:</strong> Get API key from console.anthropic.com • Use Python/TypeScript/Java/Go/Ruby SDKs</p>
                        <p className="text-xs"><strong>Enterprise:</strong> Deploy via AWS Bedrock with Direct IdP Integration for SSO + MFA</p>
                      </div>
                    )}
                    {eco.id === 'copilot' && (
                      <div className="text-sm text-muted-foreground space-y-2">
                        <p>Add this to Microsoft 365 Copilot custom instructions in Settings → Copilot.</p>
                        <p className="text-xs"><strong>License Required:</strong> M365 E3/E5 or F1/F3 + $30/user Copilot add-on</p>
                        <p className="text-xs"><strong>Front-of-House (F1/F3):</strong> Enable Restricted SharePoint Search to limit data access</p>
                        <p className="text-xs"><strong>Back-Office (E3/E5):</strong> Configure Microsoft Purview sensitivity labels</p>
                      </div>
                    )}
                    {eco.id === 'gemini' && (
                      <p className="text-sm text-muted-foreground">
                        Use this as context when interacting with Google Gemini, or configure it 
                        in Google AI Studio as a system instruction.
                      </p>
                    )}
                    {eco.id === 'api' && (
                      <div className="text-sm text-muted-foreground space-y-2">
                        <p>Import this JSON into n8n workflows, webhook handlers, or any custom integration.</p>
                        <p className="text-xs"><strong>n8n:</strong> Use HTTP Request node to POST this config to your AI endpoints</p>
                        <p className="text-xs"><strong>Custom Apps:</strong> Parse the persona object to configure any LLM system prompt</p>
                      </div>
                    )}
                  </div>
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      </CardContent>
    </Card>
    </div>
  );
}
