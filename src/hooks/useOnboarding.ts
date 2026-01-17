import { useState, useCallback, useEffect } from 'react';
import { OnboardingUserProfile, createEmptyOnboardingProfile } from '@/types/onboarding';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const STORAGE_KEY = 'onboarding_progress';

export function useOnboarding() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<OnboardingUserProfile>(createEmptyOnboardingProfile);
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Load saved progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setProfile(prev => ({ ...prev, ...parsed.profile }));
        setCurrentStep(parsed.currentStep || 0);
      } catch (e) {
        console.error('Failed to parse saved onboarding progress', e);
      }
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      profile,
      currentStep,
    }));
  }, [profile, currentStep]);

  // Update a specific section
  const updateSection = useCallback(<K extends keyof OnboardingUserProfile>(
    section: K,
    data: Partial<OnboardingUserProfile[K]>
  ) => {
    setProfile(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data,
        completedAt: new Date().toISOString(),
      },
    }));
  }, []);

  // Go to next step
  const nextStep = useCallback(() => {
    saveProgress();
    setCurrentStep(prev => prev + 1);
  }, [saveProgress]);

  // Go to previous step
  const prevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  }, []);

  // Skip current step
  const skipStep = useCallback((stepId: string) => {
    setProfile(prev => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        skippedSteps: [...prev.metadata.skippedSteps, stepId],
      },
    }));
    nextStep();
  }, [nextStep]);

  // Complete onboarding
  const completeOnboarding = useCallback(async () => {
    if (!user) {
      toast.error('Please log in to complete onboarding');
      return false;
    }

    setIsSaving(true);
    try {
      const completedProfile = {
        ...profile,
        metadata: {
          ...profile.metadata,
          completedAt: new Date().toISOString(),
        },
      };

      // Save to user_profiles metadata
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: user.id,
          full_name: profile.welcome.fullName,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id',
        });

      if (error) throw error;

      // Clear local storage
      localStorage.removeItem(STORAGE_KEY);
      
      toast.success('Welcome aboard! Your preferences have been saved.');
      return true;
    } catch (error) {
      console.error('Failed to save onboarding profile', error);
      toast.error('Failed to save your preferences. Please try again.');
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [user, profile]);

  // Reset onboarding
  const resetOnboarding = useCallback(() => {
    setProfile(createEmptyOnboardingProfile());
    setCurrentStep(0);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // Get completion percentage
  const getCompletionPercentage = useCallback(() => {
    const sections = ['welcome', 'dealSourcing', 'portfolioGoals', 'communityPreferences'] as const;
    const completed = sections.filter(s => profile[s].completedAt).length;
    return Math.round((completed / sections.length) * 100);
  }, [profile]);

  return {
    profile,
    currentStep,
    isLoading,
    isSaving,
    updateSection,
    nextStep,
    prevStep,
    skipStep,
    completeOnboarding,
    resetOnboarding,
    saveProgress,
    setCurrentStep,
    getCompletionPercentage,
  };
}
