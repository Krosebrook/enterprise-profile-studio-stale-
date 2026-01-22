import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  LayoutDashboard, Plus, Trash2, GripVertical, Save, Settings,
  Layers, Users, TrendingUp, Shield, PieChart, BarChart3, LineChart, List
} from 'lucide-react';
import { useDashboardConfig, type DashboardWidget } from '@/hooks/useDashboardConfig';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const widgetTypes = [
  { type: 'metric', label: 'Metric Card', icon: Layers },
  { type: 'chart', label: 'Chart', icon: BarChart3 },
  { type: 'list', label: 'List', icon: List },
  { type: 'table', label: 'Table', icon: LayoutDashboard },
];

const metricOptions = [
  { key: 'totalPlatforms', label: 'Total Platforms', icon: 'Layers' },
  { key: 'activeUsers', label: 'Active Users', icon: 'Users' },
  { key: 'roiScore', label: 'ROI Score', icon: 'TrendingUp' },
  { key: 'riskLevel', label: 'Risk Level', icon: 'Shield' },
  { key: 'adoptionRate', label: 'Adoption Rate', icon: 'TrendingUp' },
  { key: 'costSavings', label: 'Cost Savings', icon: 'TrendingUp' },
];

const chartOptions = [
  { key: 'adoption', label: 'Adoption Trend', chartType: 'line' },
  { key: 'categories', label: 'Usage by Category', chartType: 'pie' },
  { key: 'usage', label: 'Daily Usage', chartType: 'bar' },
  { key: 'performance', label: 'Performance Metrics', chartType: 'line' },
];

// Mock data for preview
const mockMetricData: Record<string, { value: string | number; trend?: string }> = {
  totalPlatforms: { value: 50, trend: '+5' },
  activeUsers: { value: 125, trend: '+12' },
  roiScore: { value: '85%', trend: '+3%' },
  riskLevel: { value: 'Low', trend: 'Stable' },
  adoptionRate: { value: '78%', trend: '+8%' },
  costSavings: { value: '$45K', trend: '+$5K' },
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Layers,
  Users,
  TrendingUp,
  Shield,
  PieChart,
  BarChart3,
  LineChart,
  List,
};

