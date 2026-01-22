import { motion } from 'framer-motion';
import { TrendingUp, Clock, CheckCircle2, Activity, Shield, Loader2 } from 'lucide-react';
import type { SymphonyAgent, SymphonyPhase, SymphonyTask } from '@/hooks/useSymphonyData';

interface SymphonyMetricsBarProps {
  agents?: SymphonyAgent[];
  phases?: SymphonyPhase[];
  tasks?: SymphonyTask[];
  isLoading?: boolean;
}

export function SymphonyMetricsBar({ agents = [], phases = [], tasks = [], isLoading = false }: SymphonyMetricsBarProps) {
  // Calculate metrics from real data or use defaults
  const tasksCompleted = phases.reduce((acc, p) => acc + p.tasks_completed, 0) || 2847;
  const activeAgents = agents.filter(a => a.current_status === 'active' || a.current_status === 'busy').length || 18;
  const avgEfficiency = agents.length > 0 
    ? Math.round(agents.reduce((acc, a) => acc + Number(a.efficiency_score), 0) / agents.length * 10) / 10
    : 94.7;
  const avgResponseTime = agents.length > 0 
    ? Math.round(agents.reduce((acc, a) => acc + Number(a.avg_response_time), 0) / agents.length * 10) / 10
    : 1.2;
  const completedPhases = phases.filter(p => p.status === 'complete').length;
  const totalPhases = phases.length || 6;

  const metrics = [
    { label: 'Tasks Completed', value: tasksCompleted.toLocaleString(), change: '+12%', icon: CheckCircle2, color: 'text-success' },
    { label: 'Avg Response Time', value: `${avgResponseTime}s`, change: '-23%', icon: Clock, color: 'text-cyan-accent' },
    { label: 'Agent Efficiency', value: `${avgEfficiency}%`, change: '+5%', icon: TrendingUp, color: 'text-purple-accent' },
    { label: 'Active Agents', value: activeAgents.toString(), change: `${agents.length || 11} total`, icon: Activity, color: 'text-primary' },
    { label: 'Phases Complete', value: `${completedPhases}/${totalPhases}`, change: 'on track', icon: Shield, color: 'text-success' },
  ];

  if (isLoading) {
    return (
      <div className="border-y border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="border-y border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-border/50">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="px-4 py-4 text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-1">
                <metric.icon className={`w-4 h-4 ${metric.color}`} />
                <span className="text-xs text-muted-foreground">{metric.label}</span>
              </div>
              <div className="font-display text-xl font-bold">{metric.value}</div>
              <div className={`text-xs ${metric.change.startsWith('+') ? 'text-success' : metric.change.startsWith('-') ? 'text-cyan-accent' : 'text-muted-foreground'}`}>
                {metric.change}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
