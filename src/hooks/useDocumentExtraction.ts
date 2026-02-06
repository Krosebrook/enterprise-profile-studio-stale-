import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface PersonaExtractionData {
  name: string | null;
  email: string | null;
  job_title: string | null;
  department: string | null;
  skills: string[];
  expertise_areas: string[];
  tools_used: string[];
  goals: string[];
  pain_points: string[];
  communication_style: {
    formality: 'casual' | 'balanced' | 'formal' | null;
    detail_level: 'concise' | 'balanced' | 'detailed' | null;
    technical_depth: 'simplified' | 'balanced' | 'technical' | null;
    examples_preference: 'minimal' | 'moderate' | 'extensive' | null;
  };
  work_preferences: {
    focus_time: 'morning' | 'afternoon' | 'evening' | 'flexible' | null;
    collaboration_style: 'async' | 'realtime' | 'mixed' | null;
    decision_making: 'data_driven' | 'intuitive' | 'collaborative' | null;
    feedback_preference: 'direct' | 'diplomatic' | 'coaching' | null;
  };
  ai_interaction_style: 'concise' | 'balanced' | 'comprehensive' | null;
  preferred_tone: 'casual' | 'professional' | 'formal' | null;
  extraction_confidence: {
    overall: number;
    fields_found: number;
    fields_inferred: number;
  };
}

export interface ProfileExtractionData {
  company_info: {
    name: string | null;
    tagline: string | null;
    description: string | null;
    industry: string | null;
    size: string | null;
    founded: string | null;
    headquarters: string | null;
    website: string | null;
    email: string | null;
    phone: string | null;
  };
  branding: {
    primary_color: string | null;
    secondary_color: string | null;
  };
  services: Array<{
    title: string;
    description: string;
  }>;
  team_members: Array<{
    name: string;
    role: string;
    bio: string;
  }>;
  compliance: {
    certifications: string[];
    regulations: string[];
  };
  extraction_confidence: {
    overall: number;
    fields_found: number;
    sections_populated: string[];
  };
}

export type ExtractionType = 'persona' | 'profile';

export function useDocumentExtraction() {
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedData, setExtractedData] = useState<PersonaExtractionData | ProfileExtractionData | null>(null);

  const extractFromText = async (
    documentText: string,
    extractionType: ExtractionType
  ): Promise<PersonaExtractionData | ProfileExtractionData | null> => {
    if (!documentText.trim()) {
      toast.error('No document content to analyze');
      return null;
    }

    setIsExtracting(true);
    setExtractedData(null);

    try {
      const { data, error } = await supabase.functions.invoke('extract-from-document', {
        body: {
          document_text: documentText,
          extraction_type: extractionType,
        },
      });

      if (error) {
        if (error.message?.includes('429')) {
          toast.error('Rate limit reached. Please wait a moment and try again.');
        } else if (error.message?.includes('402')) {
          toast.error('AI credits depleted. Please add credits to continue.');
        } else {
          toast.error('Failed to extract data. Please try again.');
        }
        return null;
      }

      if (!data?.success) {
        toast.error(data?.error || 'Extraction failed');
        return null;
      }

      const result = data.data as PersonaExtractionData | ProfileExtractionData;
      setExtractedData(result);
      
      const confidence = result.extraction_confidence?.overall || 0;
      if (confidence < 30) {
        toast.warning(`Low extraction confidence (${confidence}%). Document may not contain relevant information.`);
      } else {
        toast.success(`Extracted data with ${confidence}% confidence`);
      }

      return result;
    } catch (err) {
      console.error('Extraction error:', err);
      toast.error('Failed to analyze document');
      return null;
    } finally {
      setIsExtracting(false);
    }
  };

  const reset = () => {
    setExtractedData(null);
  };

  return {
    extractFromText,
    isExtracting,
    extractedData,
    reset,
  };
}
