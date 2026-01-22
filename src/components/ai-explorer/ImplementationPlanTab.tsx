import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  FileText, Users, GitBranch, CheckCircle, AlertTriangle, 
  Database, Layout, Zap, Calendar, Star, Download,
  BarChart3, TrendingUp, Clock, MessageSquare,
  Target, Layers, Bot, ChevronDown, ChevronRight,
  Server, Shield, Code, Palette
} from 'lucide-react';
import { toast } from 'sonner';

interface Feature {
  name: string;
  summary: string;
  ux: string[];
  backend: string[];
  dependencies: string[];
  risks: { level: string; text: string }[];
  status: 'planned' | 'in-progress' | 'completed';
  progress: number;
}

interface Area {
  title: string;
  icon: React.ElementType;
  color: string;
  features: Feature[];
}

const implementationAreas: Record<string, Area> = {
  reporting: {
    title: 'AI Reporting Engine Enhancements',
    icon: FileText,
    color: 'text-orange-500',
    features: [
      {
        name: 'Rich Data Visualizations',
        summary: 'Interactive charts and graphs within reports using Recharts library with drill-down capabilities.',
        ux: [
          'Chart type selector (bar, line, area, pie, radar)',
          'Hover tooltips with detailed data points',
          'Click-to-drill-down for hierarchical data',
          'Responsive design for mobile viewing',
          'Full-screen mode for presentations'
        ],
        backend: [
          'Data aggregation endpoints for chart-ready formats',
          'Caching layer for frequently accessed visualizations',
          'Real-time data streaming for live dashboards'
        ],
        dependencies: ['Recharts library', 'Data transformation utilities'],
        risks: [
          { level: 'medium', text: 'Performance with large datasets - implement pagination' },
          { level: 'low', text: 'Browser compatibility - test across major browsers' }
        ],
        status: 'in-progress',
        progress: 65
      },
      {
        name: 'Report Scheduling UI',
        summary: 'Enable users to schedule recurring reports with flexible time-based triggers.',
        ux: [
          'Visual calendar picker for schedule selection',
          'Frequency options: daily, weekly, monthly, quarterly',
          'Time zone aware scheduling',
          'Email notification preferences',
          'Preview next 5 scheduled runs'
        ],
        backend: [
          'Background job processor for scheduled execution',
          'Email delivery integration',
          'Webhook notifications for external systems'
        ],
        dependencies: ['Cron job scheduler', 'Email service'],
        risks: [
          { level: 'low', text: 'Time zone handling complexity' }
        ],
        status: 'planned',
        progress: 0
      }
    ]
  },
  collaboration: {
    title: 'Collaboration Features',
    icon: Users,
    color: 'text-blue-500',
    features: [
      {
        name: 'Real-time Comments',
        summary: 'Add inline comments to assessments and reports with @mentions and threading.',
        ux: [
          'Inline comment markers on content',
          '@mention autocomplete for team members',
          'Threaded reply system',
          'Notification badges for unread comments',
          'Comment resolution workflow'
        ],
        backend: [
          'WebSocket for real-time updates',
          'Comment storage with threading support',
          'Notification service integration'
        ],
        dependencies: ['WebSocket infrastructure', 'Notification system'],
        risks: [
          { level: 'medium', text: 'Real-time sync complexity' }
        ],
        status: 'planned',
        progress: 0
      },
      {
        name: 'Shared Workspaces',
        summary: 'Team workspaces for collaborative assessment and planning.',
        ux: [
          'Workspace creation wizard',
          'Role-based access control',
          'Shared dashboard customization',
          'Activity feed for workspace updates'
        ],
        backend: [
          'Multi-tenancy support',
          'Permission management system',
          'Activity logging'
        ],
        dependencies: ['RBAC system', 'Activity tracking'],
        risks: [
          { level: 'high', text: 'Data isolation between workspaces' }
        ],
        status: 'planned',
        progress: 0
      }
    ]
  },
  analytics: {
    title: 'Advanced Analytics',
    icon: BarChart3,
    color: 'text-green-500',
    features: [
      {
        name: 'Predictive Insights',
        summary: 'AI-powered predictions for adoption success and ROI forecasting.',
        ux: [
          'Confidence score displays',
          'Trend projection charts',
          'What-if scenario modeling',
          'Recommendation cards with actions'
        ],
        backend: [
          'ML model integration for predictions',
          'Historical data analysis pipeline',
          'Model training and versioning'
        ],
        dependencies: ['ML infrastructure', 'Historical data store'],
        risks: [
          { level: 'high', text: 'Model accuracy validation required' },
          { level: 'medium', text: 'Data quality dependencies' }
        ],
        status: 'in-progress',
        progress: 30
      },
      {
        name: 'Custom Dashboards',
        summary: 'Drag-and-drop dashboard builder with widget library.',
        ux: [
          'Widget palette with categories',
          'Drag-and-drop placement',
          'Resize and reposition widgets',
          'Save and share dashboard layouts'
        ],
        backend: [
          'Dashboard configuration storage',
          'Widget data fetching optimization'
        ],
        dependencies: ['Grid layout library', 'Widget components'],
        risks: [
          { level: 'low', text: 'Performance with many widgets' }
        ],
        status: 'completed',
        progress: 100
      }
    ]
  },
  governance: {
    title: 'AI Governance Tools',
    icon: Shield,
    color: 'text-purple-500',
    features: [
      {
        name: 'Policy Enforcement',
        summary: 'Automated policy checks and compliance monitoring.',
        ux: [
          'Policy rule builder interface',
          'Compliance dashboard',
          'Violation alerts and notifications',
          'Remediation workflow'
        ],
        backend: [
          'Policy engine for rule evaluation',
          'Continuous monitoring service',
          'Alert notification system'
        ],
        dependencies: ['Policy engine', 'Monitoring infrastructure'],
        risks: [
          { level: 'medium', text: 'Complex rule evaluation performance' }
        ],
        status: 'in-progress',
        progress: 45
      },
      {
        name: 'Audit Trail',
        summary: 'Comprehensive logging of all AI interactions and decisions.',
        ux: [
          'Searchable audit log viewer',
          'Export to CSV/PDF',
          'Filter by user, action, date range',
          'Detailed event drill-down'
        ],
        backend: [
          'High-volume log ingestion',
          'Log retention policies',
          'Search indexing'
        ],
        dependencies: ['Log storage infrastructure'],
        risks: [
          { level: 'low', text: 'Storage costs for high-volume logging' }
        ],
        status: 'completed',
        progress: 100
      }
    ]
  }
};

