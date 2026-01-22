import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, ListTodo, Users, Layers, Flag, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { SymphonyAgent, SymphonyPhase } from '@/hooks/useSymphonyData';

interface TaskCreationDialogProps {
  agents: SymphonyAgent[];
  phases: SymphonyPhase[];
  onCreateTask: (task: {
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
    agent_id: string | null;
    phase_id: string | null;
  }) => Promise<unknown>;
  isCreating?: boolean;
}

const priorityConfig = {
  low: { label: 'Low', color: 'bg-muted text-muted-foreground' },
  medium: { label: 'Medium', color: 'bg-primary/20 text-primary' },
  high: { label: 'High', color: 'bg-warning/20 text-warning' },
  critical: { label: 'Critical', color: 'bg-destructive/20 text-destructive' },
};

export function TaskCreationDialog({
  agents,
  phases,
  onCreateTask,
  isCreating = false,
}: TaskCreationDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'critical'>('medium');
  const [agentId, setAgentId] = useState<string>('');
  const [phaseId, setPhaseId] = useState<string>('');

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPriority('medium');
    setAgentId('');
    setPhaseId('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    await onCreateTask({
      title: title.trim(),
      description: description.trim(),
      priority,
      agent_id: agentId || null,
      phase_id: phaseId || null,
    });

    resetForm();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
      <DialogTrigger asChild>
        <Button className="gap-2 btn-premium">
          <Plus className="w-4 h-4" />
          Create Task
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-xl flex items-center gap-2">
            <ListTodo className="w-5 h-5 text-primary" />
            Create New Task
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Task Title *</Label>
            <Input
              id="title"
              placeholder="Enter task title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-11"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the task details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[80px] resize-none"
            />
          </div>

          {/* Priority Selection */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Flag className="w-4 h-4" />
              Priority
            </Label>
            <div className="flex gap-2">
              {(Object.keys(priorityConfig) as Array<keyof typeof priorityConfig>).map((p) => (
                <motion.button
                  key={p}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setPriority(p)}
                  className={cn(
                    'flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all border-2',
                    priority === p
                      ? 'border-primary ' + priorityConfig[p].color
                      : 'border-transparent bg-muted/50 hover:bg-muted'
                  )}
                >
                  {priorityConfig[p].label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Agent Assignment */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Assign to Agent
            </Label>
            <Select value={agentId} onValueChange={setAgentId}>
              <SelectTrigger>
                <SelectValue placeholder="Select an agent (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Unassigned</SelectItem>
                {agents.map((agent) => (
                  <SelectItem key={agent.id} value={agent.id}>
                    <div className="flex items-center gap-2">
                      <span>{agent.name}</span>
                      <Badge variant="outline" className="text-xs">
                        Phase {agent.phase}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Phase Assignment */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Assign to Phase
            </Label>
            <Select value={phaseId} onValueChange={setPhaseId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a phase (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">No Phase</SelectItem>
                {phases.map((phase) => (
                  <SelectItem key={phase.id} value={phase.id}>
                    <div className="flex items-center gap-2">
                      <span>Phase {phase.phase_number}: {phase.name}</span>
                      <Badge 
                        variant="outline" 
                        className={cn(
                          'text-xs',
                          phase.status === 'complete' && 'bg-success/20 text-success',
                          phase.status === 'in-progress' && 'bg-primary/20 text-primary',
                          phase.status === 'pending' && 'bg-muted'
                        )}
                      >
                        {phase.status}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!title.trim() || isCreating}
              className="btn-premium"
            >
              {isCreating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Task
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
