import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface ZoneRule {
  id: string;
  name: string;
  description: string;
  zone: 'green' | 'yellow' | 'red';
  enabled: boolean;
  autoApprove?: boolean;
}

export interface ZoneConfiguration {
  id: string;
  user_id: string;
  industry: string;
  rules: ZoneRule[];
  custom_instructions: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export function useZoneConfiguration() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch active zone configuration
  const { data: configuration, isLoading, refetch } = useQuery({
    queryKey: ['zone-configuration', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from('symphony_zone_configurations')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      
      if (error) throw error;
      if (!data) return null;
      
      // Parse rules from JSONB
      return {
        ...data,
        rules: (data.rules as unknown as ZoneRule[]) || [],
      } as ZoneConfiguration;
    },
    enabled: !!user,
  });

  // Save zone configuration
  const saveConfiguration = useMutation({
    mutationFn: async (config: {
      industry: string;
      rules: ZoneRule[];
      customInstructions: string;
    }) => {
      if (!user) throw new Error('Not authenticated');

      // Deactivate any existing active configurations
      await supabase
        .from('symphony_zone_configurations')
        .update({ is_active: false })
        .eq('user_id', user.id)
        .eq('is_active', true);

      // Insert new configuration
      const { data, error } = await supabase
        .from('symphony_zone_configurations')
        .insert([{
          user_id: user.id,
          industry: config.industry,
          rules: JSON.parse(JSON.stringify(config.rules)),
          custom_instructions: config.customInstructions || null,
          is_active: true,
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['zone-configuration'] });
      toast.success('Zone configuration saved successfully!');
    },
    onError: (error) => {
      console.error('Failed to save zone configuration:', error);
      toast.error('Failed to save configuration');
    },
  });

  // Update existing configuration
  const updateConfiguration = useMutation({
    mutationFn: async (updates: Partial<{
      industry: string;
      rules: ZoneRule[];
      custom_instructions: string | null;
    }> & { id: string }) => {
      const { id, ...rest } = updates;
      
      const updateData: Record<string, unknown> = {};
      if (rest.industry) updateData.industry = rest.industry;
      if (rest.rules) updateData.rules = rest.rules;
      if (rest.custom_instructions !== undefined) updateData.custom_instructions = rest.custom_instructions;

      const { data, error } = await supabase
        .from('symphony_zone_configurations')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['zone-configuration'] });
    },
  });

  // Delete configuration
  const deleteConfiguration = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('symphony_zone_configurations')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['zone-configuration'] });
      toast.success('Configuration deleted');
    },
  });

  return {
    configuration,
    isLoading,
    hasConfiguration: !!configuration,
    saveConfiguration: saveConfiguration.mutate,
    updateConfiguration: updateConfiguration.mutate,
    deleteConfiguration: deleteConfiguration.mutate,
    isSaving: saveConfiguration.isPending,
    refetch,
  };
}