export function ImplementationPlanTab() {
  const [activeArea, setActiveArea] = useState('reporting');
  const [expandedFeatures, setExpandedFeatures] = useState<string[]>([]);

  const toggleFeature = (name: string) => {
    setExpandedFeatures(prev => 
      prev.includes(name) ? prev.filter(f => f !== name) : [...prev, name]
    );
  };

  const handleExport = () => {
    toast.success('Implementation plan exported');
  };

  const totalFeatures = Object.values(implementationAreas).reduce((sum, area) => sum + area.features.length, 0);
  const completedFeatures = Object.values(implementationAreas).reduce(
    (sum, area) => sum + area.features.filter(f => f.status === 'completed').length, 0
  );
  const inProgressFeatures = Object.values(implementationAreas).reduce(
    (sum, area) => sum + area.features.filter(f => f.status === 'in-progress').length, 0
  );

  const overallProgress = totalFeatures > 0 
    ? Math.round((completedFeatures * 100 + inProgressFeatures * 50) / totalFeatures)
    : 0;

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overall Progress</p>
                <p className="text-3xl font-bold">{overallProgress}%</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
            </div>
            <Progress value={overallProgress} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Features</p>
                <p className="text-3xl font-bold">{totalFeatures}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Layers className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Across {Object.keys(implementationAreas).length} areas</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-3xl font-bold text-green-600">{completedFeatures}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Features shipped</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-3xl font-bold text-orange-600">{inProgressFeatures}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Currently building</p>
          </CardContent>
        </Card>
      </div>

      {/* Area Tabs */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Implementation Areas</CardTitle>
            <CardDescription>Detailed feature specifications and progress tracking</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={handleExport} className="gap-2">
            <Download className="h-4 w-4" />
            Export Plan
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs value={activeArea} onValueChange={setActiveArea}>
            <TabsList className="flex flex-wrap h-auto gap-1 bg-muted/50">
              {Object.entries(implementationAreas).map(([key, area]) => {
                const Icon = area.icon;
                return (
                  <TabsTrigger key={key} value={key} className="gap-2">
                    <Icon className={`h-4 w-4 ${area.color}`} />
                    <span className="hidden sm:inline">{area.title.split(' ')[0]}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {Object.entries(implementationAreas).map(([key, area]) => (
              <TabsContent key={key} value={key} className="mt-6 space-y-4">
                {area.features.map((feature) => (
                  <Collapsible 
                    key={feature.name}
                    open={expandedFeatures.includes(feature.name)}
                    onOpenChange={() => toggleFeature(feature.name)}
                  >
                    <Card>
                      <CollapsibleTrigger className="w-full">
                        <CardHeader className="flex flex-row items-center justify-between py-4">
                          <div className="flex items-center gap-4">
                            <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                              feature.status === 'completed' ? 'bg-green-100 dark:bg-green-900/30' :
                              feature.status === 'in-progress' ? 'bg-orange-100 dark:bg-orange-900/30' :
                              'bg-muted'
                            }`}>
                              {feature.status === 'completed' ? 
                                <CheckCircle className="h-5 w-5 text-green-600" /> :
                                feature.status === 'in-progress' ?
                                <Clock className="h-5 w-5 text-orange-600" /> :
                                <Calendar className="h-5 w-5 text-muted-foreground" />
                              }
                            </div>
                            <div className="text-left">
                              <p className="font-medium">{feature.name}</p>
                              <p className="text-sm text-muted-foreground">{feature.summary}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="w-32 hidden md:block">
                              <Progress value={feature.progress} className="h-2" />
                              <p className="text-xs text-muted-foreground mt-1">{feature.progress}% complete</p>
                            </div>
                            <Badge variant={
                              feature.status === 'completed' ? 'default' :
                              feature.status === 'in-progress' ? 'secondary' : 'outline'
                            }>
                              {feature.status}
                            </Badge>
                            {expandedFeatures.includes(feature.name) ? 
                              <ChevronDown className="h-5 w-5" /> : 
                              <ChevronRight className="h-5 w-5" />
                            }
                          </div>
                        </CardHeader>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <CardContent className="pt-0 pb-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* UX Requirements */}
                            <div>
                              <h4 className="font-medium mb-3 flex items-center gap-2">
                                <Palette className="h-4 w-4 text-purple-500" />
                                UX Requirements
                              </h4>
                              <ul className="space-y-2">
                                {feature.ux.map((item, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-sm">
                                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Backend Requirements */}
                            <div>
                              <h4 className="font-medium mb-3 flex items-center gap-2">
                                <Server className="h-4 w-4 text-blue-500" />
                                Backend Requirements
                              </h4>
                              <ul className="space-y-2">
                                {feature.backend.map((item, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-sm">
                                    <Code className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Dependencies */}
                            <div>
                              <h4 className="font-medium mb-3 flex items-center gap-2">
                                <GitBranch className="h-4 w-4 text-green-500" />
                                Dependencies
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {feature.dependencies.map((dep, idx) => (
                                  <Badge key={idx} variant="outline">{dep}</Badge>
                                ))}
                              </div>
                            </div>

                            {/* Risks */}
                            <div>
                              <h4 className="font-medium mb-3 flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4 text-orange-500" />
                                Risks
                              </h4>
                              <div className="space-y-2">
                                {feature.risks.map((risk, idx) => (
                                  <div key={idx} className="flex items-start gap-2 text-sm">
                                    <Badge variant={
                                      risk.level === 'high' ? 'destructive' :
                                      risk.level === 'medium' ? 'secondary' : 'outline'
                                    } className="text-xs flex-shrink-0">
                                      {risk.level}
                                    </Badge>
                                    <span>{risk.text}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </CollapsibleContent>
                    </Card>
                  </Collapsible>
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
