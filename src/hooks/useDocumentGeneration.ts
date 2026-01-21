import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type DocumentTemplateType = 
  | 'proposal' 
  | 'report' 
  | 'policy' 
  | 'guide' 
  | 'sop' 
  | 'meeting-notes'
  | 'analysis'
  | 'memo';

export interface GenerationContext {
  companyName?: string;
  industry?: string;
  audience?: string;
  tone?: 'formal' | 'professional' | 'casual';
  length?: 'short' | 'medium' | 'long';
}

export interface GenerationResult {
  title: string;
  content: string;
  description: string;
  category: string;
  tags: string[];
}

export function useDocumentGeneration() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = async (
    templateType: DocumentTemplateType,
    prompt: string,
    context: GenerationContext = {}
  ): Promise<GenerationResult | null> => {
    setIsGenerating(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('generate-document', {
        body: { templateType, prompt, context },
      });

      if (fnError) {
        throw new Error(fnError.message);
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      return data as GenerationResult;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to generate document';
      setError(message);
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generate,
    isGenerating,
    error,
    clearError: () => setError(null),
  };
}

export const TEMPLATE_OPTIONS: {
  type: DocumentTemplateType;
  name: string;
  description: string;
  icon: string;
  defaultCategory: string;
}[] = [
  {
    type: 'proposal',
    name: 'Business Proposal',
    description: 'Generate a proposal with executive summary, scope, timeline, and budget',
    icon: '📋',
    defaultCategory: 'Proposals',
  },
  {
    type: 'report',
    name: 'Analysis Report',
    description: 'Create a structured report with findings, analysis, and recommendations',
    icon: '📊',
    defaultCategory: 'Reports',
  },
  {
    type: 'policy',
    name: 'Company Policy',
    description: 'Draft a policy document with purpose, scope, and procedures',
    icon: '📜',
    defaultCategory: 'Policies',
  },
  {
    type: 'guide',
    name: 'How-To Guide',
    description: 'Write a step-by-step guide with examples and best practices',
    icon: '📖',
    defaultCategory: 'Guides',
  },
  {
    type: 'sop',
    name: 'Standard Operating Procedure',
    description: 'Generate an SOP with workflow, responsibilities, and checklists',
    icon: '✅',
    defaultCategory: 'Procedures',
  },
  {
    type: 'meeting-notes',
    name: 'Meeting Notes',
    description: 'Create formatted meeting notes with attendees, decisions, and action items',
    icon: '📝',
    defaultCategory: 'Meetings',
  },
  {
    type: 'analysis',
    name: 'Market Analysis',
    description: 'Generate a market or competitive analysis document',
    icon: '🔍',
    defaultCategory: 'Analysis',
  },
  {
    type: 'memo',
    name: 'Internal Memo',
    description: 'Write a professional internal communication memo',
    icon: '✉️',
    defaultCategory: 'Communications',
  },
];
