import { motion } from 'framer-motion';
import { TrendingUp, Clock, CheckCircle2, Zap, Activity, Shield } from 'lucide-react';

const metrics = [
  { label: 'Tasks Completed', value: '2,847', change: '+12%', icon: CheckCircle2, color: 'text-success' },
  { label: 'Avg Response Time', value: '1.2s', change: '-23%', icon: Clock, color: 'text-cyan-accent' },
  { label: 'Agent Efficiency', value: '94.7%', change: '+5%', icon: TrendingUp, color: 'text-purple-accent' },
  { label: 'Active Workflows', value: '18', change: '+3', icon: Activity, color: 'text-primary' },
  { label: 'System Health', value: '99.9%', change: 'stable', icon: Shield, color: 'text-success' },
];

export function SymphonyMetricsBar() {
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
