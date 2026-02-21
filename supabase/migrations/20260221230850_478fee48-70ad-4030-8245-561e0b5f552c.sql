
-- Tighten anomaly_alerts INSERT policy: edge functions use service_role (bypasses RLS)
-- so we can safely restrict anonymous inserts
DROP POLICY "System can create alerts" ON public.anomaly_alerts;

CREATE POLICY "System can create alerts via service role"
ON public.anomaly_alerts FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);
