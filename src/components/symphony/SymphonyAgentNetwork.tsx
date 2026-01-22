import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Brain, Shield, Zap, Target, Users, FileText, Search, MessageSquare, BarChart, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AgentDetailModal } from './AgentDetailModal';
import type { SymphonyAgent, SymphonyTask } from '@/hooks/useSymphonyData';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Target, Search, Brain, Settings, BarChart, MessageSquare, Shield, Zap, Users, FileText, Bot,
};

// Fallback data for display when no DB data
const fallbackAgents: Omit<SymphonyAgent, 'id' | 'user_id' | 'created_at' | 'updated_at'>[] = [
  { name: 'Strategist', icon: 'Target', role_type: 'A', phase: 1, description: 'Defines project vision and goals', capabilities: ['Strategic Planning', 'Goal Setting'], current_status: 'active', tasks_completed: 24, tasks_pending: 3, efficiency_score: 94, avg_response_time: 1.2 },
  { name: 'Researcher', icon: 'Search', role_type: 'R', phase: 1, description: 'Gathers data and market intelligence', capabilities: ['Data Analysis', 'Research'], current_status: 'active', tasks_completed: 48, tasks_pending: 5, efficiency_score: 91, avg_response_time: 2.1 },
  { name: 'Architect', icon: 'Brain', role_type: 'A', phase: 2, description: 'Designs system architecture', capabilities: ['System Design', 'Planning'], current_status: 'idle', tasks_completed: 32, tasks_pending: 2, efficiency_score: 97, avg_response_time: 1.8 },
  { name: 'Developer', icon: 'Settings', role_type: 'R', phase: 3, description: 'Builds and implements solutions', capabilities: ['Coding', 'Testing'], current_status: 'busy', tasks_completed: 156, tasks_pending: 12, efficiency_score: 89, avg_response_time: 0.8 },
  { name: 'Analyst', icon: 'BarChart', role_type: 'C', phase: 2, description: 'Analyzes performance metrics', capabilities: ['Analytics', 'Reporting'], current_status: 'active', tasks_completed: 67, tasks_pending: 4, efficiency_score: 93, avg_response_time: 1.5 },
  { name: 'Communicator', icon: 'MessageSquare', role_type: 'I', phase: 4, description: 'Manages stakeholder comms', capabilities: ['Communication', 'Documentation'], current_status: 'idle', tasks_completed: 28, tasks_pending: 0, efficiency_score: 96, avg_response_time: 0.9 },
  { name: 'Validator', icon: 'Shield', role_type: 'R', phase: 5, description: 'Ensures quality and compliance', capabilities: ['QA', 'Compliance'], current_status: 'idle', tasks_completed: 42, tasks_pending: 0, efficiency_score: 99, avg_response_time: 1.1 },
  { name: 'Integrator', icon: 'Zap', role_type: 'R', phase: 3, description: 'Connects systems and workflows', capabilities: ['Integration', 'Automation'], current_status: 'active', tasks_completed: 89, tasks_pending: 7, efficiency_score: 88, avg_response_time: 1.4 },
  { name: 'Coordinator', icon: 'Users', role_type: 'A', phase: 4, description: 'Orchestrates team activities', capabilities: ['Project Management'], current_status: 'idle', tasks_completed: 34, tasks_pending: 0, efficiency_score: 95, avg_response_time: 0.7 },
  { name: 'Documenter', icon: 'FileText', role_type: 'C', phase: 6, description: 'Creates and maintains docs', capabilities: ['Documentation'], current_status: 'idle', tasks_completed: 21, tasks_pending: 0, efficiency_score: 92, avg_response_time: 2.3 },
  { name: 'Optimizer', icon: 'Bot', role_type: 'R', phase: 6, description: 'Improves efficiency continuously', capabilities: ['Optimization'], current_status: 'idle', tasks_completed: 15, tasks_pending: 0, efficiency_score: 94, avg_response_time: 1.6 },
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

const statusDot: Record<string, string> = {
  'idle': 'bg-muted-foreground',
  'active': 'bg-success animate-pulse',
  'busy': 'bg-warning animate-pulse',
  'offline': 'bg-destructive',
};

interface SymphonyAgentNetworkProps {
  agents?: SymphonyAgent[];
  tasks?: SymphonyTask[];
}

export function SymphonyAgentNetwork({ agents = [], tasks = [] }: SymphonyAgentNetworkProps) {
  const [selectedAgent, setSelectedAgent] = useState<SymphonyAgent | null>(null);
  
  // Use DB agents if available, otherwise fallback
  const displayAgents = agents.length > 0 ? agents : fallbackAgents.map((a, i) => ({
    ...a,
    id: `fallback-${i}`,
    user_id: '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  } as SymphonyAgent));

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="font-display text-2xl md:text-3xl font-bold">Agent Network</h2>
        <p className="text-muted-foreground">11 specialized AI agents working in harmony — click to view details</p>
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
          {displayAgents.map((agent, index) => {
            const IconComponent = iconMap[agent.icon] || Bot;
            
            return (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05 * index, type: 'spring' }}
                whileHover={{ y: -4, scale: 1.02 }}
                onClick={() => setSelectedAgent(agent)}
                className="group relative glass-card-light dark:glass-card-dark rounded-xl p-4 cursor-pointer transition-all hover:shadow-card-hover hover:ring-2 hover:ring-primary/30"
              >
                {/* Status indicator */}
                <div className={cn(
                  'absolute top-2 left-2 w-2 h-2 rounded-full',
                  statusDot[agent.current_status]
                )} />
                
                {/* RACI Badge */}
                <div className="absolute -top-2 -right-2">
                  <span className={cn('raci-badge text-[10px]', roleColors[agent.role_type])}>
                    {agent.role_type}
                  </span>
                </div>
                
                {/* Agent Icon */}
                <div className="mb-3 flex justify-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                </div>
                
                {/* Agent Info */}
                <div className="text-center space-y-1">
                  <h4 className="font-medium text-sm">{agent.name}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-2">{agent.description}</p>
                  <div className="pt-1 flex items-center justify-center gap-2">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      Phase {agent.phase}
                    </span>
                    {agent.tasks_pending > 0 && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                        {agent.tasks_pending} tasks
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
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

      {/* Agent Detail Modal */}
      <AgentDetailModal
        agent={selectedAgent}
        tasks={tasks}
        isOpen={!!selectedAgent}
        onClose={() => setSelectedAgent(null)}
      />
    </div>
  );
}
