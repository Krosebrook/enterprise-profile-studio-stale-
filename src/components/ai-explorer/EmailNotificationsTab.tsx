import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  Mail, Calendar, Bell, Plus, Trash2, Send, Clock, 
  AlertTriangle, CheckCircle2, XCircle, Settings
} from 'lucide-react';
import { useScheduledReports, type ScheduledReport } from '@/hooks/useScheduledReports';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';

const reportTypes = [
  { value: 'usage_summary', label: 'Usage Summary' },
  { value: 'weekly_digest', label: 'Weekly Digest' },
  { value: 'anomaly_alert', label: 'Anomaly Alerts' },
  { value: 'custom', label: 'Custom Report' },
];

const scheduleOptions = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
];

const severityColors: Record<string, string> = {
  critical: 'text-red-600 bg-red-100 dark:bg-red-900/30',
  high: 'text-orange-600 bg-orange-100 dark:bg-orange-900/30',
  medium: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30',
  low: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30',
};

export function EmailNotificationsTab() {
  const { user } = useAuth();
  const { 
    reports, 
    alerts, 
    unreadAlerts, 
    loading, 
    createReport, 
    updateReport, 
    deleteReport, 
    sendReportNow,
    markAlertAsRead 
  } = useScheduledReports();

  const [isCreatingReport, setIsCreatingReport] = useState(false);
  const [newReport, setNewReport] = useState({
    name: '',
    reportType: 'usage_summary',
    schedule: 'weekly',
    recipients: ''
  });

  const handleCreateReport = async () => {
    const recipients = newReport.recipients.split(',').map(r => r.trim()).filter(Boolean);
    if (!newReport.name || recipients.length === 0) {
      return;
    }
    
    await createReport(newReport.name, newReport.reportType, newReport.schedule, recipients);
    setNewReport({ name: '', reportType: 'usage_summary', schedule: 'weekly', recipients: '' });
    setIsCreatingReport(false);
  };

  if (!user) {
    return (
      <Card className="p-12 text-center">
        <Mail className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">Sign In Required</h3>
        <p className="text-muted-foreground">
          Please sign in to manage email notifications and scheduled reports.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Mail className="h-7 w-7 text-primary" />
            Email Notifications
          </h2>
          <p className="text-muted-foreground mt-1">
            Manage scheduled reports and anomaly alerts
          </p>
        </div>

        <Dialog open={isCreatingReport} onOpenChange={setIsCreatingReport}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Scheduled Report
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Scheduled Report</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <label className="text-sm font-medium">Report Name</label>
                <Input
                  placeholder="Weekly Platform Summary"
                  value={newReport.name}
                  onChange={(e) => setNewReport({ ...newReport, name: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Report Type</label>
                <Select
                  value={newReport.reportType}
                  onValueChange={(value) => setNewReport({ ...newReport, reportType: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {reportTypes.map(rt => (
                      <SelectItem key={rt.value} value={rt.value}>{rt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Schedule</label>
                <Select
                  value={newReport.schedule}
                  onValueChange={(value) => setNewReport({ ...newReport, schedule: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {scheduleOptions.map(s => (
                      <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Recipients (comma-separated)</label>
                <Textarea
                  placeholder="john@example.com, jane@example.com"
                  value={newReport.recipients}
                  onChange={(e) => setNewReport({ ...newReport, recipients: e.target.value })}
                  className="mt-1"
                  rows={2}
                />
              </div>

              <Button className="w-full" onClick={handleCreateReport}>
                Create Report
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scheduled Reports */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              Scheduled Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            {reports.length > 0 ? (
              <div className="space-y-3">
                {reports.map((report) => (
                  <div key={report.id} className="p-4 rounded-lg border bg-card">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{report.name}</h4>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={report.is_active}
                          onCheckedChange={(checked) => updateReport(report.id, { is_active: checked })}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => deleteReport(report.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Badge variant="outline">{reportTypes.find(rt => rt.value === report.report_type)?.label}</Badge>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {scheduleOptions.find(s => s.value === report.schedule)?.label}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {report.recipients.length} recipient(s)
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1"
                        onClick={() => sendReportNow(report)}
                      >
                        <Send className="h-3 w-3" />
                        Send Now
                      </Button>
                    </div>
                    {report.last_sent_at && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Last sent: {format(new Date(report.last_sent_at), 'MMM d, yyyy h:mm a')}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No scheduled reports yet</p>
                <Button 
                  variant="link" 
                  className="mt-2"
                  onClick={() => setIsCreatingReport(true)}
                >
                  Create your first report
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Anomaly Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-yellow-500" />
              Anomaly Alerts
              {unreadAlerts.length > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {unreadAlerts.length} new
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {alerts.length > 0 ? (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {alerts.map((alert) => (
                  <div 
                    key={alert.id} 
                    className={`p-4 rounded-lg border ${!alert.is_read ? 'bg-primary/5' : 'bg-card'}`}
                    onClick={() => !alert.is_read && markAlertAsRead(alert.id)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className={`h-4 w-4 ${
                          alert.severity === 'critical' ? 'text-red-500' :
                          alert.severity === 'high' ? 'text-orange-500' :
                          alert.severity === 'medium' ? 'text-yellow-500' : 'text-blue-500'
                        }`} />
                        <span className="font-medium">{alert.alert_type}</span>
                      </div>
                      <Badge className={severityColors[alert.severity]}>
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{format(new Date(alert.created_at), 'MMM d, h:mm a')}</span>
                      <div className="flex items-center gap-2">
                        {alert.sent_email && (
                          <span className="flex items-center gap-1 text-green-600">
                            <CheckCircle2 className="h-3 w-3" />
                            Email sent
                          </span>
                        )}
                        {!alert.is_read && (
                          <Badge variant="outline" className="text-xs">Unread</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CheckCircle2 className="h-10 w-10 mx-auto text-green-500 mb-2" />
                <p className="text-muted-foreground">No anomaly alerts</p>
                <p className="text-xs text-muted-foreground mt-1">
                  You'll be notified when unusual patterns are detected
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Reports</p>
                <p className="text-2xl font-bold">{reports.filter(r => r.is_active).length}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Unread Alerts</p>
                <p className="text-2xl font-bold">{unreadAlerts.length}</p>
              </div>
              <Bell className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical Alerts</p>
                <p className="text-2xl font-bold">
                  {alerts.filter(a => a.severity === 'critical').length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Emails Sent</p>
                <p className="text-2xl font-bold">
                  {alerts.filter(a => a.sent_email).length}
                </p>
              </div>
              <Mail className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
