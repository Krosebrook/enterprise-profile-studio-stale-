import { motion } from 'framer-motion';
import { Bot, Brain, Shield, Zap, Target, Users, FileText, Search, MessageSquare, BarChart, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const agents = [
  { id: 'strategist', name: 'Strategist', icon: Target, role: 'A', phase: 1, description: 'Defines project vision and goals' },
  { id: 'researcher', name: 'Researcher', icon: Search, role: 'R', phase: 1, description: 'Gathers data and market intelligence' },
  { id: 'architect', name: 'Architect', icon: Brain, role: 'A', phase: 2, description: 'Designs system architecture' },
  { id: 'developer', name: 'Developer', icon: Settings, role: 'R', phase: 3, description: 'Builds and implements solutions' },
  { id: 'analyst', name: 'Analyst', icon: BarChart, role: 'C', phase: 2, description: 'Analyzes performance metrics' },
  { id: 'communicator', name: 'Communicator', icon: MessageSquare, role: 'I', phase: 4, description: 'Manages stakeholder comms' },
  { id: 'validator', name: 'Validator', icon: Shield, role: 'R', phase: 5, description: 'Ensures quality and compliance' },
  { id: 'integrator', name: 'Integrator', icon: Zap, role: 'R', phase: 3, description: 'Connects systems and workflows' },
  { id: 'coordinator', name: 'Coordinator', icon: Users, role: 'A', phase: 4, description: 'Orchestrates team activities' },
  { id: 'documenter', name: 'Documenter', icon: FileText, role: 'C', phase: 6, description: 'Creates and maintains docs' },
  { id: 'optimizer', name: 'Optimizer', icon: Bot, role: 'R', phase: 6, description: 'Improves efficiency continuously' },
];

const roleColors: Record<string, string> = {
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

export function SymphonyAgentNetwork() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="font-display text-2xl md:text-3xl font-bold">Agent Network</h2>
        <p className="text-muted-foreground">11 specialized AI agents working in harmony</p>
      </div>
      
      {/* Network Visualization */}
      <div className="relative glass-card-light dark:glass-card rounded-2xl p-8 overflow-hidden">
        {/* Background grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Central hub */}
        <div className="relative flex justify-center mb-8">
          <motion.div
            className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-purple-accent flex items-center justify-center shadow-glow animate-glow-pulse"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <Brain className="w-10 h-10 text-white" />
          </motion.div>
        </div>
        
        {/* Agent grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {agents.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05 * index, type: 'spring' }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group relative glass-card-light dark:glass-card-dark rounded-xl p-4 cursor-pointer transition-all hover:shadow-card-hover"
            >
              {/* Connection line to center (visual only) */}
              <div className="absolute -top-8 left-1/2 w-px h-8 bg-gradient-to-b from-transparent to-border hidden lg:block" />
              
              {/* RACI Badge */}
              <div className="absolute -top-2 -right-2">
                <span className={cn('raci-badge text-[10px]', roleColors[agent.role])}>
                  {agent.role}
                </span>
              </div>
              
              {/* Agent Icon */}
              <div className="mb-3 flex justify-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <agent.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              
              {/* Agent Info */}
              <div className="text-center space-y-1">
                <h4 className="font-medium text-sm">{agent.name}</h4>
                <p className="text-xs text-muted-foreground line-clamp-2">{agent.description}</p>
                <div className="pt-1">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                    Phase {agent.phase}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* RACI Legend */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {Object.entries(roleLabels).map(([key, label]) => (
            <div key={key} className="flex items-center gap-2">
              <span className={cn('raci-badge text-[10px]', roleColors[key])}>{key}</span>
              <span className="text-sm text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