export function DashboardBuilderTab() {
  const { user } = useAuth();
  const { 
    configs, 
    activeConfig, 
    loading, 
    defaultWidgets,
    setActiveConfig,
    createConfig, 
    updateWidgets, 
    addWidget, 
    removeWidget 
  } = useDashboardConfig();

  const [isAddingWidget, setIsAddingWidget] = useState(false);
  const [newWidgetType, setNewWidgetType] = useState<string>('metric');
  const [newWidgetConfig, setNewWidgetConfig] = useState<Record<string, string>>({});
  const [dashboardName, setDashboardName] = useState('');
  const [isCreatingDashboard, setIsCreatingDashboard] = useState(false);
  const [draggedWidget, setDraggedWidget] = useState<string | null>(null);

  const handleCreateDashboard = async () => {
    if (!dashboardName.trim()) {
      toast.error('Please enter a dashboard name');
      return;
    }
    await createConfig(dashboardName);
    setDashboardName('');
    setIsCreatingDashboard(false);
  };

  const handleAddWidget = async () => {
    const widgetTitle = newWidgetConfig.title || 
      (newWidgetType === 'metric' ? metricOptions.find(m => m.key === newWidgetConfig.metricKey)?.label : 
       chartOptions.find(c => c.key === newWidgetConfig.dataKey)?.label) || 
      'New Widget';

    const newWidget: Omit<DashboardWidget, 'id'> = {
      type: newWidgetType as DashboardWidget['type'],
      title: widgetTitle,
      x: 0,
      y: activeConfig?.widgets.length ? Math.max(...activeConfig.widgets.map(w => w.y + w.h)) : 0,
      w: newWidgetType === 'metric' ? 3 : 6,
      h: newWidgetType === 'metric' ? 2 : 4,
      config: newWidgetConfig
    };

    await addWidget(newWidget);
    setIsAddingWidget(false);
    setNewWidgetConfig({});
  };

  const handleRemoveWidget = async (widgetId: string) => {
    await removeWidget(widgetId);
  };

  const handleDragStart = (widgetId: string) => {
    setDraggedWidget(widgetId);
  };

  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (draggedWidget && draggedWidget !== targetId && activeConfig) {
      const widgets = [...activeConfig.widgets];
      const draggedIndex = widgets.findIndex(w => w.id === draggedWidget);
      const targetIndex = widgets.findIndex(w => w.id === targetId);
      
      if (draggedIndex !== -1 && targetIndex !== -1) {
        const [draggedItem] = widgets.splice(draggedIndex, 1);
        widgets.splice(targetIndex, 0, draggedItem);
        // Update positions
        widgets.forEach((w, i) => {
          w.y = Math.floor(i / 4) * (w.h);
          w.x = (i % 4) * 3;
        });
      }
    }
  };

  const handleDragEnd = async () => {
    if (draggedWidget && activeConfig) {
      await updateWidgets(activeConfig.widgets);
    }
    setDraggedWidget(null);
  };

  const renderWidget = (widget: DashboardWidget) => {
    const IconComponent = iconMap[widget.config.icon as string] || Layers;
    const metricData = mockMetricData[widget.config.metricKey as string];

    return (
      <Card 
        key={widget.id}
        className={`relative group cursor-move transition-all ${
          draggedWidget === widget.id ? 'opacity-50 scale-95' : ''
        }`}
        draggable
        onDragStart={() => handleDragStart(widget.id)}
        onDragOver={(e) => handleDragOver(e, widget.id)}
        onDragEnd={handleDragEnd}
      >
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => handleRemoveWidget(widget.id)}
          >
            <Trash2 className="h-3 w-3 text-destructive" />
          </Button>
          <div className="cursor-grab">
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        <CardContent className="pt-4">
          {widget.type === 'metric' && (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{widget.title}</p>
                <p className="text-2xl font-bold">{metricData?.value || '—'}</p>
                {metricData?.trend && (
                  <p className="text-xs text-green-600">{metricData.trend}</p>
                )}
              </div>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <IconComponent className="h-5 w-5 text-primary" />
              </div>
            </div>
          )}

          {widget.type === 'chart' && (
            <div className="space-y-2">
              <p className="text-sm font-medium">{widget.title}</p>
              <div className="h-32 bg-muted/50 rounded-lg flex items-center justify-center">
                {widget.config.chartType === 'pie' && <PieChart className="h-12 w-12 text-muted-foreground" />}
                {widget.config.chartType === 'bar' && <BarChart3 className="h-12 w-12 text-muted-foreground" />}
                {widget.config.chartType === 'line' && <LineChart className="h-12 w-12 text-muted-foreground" />}
                <span className="ml-2 text-sm text-muted-foreground">Chart Preview</span>
              </div>
            </div>
          )}

          {(widget.type === 'list' || widget.type === 'table') && (
            <div className="space-y-2">
              <p className="text-sm font-medium">{widget.title}</p>
              <div className="space-y-1">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-6 bg-muted/50 rounded animate-pulse" />
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  if (!user) {
    return (
      <Card className="p-12 text-center">
        <LayoutDashboard className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">Sign In Required</h3>
        <p className="text-muted-foreground">
          Please sign in to create and manage custom dashboards.
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
            <LayoutDashboard className="h-7 w-7 text-primary" />
            Dashboard Builder
          </h2>
          <p className="text-muted-foreground mt-1">
            Create personalized analytics views with drag-and-drop widgets
          </p>
        </div>

        <div className="flex items-center gap-2">
          {configs.length > 0 && (
            <Select
              value={activeConfig?.id}
              onValueChange={(id) => {
                const config = configs.find(c => c.id === id);
                if (config) setActiveConfig(config);
              }}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select dashboard" />
              </SelectTrigger>
              <SelectContent>
                {configs.map(config => (
                  <SelectItem key={config.id} value={config.id}>
                    {config.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          <Dialog open={isCreatingDashboard} onOpenChange={setIsCreatingDashboard}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                New Dashboard
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Dashboard</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <Input
                  placeholder="Dashboard name..."
                  value={dashboardName}
                  onChange={(e) => setDashboardName(e.target.value)}
                />
                <Button className="w-full" onClick={handleCreateDashboard}>
                  Create Dashboard
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Widget Grid */}
      {activeConfig ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{activeConfig.name}</h3>
            <Dialog open={isAddingWidget} onOpenChange={setIsAddingWidget}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Widget
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Widget</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div>
                    <label className="text-sm font-medium">Widget Type</label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {widgetTypes.map(wt => (
                        <Button
                          key={wt.type}
                          variant={newWidgetType === wt.type ? 'default' : 'outline'}
                          className="justify-start gap-2"
                          onClick={() => {
                            setNewWidgetType(wt.type);
                            setNewWidgetConfig({});
                          }}
                        >
                          <wt.icon className="h-4 w-4" />
                          {wt.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {newWidgetType === 'metric' && (
                    <div>
                      <label className="text-sm font-medium">Metric</label>
                      <Select
                        value={newWidgetConfig.metricKey}
                        onValueChange={(value) => {
                          const metric = metricOptions.find(m => m.key === value);
                          setNewWidgetConfig({ 
                            metricKey: value, 
                            icon: metric?.icon || 'Layers' 
                          });
                        }}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select metric..." />
                        </SelectTrigger>
                        <SelectContent>
                          {metricOptions.map(m => (
                            <SelectItem key={m.key} value={m.key}>{m.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {newWidgetType === 'chart' && (
                    <div>
                      <label className="text-sm font-medium">Chart</label>
                      <Select
                        value={newWidgetConfig.dataKey}
                        onValueChange={(value) => {
                          const chart = chartOptions.find(c => c.key === value);
                          setNewWidgetConfig({ 
                            dataKey: value, 
                            chartType: chart?.chartType || 'line' 
                          });
                        }}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select chart..." />
                        </SelectTrigger>
                        <SelectContent>
                          {chartOptions.map(c => (
                            <SelectItem key={c.key} value={c.key}>{c.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <Button 
                    className="w-full" 
                    onClick={handleAddWidget}
                    disabled={!newWidgetConfig.metricKey && !newWidgetConfig.dataKey && newWidgetType !== 'list' && newWidgetType !== 'table'}
                  >
                    Add Widget
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {activeConfig.widgets.map(widget => renderWidget(widget))}
          </div>

          {activeConfig.widgets.length === 0 && (
            <Card className="p-12 text-center border-dashed">
              <Plus className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Widgets Yet</h3>
              <p className="text-muted-foreground mb-4">
                Click "Add Widget" to start building your dashboard
              </p>
              <Button onClick={() => setIsAddingWidget(true)}>
                Add Your First Widget
              </Button>
            </Card>
          )}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <LayoutDashboard className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Dashboards Yet</h3>
          <p className="text-muted-foreground mb-4">
            Create your first custom dashboard to get started
          </p>
          <Button onClick={() => setIsCreatingDashboard(true)}>
            Create Dashboard
          </Button>
        </Card>
      )}
    </div>
  );
}
