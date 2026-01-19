import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

type EventType = 'view' | 'share' | 'contact_click' | 'service_view';

export function useAnalytics() {
  const trackEvent = useCallback(async (
    profileId: string,
    eventType: EventType,
    eventData?: Record<string, string | number | boolean>
  ) => {
    try {
      await supabase.functions.invoke('track-analytics', {
        body: {
          profile_id: profileId,
          event_type: eventType,
          event_data: eventData,
        },
      });
    } catch (err) {
      // Silently fail analytics - don't interrupt user experience
      console.error('Analytics tracking failed:', err);
    }
  }, []);

  return { trackEvent };
}
