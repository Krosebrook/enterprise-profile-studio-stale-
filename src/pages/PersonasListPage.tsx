import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useEmployeePersonas, useCreatePersona, useDeletePersona, useUpdatePersona } from '@/hooks/useEmployeePersonas';
import { PersonaTemplateSelector } from '@/components/persona/PersonaTemplateSelector';
import { PersonaCard } from '@/components/persona/PersonaCard';
import { PersonaStatsBar } from '@/components/persona/PersonaStatsBar';
import { PersonaFilterBar } from '@/components/persona/PersonaFilterBar';
import { AIPersonaGenerator, GeneratedPersonaData } from '@/components/persona/AIPersonaGenerator';
import { PersonaComparisonView } from '@/components/persona/PersonaComparisonView';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Plus, Loader2, Bot, Sparkles, GitCompare, Wand2 } from 'lucide-react';
import type { PersonaTemplate } from '@/data/personaTemplates';

export default function PersonasListPage() {
  const navigate = useNavigate();
  const { data: personas = [], isLoading } = useEmployeePersonas();
  const createPersona = useCreatePersona();
  const updatePersona = useUpdatePersona();
  const deletePersona = useDeletePersona();
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  
  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Get unique departments
  const departments = useMemo(() => {
    const depts = personas
      .map(p => p.department)
      .filter((d): d is string => !!d);
    return [...new Set(depts)].sort();
  }, [personas]);
  
  // Filter personas
  const filteredPersonas = useMemo(() => {
    return personas.filter(persona => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = persona.name.toLowerCase().includes(query);
        const matchesTitle = persona.job_title?.toLowerCase().includes(query);
        const matchesDept = persona.department?.toLowerCase().includes(query);
        const matchesSkills = persona.skills?.some(s => s.toLowerCase().includes(query));
        if (!matchesName && !matchesTitle && !matchesDept && !matchesSkills) {
          return false;
        }
      }
      
      // Department filter
      if (selectedDepartments.length > 0 && !selectedDepartments.includes(persona.department || '')) {
        return false;
      }
      
      // Status filter
      if (selectedStatus && persona.status !== selectedStatus) {
        return false;
      }
      
      return true;
    });
  }, [personas, searchQuery, selectedDepartments, selectedStatus]);
  
  const hasActiveFilters = searchQuery !== '' || selectedDepartments.length > 0 || selectedStatus !== null;
  
  const handleDepartmentToggle = (dept: string) => {
    setSelectedDepartments(prev => 
      prev.includes(dept) ? prev.filter(d => d !== dept) : [...prev, dept]
    );
  };
  
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedDepartments([]);
    setSelectedStatus(null);
  };

  const handleCreateBlank = async (name: string) => {
    setIsCreating(true);
    try {
      const result = await createPersona.mutateAsync({ name });
      setDialogOpen(false);
      navigate(`/personas/${result.id}`);
    } finally {
      setIsCreating(false);
    }
  };

  const handleSelectTemplate = async (template: PersonaTemplate, name: string) => {
    setIsCreating(true);
    try {
      const result = await createPersona.mutateAsync({ name });
      
      await updatePersona.mutateAsync({
        id: result.id,
        updates: {
          job_title: template.data.job_title,
          department: template.data.department,
          communication_style: template.data.communication_style,
          work_preferences: template.data.work_preferences,
          skills: template.data.skills,
          expertise_areas: template.data.expertise_areas,
          tools_used: template.data.tools_used,
          pain_points: template.data.pain_points,
          goals: template.data.goals,
          ai_interaction_style: template.data.ai_interaction_style,
          preferred_response_length: template.data.preferred_response_length,
          preferred_tone: template.data.preferred_tone,
        },
      });
      
      setDialogOpen(false);
      navigate(`/personas/${result.id}`);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pb-12 pt-20">
        <div className="container max-w-7xl">
          {/* Hero Header */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="the-dot animate-pulse-dot" />
                  <span className="text-sm font-medium text-primary">INT Inc. AI Platform</span>
                </div>
                <h1 className="font-display text-4xl font-bold tracking-tight">
                  Persona Management
                </h1>
                <p className="mt-2 text-lg text-muted-foreground max-w-2xl">
                  Build AI-ready personas for your team. Configure communication styles, roles, and export to Claude, Copilot, and Gemini.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <PersonaComparisonView 
                  trigger={
                    <Button variant="outline" className="gap-2">
                      <GitCompare className="h-4 w-4" />
                      Compare
                    </Button>
                  }
                />
                <Button 
                  size="lg" 
                  className="primary-gradient border-0 gap-2 shadow-lg hover:shadow-xl transition-shadow" 
                  onClick={() => setDialogOpen(true)}
                >
                  <Plus className="h-5 w-5" />
                  New Persona
                  <Sparkles className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Template Selector Dialog */}
          <PersonaTemplateSelector
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            onSelectTemplate={handleSelectTemplate}
            onCreateBlank={handleCreateBlank}
            isLoading={isCreating}
          />

          {/* Stats Bar */}
          {!isLoading && personas.length > 0 && (
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <PersonaStatsBar personas={personas} />
            </motion.div>
          )}

          {/* Filter Bar */}
          {!isLoading && personas.length > 0 && (
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <PersonaFilterBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedDepartments={selectedDepartments}
                onDepartmentToggle={handleDepartmentToggle}
                selectedStatus={selectedStatus}
                onStatusChange={setSelectedStatus}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                departments={departments}
                onClearFilters={handleClearFilters}
                hasActiveFilters={hasActiveFilters}
              />
            </motion.div>
          )}

          {/* Personas Grid */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Loading personas...</p>
            </div>
          ) : personas.length === 0 ? (
            <motion.div 
              className="bg-card rounded-2xl border shadow-sm"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="flex flex-col items-center justify-center py-20 text-center px-4">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
                  <div className="relative rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 p-6">
                    <Bot className="h-12 w-12 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Create Your First AI Persona</h3>
                <p className="text-muted-foreground max-w-md mb-6">
                  AI personas help your team members get personalized AI assistance. 
                  Start with a template or create a custom persona.
                </p>
                <Button size="lg" className="primary-gradient border-0" onClick={() => setDialogOpen(true)}>
                  <Plus className="mr-2 h-5 w-5" />
                  Create Persona
                </Button>
              </div>
            </motion.div>
          ) : filteredPersonas.length === 0 ? (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-muted-foreground mb-4">No personas match your filters</p>
              <Button variant="outline" onClick={handleClearFilters}>
                Clear Filters
              </Button>
            </motion.div>
          ) : (
            <div className={
              viewMode === 'grid' 
                ? 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3' 
                : 'space-y-4'
            }>
              <AnimatePresence mode="popLayout">
                {filteredPersonas.map((persona) => (
                  <PersonaCard
                    key={persona.id}
                    persona={persona}
                    onEdit={() => navigate(`/personas/${persona.id}`)}
                    onDelete={() => deletePersona.mutate(persona.id)}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
