import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AIGenerateButton } from '@/components/ui/AIGenerateButton';
import { Briefcase, Plus, Trash2, GripVertical } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  description: string;
  icon?: string;
}

interface ServicesStepProps {
  data: Service[];
  onChange: (data: Service[]) => void;
  companyContext?: {
    companyName?: string;
    industry?: string;
    description?: string;
  };
}

export function ServicesStep({ data, onChange, companyContext }: ServicesStepProps) {
  const [newService, setNewService] = useState({ name: '', description: '' });

  const addService = () => {
    if (!newService.name.trim()) return;
    
    const service: Service = {
      id: Date.now().toString(),
      name: newService.name,
      description: newService.description,
    };
    
    onChange([...data, service]);
    setNewService({ name: '', description: '' });
  };

  const removeService = (id: string) => {
    onChange(data.filter(s => s.id !== id));
  };

  const updateService = (id: string, field: keyof Service, value: string) => {
    onChange(data.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleAIGenerateDescription = (serviceId: string, serviceName: string, value: string) => {
    updateService(serviceId, 'description', value);
  };

  return (
    <div className="space-y-6">
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-display">
            <Briefcase className="h-5 w-5 text-primary" />
            Services & Offerings
          </CardTitle>
          <CardDescription>
            List the services and products your company offers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Existing Services */}
          {data.length > 0 && (
            <div className="space-y-4">
              {data.map((service) => (
                <div 
                  key={service.id}
                  className="group relative rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50"
                >
                  <div className="flex items-start gap-3">
                    <GripVertical className="mt-1 h-5 w-5 cursor-grab text-muted-foreground opacity-0 group-hover:opacity-100" />
                    <div className="flex-1 space-y-3">
                      <Input
                        placeholder="Service name"
                        value={service.name}
                        onChange={(e) => updateService(service.id, 'name', e.target.value)}
                        className="font-medium"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center justify-end">
                          <AIGenerateButton
                            type="service"
                            context={{
                              serviceName: service.name,
                              ...companyContext,
                            }}
                            onGenerate={(value) => handleAIGenerateDescription(service.id, service.name, value)}
                            disabled={!service.name}
                          />
                        </div>
                        <Textarea
                          placeholder="Describe this service..."
                          value={service.description}
                          onChange={(e) => updateService(service.id, 'description', e.target.value)}
                          rows={2}
                        />
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeService(service.id)}
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add New Service */}
          <div className="rounded-lg border-2 border-dashed border-border bg-muted/30 p-4">
            <h4 className="mb-4 text-sm font-medium">Add New Service</h4>
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="serviceName">Service Name</Label>
                <Input
                  id="serviceName"
                  placeholder="e.g., Consulting Services"
                  value={newService.name}
                  onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="serviceDesc">Description</Label>
                <Textarea
                  id="serviceDesc"
                  placeholder="Describe what this service includes..."
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                  rows={2}
                />
              </div>
              <Button
                type="button"
                onClick={addService}
                disabled={!newService.name.trim()}
                className="w-full primary-gradient border-0"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Service
              </Button>
            </div>
          </div>

          {data.length === 0 && (
            <p className="text-center text-sm text-muted-foreground">
              No services added yet. Add your first service above.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
