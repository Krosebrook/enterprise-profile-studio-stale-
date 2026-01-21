import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import type { EnterpriseProfile } from '@/types/profile';
import type { Json } from '@/integrations/supabase/types';

export type { EnterpriseProfile };

// Helper to convert profile types to JSON-compatible format
function toJson<T>(value: T): Json {
  return value as unknown as Json;
}

export function useProfiles() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['profiles', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('enterprise_profiles')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      return data as unknown as EnterpriseProfile[];
    },
    enabled: !!user,
  });
}

export function useProfile(id: string | undefined) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['profile', id],
    queryFn: async () => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from('enterprise_profiles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as unknown as EnterpriseProfile;
    },
    enabled: !!id && !!user,
  });
}

export function useCreateProfile() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (name: string) => {
      if (!user) throw new Error('Not authenticated');
      
      const { data, error } = await supabase
        .from('enterprise_profiles')
        .insert({
          user_id: user.id,
          name,
          slug: name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        })
        .select()
        .single();

      if (error) throw error;
      return data as unknown as EnterpriseProfile;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
      toast.success('Profile created successfully');
    },
    onError: (error) => {
      toast.error('Failed to create profile: ' + error.message);
    },
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<EnterpriseProfile> }) => {
      // Convert typed objects to JSON-compatible format for Supabase
      const dbUpdates: Record<string, unknown> = {};
      
      if (updates.name !== undefined) dbUpdates.name = updates.name;
      if (updates.slug !== undefined) dbUpdates.slug = updates.slug;
      if (updates.description !== undefined) dbUpdates.description = updates.description;
      if (updates.status !== undefined) dbUpdates.status = updates.status;
      if (updates.company_info !== undefined) dbUpdates.company_info = toJson(updates.company_info);
      if (updates.branding !== undefined) dbUpdates.branding = toJson(updates.branding);
      if (updates.services !== undefined) dbUpdates.services = toJson(updates.services);
      if (updates.team !== undefined) dbUpdates.team = toJson(updates.team);
      if (updates.compliance !== undefined) dbUpdates.compliance = toJson(updates.compliance);
      if (updates.metadata !== undefined) dbUpdates.metadata = toJson(updates.metadata);
      if (updates.published_at !== undefined) dbUpdates.published_at = updates.published_at;

      const { data, error } = await supabase
        .from('enterprise_profiles')
        .update(dbUpdates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as unknown as EnterpriseProfile;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
      queryClient.invalidateQueries({ queryKey: ['profile', data.id] });
    },
    onError: (error) => {
      toast.error('Failed to update profile: ' + error.message);
    },
  });
}

export function useDeleteProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('enterprise_profiles')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
      toast.success('Profile deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete profile: ' + error.message);
    },
  });
}

export function usePublishProfile() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase
        .from('enterprise_profiles')
        .update({ 
          status: 'published' as const,
          published_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      // Send notification email
      if (user?.email && data) {
        try {
          await supabase.functions.invoke('send-notification', {
            body: {
              type: 'profile_published',
              profileId: data.id,
              profileName: data.name,
              recipientEmail: user.email,
              profileSlug: data.slug,
            },
          });
        } catch (e) {
          console.error('Failed to send notification:', e);
          // Don't fail the publish if notification fails
        }
      }
      
      return data as unknown as EnterpriseProfile;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
      queryClient.invalidateQueries({ queryKey: ['profile', data.id] });
      toast.success('Profile published successfully!');
    },
    onError: (error) => {
      toast.error('Failed to publish profile: ' + error.message);
    },
  });
}
