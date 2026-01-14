import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

type GenerationType = 'company_description' | 'tagline' | 'service_description';

interface GenerationContext {
  companyName?: string;
  industry?: string;
  serviceName?: string;
  existingDescription?: string;
  keywords?: string[];
}

export function useAIGeneration() {
  const [isGenerating, setIsGenerating] = useState(false);

  const generate = async (type: GenerationType, context: GenerationContext): Promise<string | null> => {
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-profile-content', {
        body: { type, context },
      });

      if (error) {
        if (error.message.includes('429')) {
          toast.error('Rate limit reached. Please wait a moment and try again.');
        } else if (error.message.includes('402')) {
          toast.error('AI credits depleted. Please add credits to continue.');
        } else {
          toast.error('Failed to generate content. Please try again.');
        }
        return null;
      }

      if (data?.error) {
        toast.error(data.error);
        return null;
      }

      return data?.content || null;
    } catch (err) {
      console.error('AI generation error:', err);
      toast.error('Failed to generate content. Please try again.');
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  return { generate, isGenerating };
}
