import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface ScheduledReport {
  id: string;
  user_id: string;
  name: string;
  report_type: string;
  schedule: string;
  recipients: string[];
  config: Record<string, unknown>;
  is_active: boolean;
  last_sent_at: string | null;
  next_send_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface AnomalyAlert {
  id: string;
  user_id: string | null;
  alert_type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  metadata: Record<string, unknown>;
  is_read: boolean;
  sent_email: boolean;
  created_at: string;
}

export function useScheduledReports() {
  const { user } = useAuth();
  const [reports, setReports] = useState<ScheduledReport[]>([]);
  const [alerts, setAlerts] = useState<AnomalyAlert[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch scheduled reports
  const fetchReports = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('scheduled_reports')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching scheduled reports:', error);
    } else {
      setReports((data || []).map(r => ({
        ...r,
        recipients: (r.recipients || []) as string[],
        config: (r.config || {}) as Record<string, unknown>
      })));
    }
  };

  // Fetch anomaly alerts
  const fetchAlerts = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('anomaly_alerts')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Error fetching anomaly alerts:', error);
    } else {
      setAlerts((data || []).map(a => ({
        ...a,
        severity: a.severity as AnomalyAlert['severity'],
        metadata: (a.metadata || {}) as Record<string, unknown>
      })));
    }
  };

  // Create a scheduled report
  const createReport = async (
    name: string,
    reportType: string,
    schedule: string,
    recipients: string[],
    config?: Record<string, unknown>
  ) => {
    if (!user) {
      toast.error('Please log in to create a report');
      return null;
    }

    const { data, error } = await supabase
      .from('scheduled_reports')
      .insert([{
        user_id: user.id,
        name,
        report_type: reportType,
        schedule,
        recipients: JSON.parse(JSON.stringify(recipients)),
        config: JSON.parse(JSON.stringify(config || {})),
        is_active: true
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating scheduled report:', error);
      toast.error('Failed to create report');
      return null;
    }

    toast.success('Scheduled report created!');
    await fetchReports();
    return data;
  };

  // Update a scheduled report
  const updateReport = async (reportId: string, updates: Partial<ScheduledReport>) => {
    const updateData: Record<string, unknown> = {};
    if (updates.name) updateData.name = updates.name;
    if (updates.schedule) updateData.schedule = updates.schedule;
    if (updates.recipients) updateData.recipients = updates.recipients as unknown as Record<string, unknown>;
    if (updates.config) updateData.config = updates.config;
    if (typeof updates.is_active === 'boolean') updateData.is_active = updates.is_active;

    const { error } = await supabase
      .from('scheduled_reports')
      .update(updateData)
      .eq('id', reportId);

    if (error) {
      console.error('Error updating scheduled report:', error);
      toast.error('Failed to update report');
      return false;
    }

    toast.success('Report updated!');
    await fetchReports();
    return true;
  };

  // Delete a scheduled report
  const deleteReport = async (reportId: string) => {
    const { error } = await supabase
      .from('scheduled_reports')
      .delete()
      .eq('id', reportId);

    if (error) {
      console.error('Error deleting scheduled report:', error);
      toast.error('Failed to delete report');
      return false;
    }

    toast.success('Report deleted!');
    await fetchReports();
    return true;
  };

  // Send a report now
  const sendReportNow = async (report: ScheduledReport) => {
    try {
      const { error } = await supabase.functions.invoke('send-scheduled-report', {
        body: {
          reportType: report.report_type,
          recipients: report.recipients,
          reportData: {
            title: report.name,
            summary: `Scheduled ${report.report_type} report`,
            period: new Date().toLocaleDateString(),
            metrics: {
              'Total Platforms': 50,
              'Active Users': 125,
              'ROI Score': '85%',
              'Risk Level': 'Low'
            }
          },
          userId: user?.id
        }
      });

      if (error) throw error;
      toast.success('Report sent successfully!');
    } catch (err) {
      console.error('Error sending report:', err);
      toast.error('Failed to send report');
    }
  };

  // Mark alert as read
  const markAlertAsRead = async (alertId: string) => {
    const { error } = await supabase
      .from('anomaly_alerts')
      .update({ is_read: true })
      .eq('id', alertId);

    if (error) {
      console.error('Error marking alert as read:', error);
    } else {
      await fetchAlerts();
    }
  };

  // Set up realtime subscriptions
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    fetchReports();
    fetchAlerts();
    setLoading(false);

    // Subscribe to anomaly_alerts changes
    const alertChannel = supabase
      .channel('anomaly_alerts_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'anomaly_alerts', filter: `user_id=eq.${user.id}` },
        () => {
          fetchAlerts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(alertChannel);
    };
  }, [user]);

  const unreadAlerts = alerts.filter(a => !a.is_read);

  return {
    reports,
    alerts,
    unreadAlerts,
    loading,
    createReport,
    updateReport,
    deleteReport,
    sendReportNow,
    markAlertAsRead,
    refetch: () => {
      fetchReports();
      fetchAlerts();
    }
  };
}
