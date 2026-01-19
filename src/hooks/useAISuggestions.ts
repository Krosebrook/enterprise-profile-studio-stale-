import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AISuggestions {
  industries: string[];
  dealStructures: string[];
  stages: string[];
  regions: string[];
  riskTolerance: string;
  investmentRange: { min: number; max: number };
  reasoning: string;
  tips: string[];
}

interface OnboardingPreferences {
  targetIndustries?: string[];
  preferredDealStructures?: string[];
  dealStages?: string[];
  geoPreferences?: {
    regions?: string[];
  };
  riskTolerance?: 'low' | 'moderate' | 'high';
  investmentSizeRange?: { min?: number; max?: number };
}

interface UseAISuggestionsReturn {
  suggestions: AISuggestions | null;
  isLoading: boolean;
  error: string | null;
  generateSuggestions: (role: string, experienceLevel: string, existingPreferences?: OnboardingPreferences) => Promise<void>;
  clearSuggestions: () => void;
}

export function useAISuggestions(): UseAISuggestionsReturn {
  const [suggestions, setSuggestions] = useState<AISuggestions | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateSuggestions = useCallback(async (
    role: string,
    experienceLevel: string,
    existingPreferences?: OnboardingPreferences
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('generate-onboarding-suggestions', {
        body: {
          role,
          experienceLevel,
          existingPreferences,
        },
      });

      if (fnError) throw fnError;

      if (data?.suggestions) {
        setSuggestions(data.suggestions);
        if (data.source === 'ai') {
          toast.success('AI suggestions generated based on your profile!');
        }
      }
    } catch (err) {
      console.error('Failed to generate suggestions:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate suggestions';
      setError(errorMessage);
      
      // Don't show error toast for rate limiting - we have fallback
      if (!errorMessage.includes('Rate')) {
        toast.error('Could not generate AI suggestions. Using defaults.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearSuggestions = useCallback(() => {
    setSuggestions(null);
    setError(null);
  }, []);

  return {
    suggestions,
    isLoading,
    error,
    generateSuggestions,
    clearSuggestions,
  };
}
