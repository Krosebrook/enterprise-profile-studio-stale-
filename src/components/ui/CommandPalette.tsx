import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { useAuth } from '@/contexts/AuthContext';
import { useProfiles } from '@/hooks/useProfiles';
import { useKnowledgeDocuments } from '@/hooks/useKnowledgeBase';
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Plus,
  LogIn,
  UserPlus,
  Home,
  FileText,
  Sparkles,
  Search,
  Moon,
  Sun,
  LogOut,
} from 'lucide-react';

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { data: profiles } = useProfiles();
  const { data: documents } = useKnowledgeDocuments();

  // Toggle theme function
  const toggleTheme = useCallback(() => {
    const root = window.document.documentElement;
    const currentTheme = root.classList.contains('dark') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    root.classList.remove('light', 'dark');
    root.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        {/* Navigation */}
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => runCommand(() => navigate('/'))}>
            <Home className="mr-2 h-4 w-4" />
            Home
          </CommandItem>
          {user ? (
            <>
              <CommandItem onSelect={() => runCommand(() => navigate('/dashboard'))}>
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </CommandItem>
              <CommandItem onSelect={() => runCommand(() => navigate('/knowledge'))}>
                <BookOpen className="mr-2 h-4 w-4" />
                Knowledge Base
              </CommandItem>
              <CommandItem onSelect={() => runCommand(() => navigate('/analytics'))}>
                <BarChart3 className="mr-2 h-4 w-4" />
                Analytics
              </CommandItem>
            </>
          ) : (
            <>
              <CommandItem onSelect={() => runCommand(() => navigate('/login'))}>
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </CommandItem>
              <CommandItem onSelect={() => runCommand(() => navigate('/signup'))}>
                <UserPlus className="mr-2 h-4 w-4" />
                Sign Up
              </CommandItem>
            </>
          )}
        </CommandGroup>

        <CommandSeparator />

        {/* Quick Actions */}
        <CommandGroup heading="Quick Actions">
          {user && (
            <>
              <CommandItem onSelect={() => runCommand(() => navigate('/knowledge/new'))}>
                <Plus className="mr-2 h-4 w-4" />
                New Document
              </CommandItem>
            </>
          )}
          <CommandItem onSelect={() => runCommand(toggleTheme)}>
            <Sun className="mr-2 h-4 w-4 dark:hidden" />
            <Moon className="mr-2 h-4 w-4 hidden dark:block" />
            Toggle Theme
          </CommandItem>
          {user && (
            <CommandItem onSelect={() => runCommand(async () => { await signOut(); navigate('/'); })}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </CommandItem>
          )}
        </CommandGroup>

        {/* Profiles */}
        {user && profiles && profiles.length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Profiles">
              {profiles.slice(0, 5).map((profile) => (
                <CommandItem
                  key={profile.id}
                  onSelect={() => runCommand(() => navigate(`/profile/${profile.id}/edit`))}
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  {profile.name}
                  <span className="ml-auto text-xs text-muted-foreground">
                    {profile.status}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}

        {/* Documents */}
        {user && documents && documents.length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Documents">
              {documents.slice(0, 5).map((doc) => (
                <CommandItem
                  key={doc.id}
                  onSelect={() => runCommand(() => navigate(`/knowledge/${doc.slug}`))}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  {doc.title}
                  {doc.category && (
                    <span className="ml-auto text-xs text-muted-foreground">
                      {doc.category}
                    </span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}
      </CommandList>
    </CommandDialog>
  );
}
