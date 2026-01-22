-- Create symphony_zone_configurations table to persist user zone settings
CREATE TABLE public.symphony_zone_configurations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  industry TEXT NOT NULL,
  rules JSONB NOT NULL DEFAULT '[]'::jsonb,
  custom_instructions TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.symphony_zone_configurations ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own zone configurations"
  ON public.symphony_zone_configurations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own zone configurations"
  ON public.symphony_zone_configurations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own zone configurations"
  ON public.symphony_zone_configurations FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own zone configurations"
  ON public.symphony_zone_configurations FOR DELETE
  USING (auth.uid() = user_id);

-- Create updated_at trigger
CREATE TRIGGER update_symphony_zone_configurations_updated_at
  BEFORE UPDATE ON public.symphony_zone_configurations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for zone configurations
ALTER PUBLICATION supabase_realtime ADD TABLE public.symphony_zone_configurations;