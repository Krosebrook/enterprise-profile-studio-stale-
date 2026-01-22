import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  TrendingUp, FileText, Bell, Settings, AlertTriangle,
  BarChart3, LineChart, PieChart, Activity, Download,
  RefreshCw, CheckCircle, XCircle, Clock, Zap,
  Target, Eye, Calendar, Filter
} from 'lucide-react';
import { toast } from 'sonner';
import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar
} from 'recharts';

// Analytics data
const adoptionTrendData = [
  { month: 'Jul', users: 120, sessions: 450, tasks: 890 },
  { month: 'Aug', users: 180, sessions: 620, tasks: 1250 },
  { month: 'Sep', users: 245, sessions: 890, tasks: 1680 },
  { month: 'Oct', users: 320, sessions: 1100, tasks: 2100 },
  { month: 'Nov', users: 410, sessions: 1450, tasks: 2890 },
  { month: 'Dec', users: 520, sessions: 1820, tasks: 3450 },
  { month: 'Jan', users: 650, sessions: 2200, tasks: 4200 },
];

const platformUsageData = [
  { name: 'Microsoft Copilot', usage: 42, growth: 15 },
  { name: 'Claude', usage: 28, growth: 22 },
  { name: 'OpenAI GPT-4', usage: 18, growth: 8 },
  { name: 'Google Gemini', usage: 12, growth: 35 },
];

const anomalies = [
  { id: '1', type: 'spike', metric: 'API Errors', severity: 'high', detected: '2 hours ago', status: 'investigating' },
  { id: '2', type: 'drop', metric: 'User Sessions', severity: 'medium', detected: '4 hours ago', status: 'resolved' },
  { id: '3', type: 'trend', metric: 'Response Latency', severity: 'low', detected: '1 day ago', status: 'monitoring' },
];

const scheduledReports = [
  { id: '1', name: 'Weekly Executive Summary', frequency: 'Weekly', nextRun: '2025-01-27', recipients: 5, enabled: true },
  { id: '2', name: 'Monthly ROI Report', frequency: 'Monthly', nextRun: '2025-02-01', recipients: 12, enabled: true },
  { id: '3', name: 'Daily Usage Metrics', frequency: 'Daily', nextRun: '2025-01-23', recipients: 3, enabled: false },
  { id: '4', name: 'Quarterly Compliance Audit', frequency: 'Quarterly', nextRun: '2025-04-01', recipients: 8, enabled: true },
];

const personalizationPreferences = [
  { id: 'dark_mode', label: 'Dark Mode', category: 'Display', enabled: true },
  { id: 'notifications', label: 'Push Notifications', category: 'Alerts', enabled: true },
  { id: 'email_digest', label: 'Weekly Email Digest', category: 'Communication', enabled: false },
  { id: 'compact_view', label: 'Compact Dashboard View', category: 'Display', enabled: false },
  { id: 'auto_refresh', label: 'Auto-refresh Data (5min)', category: 'Data', enabled: true },
  { id: 'advanced_metrics', label: 'Show Advanced Metrics', category: 'Display', enabled: true },
];

