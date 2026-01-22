import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { 
  Shield, Activity, AlertTriangle, FileText, 
  Eye, TrendingUp, RefreshCw, Download, Loader2,
  CheckCircle, XCircle, Clock, BarChart3, Scale,
  Lock, Users, Database, Zap, Settings
} from 'lucide-react';
import { toast } from 'sonner';

// Mock data for governance features
const mockUsageLogs = [
  { id: '1', agent_name: 'Claude', action: 'Document Generation', tokens: 1250, created_date: '2025-01-20T10:30:00Z', user: 'john@company.com', status: 'success' },
  { id: '2', agent_name: 'GPT-4', action: 'Code Review', tokens: 2100, created_date: '2025-01-20T09:15:00Z', user: 'sarah@company.com', status: 'success' },
  { id: '3', agent_name: 'Gemini', action: 'Data Analysis', tokens: 890, created_date: '2025-01-19T16:45:00Z', user: 'mike@company.com', status: 'success' },
  { id: '4', agent_name: 'Claude', action: 'Report Writing', tokens: 1800, created_date: '2025-01-19T14:20:00Z', user: 'john@company.com', status: 'success' },
  { id: '5', agent_name: 'GPT-4', action: 'Translation', tokens: 650, created_date: '2025-01-19T11:00:00Z', user: 'lisa@company.com', status: 'warning' },
];

const mockPolicies = [
  { id: '1', name: 'Data Retention Policy', status: 'active', category: 'Data', lastUpdated: '2025-01-15', compliance: 95 },
  { id: '2', name: 'AI Usage Limits', status: 'active', category: 'Usage', lastUpdated: '2025-01-18', compliance: 100 },
  { id: '3', name: 'PII Protection', status: 'active', category: 'Privacy', lastUpdated: '2025-01-10', compliance: 98 },
  { id: '4', name: 'Model Access Control', status: 'active', category: 'Security', lastUpdated: '2025-01-20', compliance: 100 },
  { id: '5', name: 'Audit Trail Requirements', status: 'active', category: 'Compliance', lastUpdated: '2025-01-12', compliance: 92 },
];

const mockBiasScans = [
  { id: '1', scan_date: '2025-01-20', agent: 'All Agents', overall_score: 92, gender_bias: 96, racial_bias: 94, age_bias: 90, recommendations: ['Review age-related prompts', 'Update training data'] },
  { id: '2', scan_date: '2025-01-13', agent: 'Claude', overall_score: 95, gender_bias: 97, racial_bias: 96, age_bias: 93, recommendations: ['Minor age bias in historical data'] },
  { id: '3', scan_date: '2025-01-06', agent: 'GPT-4', overall_score: 88, gender_bias: 92, racial_bias: 90, age_bias: 85, recommendations: ['Review hiring-related outputs'] },
];

const mockAuditLog = [
  { id: '1', action: 'Policy Updated', user: 'admin@company.com', timestamp: '2025-01-20T14:30:00Z', details: 'Updated Data Retention Policy' },
  { id: '2', action: 'Bias Scan Completed', user: 'system', timestamp: '2025-01-20T12:00:00Z', details: 'Weekly automated scan' },
  { id: '3', action: 'Access Revoked', user: 'admin@company.com', timestamp: '2025-01-19T16:45:00Z', details: 'Removed API access for deprecated key' },
  { id: '4', action: 'New Policy Created', user: 'admin@company.com', timestamp: '2025-01-18T10:00:00Z', details: 'Created AI Usage Limits policy' },
  { id: '5', action: 'User Access Granted', user: 'admin@company.com', timestamp: '2025-01-17T09:30:00Z', details: 'Added new team member access' },
];

