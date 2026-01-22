import { motion } from 'framer-motion';
import { Lightbulb, Compass, Hammer, Rocket, Shield, RefreshCw, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import type { SymphonyPhase } from '@/hooks/useSymphonyData';

// Fallback data for display when no DB data
const fallbackPhases: Omit<SymphonyPhase, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'started_at' | 'completed_at'>[] = [
  { phase_number: 1, name: 'Discovery', status: 'complete', progress: 100, tasks_total: 12, tasks_completed: 12 },
  { phase_number: 2, name: 'Design', status: 'complete', progress: 100, tasks_total: 8, tasks_completed: 8 },
  { phase_number: 3, name: 'Development', status: 'in-progress', progress: 68, tasks_total: 24, tasks_completed: 16 },
  { phase_number: 4, name: 'Delivery', status: 'pending', progress: 0, tasks_total: 10, tasks_completed: 0 },
  { phase_number: 5, name: 'Validation', status: 'pending', progress: 0, tasks_total: 15, tasks_completed: 0 },
  { phase_number: 6, name: 'Evolution', status: 'pending', progress: 0, tasks_total: 6, tasks_completed: 0 },
];

const phaseConfig = [
  { icon: Lightbulb, color: 'from-cyan-accent to-cyan-light', agents: ['Strategist', 'Researcher'] },
  { icon: Compass, color: 'from-primary to-cloudburst-light', agents: ['Architect', 'Analyst'] },
  { icon: Hammer, color: 'from-purple-accent to-purple-light', agents: ['Developer', 'Integrator'] },
  { icon: Rocket, color: 'from-rust to-rust-light', agents: ['Coordinator', 'Communicator'] },
  { icon: Shield, color: 'from-success to-success/70', agents: ['Validator'] },
  { icon: RefreshCw, color: 'from-warning to-warning/70', agents: ['Optimizer', 'Documenter'] },
];

const phaseDescriptions = [
  'Research, gather requirements, and define scope',
  'Architecture, planning, and solution design',
  'Build, integrate, and implement solutions',
  'Coordinate releases and stakeholder communications',
  'Testing, quality assurance, and compliance checks',
  'Continuous improvement and optimization',
];

const statusStyles: Record<string, string> = {
  'complete': 'bg-success/10 text-success border-success/20',
  'in-progress': 'bg-primary/10 text-primary border-primary/20',
  'pending': 'bg-muted text-muted-foreground border-muted',
};

interface SymphonyPhaseGridProps {
  phases?: SymphonyPhase[];
}

export function SymphonyPhaseGrid({ phases = [] }: SymphonyPhaseGridProps) {
  // Use DB phases if available, otherwise fallback
  const displayPhases = phases.length > 0 ? phases : fallbackPhases.map((p, i) => ({
    ...p,
    id: `fallback-${i}`,
    user_id: '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    started_at: null,
    completed_at: null,
  } as SymphonyPhase));

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="font-display text-2xl md:text-3xl font-bold">6-Phase Workflow</h2>
        <p className="text-muted-foreground">End-to-end project lifecycle orchestration</p>
      </div>
      
      {/* Phase Timeline */}
      <div className="relative">
        {/* Connection line */}
        <div className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-accent via-purple-accent to-warning hidden lg:block" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {displayPhases.map((phase, index) => {
            const config = phaseConfig[index] || phaseConfig[0];
            const PhaseIcon = config.icon;
            
            return (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="relative"
              >
                {/* Phase number badge */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <div className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg',
                    `bg-gradient-to-br ${config.color}`
                  )}>
                    {phase.phase_number}
                  </div>
                </div>
                
                {/* Arrow connector */}
                {index < displayPhases.length - 1 && (
                  <div className="absolute top-1/2 -right-3 z-10 hidden xl:block">
                    <ArrowRight className="w-5 h-5 text-muted-foreground/30" />
                  </div>
                )}
                
                <Card className={cn(
                  'h-full pt-6 glass-card-light dark:glass-card-dark transition-all hover:shadow-card-hover',
                  phase.status === 'in-progress' && 'ring-2 ring-primary/50'
                )}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className={cn(
                        'w-10 h-10 rounded-lg flex items-center justify-center',
                        `bg-gradient-to-br ${config.color}`
                      )}>
                        <PhaseIcon className="w-5 h-5 text-white" />
                      </div>
                      <Badge variant="outline" className={statusStyles[phase.status]}>
                        {phase.status === 'complete' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                        {phase.status.replace('-', ' ')}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg mt-2">{phase.name}</CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {phaseDescriptions[index]}
                    </p>
                    
                    {/* Progress */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{phase.progress}%</span>
                      </div>
                      <Progress value={phase.progress} className="h-1.5" />
                    </div>
                    
                    {/* Tasks */}
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Tasks</span>
                      <span>{phase.tasks_completed}/{phase.tasks_total}</span>
                    </div>
                    
                    {/* Assigned agents */}
                    <div className="flex flex-wrap gap-1">
                      {config.agents.map((agent) => (
                        <span
                          key={agent}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary"
                        >
                          {agent}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
