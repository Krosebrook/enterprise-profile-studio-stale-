import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

// RACI Matrix data
const agents = [
  'Strategist',
  'Researcher', 
  'Architect',
  'Developer',
  'Analyst',
  'Communicator',
  'Validator',
  'Integrator',
  'Coordinator',
  'Documenter',
  'Optimizer',
];

const phases = [
  'Discovery',
  'Design',
  'Development',
  'Delivery',
  'Validation',
  'Evolution',
];

// Matrix mapping: agent -> phase -> role
const raciMatrix: Record<string, Record<string, string>> = {
  'Strategist': { 'Discovery': 'A', 'Design': 'C', 'Development': 'I', 'Delivery': 'C', 'Validation': 'I', 'Evolution': 'C' },
  'Researcher': { 'Discovery': 'R', 'Design': 'C', 'Development': 'I', 'Delivery': 'I', 'Validation': 'C', 'Evolution': 'I' },
  'Architect': { 'Discovery': 'C', 'Design': 'A', 'Development': 'C', 'Delivery': 'I', 'Validation': 'C', 'Evolution': 'I' },
  'Developer': { 'Discovery': 'I', 'Design': 'C', 'Development': 'R', 'Delivery': 'C', 'Validation': 'R', 'Evolution': 'C' },
  'Analyst': { 'Discovery': 'C', 'Design': 'R', 'Development': 'C', 'Delivery': 'I', 'Validation': 'C', 'Evolution': 'R' },
  'Communicator': { 'Discovery': 'I', 'Design': 'I', 'Development': 'I', 'Delivery': 'R', 'Validation': 'I', 'Evolution': 'C' },
  'Validator': { 'Discovery': 'I', 'Design': 'C', 'Development': 'C', 'Delivery': 'C', 'Validation': 'R', 'Evolution': 'C' },
  'Integrator': { 'Discovery': 'I', 'Design': 'C', 'Development': 'R', 'Delivery': 'R', 'Validation': 'C', 'Evolution': 'I' },
  'Coordinator': { 'Discovery': 'C', 'Design': 'I', 'Development': 'C', 'Delivery': 'A', 'Validation': 'I', 'Evolution': 'C' },
  'Documenter': { 'Discovery': 'C', 'Design': 'C', 'Development': 'I', 'Delivery': 'C', 'Validation': 'C', 'Evolution': 'R' },
  'Optimizer': { 'Discovery': 'I', 'Design': 'I', 'Development': 'C', 'Delivery': 'I', 'Validation': 'R', 'Evolution': 'A' },
};

const roleStyles: Record<string, string> = {
  'R': 'raci-r',
  'A': 'raci-a',
  'C': 'raci-c',
  'I': 'raci-i',
};

const roleDescriptions: Record<string, string> = {
  'R': 'Responsible – Does the work',
  'A': 'Accountable – Owns the outcome',
  'C': 'Consulted – Provides input',
  'I': 'Informed – Kept in the loop',
};

export function SymphonyRACIMatrix() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="font-display text-2xl md:text-3xl font-bold">RACI Matrix</h2>
        <p className="text-muted-foreground">Accountability framework for agent responsibilities</p>
      </div>
      
      <Card className="glass-card-light dark:glass-card overflow-hidden">
        <CardHeader>
          <CardTitle className="font-display">Agent Responsibility Matrix</CardTitle>
          <CardDescription>
            Hover over badges to see role definitions
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold sticky left-0 bg-muted/50 z-10">Agent</TableHead>
                  {phases.map((phase) => (
                    <TableHead key={phase} className="text-center font-semibold min-w-[100px]">
                      {phase}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {agents.map((agent, agentIndex) => (
                  <motion.tr
                    key={agent}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.03 * agentIndex }}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <TableCell className="font-medium sticky left-0 bg-card z-10">
                      {agent}
                    </TableCell>
                    {phases.map((phase) => {
                      const role = raciMatrix[agent]?.[phase] || '-';
                      return (
                        <TableCell key={`${agent}-${phase}`} className="text-center">
                          {role !== '-' ? (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <motion.span
                                  className={cn('raci-badge cursor-help', roleStyles[role])}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  {role}
                                </motion.span>
                              </TooltipTrigger>
                              <TooltipContent side="top" className="max-w-xs">
                                <p className="font-medium">{roleDescriptions[role]}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {agent} in {phase} phase
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          ) : (
                            <span className="text-muted-foreground/30">—</span>
                          )}
                        </TableCell>
                      );
                    })}
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-6 p-4 glass-card-light dark:glass-card-dark rounded-xl">
        {Object.entries(roleDescriptions).map(([key, desc]) => (
          <div key={key} className="flex items-center gap-2">
            <span className={cn('raci-badge', roleStyles[key])}>{key}</span>
            <span className="text-sm text-muted-foreground">{desc.split(' – ')[0]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
