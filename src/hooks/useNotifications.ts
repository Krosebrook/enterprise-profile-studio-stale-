import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface SendNotificationParams {
  type: 'profile_published' | 'significant_views';
  profileId: string;
  profileName: string;
  recipientEmail: string;
  viewCount?: number;
  profileSlug?: string;
}

export function useNotifications() {
  const sendNotification = async (params: SendNotificationParams) => {
    try {
      const { data, error } = await supabase.functions.invoke('send-notification', {
        body: params,
      });

      if (error) {
        console.error('Failed to send notification:', error);
        return false;
      }

      return true;
    } catch (err) {
      console.error('Notification error:', err);
      return false;
    }
  };

  const notifyProfilePublished = async (
    profileId: string,
    profileName: string,
    profileSlug: string,
    recipientEmail: string
  ) => {
    const success = await sendNotification({
      type: 'profile_published',
      profileId,
      profileName,
      recipientEmail,
      profileSlug,
    });

    if (success) {
      toast.success('Notification email sent!');
    }

    return success;
  };

  const notifySignificantViews = async (
    profileId: string,
    profileName: string,
    recipientEmail: string,
    viewCount: number
  ) => {
    return sendNotification({
      type: 'significant_views',
      profileId,
      profileName,
      recipientEmail,
      viewCount,
    });
  };

  return {
    sendNotification,
    notifyProfilePublished,
    notifySignificantViews,
  };
}
