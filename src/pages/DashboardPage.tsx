import { useEffect, useState, useRef } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProfileCard } from '@/components/dashboard/ProfileCard';
import { CreateProfileDialog } from '@/components/dashboard/CreateProfileDialog';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useProfiles, useDeleteProfile } from '@/hooks/useProfiles';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, BarChart3, Sparkles, Command, Wand2 } from 'lucide-react';
import { StaggerContainer, StaggerItem, FadeIn } from '@/components/ui/animations';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { FeatureTour } from '@/components/dashboard/FeatureTour';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: profiles, isLoading: profilesLoading } = useProfiles();
  const deleteProfile = useDeleteProfile();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showTour, setShowTour] = useState(false);
  
  // Enable keyboard shortcuts
  useKeyboardShortcuts();
  
  // Listen for shortcut to open new profile dialog
  useEffect(() => {
    const handleNewProfile = () => setDialogOpen(true);
    window.addEventListener('shortcut:new-profile', handleNewProfile);
    return () => window.removeEventListener('shortcut:new-profile', handleNewProfile);
  }, []);

  // Show tour + toast when arriving from setup wizard
  useEffect(() => {
    if (searchParams.get('setup_complete') === 'true') {
      toast.success('🎉 Your AI workspace is ready!', {
        description: 'Profile, persona, and role hats have been configured.',
        duration: 5000,
      });
      setShowTour(true);
      // Clean URL without causing navigation
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  // Auto-redirect to setup wizard on first login
  useEffect(() => {
    if (!user || authLoading) return;
    const checkSetup = async () => {
      const { data: prefs } = await supabase
        .from('user_onboarding_preferences')
        .select('onboarding_completed')
        .eq('user_id', user.id)
        .maybeSingle();
      if (!prefs?.onboarding_completed) {
        navigate('/setup');
      }
    };
    checkSetup();
  }, [user, authLoading, navigate]);

  const handleDelete = async () => {
    if (deleteId) {
      await deleteProfile.mutateAsync(deleteId);
      setDeleteId(null);
    }
  };

  if (authLoading || profilesLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="the-dot-lg animate-pulse-dot" />
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 pt-20 pb-12">
        <div className="container">
          {/* Feature Tour */}
          <AnimatePresence>
            {showTour && (
              <div className="mb-8">
                <FeatureTour onDismiss={() => setShowTour(false)} />
              </div>
            )}
          </AnimatePresence>

          {/* Header */}
          <FadeIn>
            <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="pillar-border-accent pl-4">
                  <h1 className="font-display text-3xl font-bold">Dashboard</h1>
                  <p className="mt-1 text-muted-foreground">
                    Manage your enterprise profiles
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-md border border-border/50">
                  <Command className="h-3 w-3" />
                  <span>K</span>
                </div>
                <Button variant="outline" size="sm" asChild className="border-border/60">
                  <Link to="/setup">
                    <Wand2 className="mr-2 h-4 w-4" />
                    Setup Wizard
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild className="border-border/60">
                  <Link to="/analytics">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Analytics
                  </Link>
                </Button>
                <CreateProfileDialog open={dialogOpen} onOpenChange={setDialogOpen} />
              </div>
            </div>
          </FadeIn>

          {/* Profiles Grid */}
          {profiles && profiles.length > 0 ? (
            <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {profiles.map((profile) => (
                <StaggerItem key={profile.id}>
                  <ProfileCard
                    profile={profile}
                    onDelete={setDeleteId}
                  />
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <FadeIn delay={0.1}>
              <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/20 py-20">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10">
                  <Sparkles className="h-8 w-8 text-accent" />
                </div>
                <h3 className="mb-2 font-display text-xl font-semibold">No profiles yet</h3>
                <p className="mb-6 text-muted-foreground max-w-sm text-center">
                  Create your first enterprise profile to showcase your company
                </p>
                <CreateProfileDialog open={dialogOpen} onOpenChange={setDialogOpen} />
              </div>
            </FadeIn>
          )}

          {/* Activity Feed + Stats */}
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <FadeIn delay={0.2} className="lg:col-span-2">
              {profiles && profiles.length > 0 && (
                <div className="pt-6 border-t border-border/40">
                  <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <span className="the-dot" />
                      <span>{profiles.length} profile{profiles.length !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-success" />
                      <span>{profiles.filter(p => p.status === 'published').length} published</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-warning" />
                      <span>{profiles.filter(p => p.status === 'draft').length} drafts</span>
                    </div>
                  </div>
                </div>
              )}
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="rounded-xl border border-border/50 bg-card p-4">
                <h3 className="font-display text-sm font-semibold mb-3 flex items-center gap-2">
                  <span className="the-dot" />
                  Recent Activity
                </h3>
                <ActivityFeed />
              </div>
            </FadeIn>
          </div>
        </div>
      </main>

      <Footer />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Profile</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this profile? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