export function AIGovernanceTab() {
  const [scanning, setScanning] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');

  const handleRunBiasScan = async () => {
    setScanning(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setScanning(false);
    toast.success('Bias scan completed successfully');
  };

  const handleExportReport = () => {
    toast.success('Governance report exported');
  };

  const totalTokens = mockUsageLogs.reduce((sum, log) => sum + log.tokens, 0);
  const avgCompliance = mockPolicies.reduce((sum, p) => sum + p.compliance, 0) / mockPolicies.length;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Policy Compliance</p>
                <p className="text-3xl font-bold">{avgCompliance.toFixed(0)}%</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <Progress value={avgCompliance} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Policies</p>
                <p className="text-3xl font-bold">{mockPolicies.length}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">All policies enforced</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">AI Interactions</p>
                <p className="text-3xl font-bold">{mockUsageLogs.length}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Activity className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">{totalTokens.toLocaleString()} tokens used</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Bias Score</p>
                <p className="text-3xl font-bold">{mockBiasScans[0]?.overall_score || 0}%</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                <Scale className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Last scan: {mockBiasScans[0]?.scan_date}</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-muted/50">
          <TabsTrigger value="overview" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Usage Analytics
          </TabsTrigger>
          <TabsTrigger value="policies" className="gap-2">
            <FileText className="h-4 w-4" />
            Policies
          </TabsTrigger>
          <TabsTrigger value="bias" className="gap-2">
            <Scale className="h-4 w-4" />
            Bias Monitor
          </TabsTrigger>
          <TabsTrigger value="audit" className="gap-2">
            <Eye className="h-4 w-4" />
            Audit Log
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Usage by Agent */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-purple-500" />
                  AI Usage by Agent
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Claude', 'GPT-4', 'Gemini'].map((agent) => {
                    const agentLogs = mockUsageLogs.filter(l => l.agent_name === agent);
                    const agentTokens = agentLogs.reduce((sum, l) => sum + l.tokens, 0);
                    const percentage = totalTokens > 0 ? (agentTokens / totalTokens) * 100 : 0;
                    return (
                      <div key={agent} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{agent}</span>
                          <span className="text-sm text-muted-foreground">{agentTokens.toLocaleString()} tokens ({percentage.toFixed(0)}%)</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  Recent AI Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockUsageLogs.slice(0, 5).map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <Badge variant={log.status === 'success' ? 'default' : 'secondary'}>
                          {log.agent_name}
                        </Badge>
                        <div>
                          <p className="text-sm font-medium">{log.action}</p>
                          <p className="text-xs text-muted-foreground">{log.user}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{log.tokens.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">tokens</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="policies" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Active Governance Policies</CardTitle>
                <CardDescription>Manage AI usage policies and compliance requirements</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Settings className="h-4 w-4" />
                Configure
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockPolicies.map((policy) => (
                  <div key={policy.id} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                    <div className="flex items-center gap-4">
                      <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                        policy.category === 'Data' ? 'bg-blue-100 dark:bg-blue-900/30' :
                        policy.category === 'Usage' ? 'bg-green-100 dark:bg-green-900/30' :
                        policy.category === 'Privacy' ? 'bg-purple-100 dark:bg-purple-900/30' :
                        policy.category === 'Security' ? 'bg-red-100 dark:bg-red-900/30' :
                        'bg-orange-100 dark:bg-orange-900/30'
                      }`}>
                        {policy.category === 'Data' && <Database className="h-5 w-5 text-blue-600" />}
                        {policy.category === 'Usage' && <Activity className="h-5 w-5 text-green-600" />}
                        {policy.category === 'Privacy' && <Lock className="h-5 w-5 text-purple-600" />}
                        {policy.category === 'Security' && <Shield className="h-5 w-5 text-red-600" />}
                        {policy.category === 'Compliance' && <FileText className="h-5 w-5 text-orange-600" />}
                      </div>
                      <div>
                        <p className="font-medium">{policy.name}</p>
                        <p className="text-sm text-muted-foreground">Last updated: {policy.lastUpdated}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{policy.compliance}%</p>
                        <p className="text-xs text-muted-foreground">Compliance</p>
                      </div>
                      <Badge variant={policy.status === 'active' ? 'default' : 'secondary'}>
                        {policy.status}
                      </Badge>
                      <Switch checked={policy.status === 'active'} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bias" className="mt-6">
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Bias Monitoring</CardTitle>
                  <CardDescription>Analyze AI outputs for potential bias and fairness issues</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleExportReport} className="gap-2">
                    <Download className="h-4 w-4" />
                    Export Report
                  </Button>
                  <Button size="sm" onClick={handleRunBiasScan} disabled={scanning} className="gap-2">
                    {scanning ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                    Run Scan
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="p-4 rounded-lg bg-muted/50 text-center">
                    <p className="text-2xl font-bold text-green-600">{mockBiasScans[0]?.gender_bias}%</p>
                    <p className="text-sm text-muted-foreground">Gender Fairness</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50 text-center">
                    <p className="text-2xl font-bold text-blue-600">{mockBiasScans[0]?.racial_bias}%</p>
                    <p className="text-sm text-muted-foreground">Racial Fairness</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50 text-center">
                    <p className="text-2xl font-bold text-orange-600">{mockBiasScans[0]?.age_bias}%</p>
                    <p className="text-sm text-muted-foreground">Age Fairness</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50 text-center">
                    <p className="text-2xl font-bold text-purple-600">{mockBiasScans[0]?.overall_score}%</p>
                    <p className="text-sm text-muted-foreground">Overall Score</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Scan History</h4>
                  {mockBiasScans.map((scan) => (
                    <div key={scan.id} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                      <div className="flex items-center gap-4">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          scan.overall_score >= 90 ? 'bg-green-100 dark:bg-green-900/30' : 'bg-orange-100 dark:bg-orange-900/30'
                        }`}>
                          {scan.overall_score >= 90 ? 
                            <CheckCircle className="h-5 w-5 text-green-600" /> : 
                            <AlertTriangle className="h-5 w-5 text-orange-600" />
                          }
                        </div>
                        <div>
                          <p className="font-medium">{scan.agent} - {scan.scan_date}</p>
                          <p className="text-sm text-muted-foreground">
                            {scan.recommendations.length} recommendations
                          </p>
                        </div>
                      </div>
                      <Badge variant={scan.overall_score >= 90 ? 'default' : 'secondary'}>
                        Score: {scan.overall_score}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audit" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-blue-500" />
                Audit Trail
              </CardTitle>
              <CardDescription>Complete history of governance actions and system events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockAuditLog.map((entry) => (
                  <div key={entry.id} className="flex items-start gap-4 p-4 rounded-lg border bg-card">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      entry.action.includes('Created') || entry.action.includes('Granted') ? 'bg-green-100 dark:bg-green-900/30' :
                      entry.action.includes('Revoked') ? 'bg-red-100 dark:bg-red-900/30' :
                      'bg-blue-100 dark:bg-blue-900/30'
                    }`}>
                      {entry.action.includes('Created') || entry.action.includes('Granted') ? 
                        <CheckCircle className="h-4 w-4 text-green-600" /> :
                        entry.action.includes('Revoked') ? 
                        <XCircle className="h-4 w-4 text-red-600" /> :
                        <Activity className="h-4 w-4 text-blue-600" />
                      }
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{entry.action}</p>
                        <span className="text-xs text-muted-foreground">
                          {new Date(entry.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{entry.details}</p>
                      <p className="text-xs text-muted-foreground mt-1">By: {entry.user}</p>
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
