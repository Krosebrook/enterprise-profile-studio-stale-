-- Create symphony_agents table to store agent configurations
CREATE TABLE public.symphony_agents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'bot',
  role_type TEXT NOT NULL CHECK (role_type IN ('R', 'A', 'C', 'I')),
  phase INTEGER NOT NULL CHECK (phase BETWEEN 1 AND 6),
  description TEXT,
  capabilities TEXT[] DEFAULT '{}',
  current_status TEXT DEFAULT 'idle' CHECK (current_status IN ('idle', 'active', 'busy', 'offline')),
  tasks_completed INTEGER DEFAULT 0,
  tasks_pending INTEGER DEFAULT 0,
  efficiency_score NUMERIC(5,2) DEFAULT 0,
  avg_response_time NUMERIC(10,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create symphony_phases table to track phase progress
CREATE TABLE public.symphony_phases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  phase_number INTEGER NOT NULL CHECK (phase_number BETWEEN 1 AND 6),
  name TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'complete')),
  progress INTEGER DEFAULT 0 CHECK (progress BETWEEN 0 AND 100),
  tasks_total INTEGER DEFAULT 0,
  tasks_completed INTEGER DEFAULT 0,
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, phase_number)
);

-- Create symphony_tasks table for individual task tracking
CREATE TABLE public.symphony_tasks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  phase_id UUID REFERENCES public.symphony_phases(id) ON DELETE CASCADE,
  agent_id UUID REFERENCES public.symphony_agents(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'complete', 'blocked')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.symphony_agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.symphony_phases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.symphony_tasks ENABLE ROW LEVEL SECURITY;

-- RLS Policies for symphony_agents
CREATE POLICY "Users can view their own agents" 
ON public.symphony_agents FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own agents" 
ON public.symphony_agents FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own agents" 
ON public.symphony_agents FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own agents" 
ON public.symphony_agents FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for symphony_phases
CREATE POLICY "Users can view their own phases" 
ON public.symphony_phases FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own phases" 
ON public.symphony_phases FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own phases" 
ON public.symphony_phases FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own phases" 
ON public.symphony_phases FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for symphony_tasks
CREATE POLICY "Users can view their own tasks" 
ON public.symphony_tasks FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own tasks" 
ON public.symphony_tasks FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tasks" 
ON public.symphony_tasks FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tasks" 
ON public.symphony_tasks FOR DELETE USING (auth.uid() = user_id);

-- Triggers for updated_at
CREATE TRIGGER update_symphony_agents_updated_at
BEFORE UPDATE ON public.symphony_agents
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_symphony_phases_updated_at
BEFORE UPDATE ON public.symphony_phases
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_symphony_tasks_updated_at
BEFORE UPDATE ON public.symphony_tasks
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for live updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.symphony_agents;
ALTER PUBLICATION supabase_realtime ADD TABLE public.symphony_phases;
ALTER PUBLICATION supabase_realtime ADD TABLE public.symphony_tasks;