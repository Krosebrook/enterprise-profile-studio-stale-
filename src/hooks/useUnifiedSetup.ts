import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface SetupWizardData {
  // Step 1: Personal
  fullName: string;
  jobTitle: string;
  department: string;
  // Step 2: Company
  companyName: string;
  industry: string;
  // AI-generated results
  generatedProfile: GeneratedSetupProfile | null;
}

export interface GeneratedSetupProfile {
  persona: {
    name: string;
    job_title: string;
    department: string;
    email: string | null;
    skills: string[];
    expertise_areas: string[];
    tools_used: string[];
    goals: string[];
    pain_points: string[];
    communication_style: {
      formality: string;
      detail_level: string;
      technical_depth: string;
      examples_preference: string;
    };
    work_preferences: {
      focus_time: string;
      collaboration_style: string;
      decision_making: string;
      feedback_preference: string;
    };
    ai_interaction_style: string;
    preferred_tone: string;
    preferred_response_length: string;
  };
  company: {
    name: string;
    tagline: string;
    industry: string;
    size: string;
    description: string;
  };
  ai_ecosystems: string[];
  recommended_hats: Array<{
    name: string;
    description: string;
    responsibilities: string[];
    time_percentage: number;
    tools: string[];
  }>;
}

const SETUP_STORAGE_KEY = 'unified_setup_progress';

export function useUnifiedSetup() {
  const { user } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [data, setData] = useState<SetupWizardData>(() => {
    const saved = localStorage.getItem(SETUP_STORAGE_KEY);
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return {
      fullName: '',
      jobTitle: '',
      department: '',
      companyName: '',
      industry: '',
      generatedProfile: null,
    };
  });

  const updateData = useCallback((updates: Partial<SetupWizardData>) => {
    setData(prev => {
      const next = { ...prev, ...updates };
      localStorage.setItem(SETUP_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const generateProfile = useCallback(async () => {
    setIsGenerating(true);
    try {
      const { data: result, error } = await supabase.functions.invoke('generate-setup-profile', {
        body: {
          full_name: data.fullName,
          job_title: data.jobTitle,
          department: data.department,
          company_name: data.companyName,
          industry: data.industry,
        },
      });

      if (error) throw error;
      if (result?.error) throw new Error(result.error);

      updateData({ generatedProfile: result as GeneratedSetupProfile });
      return result as GeneratedSetupProfile;
    } catch (err) {
      console.error('AI generation failed:', err);
      toast.error('AI generation failed. You can fill in details manually.');
      return null;
    } finally {
      setIsGenerating(false);
    }
  }, [data.fullName, data.jobTitle, data.department, data.companyName, data.industry, updateData]);

  const saveAll = useCallback(async () => {
    if (!user) {
      toast.error('Please log in first');
      return false;
    }

    setIsSaving(true);
    try {
      const profile = data.generatedProfile;

      // 1. Update user_profiles
      await supabase.from('user_profiles').upsert({
        user_id: user.id,
        full_name: data.fullName,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' });

      // 2. Create employee persona
      const personaData = profile?.persona;
      const { data: createdPersona, error: personaError } = await supabase
        .from('employee_personas')
        .insert({
          user_id: user.id,
          name: data.fullName || personaData?.name || 'My Persona',
          job_title: data.jobTitle || personaData?.job_title,
          department: data.department || personaData?.department,
          skills: personaData?.skills || [],
          expertise_areas: personaData?.expertise_areas || [],
          tools_used: personaData?.tools_used || [],
          goals: personaData?.goals || [],
          pain_points: personaData?.pain_points || [],
          communication_style: personaData?.communication_style || {},
          work_preferences: personaData?.work_preferences || {},
          ai_interaction_style: personaData?.ai_interaction_style || 'balanced',
          preferred_tone: personaData?.preferred_tone || 'professional',
          preferred_response_length: personaData?.preferred_response_length || 'moderate',
          status: 'active',
        })
        .select('id')
        .single();

      if (personaError) throw personaError;

      // 3. Create recommended hats
      if (profile?.recommended_hats?.length && createdPersona?.id) {
        const hats = profile.recommended_hats.map(hat => ({
          user_id: user.id,
          persona_id: createdPersona.id,
          name: hat.name,
          description: hat.description,
          responsibilities: hat.responsibilities,
          time_percentage: hat.time_percentage,
          tools: hat.tools,
          is_active: true,
        }));
        await supabase.from('employee_hats').insert(hats);
      }

      // 4. Save onboarding preferences
      const ecosystems = (profile?.ai_ecosystems || ['openai', 'copilot']).map(id => ({
        id,
        name: id.charAt(0).toUpperCase() + id.slice(1),
      }));

      await supabase.from('user_onboarding_preferences').upsert({
        user_id: user.id,
        persona_type: 'internal',
        ai_ecosystems: ecosystems,
        onboarding_completed: true,
      }, { onConflict: 'user_id' });

      // 5. Create enterprise profile if company info provided
      if (data.companyName) {
        const companyInfo = profile?.company;
        await supabase.from('enterprise_profiles').insert({
          user_id: user.id,
          name: data.companyName,
          company_info: {
            name: data.companyName,
            tagline: companyInfo?.tagline || '',
            industry: data.industry || companyInfo?.industry || '',
            size: companyInfo?.size || '',
            description: companyInfo?.description || '',
          },
          status: 'draft',
        });
      }

      // Clean up
      localStorage.removeItem(SETUP_STORAGE_KEY);
      toast.success('Setup complete! Your AI workspace is ready.');
      return true;
    } catch (err) {
      console.error('Save failed:', err);
      toast.error('Failed to save. Please try again.');
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [user, data]);

  const hasCompletedSetup = useCallback(async (): Promise<boolean> => {
    if (!user) return false;
    const { data: prefs } = await supabase
      .from('user_onboarding_preferences')
      .select('onboarding_completed')
      .eq('user_id', user.id)
      .maybeSingle();
    return !!prefs?.onboarding_completed;
  }, [user]);

  return {
    data,
    updateData,
    generateProfile,
    isGenerating,
    saveAll,
    isSaving,
    hasCompletedSetup,
  };
}
