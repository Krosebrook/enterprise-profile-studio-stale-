-- Create table for storing user onboarding preferences
CREATE TABLE public.user_onboarding_preferences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  persona_type TEXT CHECK (persona_type IN ('internal', 'external')),
  ai_ecosystems JSONB DEFAULT '[]'::jsonb,
  api_keys JSONB DEFAULT '{}'::jsonb,
  onboarding_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.user_onboarding_preferences ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own onboarding preferences"
ON public.user_onboarding_preferences
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own onboarding preferences"
ON public.user_onboarding_preferences
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own onboarding preferences"
ON public.user_onboarding_preferences
FOR UPDATE
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_user_onboarding_preferences_updated_at
BEFORE UPDATE ON public.user_onboarding_preferences
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();