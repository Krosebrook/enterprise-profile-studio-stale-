import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import type { 
  EmployeePersona, 
  EmployeeHat, 
  EcosystemExport,
  CommunicationStyle,
  WorkPreferences,
  HatAISuggestions,
  EcosystemConfiguration
} from '@/types/employee-persona';

// Fetch all personas for the current user
export function useEmployeePersonas() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['employee-personas', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('employee_personas')
        .select('*')
        .order('updated_at', { ascending: false });
      
      if (error) throw error;
      
      return data.map(row => ({
        ...row,
        communication_style: (row.communication_style || {}) as unknown as CommunicationStyle,
        work_preferences: (row.work_preferences || {}) as unknown as WorkPreferences,
      })) as EmployeePersona[];
    },
    enabled: !!user,
  });
}

// Fetch a single persona by ID
export function useEmployeePersona(id: string | undefined) {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['employee-persona', id],
    queryFn: async () => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from('employee_personas')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      return {
        ...data,
        communication_style: (data.communication_style || {}) as unknown as CommunicationStyle,
        work_preferences: (data.work_preferences || {}) as unknown as WorkPreferences,
      } as EmployeePersona;
    },
    enabled: !!user && !!id,
  });
}

// Create a new persona
export function useCreatePersona() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (input: { name: string; email?: string; department?: string; job_title?: string }) => {
      if (!user) throw new Error('Not authenticated');
      
      const { data, error } = await supabase
        .from('employee_personas')
        .insert({
          user_id: user.id,
          name: input.name,
          email: input.email,
          department: input.department,
          job_title: input.job_title,
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employee-personas'] });
      toast.success('Persona created successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to create persona: ${error.message}`);
    },
  });
}

// Update a persona
export function useUpdatePersona() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<EmployeePersona> }) => {
      const dbUpdates: Record<string, unknown> = { ...updates };
      
      // Convert complex objects to JSON for Supabase
      if (updates.communication_style) {
        dbUpdates.communication_style = JSON.parse(JSON.stringify(updates.communication_style));
      }
      if (updates.work_preferences) {
        dbUpdates.work_preferences = JSON.parse(JSON.stringify(updates.work_preferences));
      }
      
      const { data, error } = await supabase
        .from('employee_personas')
        .update(dbUpdates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['employee-personas'] });
      queryClient.invalidateQueries({ queryKey: ['employee-persona', id] });
      toast.success('Persona updated successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to update persona: ${error.message}`);
    },
  });
}

// Delete a persona
export function useDeletePersona() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('employee_personas')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employee-personas'] });
      toast.success('Persona deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete persona: ${error.message}`);
    },
  });
}

// Fetch hats for a persona
export function useEmployeeHats(personaId: string | undefined) {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['employee-hats', personaId],
    queryFn: async () => {
      if (!personaId) return [];
      
      const { data, error } = await supabase
        .from('employee_hats')
        .select('*')
        .eq('persona_id', personaId)
        .order('priority', { ascending: true });
      
      if (error) throw error;
      
      return data.map(row => ({
        ...row,
        ai_suggestions: row.ai_suggestions as HatAISuggestions,
      })) as EmployeeHat[];
    },
    enabled: !!user && !!personaId,
  });
}

// Create a new hat
export function useCreateHat() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (input: { persona_id: string; name: string; description?: string }) => {
      if (!user) throw new Error('Not authenticated');
      
      const { data, error } = await supabase
        .from('employee_hats')
        .insert({
          user_id: user.id,
          persona_id: input.persona_id,
          name: input.name,
          description: input.description,
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (_, { persona_id }) => {
      queryClient.invalidateQueries({ queryKey: ['employee-hats', persona_id] });
      toast.success('Role added successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to add role: ${error.message}`);
    },
  });
}

// Update a hat
export function useUpdateHat() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, personaId, updates }: { id: string; personaId: string; updates: Partial<EmployeeHat> }) => {
      const dbUpdates: Record<string, unknown> = { ...updates };
      
      if (updates.ai_suggestions) {
        dbUpdates.ai_suggestions = JSON.parse(JSON.stringify(updates.ai_suggestions));
      }
      
      const { data, error } = await supabase
        .from('employee_hats')
        .update(dbUpdates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return { data, personaId };
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['employee-hats', result.personaId] });
      toast.success('Role updated successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to update role: ${error.message}`);
    },
  });
}

// Delete a hat
export function useDeleteHat() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, personaId }: { id: string; personaId: string }) => {
      const { error } = await supabase
        .from('employee_hats')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return { personaId };
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['employee-hats', result.personaId] });
      toast.success('Role removed successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to remove role: ${error.message}`);
    },
  });
}

// Fetch ecosystem exports for a persona
export function useEcosystemExports(personaId: string | undefined) {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['ecosystem-exports', personaId],
    queryFn: async () => {
      if (!personaId) return [];
      
      const { data, error } = await supabase
        .from('ecosystem_exports')
        .select('*')
        .eq('persona_id', personaId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      return data.map(row => ({
        ...row,
        configuration: row.configuration as EcosystemConfiguration,
      })) as EcosystemExport[];
    },
    enabled: !!user && !!personaId,
  });
}

// Create or update an ecosystem export
export function useSaveEcosystemExport() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (input: {
      persona_id: string;
      ecosystem: 'claude' | 'copilot' | 'gemini';
      export_type: 'system_prompt' | 'context' | 'configuration';
      name: string;
      content: string;
      configuration?: EcosystemConfiguration;
    }) => {
      if (!user) throw new Error('Not authenticated');
      
      // Check if an export already exists
      const { data: existing } = await supabase
        .from('ecosystem_exports')
        .select('id, version')
        .eq('persona_id', input.persona_id)
        .eq('ecosystem', input.ecosystem)
        .eq('export_type', input.export_type)
        .single();
      
      if (existing) {
        // Update existing
        const { data, error } = await supabase
          .from('ecosystem_exports')
          .update({
            name: input.name,
            content: input.content,
            configuration: input.configuration ? JSON.parse(JSON.stringify(input.configuration)) : {},
            version: existing.version + 1,
          })
          .eq('id', existing.id)
          .select()
          .single();
        
        if (error) throw error;
        return data;
      } else {
        // Create new
        const { data, error } = await supabase
          .from('ecosystem_exports')
          .insert({
            user_id: user.id,
            persona_id: input.persona_id,
            ecosystem: input.ecosystem,
            export_type: input.export_type,
            name: input.name,
            content: input.content,
            configuration: input.configuration ? JSON.parse(JSON.stringify(input.configuration)) : {},
          })
          .select()
          .single();
        
        if (error) throw error;
        return data;
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['ecosystem-exports', data.persona_id] });
      toast.success('Export saved successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to save export: ${error.message}`);
    },
  });
}
