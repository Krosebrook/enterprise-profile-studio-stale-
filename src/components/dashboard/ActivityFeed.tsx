import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import { Activity, Eye, Share2, MousePointer, FileText, Loader2 } from 'lucide-react';
import { FadeIn } from '@/components/ui/animations';

const EVENT_ICONS: Record<string, React.ReactNode> = {
  view: <Eye className="h-3.5 w-3.5" />,
  share: <Share2 className="h-3.5 w-3.5" />,
  contact_click: <MousePointer className="h-3.5 w-3.5" />,
  service_view: <FileText className="h-3.5 w-3.5" />,
};

const EVENT_LABELS: Record<string, string> = {
  view: 'Profile viewed',
  share: 'Profile shared',
  contact_click: 'Contact clicked',
  service_view: 'Service viewed',
};

export function ActivityFeed() {
  const { user } = useAuth();

  const { data: events, isLoading } = useQuery({
    queryKey: ['activity-feed', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('analytics_events')
        .select('*')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false })
        .limit(10);
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!events?.length) {
    return (
      <div className="text-center py-8">
        <Activity className="h-8 w-8 text-muted-foreground/40 mx-auto mb-2" />
        <p className="text-sm text-muted-foreground">No recent activity</p>
      </div>
    );
  }

  return (
    <FadeIn>
      <div className="space-y-1">
        {events.map((event, i) => (
          <div
            key={event.id}
            className="flex items-start gap-3 rounded-lg px-3 py-2.5 hover:bg-muted/50 transition-colors"
          >
            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              {EVENT_ICONS[event.event_type] || <Activity className="h-3.5 w-3.5" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {EVENT_LABELS[event.event_type] || event.event_type}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(event.created_at), { addSuffix: true })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </FadeIn>
  );
}
