
-- Fix 1: Add DELETE policy for anomaly_alerts so users can clean up their own alerts
CREATE POLICY "Users can delete their own alerts"
ON public.anomaly_alerts FOR DELETE
USING (auth.uid() = user_id);

-- Fix 2: Replace overly permissive public SELECT on feedback_ratings with authenticated-only access
DROP POLICY "Anyone can view feedback ratings" ON public.feedback_ratings;

CREATE POLICY "Authenticated users can view feedback ratings"
ON public.feedback_ratings FOR SELECT
USING (auth.uid() IS NOT NULL);
