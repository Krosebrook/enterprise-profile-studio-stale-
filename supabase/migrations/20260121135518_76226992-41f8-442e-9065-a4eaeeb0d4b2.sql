-- Create ai_platforms table for storing platform data
CREATE TABLE public.ai_platforms (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  priority TEXT NOT NULL,
  ecosystem TEXT,
  verdict TEXT,
  market_share TEXT,
  pricing TEXT,
  context_window TEXT,
  compliance TEXT[] DEFAULT '{}',
  target_users TEXT,
  logo_color TEXT,
  specialties TEXT[] DEFAULT '{}',
  capabilities JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- AI platforms are publicly readable
ALTER TABLE public.ai_platforms ENABLE ROW LEVEL SECURITY;
CREATE POLICY "AI platforms are publicly viewable" ON public.ai_platforms FOR SELECT USING (true);

-- Create ai_assessments table for user readiness assessments
CREATE TABLE public.ai_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  organization_profile JSONB DEFAULT '{}',
  current_ai_usage JSONB DEFAULT '{}',
  technical_readiness JSONB DEFAULT '{}',
  budget_timeline JSONB DEFAULT '{}',
  readiness_score INTEGER,
  recommendations JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.ai_assessments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own assessments" ON public.ai_assessments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own assessments" ON public.ai_assessments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own assessments" ON public.ai_assessments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own assessments" ON public.ai_assessments FOR DELETE USING (auth.uid() = user_id);

-- Create roi_calculations table for saved ROI calculations
CREATE TABLE public.roi_calculations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  inputs JSONB NOT NULL DEFAULT '{}',
  outputs JSONB NOT NULL DEFAULT '{}',
  platform_ids TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.roi_calculations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own ROI calculations" ON public.roi_calculations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own ROI calculations" ON public.roi_calculations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own ROI calculations" ON public.roi_calculations FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own ROI calculations" ON public.roi_calculations FOR DELETE USING (auth.uid() = user_id);

-- Create document_favorites table for bookmarking documents
CREATE TABLE public.document_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  document_id UUID REFERENCES public.knowledge_base_documents(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, document_id)
);

ALTER TABLE public.document_favorites ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own favorites" ON public.document_favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own favorites" ON public.document_favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own favorites" ON public.document_favorites FOR DELETE USING (auth.uid() = user_id);

-- Create document_versions table for version history
CREATE TABLE public.document_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID REFERENCES public.knowledge_base_documents(id) ON DELETE CASCADE NOT NULL,
  user_id UUID NOT NULL,
  version_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  description TEXT,
  category TEXT,
  tags TEXT[] DEFAULT '{}',
  change_summary TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.document_versions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own document versions" ON public.document_versions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own document versions" ON public.document_versions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Add trigger for ai_assessments updated_at
CREATE TRIGGER update_ai_assessments_updated_at
  BEFORE UPDATE ON public.ai_assessments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();