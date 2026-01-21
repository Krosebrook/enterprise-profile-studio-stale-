import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { TeamMember } from '@/types/profile';
import { Users, Plus, Trash2, UserCircle, Camera } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface TeamStepProps {
  data: TeamMember[];
  onChange: (data: TeamMember[]) => void;
}

export function TeamStep({ data, onChange }: TeamStepProps) {
  const [newMember, setNewMember] = useState<Omit<TeamMember, 'id'>>({
    name: '',
    title: '',
    bio: '',
    image: '',
    linkedin: '',
  });
  const [editingPhotoId, setEditingPhotoId] = useState<string | null>(null);

  const addMember = () => {
    if (!newMember.name.trim() || !newMember.title.trim()) return;
    
    const member: TeamMember = {
      id: Date.now().toString(),
      ...newMember,
    };
    
    onChange([...data, member]);
    setNewMember({ name: '', title: '', bio: '', image: '', linkedin: '' });
  };

  const removeMember = (id: string) => {
    onChange(data.filter(m => m.id !== id));
  };

  const updateMember = (id: string, updates: Partial<TeamMember>) => {
    onChange(data.map(m => m.id === id ? { ...m, ...updates } : m));
  };

  return (
    <div className="space-y-6">
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-display">
            <Users className="h-5 w-5 text-primary" />
            Team Members
          </CardTitle>
          <CardDescription>
            Showcase your leadership team and key personnel
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Existing Team Members */}
          {data.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2">
              {data.map((member) => (
                <div 
                  key={member.id}
                  className="group relative rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeMember(member.id)}
                    className="absolute right-2 top-2 h-7 w-7 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  
                  <div className="flex items-start gap-4">
                    <Dialog open={editingPhotoId === member.id} onOpenChange={(open) => setEditingPhotoId(open ? member.id : null)}>
                      <DialogTrigger asChild>
                        <button className="group/avatar relative">
                          <Avatar className="h-14 w-14">
                            <AvatarImage src={member.image} alt={member.name} />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover/avatar:opacity-100">
                            <Camera className="h-5 w-5 text-white" />
                          </div>
                        </button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Upload Photo for {member.name}</DialogTitle>
                        </DialogHeader>
                        <ImageUpload
                          value={member.image || ''}
                          onChange={(url) => {
                            updateMember(member.id, { image: url });
                            setEditingPhotoId(null);
                          }}
                          folder="team-photos"
                          aspectRatio="square"
                          placeholder="Upload team member photo"
                        />
                      </DialogContent>
                    </Dialog>
                    <div className="flex-1 space-y-2">
                      <Input
                        placeholder="Name"
                        value={member.name}
                        onChange={(e) => updateMember(member.id, { name: e.target.value })}
                        className="font-medium"
                      />
                      <Input
                        placeholder="Role / Title"
                        value={member.title}
                        onChange={(e) => updateMember(member.id, { title: e.target.value })}
                        className="text-sm"
                      />
                      <Input
                        placeholder="LinkedIn URL"
                        value={member.linkedin || ''}
                        onChange={(e) => updateMember(member.id, { linkedin: e.target.value })}
                        className="text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add New Member */}
          <div className="rounded-lg border-2 border-dashed border-border bg-muted/30 p-4">
            <h4 className="mb-4 flex items-center gap-2 text-sm font-medium">
              <UserCircle className="h-4 w-4" />
              Add Team Member
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="shrink-0">
                  <ImageUpload
                    value={newMember.image || ''}
                    onChange={(url) => setNewMember({ ...newMember, image: url })}
                    folder="team-photos"
                    aspectRatio="square"
                    placeholder="Photo"
                    className="w-24"
                  />
                </div>
                <div className="flex-1 space-y-3">
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="memberName">Name *</Label>
                      <Input
                        id="memberName"
                        placeholder="John Doe"
                        value={newMember.name}
                        onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="memberRole">Role / Title *</Label>
                      <Input
                        id="memberRole"
                        placeholder="CEO, CTO, etc."
                        value={newMember.title}
                        onChange={(e) => setNewMember({ ...newMember, title: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="memberBio">Short Bio</Label>
                    <Textarea
                      id="memberBio"
                      placeholder="Brief background and expertise..."
                      value={newMember.bio}
                      onChange={(e) => setNewMember({ ...newMember, bio: e.target.value })}
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="memberLinkedin">LinkedIn</Label>
                    <Input
                      id="memberLinkedin"
                      type="url"
                      placeholder="https://linkedin.com/in/..."
                      value={newMember.linkedin}
                      onChange={(e) => setNewMember({ ...newMember, linkedin: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <Button
                type="button"
                onClick={addMember}
                disabled={!newMember.name.trim() || !newMember.title.trim()}
                className="w-full primary-gradient border-0"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Team Member
              </Button>
            </div>
          </div>

          {data.length === 0 && (
            <p className="text-center text-sm text-muted-foreground">
              No team members added yet. Add your first team member above.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
