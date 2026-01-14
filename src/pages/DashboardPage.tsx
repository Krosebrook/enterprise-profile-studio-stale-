import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { ProfileCard } from '@/components/dashboard/ProfileCard';
import { CreateProfileDialog } from '@/components/dashboard/CreateProfileDialog';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useProfiles, useDeleteProfile } from '@/hooks/useProfiles';
import { Building2, Loader2, BarChart3 } from 'lucide-react';
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
  const { data: profiles, isLoading: profilesLoading } = useProfiles();
  const deleteProfile = useDeleteProfile();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  const handleDelete = async () => {
    if (deleteId) {
      await deleteProfile.mutateAsync(deleteId);
      setDeleteId(null);
    }
  };

  if (authLoading || profilesLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pb-24 pt-24">
        <div className="container">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-display text-3xl font-bold">Dashboard</h1>
              <p className="mt-1 text-muted-foreground">
                Manage your enterprise profiles
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" asChild>
                <Link to="/analytics">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Analytics
                </Link>
              </Button>
              <CreateProfileDialog />
            </div>
          </div>

          {/* Profiles Grid */}
          {profiles && profiles.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {profiles.map((profile) => (
                <ProfileCard
                  key={profile.id}
                  profile={profile}
                  onDelete={setDeleteId}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/30 py-24">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 font-display text-xl font-semibold">No profiles yet</h3>
              <p className="mb-6 text-muted-foreground">
                Create your first enterprise profile to get started
              </p>
              <CreateProfileDialog />
            </div>
          )}
        </div>
      </main>

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
    </>
  );
}
