import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  Calendar, Clock, Users, DollarSign, TrendingUp, 
  ChevronDown, ChevronRight, CheckCircle2, Circle, AlertCircle,
  Search, Code, BarChart3, TestTube, GraduationCap, Rocket,
  Download, FileSpreadsheet
} from 'lucide-react';
import { 
  roadmapPhases, 
  roadmapTasks, 
  projectMetrics, 
  categoryColors,
  categoryTailwindColors,
  type RoadmapPhase,
  type RoadmapTask 
} from '@/data/implementationRoadmapData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';

const CategoryIcon = ({ category }: { category: string }) => {
  const iconClass = "h-4 w-4";
  switch (category) {
    case 'Research': return <Search className={iconClass} />;
    case 'Development': return <Code className={iconClass} />;
    case 'Analysis': return <BarChart3 className={iconClass} />;
    case 'Testing': return <TestTube className={iconClass} />;
    case 'Enablement': return <GraduationCap className={iconClass} />;
    case 'Launch': return <Rocket className={iconClass} />;
    default: return <Circle className={iconClass} />;
  }
};

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case 'Complete': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    case 'In Progress': return <Clock className="h-4 w-4 text-blue-500" />;
    case 'Blocked': return <AlertCircle className="h-4 w-4 text-red-500" />;
    default: return <Circle className="h-4 w-4 text-muted-foreground" />;
  }
};

