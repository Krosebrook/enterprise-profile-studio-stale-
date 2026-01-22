import { motion } from 'framer-motion';
import { Activity, Clock, CheckCircle2, AlertCircle, Zap, Target, TrendingUp, Bot, Brain, Shield, Settings, Search, BarChart, MessageSquare, Users, FileText } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { SymphonyAgent, SymphonyTask } from '@/hooks/useSymphonyData';

interface AgentDetailModalProps {
  agent: SymphonyAgent | null;
  tasks: SymphonyTask[];
  isOpen: boolean;
  onClose: () => void;
}

const roleStyles: Record<string, string> = {
  'R': 'raci-r',
  'A': 'raci-a',
  'C': 'raci-c',
  'I': 'raci-i',
};

const roleLabels: Record<string, string> = {
  'R': 'Responsible',
  'A': 'Accountable',
  'C': 'Consulted',
  'I': 'Informed',
};

const statusStyles: Record<string, { bg: string; text: string; icon: typeof Activity }> = {
  'idle': { bg: 'bg-muted', text: 'text-muted-foreground', icon: Clock },
  'active': { bg: 'bg-success/10', text: 'text-success', icon: Activity },
  'busy': { bg: 'bg-warning/10', text: 'text-warning', icon: Zap },
  'offline': { bg: 'bg-destructive/10', text: 'text-destructive', icon: AlertCircle },
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Target, Search, Brain, Settings, BarChart, MessageSquare, Shield, Zap, Users, FileText, Bot,
};

const phaseNames = ['', 'Discovery', 'Design', 'Development', 'Delivery', 'Validation', 'Evolution'];

export function AgentDetailModal({ agent, tasks, isOpen, onClose }: AgentDetailModalProps) {
  if (!agent) return null;

  // Get the icon component dynamically
  const IconComponent = iconMap[agent.icon] || Bot;
  const statusConfig = statusStyles[agent.current_status] || statusStyles.idle;
  const StatusIcon = statusConfig.icon;
  
  // Filter tasks for this agent
  const agentTasks = tasks.filter(t => t.agent_id === agent.id);
  const pendingTasks = agentTasks.filter(t => t.status === 'pending' || t.status === 'in-progress');
  const completedTasks = agentTasks.filter(t => t.status === 'complete');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto glass-card-light dark:glass-card">
        <DialogHeader className="pb-4 border-b border-border/50">
          <div className="flex items-start gap-4">
            {/* Agent avatar */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-purple-accent flex items-center justify-center shadow-glow"
            >
              <IconComponent className="w-8 h-8 text-white" />
            </motion.div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <DialogTitle className="font-display text-2xl">{agent.name}</DialogTitle>
                <span className={cn('raci-badge', roleStyles[agent.role_type])}>
                  {agent.role_type}
                </span>
              </div>
              <p className="text-muted-foreground mt-1">{agent.description}</p>
              <div className="flex items-center gap-3 mt-2">
                <Badge variant="outline">Phase {agent.phase}: {phaseNames[agent.phase]}</Badge>
                <Badge className={cn(statusConfig.bg, statusConfig.text, 'border-0')}>
                  <StatusIcon className="w-3 h-3 mr-1" />
                  {agent.current_status}
                </Badge>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Performance Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="glass-card-light dark:glass-card-dark rounded-xl p-4 text-center"
            >
              <CheckCircle2 className="w-5 h-5 text-success mx-auto mb-1" />
              <div className="text-2xl font-bold">{agent.tasks_completed}</div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </motion.div>
            
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="glass-card-light dark:glass-card-dark rounded-xl p-4 text-center"
            >
              <Clock className="w-5 h-5 text-primary mx-auto mb-1" />
              <div className="text-2xl font-bold">{agent.tasks_pending}</div>
              <div className="text-xs text-muted-foreground">Pending</div>
            </motion.div>
            
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="glass-card-light dark:glass-card-dark rounded-xl p-4 text-center"
            >
              <TrendingUp className="w-5 h-5 text-cyan-accent mx-auto mb-1" />
              <div className="text-2xl font-bold">{agent.efficiency_score}%</div>
              <div className="text-xs text-muted-foreground">Efficiency</div>
            </motion.div>
            
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="glass-card-light dark:glass-card-dark rounded-xl p-4 text-center"
            >
              <Zap className="w-5 h-5 text-warning mx-auto mb-1" />
              <div className="text-2xl font-bold">{agent.avg_response_time}s</div>
              <div className="text-xs text-muted-foreground">Avg Response</div>
            </motion.div>
          </div>

          {/* Capabilities */}
          <Card className="glass-card-light dark:glass-card-dark border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" />
                Capabilities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {agent.capabilities.map((cap, i) => (
                  <motion.span
                    key={cap}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.05 * i }}
                    className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                  >
                    {cap}
                  </motion.span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* RACI Role Explanation */}
          <Card className="glass-card-light dark:glass-card-dark border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">RACI Role: {roleLabels[agent.role_type]}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {agent.role_type === 'R' && 'This agent is Responsible for doing the work. They execute tasks and deliver outputs for their assigned phase.'}
                {agent.role_type === 'A' && 'This agent is Accountable for the outcome. They own the decision-making and final approval for their phase.'}
                {agent.role_type === 'C' && 'This agent is Consulted for their expertise. They provide input and feedback before decisions are made.'}
                {agent.role_type === 'I' && 'This agent is Informed about progress. They receive updates on decisions and outcomes but don\'t participate directly.'}
              </p>
            </CardContent>
          </Card>

          {/* Current Tasks */}
          {pendingTasks.length > 0 && (
            <Card className="glass-card-light dark:glass-card-dark border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Activity className="w-4 h-4 text-primary" />
                  Current Tasks ({pendingTasks.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {pendingTasks.slice(0, 5).map((task, i) => (
                  <motion.div
                    key={task.id}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.05 * i }}
                    className="flex items-center justify-between p-2 rounded-lg bg-muted/30"
                  >
                    <span className="text-sm">{task.title}</span>
                    <Badge variant="outline" className={cn(
                      task.status === 'in-progress' ? 'bg-primary/10 text-primary' : 'bg-muted'
                    )}>
                      {task.status}
                    </Badge>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Performance Trend */}
          <Card className="glass-card-light dark:glass-card-dark border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Performance Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Task Completion Rate</span>
                  <span className="font-medium">
                    {agent.tasks_completed + agent.tasks_pending > 0 
                      ? Math.round((agent.tasks_completed / (agent.tasks_completed + agent.tasks_pending)) * 100)
                      : 0}%
                  </span>
                </div>
                <Progress 
                  value={agent.tasks_completed + agent.tasks_pending > 0 
                    ? (agent.tasks_completed / (agent.tasks_completed + agent.tasks_pending)) * 100
                    : 0} 
                  className="h-2" 
                />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Efficiency Score</span>
                  <span className="font-medium">{agent.efficiency_score}%</span>
                </div>
                <Progress value={Number(agent.efficiency_score)} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
