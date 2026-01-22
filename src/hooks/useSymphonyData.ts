import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface SymphonyAgent {
  id: string;
  user_id: string;
  name: string;
  icon: string;
  role_type: 'R' | 'A' | 'C' | 'I';
  phase: number;
  description: string | null;
  capabilities: string[];
  current_status: 'idle' | 'active' | 'busy' | 'offline';
  tasks_completed: number;
  tasks_pending: number;
  efficiency_score: number;
  avg_response_time: number;
  created_at: string;
  updated_at: string;
}

export interface SymphonyPhase {
  id: string;
  user_id: string;
  phase_number: number;
  name: string;
  status: 'pending' | 'in-progress' | 'complete';
  progress: number;
  tasks_total: number;
  tasks_completed: number;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface SymphonyTask {
  id: string;
  user_id: string;
  phase_id: string | null;
  agent_id: string | null;
  title: string;
  description: string | null;
  status: 'pending' | 'in-progress' | 'complete' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'critical';
  created_at: string;
  updated_at: string;
  completed_at: string | null;
}

// Default agents for new users
const defaultAgents = [
  { name: 'Strategist', icon: 'Target', role_type: 'A', phase: 1, description: 'Defines project vision and goals', capabilities: ['Strategic Planning', 'Goal Setting', 'Vision Definition'] },
  { name: 'Researcher', icon: 'Search', role_type: 'R', phase: 1, description: 'Gathers data and market intelligence', capabilities: ['Data Analysis', 'Market Research', 'Trend Analysis'] },
  { name: 'Architect', icon: 'Brain', role_type: 'A', phase: 2, description: 'Designs system architecture', capabilities: ['System Design', 'Technical Planning', 'Integration'] },
  { name: 'Developer', icon: 'Settings', role_type: 'R', phase: 3, description: 'Builds and implements solutions', capabilities: ['Coding', 'Testing', 'Deployment'] },
  { name: 'Analyst', icon: 'BarChart', role_type: 'C', phase: 2, description: 'Analyzes performance metrics', capabilities: ['Data Analysis', 'Reporting', 'Optimization'] },
  { name: 'Communicator', icon: 'MessageSquare', role_type: 'I', phase: 4, description: 'Manages stakeholder communications', capabilities: ['Communication', 'Documentation', 'Presentations'] },
  { name: 'Validator', icon: 'Shield', role_type: 'R', phase: 5, description: 'Ensures quality and compliance', capabilities: ['QA Testing', 'Compliance', 'Validation'] },
  { name: 'Integrator', icon: 'Zap', role_type: 'R', phase: 3, description: 'Connects systems and workflows', capabilities: ['API Integration', 'Automation', 'Connectivity'] },
  { name: 'Coordinator', icon: 'Users', role_type: 'A', phase: 4, description: 'Orchestrates team activities', capabilities: ['Project Management', 'Scheduling', 'Resource Allocation'] },
  { name: 'Documenter', icon: 'FileText', role_type: 'C', phase: 6, description: 'Creates and maintains documentation', capabilities: ['Documentation', 'Knowledge Base', 'Training Materials'] },
  { name: 'Optimizer', icon: 'Bot', role_type: 'R', phase: 6, description: 'Improves efficiency continuously', capabilities: ['Performance Tuning', 'Process Improvement', 'Automation'] },
];

// Default phases for new users
const defaultPhases = [
  { phase_number: 1, name: 'Discovery', status: 'complete', progress: 100, tasks_total: 12, tasks_completed: 12 },
  { phase_number: 2, name: 'Design', status: 'complete', progress: 100, tasks_total: 8, tasks_completed: 8 },
  { phase_number: 3, name: 'Development', status: 'in-progress', progress: 68, tasks_total: 24, tasks_completed: 16 },
  { phase_number: 4, name: 'Delivery', status: 'pending', progress: 0, tasks_total: 10, tasks_completed: 0 },
  { phase_number: 5, name: 'Validation', status: 'pending', progress: 0, tasks_total: 15, tasks_completed: 0 },
  { phase_number: 6, name: 'Evolution', status: 'pending', progress: 0, tasks_total: 6, tasks_completed: 0 },
];

export function useSymphonyData() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch agents
  const { data: agents = [], isLoading: agentsLoading, refetch: refetchAgents } = useQuery({
    queryKey: ['symphony-agents', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('symphony_agents')
        .select('*')
        .eq('user_id', user.id)
        .order('phase', { ascending: true });
      
      if (error) throw error;
      return data as SymphonyAgent[];
    },
    enabled: !!user,
  });

