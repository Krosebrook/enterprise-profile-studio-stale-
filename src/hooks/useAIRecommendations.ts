import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface UsagePatterns {
  primaryUseCase: string;
  teamSize: number;
  budget: string;
  technicalLevel: string;
  industryFocus: string;
  priorityCapabilities: string[];
}

export interface PlatformRecommendation {
  platformName: string;
  matchScore: number;
  category: string;
  reasoning: string;
  keyStrengths: string[];
  considerations?: string[];
  estimatedROI?: string;
  implementationEffort?: 'low' | 'medium' | 'high';
}

export interface RecommendationResult {
  recommendations: PlatformRecommendation[];
  overallStrategy: string;
  suggestedStack?: {
    primary: string;
    secondary?: string;
    specialized?: string[];
  };
}

export function useAIRecommendations() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RecommendationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getRecommendations = async (
    usagePatterns: UsagePatterns,
    currentPlatforms?: string[]
  ) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('ai-recommendations', {
        body: { usagePatterns, currentPlatforms }
      });

      if (fnError) {
        throw new Error(fnError.message);
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setResult(data);
      toast.success('AI recommendations generated!');
      return data as RecommendationResult;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to get recommendations';
      setError(message);
      toast.error(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const clearRecommendations = () => {
    setResult(null);
    setError(null);
  };

  return {
    loading,
    result,
    error,
    getRecommendations,
    clearRecommendations
  };
}
