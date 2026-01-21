import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useEmployeePersonas, useCreatePersona, useDeletePersona } from '@/hooks/useEmployeePersonas';
import { Plus, User, Trash2, Loader2, Bot, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function PersonasListPage() {
  const navigate = useNavigate();
  const { data: personas = [], isLoading } = useEmployeePersonas();
  const createPersona = useCreatePersona();
  const deletePersona = useDeletePersona();
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newName, setNewName] = useState('');

  const handleCreate = async () => {
    if (!newName.trim()) return;
    const result = await createPersona.mutateAsync({ name: newName });
    setDialogOpen(false);
    setNewName('');
    navigate(`/personas/${result.id}`);
  };

  return (
    <div className="min-h-screen bg-background pb-12 pt-20">
      <div className="container max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold">AI Personas</h1>
            <p className="mt-1 text-muted-foreground">
              Create and manage employee AI profiles for Claude, Copilot, and Gemini
            </p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="primary-gradient border-0">
                <Plus className="mr-2 h-4 w-4" />
                New Persona
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Persona</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Employee Name</Label>
                  <Input
                    id="name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g., John Doe"
                    autoFocus
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleCreate} disabled={!newName.trim() || createPersona.isPending}>
                  {createPersona.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Personas Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : personas.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="rounded-full bg-primary/10 p-4 mb-4">
                <Bot className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium">No personas yet</h3>
              <p className="text-muted-foreground mt-1 mb-4">
                Create your first AI persona to get started
              </p>
              <Button onClick={() => setDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Persona
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {personas.map((persona) => (
              <Card key={persona.id} className="group hover:border-primary/50 transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{persona.name}</CardTitle>
                        <CardDescription>
                          {persona.job_title || 'No title set'}
                          {persona.department && ` • ${persona.department}`}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant={persona.status === 'active' ? 'default' : 'secondary'}>
                      {persona.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {persona.skills?.slice(0, 3).map((skill, i) => (
                        <Badge key={i} variant="outline" className="text-xs">{skill}</Badge>
                      ))}
                      {(persona.skills?.length || 0) > 3 && (
                        <Badge variant="outline" className="text-xs">+{persona.skills!.length - 3}</Badge>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deletePersona.mutate(persona.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/personas/${persona.id}`)}
                      >
                        Edit
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
