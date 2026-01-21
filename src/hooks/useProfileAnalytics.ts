import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { AnalyticsData, AnalyticsEvent } from '@/types/profile';

export type { AnalyticsData, AnalyticsEvent };

export function useProfileAnalytics(profileId: string | undefined) {
  return useQuery({
    queryKey: ['profile-analytics', profileId],
    queryFn: async (): Promise<AnalyticsData> => {
      if (!profileId) throw new Error('Profile ID required');

      // Fetch all analytics events for this profile
      const { data: events, error } = await supabase
        .from('analytics_events')
        .select('*')
        .eq('profile_id', profileId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Calculate totals
      const totalViews = events?.filter(e => e.event_type === 'view').length || 0;
      const totalShares = events?.filter(e => e.event_type === 'share').length || 0;
      const totalContactClicks = events?.filter(e => e.event_type === 'contact_click').length || 0;
      const totalServiceViews = events?.filter(e => e.event_type === 'service_view').length || 0;

      // Group views by date (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const viewEvents = events?.filter(e => 
        e.event_type === 'view' && 
        new Date(e.created_at) >= thirtyDaysAgo
      ) || [];

      const viewsByDateMap = new Map<string, number>();
      
      // Initialize all dates in the last 30 days
      for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        viewsByDateMap.set(dateStr, 0);
      }

      // Count views per date
      viewEvents.forEach(event => {
        const dateStr = new Date(event.created_at).toISOString().split('T')[0];
        if (viewsByDateMap.has(dateStr)) {
          viewsByDateMap.set(dateStr, (viewsByDateMap.get(dateStr) || 0) + 1);
        }
      });

      const viewsByDate = Array.from(viewsByDateMap.entries()).map(([date, count]) => ({
        date,
        count,
      }));

      return {
        totalViews,
        totalShares,
        totalContactClicks,
        totalServiceViews,
        viewsByDate,
        recentEvents: (events?.slice(0, 20) || []).map(e => ({
          id: e.id,
          profile_id: e.profile_id,
          event_type: e.event_type as AnalyticsEvent['event_type'],
          event_data: e.event_data as Record<string, string | number | boolean> | undefined,
          created_at: e.created_at,
        })),
      };
    },
    enabled: !!profileId,
    refetchInterval: 30000, // Refresh every 30 seconds for real-time feel
  });
}

export function useAllProfilesAnalytics(profileIds: string[]) {
  return useQuery({
    queryKey: ['all-profiles-analytics', profileIds],
    queryFn: async () => {
      if (profileIds.length === 0) return {};

      const { data: events, error } = await supabase
        .from('analytics_events')
        .select('*')
        .in('profile_id', profileIds);

      if (error) throw error;

      // Group by profile
      const byProfile: Record<string, { views: number; shares: number }> = {};
      
      profileIds.forEach(id => {
        byProfile[id] = { views: 0, shares: 0 };
      });

      events?.forEach(event => {
        if (event.profile_id && byProfile[event.profile_id]) {
          if (event.event_type === 'view') {
            byProfile[event.profile_id].views++;
          } else if (event.event_type === 'share') {
            byProfile[event.profile_id].shares++;
          }
        }
      });

      return byProfile;
    },
    enabled: profileIds.length > 0,
  });
}