// Gantt Chart Component
const GanttChart = () => {
  const chartData = roadmapPhases.map(phase => ({
    name: phase.shortName,
    startWeek: phase.startWeek - 1,
    duration: phase.duration,
    category: phase.category,
    fullName: phase.name,
    hours: phase.totalHours
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          10-Week Implementation Timeline
        </CardTitle>
        <CardDescription>
          November 25, 2025 - February 3, 2026
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={chartData}
              margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
            >
              <XAxis 
                type="number" 
                domain={[0, 10]} 
                tickCount={11}
                tickFormatter={(value) => `Wk ${value + 1}`}
              />
              <YAxis 
                type="category" 
                dataKey="name" 
                width={90}
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-background border rounded-lg p-3 shadow-lg">
                        <p className="font-semibold">{data.fullName}</p>
                        <p className="text-sm text-muted-foreground">
                          Weeks {data.startWeek + 1} - {data.startWeek + data.duration}
                        </p>
                        <p className="text-sm">Duration: {data.duration} weeks</p>
                        <p className="text-sm">Effort: {data.hours} hours</p>
                        <Badge 
                          variant="secondary" 
                          className="mt-1"
                          style={{ backgroundColor: categoryColors[data.category], color: 'white' }}
                        >
                          {data.category}
                        </Badge>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend 
                content={() => (
                  <div className="flex flex-wrap justify-center gap-4 mt-4">
                    {Object.entries(categoryColors).map(([cat, color]) => (
                      <div key={cat} className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded" 
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-sm">{cat}</span>
                      </div>
                    ))}
                  </div>
                )}
              />
              <Bar 
                dataKey="duration" 
                radius={[0, 4, 4, 0]}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={categoryColors[entry.category]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

// Project Metrics Overview
const MetricsOverview = () => (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Calendar className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Timeline</p>
            <p className="text-2xl font-bold">{projectMetrics.totalWeeks} Weeks</p>
          </div>
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10">
            <Clock className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Effort</p>
            <p className="text-2xl font-bold">{projectMetrics.totalHours} Hours</p>
          </div>
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-500/10">
            <Users className="h-5 w-5 text-purple-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Team Size</p>
            <p className="text-2xl font-bold">{projectMetrics.teamSize}</p>
          </div>
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-green-500/10">
            <DollarSign className="h-5 w-5 text-green-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Budget</p>
            <p className="text-2xl font-bold">{projectMetrics.budgetRange}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

// Phase Cards with Tasks
const PhaseCard = ({ phase, tasks }: { phase: RoadmapPhase; tasks: RoadmapTask[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const completedTasks = tasks.filter(t => t.status === 'Complete').length;
  const progress = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;

  return (
    <Card className="overflow-hidden">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: `${categoryColors[phase.category]}20` }}
                >
                  <CategoryIcon category={phase.category} />
                </div>
                <div>
                  <CardTitle className="text-base">{phase.name}</CardTitle>
                  <CardDescription>{phase.description}</CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium">Wk {phase.startWeek}-{phase.endWeek}</p>
                  <p className="text-xs text-muted-foreground">{phase.totalHours}h</p>
                </div>
                <Badge 
                  style={{ backgroundColor: categoryColors[phase.category], color: 'white' }}
                >
                  {phase.category}
                </Badge>
                {isOpen ? (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>{completedTasks} of {tasks.length} tasks complete</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="space-y-4">
              {/* Key Deliverables */}
              <div>
                <h4 className="text-sm font-semibold mb-2">Key Deliverables</h4>
                <ul className="space-y-1">
                  {phase.keyDeliverables.map((deliverable, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      {deliverable}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Team */}
              <div>
                <h4 className="text-sm font-semibold mb-2">Team</h4>
                <div className="flex flex-wrap gap-2">
                  {phase.team.map((member, idx) => (
                    <Badge key={idx} variant="outline">{member}</Badge>
                  ))}
                </div>
              </div>

              {/* Tasks Table */}
              <div>
                <h4 className="text-sm font-semibold mb-2">Tasks</h4>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[40px]">Status</TableHead>
                        <TableHead>Task</TableHead>
                        <TableHead>Owner</TableHead>
                        <TableHead>Week</TableHead>
                        <TableHead className="text-right">Hours</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tasks.map(task => (
                        <TableRow key={task.id}>
                          <TableCell>
                            <StatusIcon status={task.status} />
                          </TableCell>
                          <TableCell className="font-medium">{task.task}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">{task.owner}</Badge>
                          </TableCell>
                          <TableCell>{task.week}</TableCell>
                          <TableCell className="text-right">{task.effortHours}h</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Critical Success Factors */}
              {phase.criticalSuccessFactors && phase.criticalSuccessFactors.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold mb-2">Critical Success Factors</h4>
                  <ul className="space-y-1">
                    {phase.criticalSuccessFactors.map((factor, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

// ROI Summary
const ROISummary = () => (
  <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <TrendingUp className="h-5 w-5" />
        Strategic Value & ROI
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h4 className="font-semibold mb-3">Internal Benefits</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span><strong>20-35%</strong> productivity gains</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span><strong>$50K-$150K</strong> investment</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span><strong>12-month</strong> payback period</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">External Revenue Opportunity</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-500" />
              <span><strong>$125K-$4M</strong> Year 1 (conservative to aggressive)</span>
            </li>
            <li className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-500" />
              <span>Positions INT Inc. against <strong>Big 4</strong> consulting firms</span>
            </li>
            <li className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-purple-500" />
              <span>Capitalizes on <strong>77%</strong> manufacturing AI adoption</span>
            </li>
          </ul>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Export Functionality
const ExportButtons = () => {
  const exportToCSV = () => {
    const headers = ['Phase', 'Week', 'Task', 'Owner', 'Deliverable', 'Status', 'Dependencies', 'Effort_Hours'];
    const rows = roadmapTasks.map(task => {
      const phase = roadmapPhases.find(p => p.id === task.phaseId);
      return [
        phase?.name || '',
        task.week,
        task.task,
        task.owner,
        task.deliverable,
        task.status,
        task.dependencies.join('; '),
        task.effortHours.toString()
      ];
    });
    
    const csvContent = [headers, ...rows].map(row => 
      row.map(cell => `"${cell}"`).join(',')
    ).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'INT_Inc_Implementation_Plan.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportToJSON = () => {
    const data = {
      project: projectMetrics,
      phases: roadmapPhases,
      tasks: roadmapTasks
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'INT_Inc_Implementation_Plan.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" onClick={exportToCSV}>
        <FileSpreadsheet className="h-4 w-4 mr-2" />
        Export CSV
      </Button>
      <Button variant="outline" size="sm" onClick={exportToJSON}>
        <Download className="h-4 w-4 mr-2" />
        Export JSON
      </Button>
    </div>
  );
};

export function ImplementationRoadmapTab() {
  const [activeView, setActiveView] = useState('overview');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">AI Platform Implementation Roadmap</h2>
          <p className="text-muted-foreground">
            Option E: Comprehensive AI Strategy & Operations Platform
          </p>
        </div>
        <ExportButtons />
      </div>

      {/* Metrics Overview */}
      <MetricsOverview />

      {/* Tabs */}
      <Tabs value={activeView} onValueChange={setActiveView}>
        <TabsList>
          <TabsTrigger value="overview">Timeline</TabsTrigger>
          <TabsTrigger value="phases">Phase Details</TabsTrigger>
          <TabsTrigger value="tasks">All Tasks</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <GanttChart />
          <ROISummary />
        </TabsContent>

        <TabsContent value="phases" className="space-y-4">
          {roadmapPhases.map(phase => (
            <PhaseCard 
              key={phase.id} 
              phase={phase} 
              tasks={roadmapTasks.filter(t => t.phaseId === phase.id)}
            />
          ))}
        </TabsContent>

        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <CardTitle>All Implementation Tasks</CardTitle>
              <CardDescription>
                {roadmapTasks.length} tasks across {roadmapPhases.length} phases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40px]">Status</TableHead>
                      <TableHead>Phase</TableHead>
                      <TableHead>Task</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Deliverable</TableHead>
                      <TableHead>Week</TableHead>
                      <TableHead className="text-right">Hours</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roadmapTasks.map(task => {
                      const phase = roadmapPhases.find(p => p.id === task.phaseId);
                      return (
                        <TableRow key={task.id}>
                          <TableCell>
                            <StatusIcon status={task.status} />
                          </TableCell>
                          <TableCell>
                            <Badge 
                              style={{ 
                                backgroundColor: phase ? categoryColors[phase.category] : undefined,
                                color: 'white'
                              }}
                            >
                              {phase?.shortName}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium max-w-[300px]">
                            <span className="line-clamp-2">{task.task}</span>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">{task.owner}</Badge>
                          </TableCell>
                          <TableCell className="max-w-[200px]">
                            <span className="line-clamp-1">{task.deliverable}</span>
                          </TableCell>
                          <TableCell>{task.week}</TableCell>
                          <TableCell className="text-right">{task.effortHours}h</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
