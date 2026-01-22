-- Create feedback ratings table
CREATE TABLE public.feedback_ratings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  platform_id TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  feedback_text TEXT,
  category TEXT DEFAULT 'general',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create feature requests table
CREATE TABLE public.feature_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'in_progress', 'completed', 'rejected')),
  votes INTEGER DEFAULT 0,
  category TEXT DEFAULT 'enhancement',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user dashboard configurations table
CREATE TABLE public.user_dashboard_configs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  name TEXT NOT NULL DEFAULT 'My Dashboard',
  widgets JSONB NOT NULL DEFAULT '[]'::jsonb,
  layout JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create scheduled reports table
CREATE TABLE public.scheduled_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  name TEXT NOT NULL,
  report_type TEXT NOT NULL,
  schedule TEXT NOT NULL DEFAULT 'weekly',
  recipients JSONB NOT NULL DEFAULT '[]'::jsonb,
  config JSONB DEFAULT '{}'::jsonb,
  is_active BOOLEAN DEFAULT true,
  last_sent_at TIMESTAMP WITH TIME ZONE,
  next_send_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create anomaly alerts table
CREATE TABLE public.anomaly_alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  alert_type TEXT NOT NULL,
  severity TEXT DEFAULT 'medium' CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  message TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  is_read BOOLEAN DEFAULT false,
  sent_email BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.feedback_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feature_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_dashboard_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scheduled_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.anomaly_alerts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for feedback_ratings
CREATE POLICY "Anyone can view feedback ratings" ON public.feedback_ratings FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create feedback" ON public.feedback_ratings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own feedback" ON public.feedback_ratings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own feedback" ON public.feedback_ratings FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for feature_requests
CREATE POLICY "Anyone can view feature requests" ON public.feature_requests FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create feature requests" ON public.feature_requests FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own feature requests" ON public.feature_requests FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own feature requests" ON public.feature_requests FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for user_dashboard_configs
CREATE POLICY "Users can view their own dashboard configs" ON public.user_dashboard_configs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own dashboard configs" ON public.user_dashboard_configs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own dashboard configs" ON public.user_dashboard_configs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own dashboard configs" ON public.user_dashboard_configs FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for scheduled_reports
CREATE POLICY "Users can view their own scheduled reports" ON public.scheduled_reports FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own scheduled reports" ON public.scheduled_reports FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own scheduled reports" ON public.scheduled_reports FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own scheduled reports" ON public.scheduled_reports FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for anomaly_alerts
CREATE POLICY "Users can view their own alerts" ON public.anomaly_alerts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "System can create alerts" ON public.anomaly_alerts FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update their own alerts" ON public.anomaly_alerts FOR UPDATE USING (auth.uid() = user_id);

-- Enable realtime for feedback and feature requests
ALTER PUBLICATION supabase_realtime ADD TABLE public.feedback_ratings;
ALTER PUBLICATION supabase_realtime ADD TABLE public.feature_requests;
ALTER PUBLICATION supabase_realtime ADD TABLE public.anomaly_alerts;

-- Triggers for updated_at
CREATE TRIGGER update_feedback_ratings_updated_at BEFORE UPDATE ON public.feedback_ratings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_feature_requests_updated_at BEFORE UPDATE ON public.feature_requests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_user_dashboard_configs_updated_at BEFORE UPDATE ON public.user_dashboard_configs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_scheduled_reports_updated_at BEFORE UPDATE ON public.scheduled_reports FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();