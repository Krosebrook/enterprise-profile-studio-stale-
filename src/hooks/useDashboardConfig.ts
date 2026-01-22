import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface DashboardWidget {
  id: string;
  type: 'metric' | 'chart' | 'table' | 'list' | 'custom';
  title: string;
  x: number;
  y: number;
  w: number;
  h: number;
  config: Record<string, unknown>;
}

export interface DashboardConfig {
  id: string;
  user_id: string;
  name: string;
  widgets: DashboardWidget[];
  layout: Record<string, unknown>;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

const defaultWidgets: DashboardWidget[] = [
  {
    id: 'widget-1',
    type: 'metric',
    title: 'Total Platforms',
    x: 0,
    y: 0,
    w: 3,
    h: 2,
    config: { metricKey: 'totalPlatforms', icon: 'Layers' }
  },
  {
    id: 'widget-2',
    type: 'metric',
    title: 'Active Users',
    x: 3,
    y: 0,
    w: 3,
    h: 2,
    config: { metricKey: 'activeUsers', icon: 'Users' }
  },
  {
    id: 'widget-3',
    type: 'metric',
    title: 'ROI Score',
    x: 6,
    y: 0,
    w: 3,
    h: 2,
    config: { metricKey: 'roiScore', icon: 'TrendingUp' }
  },
  {
    id: 'widget-4',
    type: 'metric',
    title: 'Risk Level',
    x: 9,
    y: 0,
    w: 3,
    h: 2,
    config: { metricKey: 'riskLevel', icon: 'Shield' }
  },
  {
    id: 'widget-5',
    type: 'chart',
    title: 'Platform Adoption Trend',
    x: 0,
    y: 2,
    w: 6,
    h: 4,
    config: { chartType: 'line', dataKey: 'adoption' }
  },
  {
    id: 'widget-6',
    type: 'chart',
    title: 'Usage by Category',
    x: 6,
    y: 2,
    w: 6,
    h: 4,
    config: { chartType: 'pie', dataKey: 'categories' }
  },
];

export function useDashboardConfig() {
  const { user } = useAuth();
  const [configs, setConfigs] = useState<DashboardConfig[]>([]);
  const [activeConfig, setActiveConfig] = useState<DashboardConfig | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user's dashboard configurations
  const fetchConfigs = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('user_dashboard_configs')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching dashboard configs:', error);
    } else {
      const typedConfigs = (data || []).map(config => ({
        ...config,
        widgets: (config.widgets as unknown as DashboardWidget[]) || [],
        layout: (config.layout as Record<string, unknown>) || {}
      })) as DashboardConfig[];
      
      setConfigs(typedConfigs);
      
      // Set default or first config as active
      const defaultConfig = typedConfigs.find(c => c.is_default) || typedConfigs[0];
      if (defaultConfig) {
        setActiveConfig(defaultConfig);
      }
    }
    setLoading(false);
  };

  // Create a new dashboard configuration
  const createConfig = async (name: string, widgets?: DashboardWidget[]) => {
    if (!user) {
      toast.error('Please log in to create a dashboard');
      return null;
    }

    const { data, error } = await supabase
      .from('user_dashboard_configs')
      .insert([{
        user_id: user.id,
        name,
        widgets: JSON.parse(JSON.stringify(widgets || defaultWidgets)),
        layout: {},
        is_default: configs.length === 0
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating dashboard config:', error);
      toast.error('Failed to create dashboard');
      return null;
    }

    const typedConfig: DashboardConfig = {
      ...data,
      widgets: (data.widgets as unknown as DashboardWidget[]) || [],
      layout: (data.layout as Record<string, unknown>) || {}
    };

    toast.success('Dashboard created!');
    await fetchConfigs();
    return typedConfig;
  };

  // Update a dashboard configuration
  const updateConfig = async (configId: string, updates: Partial<DashboardConfig>) => {
    const updateData: Record<string, unknown> = {};
    if (updates.name) updateData.name = updates.name;
    if (updates.widgets) updateData.widgets = updates.widgets as unknown as Record<string, unknown>;
    if (updates.layout) updateData.layout = updates.layout;
    if (typeof updates.is_default === 'boolean') updateData.is_default = updates.is_default;

    const { error } = await supabase
      .from('user_dashboard_configs')
      .update(updateData)
      .eq('id', configId);

    if (error) {
      console.error('Error updating dashboard config:', error);
      toast.error('Failed to update dashboard');
      return false;
    }

    toast.success('Dashboard updated!');
    await fetchConfigs();
    return true;
  };

  // Delete a dashboard configuration
  const deleteConfig = async (configId: string) => {
    const { error } = await supabase
      .from('user_dashboard_configs')
      .delete()
      .eq('id', configId);

    if (error) {
      console.error('Error deleting dashboard config:', error);
      toast.error('Failed to delete dashboard');
      return false;
    }

    toast.success('Dashboard deleted!');
    await fetchConfigs();
    return true;
  };

  // Update widget positions
  const updateWidgets = async (widgets: DashboardWidget[]) => {
    if (!activeConfig) return false;
    return updateConfig(activeConfig.id, { widgets });
  };

  // Add a new widget
  const addWidget = async (widget: Omit<DashboardWidget, 'id'>) => {
    if (!activeConfig) return false;
    
    const newWidget: DashboardWidget = {
      ...widget,
      id: `widget-${Date.now()}`
    };
    
    const updatedWidgets = [...activeConfig.widgets, newWidget];
    return updateConfig(activeConfig.id, { widgets: updatedWidgets });
  };

  // Remove a widget
  const removeWidget = async (widgetId: string) => {
    if (!activeConfig) return false;
    
    const updatedWidgets = activeConfig.widgets.filter(w => w.id !== widgetId);
    return updateConfig(activeConfig.id, { widgets: updatedWidgets });
  };

  useEffect(() => {
    fetchConfigs();
  }, [user]);

  return {
    configs,
    activeConfig,
    loading,
    defaultWidgets,
    setActiveConfig,
    createConfig,
    updateConfig,
    deleteConfig,
    updateWidgets,
    addWidget,
    removeWidget,
    refetch: fetchConfigs
  };
}
