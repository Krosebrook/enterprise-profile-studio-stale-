import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface EnterpriseProfile {
  id: string;
  user_id: string;
  name: string;
  slug: string | null;
  status: 'draft' | 'published' | 'archived';
  company_info: Record<string, any>;
  branding: Record<string, any>;
  services: any[];
  team: any[];
  compliance: Record<string, any>;
  metadata: Record<string, any>;
  published_at: string | null;
  created_at: string;
  updated_at: string;
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
      return data as EnterpriseProfile[];
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
      return data as EnterpriseProfile;
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
      return data as EnterpriseProfile;
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
      const { data, error } = await supabase
        .from('enterprise_profiles')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as EnterpriseProfile;
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
      
      return data as EnterpriseProfile;
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
