import { motion } from 'framer-motion';
import { Lightbulb, Compass, Hammer, Rocket, Shield, RefreshCw, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const phases = [
  {
    id: 1,
    name: 'Discovery',
    icon: Lightbulb,
    status: 'complete',
    progress: 100,
    description: 'Research, gather requirements, and define scope',
    agents: ['Strategist', 'Researcher'],
    tasks: 12,
    completed: 12,
    color: 'from-cyan-accent to-cyan-light',
  },
  {
    id: 2,
    name: 'Design',
    icon: Compass,
    status: 'complete',
    progress: 100,
    description: 'Architecture, planning, and solution design',
    agents: ['Architect', 'Analyst'],
    tasks: 8,
    completed: 8,
    color: 'from-primary to-cloudburst-light',
  },
  {
    id: 3,
    name: 'Development',
    icon: Hammer,
    status: 'in-progress',
    progress: 68,
    description: 'Build, integrate, and implement solutions',
    agents: ['Developer', 'Integrator'],
    tasks: 24,
    completed: 16,
    color: 'from-purple-accent to-purple-light',
  },
  {
    id: 4,
    name: 'Delivery',
    icon: Rocket,
    status: 'pending',
    progress: 0,
    description: 'Coordinate releases and stakeholder communications',
    agents: ['Coordinator', 'Communicator'],
    tasks: 10,
    completed: 0,
    color: 'from-rust to-rust-light',
  },
  {
    id: 5,
    name: 'Validation',
    icon: Shield,
    status: 'pending',
    progress: 0,
    description: 'Testing, quality assurance, and compliance checks',
    agents: ['Validator'],
    tasks: 15,
    completed: 0,
    color: 'from-success to-success/70',
  },
  {
    id: 6,
    name: 'Evolution',
    icon: RefreshCw,
    status: 'pending',
    progress: 0,
    description: 'Continuous improvement and optimization',
    agents: ['Optimizer', 'Documenter'],
    tasks: 6,
    completed: 0,
    color: 'from-warning to-warning/70',
  },
];

const statusStyles: Record<string, string> = {
  'complete': 'bg-success/10 text-success border-success/20',
  'in-progress': 'bg-primary/10 text-primary border-primary/20',
  'pending': 'bg-muted text-muted-foreground border-muted',
};

export function SymphonyPhaseGrid() {
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
          {phases.map((phase, index) => (
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
                  `bg-gradient-to-br ${phase.color}`
                )}>
                  {phase.id}
                </div>
              </div>
              
              {/* Arrow connector */}
              {index < phases.length - 1 && (
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
                      `bg-gradient-to-br ${phase.color}`
                    )}>
                      <phase.icon className="w-5 h-5 text-white" />
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
                    {phase.description}
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
                    <span>{phase.completed}/{phase.tasks}</span>
                  </div>
                  
                  {/* Assigned agents */}
                  <div className="flex flex-wrap gap-1">
                    {phase.agents.map((agent) => (
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
          ))}
        </div>
      </div>
    </div>
  );
}
