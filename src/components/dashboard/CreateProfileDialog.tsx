import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCreateProfile, useUpdateProfile } from '@/hooks/useProfiles';
import { profileTemplates, type ProfileTemplate } from '@/data/profileTemplates';
import { Plus, Loader2, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export function CreateProfileDialog() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<'template' | 'name'>('template');
  const [selectedTemplate, setSelectedTemplate] = useState<ProfileTemplate | null>(null);
  const [name, setName] = useState('');
  const createProfile = useCreateProfile();
  const updateProfile = useUpdateProfile();
  const navigate = useNavigate();

  const handleSelectTemplate = (template: ProfileTemplate) => {
    setSelectedTemplate(template);
    setStep('name');
  };

  const handleBack = () => {
    setStep('template');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !selectedTemplate) return;

    const profile = await createProfile.mutateAsync(name);
    
    // Apply template data
    if (selectedTemplate.id !== 'blank') {
      await updateProfile.mutateAsync({
        id: profile.id,
        updates: {
          company_info: {
            companyName: name,
            ...selectedTemplate.data.company_info,
          },
          branding: selectedTemplate.data.branding,
          services: selectedTemplate.data.services,
          compliance: selectedTemplate.data.compliance,
        },
      });
    }
    
    setOpen(false);
    setName('');
    setStep('template');
    setSelectedTemplate(null);
    navigate(`/profile/${profile.id}/edit`);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setStep('template');
      setSelectedTemplate(null);
      setName('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="primary-gradient border-0 shadow-glow">
          <Plus className="mr-2 h-4 w-4" />
          New Profile
        </Button>
      </DialogTrigger>
      <DialogContent className={cn(
        "transition-all duration-200",
        step === 'template' ? "sm:max-w-2xl" : "sm:max-w-md"
      )}>
        {step === 'template' ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-center font-display text-xl">Choose a Template</DialogTitle>
              <DialogDescription className="text-center">
                Start with a pre-built template or create from scratch
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-3 py-4 sm:grid-cols-2 max-h-[400px] overflow-y-auto">
              {profileTemplates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleSelectTemplate(template)}
                  className={cn(
                    "flex items-start gap-3 rounded-lg border border-border p-4 text-left transition-all hover:border-primary/50 hover:bg-muted/50",
                    selectedTemplate?.id === template.id && "border-primary bg-primary/5"
                  )}
                >
                  <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white", template.color)}>
                    <template.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{template.name}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">{template.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-white" style={{ backgroundColor: selectedTemplate?.color.replace('bg-', '').includes('-') ? undefined : undefined }}>
                <div className={cn("flex h-14 w-14 items-center justify-center rounded-2xl text-white", selectedTemplate?.color)}>
                  {selectedTemplate && <selectedTemplate.icon className="h-7 w-7" />}
                </div>
              </div>
              <DialogTitle className="text-center font-display text-xl">Name Your Profile</DialogTitle>
              <DialogDescription className="text-center">
                Using template: <span className="font-medium text-foreground">{selectedTemplate?.name}</span>
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Profile Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Acme Corporation"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                  />
                </div>
              </div>
              <DialogFooter className="gap-2 sm:gap-0">
                <Button type="button" variant="outline" onClick={handleBack}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button 
                  type="submit" 
                  className="primary-gradient border-0"
                  disabled={!name.trim() || createProfile.isPending || updateProfile.isPending}
                >
                  {(createProfile.isPending || updateProfile.isPending) ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Check className="mr-2 h-4 w-4" />
                  )}
                  Create Profile
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