  // Fetch phases
  const { data: phases = [], isLoading: phasesLoading, refetch: refetchPhases } = useQuery({
    queryKey: ['symphony-phases', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('symphony_phases')
        .select('*')
        .eq('user_id', user.id)
        .order('phase_number', { ascending: true });
      
      if (error) throw error;
      return data as SymphonyPhase[];
    },
    enabled: !!user,
  });

  // Fetch tasks
  const { data: tasks = [], isLoading: tasksLoading, refetch: refetchTasks } = useQuery({
    queryKey: ['symphony-tasks', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('symphony_tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as SymphonyTask[];
    },
    enabled: !!user,
  });

  // Initialize default data for new users
  const initializeData = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('Not authenticated');

      // Create default phases
      const phasesData = defaultPhases.map(p => ({ ...p, user_id: user.id }));
      const { error: phasesError } = await supabase
        .from('symphony_phases')
        .insert(phasesData);
      
      if (phasesError) throw phasesError;

      // Create default agents
      const agentsData = defaultAgents.map(a => ({ ...a, user_id: user.id }));
      const { error: agentsError } = await supabase
        .from('symphony_agents')
        .insert(agentsData);
      
      if (agentsError) throw agentsError;

      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['symphony-agents'] });
      queryClient.invalidateQueries({ queryKey: ['symphony-phases'] });
      toast.success('Symphony data initialized');
    },
    onError: (error) => {
      console.error('Failed to initialize symphony data:', error);
      toast.error('Failed to initialize data');
    },
  });

  // Update agent
  const updateAgent = useMutation({
    mutationFn: async (updates: Partial<SymphonyAgent> & { id: string }) => {
      const { id, ...rest } = updates;
      const { data, error } = await supabase
        .from('symphony_agents')
        .update(rest)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['symphony-agents'] });
    },
  });

  // Update phase
  const updatePhase = useMutation({
    mutationFn: async (updates: Partial<SymphonyPhase> & { id: string }) => {
      const { id, ...rest } = updates;
      const { data, error } = await supabase
        .from('symphony_phases')
        .update(rest)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['symphony-phases'] });
    },
  });

  // Create task
  const createTask = useMutation({
    mutationFn: async (task: {
      title: string;
      description: string;
      priority: 'low' | 'medium' | 'high' | 'critical';
      agent_id: string | null;
      phase_id: string | null;
    }) => {
      if (!user) throw new Error('Not authenticated');
      
      const { data, error } = await supabase
        .from('symphony_tasks')
        .insert({
          ...task,
          user_id: user.id,
          status: 'pending',
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['symphony-tasks'] });
      toast.success('Task created successfully!');
    },
    onError: (error) => {
      console.error('Failed to create task:', error);
      toast.error('Failed to create task');
    },
  });

  // Update task
  const updateTask = useMutation({
    mutationFn: async (updates: Partial<SymphonyTask> & { id: string }) => {
      const { id, ...rest } = updates;
      const { data, error } = await supabase
        .from('symphony_tasks')
        .update(rest)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['symphony-tasks'] });
    },
  });

  // Delete task
  const deleteTask = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('symphony_tasks')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['symphony-tasks'] });
      toast.success('Task deleted');
    },
  });

  // Set up realtime subscriptions
  useEffect(() => {
    if (!user) return;

    const agentsChannel = supabase
      .channel('symphony-agents-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'symphony_agents', filter: `user_id=eq.${user.id}` },
        () => {
          refetchAgents();
        }
      )
      .subscribe();

    const phasesChannel = supabase
      .channel('symphony-phases-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'symphony_phases', filter: `user_id=eq.${user.id}` },
        () => {
          refetchPhases();
        }
      )
      .subscribe();

    const tasksChannel = supabase
      .channel('symphony-tasks-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'symphony_tasks', filter: `user_id=eq.${user.id}` },
        () => {
          refetchTasks();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(agentsChannel);
      supabase.removeChannel(phasesChannel);
      supabase.removeChannel(tasksChannel);
    };
  }, [user, refetchAgents, refetchPhases, refetchTasks]);

  return {
    agents,
    phases,
    tasks,
    isLoading: agentsLoading || phasesLoading || tasksLoading,
    hasData: agents.length > 0 || phases.length > 0,
    initializeData: initializeData.mutate,
    isInitializing: initializeData.isPending,
    updateAgent: updateAgent.mutate,
    updatePhase: updatePhase.mutate,
    createTask: createTask.mutateAsync,
    isCreatingTask: createTask.isPending,
    updateTask: updateTask.mutate,
    deleteTask: deleteTask.mutate,
    refetchAgents,
    refetchPhases,
    refetchTasks,
  };
}