export function EnhancedAnalyticsTab() {
  const [activeTab, setActiveTab] = useState('analytics');
  const [preferences, setPreferences] = useState(personalizationPreferences);
  const [reports, setReports] = useState(scheduledReports);

  const togglePreference = (id: string) => {
    setPreferences(prev => 
      prev.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p)
    );
    toast.success('Preference updated');
  };

  const toggleReport = (id: string) => {
    setReports(prev =>
      prev.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r)
    );
    toast.success('Report schedule updated');
  };

  const handleExport = () => {
    toast.success('Analytics data exported');
  };

  const handleRefresh = () => {
    toast.success('Data refreshed');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Enhanced Analytics & Insights</h2>
          <p className="text-muted-foreground">AI-powered analytics, predictive insights, and comprehensive reporting</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport} className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-muted/50">
          <TabsTrigger value="analytics" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            Analytics Dashboard
          </TabsTrigger>
          <TabsTrigger value="reports" className="gap-2">
            <FileText className="h-4 w-4" />
            Reports
          </TabsTrigger>
          <TabsTrigger value="alerts" className="gap-2">
            <Bell className="h-4 w-4" />
            Alerts & Anomalies
          </TabsTrigger>
          <TabsTrigger value="settings" className="gap-2">
            <Settings className="h-4 w-4" />
            Personalization
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="mt-6 space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Users</p>
                    <p className="text-3xl font-bold">650</p>
                  </div>
                  <Activity className="h-8 w-8 text-blue-500" />
                </div>
                <p className="text-xs text-green-600 mt-2">+25% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">AI Tasks Completed</p>
                    <p className="text-3xl font-bold">4.2K</p>
                  </div>
                  <Zap className="h-8 w-8 text-yellow-500" />
                </div>
                <p className="text-xs text-green-600 mt-2">+45% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Response Time</p>
                    <p className="text-3xl font-bold">1.2s</p>
                  </div>
                  <Clock className="h-8 w-8 text-green-500" />
                </div>
                <p className="text-xs text-green-600 mt-2">-15% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Success Rate</p>
                    <p className="text-3xl font-bold">98.5%</p>
                  </div>
                  <Target className="h-8 w-8 text-purple-500" />
                </div>
                <p className="text-xs text-green-600 mt-2">+2% from last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-blue-500" />
                  Adoption Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={adoptionTrendData}>
                      <defs>
                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="month" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="users" 
                        stroke="hsl(var(--primary))" 
                        fill="url(#colorUsers)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-green-500" />
                  Platform Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={platformUsageData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis type="number" className="text-xs" />
                      <YAxis dataKey="name" type="category" className="text-xs" width={120} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar dataKey="usage" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
              <CardDescription>Configure automated report delivery</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                    <div className="flex items-center gap-4">
                      <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                        report.enabled ? 'bg-primary/10' : 'bg-muted'
                      }`}>
                        <FileText className={`h-5 w-5 ${report.enabled ? 'text-primary' : 'text-muted-foreground'}`} />
                      </div>
                      <div>
                        <p className="font-medium">{report.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">{report.frequency}</Badge>
                          <span className="text-xs text-muted-foreground">
                            Next: {report.nextRun} • {report.recipients} recipients
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Switch 
                        checked={report.enabled} 
                        onCheckedChange={() => toggleReport(report.id)}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <Button className="mt-4 gap-2">
                <Calendar className="h-4 w-4" />
                Create New Report
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                Anomaly Detection
              </CardTitle>
              <CardDescription>AI-powered detection of unusual patterns and potential issues</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {anomalies.map((anomaly) => (
                  <div key={anomaly.id} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                    <div className="flex items-center gap-4">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        anomaly.severity === 'high' ? 'bg-red-100 dark:bg-red-900/30' :
                        anomaly.severity === 'medium' ? 'bg-orange-100 dark:bg-orange-900/30' :
                        'bg-yellow-100 dark:bg-yellow-900/30'
                      }`}>
                        <AlertTriangle className={`h-5 w-5 ${
                          anomaly.severity === 'high' ? 'text-red-600' :
                          anomaly.severity === 'medium' ? 'text-orange-600' :
                          'text-yellow-600'
                        }`} />
                      </div>
                      <div>
                        <p className="font-medium">{anomaly.type.charAt(0).toUpperCase() + anomaly.type.slice(1)} in {anomaly.metric}</p>
                        <p className="text-sm text-muted-foreground">Detected {anomaly.detected}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={anomaly.severity === 'high' ? 'destructive' : 'secondary'}>
                        {anomaly.severity}
                      </Badge>
                      <Badge variant={
                        anomaly.status === 'resolved' ? 'default' :
                        anomaly.status === 'investigating' ? 'secondary' : 'outline'
                      }>
                        {anomaly.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Personalization Settings</CardTitle>
              <CardDescription>Customize your analytics experience</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {['Display', 'Alerts', 'Communication', 'Data'].map((category) => (
                  <div key={category}>
                    <h4 className="font-medium mb-3">{category}</h4>
                    <div className="space-y-3">
                      {preferences.filter(p => p.category === category).map((pref) => (
                        <div key={pref.id} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                          <Label htmlFor={pref.id} className="cursor-pointer">
                            {pref.label}
                          </Label>
                          <Switch
                            id={pref.id}
                            checked={pref.enabled}
                            onCheckedChange={() => togglePreference(pref.id)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
