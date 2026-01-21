-- Create employee_personas table
CREATE TABLE public.employee_personas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  email TEXT,
  department TEXT,
  job_title TEXT,
  
  -- Communication & work style
  communication_style JSONB DEFAULT '{}'::jsonb,
  work_preferences JSONB DEFAULT '{}'::jsonb,
  pain_points TEXT[] DEFAULT '{}'::text[],
  goals TEXT[] DEFAULT '{}'::text[],
  
  -- Skills and expertise
  skills TEXT[] DEFAULT '{}'::text[],
  expertise_areas TEXT[] DEFAULT '{}'::text[],
  tools_used TEXT[] DEFAULT '{}'::text[],
  
  -- AI preferences
  ai_interaction_style TEXT DEFAULT 'balanced',
  preferred_response_length TEXT DEFAULT 'medium',
  preferred_tone TEXT DEFAULT 'professional',
  
  -- Metadata
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create employee_hats table for roles/responsibilities
CREATE TABLE public.employee_hats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  persona_id UUID NOT NULL REFERENCES public.employee_personas(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  
  -- Role details
  responsibilities TEXT[] DEFAULT '{}'::text[],
  key_tasks TEXT[] DEFAULT '{}'::text[],
  stakeholders TEXT[] DEFAULT '{}'::text[],
  tools TEXT[] DEFAULT '{}'::text[],
  
  -- Time allocation
  time_percentage INTEGER DEFAULT 20,
  priority INTEGER DEFAULT 1,
  
  -- AI optimization
  ai_suggestions JSONB DEFAULT '{}'::jsonb,
  optimized_prompt TEXT,
  
  -- Metadata
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create ecosystem_exports table
CREATE TABLE public.ecosystem_exports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  persona_id UUID NOT NULL REFERENCES public.employee_personas(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  
  -- Export details
  ecosystem TEXT NOT NULL, -- 'claude', 'copilot', 'gemini'
  export_type TEXT NOT NULL, -- 'system_prompt', 'context', 'configuration'
  name TEXT NOT NULL,
  
  -- Generated content
  content TEXT NOT NULL,
  configuration JSONB DEFAULT '{}'::jsonb,
  
  -- Versioning
  version INTEGER DEFAULT 1,
  is_active BOOLEAN DEFAULT true,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.employee_personas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employee_hats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ecosystem_exports ENABLE ROW LEVEL SECURITY;

-- RLS policies for employee_personas
CREATE POLICY "Users can view their own personas" 
ON public.employee_personas FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own personas" 
ON public.employee_personas FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own personas" 
ON public.employee_personas FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own personas" 
ON public.employee_personas FOR DELETE 
USING (auth.uid() = user_id);

-- RLS policies for employee_hats
CREATE POLICY "Users can view their own hats" 
ON public.employee_hats FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own hats" 
ON public.employee_hats FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own hats" 
ON public.employee_hats FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own hats" 
ON public.employee_hats FOR DELETE 
USING (auth.uid() = user_id);

-- RLS policies for ecosystem_exports
CREATE POLICY "Users can view their own exports" 
ON public.ecosystem_exports FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own exports" 
ON public.ecosystem_exports FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own exports" 
ON public.ecosystem_exports FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own exports" 
ON public.ecosystem_exports FOR DELETE 
USING (auth.uid() = user_id);

-- Create triggers for updated_at
CREATE TRIGGER update_employee_personas_updated_at
BEFORE UPDATE ON public.employee_personas
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_employee_hats_updated_at
BEFORE UPDATE ON public.employee_hats
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ecosystem_exports_updated_at
BEFORE UPDATE ON public.ecosystem_exports
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();