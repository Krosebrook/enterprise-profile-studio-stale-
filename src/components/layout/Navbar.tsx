import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { LogOut, LayoutDashboard, BookOpen, BarChart3, Brain, Users, Bot, FileText, Wand2, Menu, MessageSquare, Settings } from 'lucide-react';
import { useState } from 'react';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { KeyboardShortcutsHelp } from '@/components/ui/KeyboardShortcutsHelp';
import { Badge } from '@/components/ui/badge';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/knowledge', icon: BookOpen, label: 'Knowledge' },
  { to: '/ai-explorer', icon: Brain, label: 'AI Explorer' },
  { to: '/ai-playbooks', icon: FileText, label: 'Playbooks' },
  { to: '/ai-chat', icon: MessageSquare, label: 'AI Chat' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/personas', icon: Bot, label: 'Personas' },
];

export function Navbar() {
  const { user, signOut } = useAuth();
  const { role, isAdmin } = useUserRole();
  const navigate = useNavigate();
  const [showRerunConfirm, setShowRerunConfirm] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 font-display text-xl font-bold">
          <div className="flex items-baseline gap-0.5">
            <span className="text-foreground">int</span>
            <span className="the-dot animate-pulse-dot" />
            <span className="text-foreground">nc</span>
          </div>
        </Link>

        <nav className="flex items-center gap-1">
          {user ? (
            <>
              {/* Desktop Nav */}
              <div className="hidden lg:flex items-center gap-1">
                {navItems.map(item => (
                  <Button key={item.to} variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground" asChild>
                    <Link to={item.to}>
                      <item.icon className="h-4 w-4" />
                      <span className="hidden xl:inline">{item.label}</span>
                    </Link>
                  </Button>
                ))}
                {isAdmin && (
                  <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground" asChild>
                    <Link to="/team">
                      <Users className="h-4 w-4" />
                      <span className="hidden xl:inline">Team</span>
                    </Link>
                  </Button>
                )}
              </div>

              {/* Mobile Hamburger */}
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72">
                  <SheetHeader>
                    <SheetTitle className="flex items-baseline gap-0.5 font-display text-xl">
                      <span>int</span>
                      <span className="the-dot" />
                      <span>nc</span>
                    </SheetTitle>
                  </SheetHeader>
                  <nav className="mt-6 flex flex-col gap-1">
                    {navItems.map(item => (
                      <Button
                        key={item.to}
                        variant="ghost"
                        className="justify-start gap-3 text-muted-foreground hover:text-foreground"
                        asChild
                        onClick={() => setMobileOpen(false)}
                      >
                        <Link to={item.to}>
                          <item.icon className="h-4 w-4" />
                          {item.label}
                        </Link>
                      </Button>
                    ))}
                    {isAdmin && (
                      <Button variant="ghost" className="justify-start gap-3 text-muted-foreground hover:text-foreground" asChild onClick={() => setMobileOpen(false)}>
                        <Link to="/team">
                          <Users className="h-4 w-4" />
                          Team
                        </Link>
                      </Button>
                    )}
                    <div className="my-2 h-px bg-border" />
                    <Button variant="ghost" className="justify-start gap-3 text-muted-foreground hover:text-foreground" asChild onClick={() => setMobileOpen(false)}>
                      <Link to="/settings">
                        <Settings className="h-4 w-4" />
                        Settings
                      </Link>
                    </Button>
                    <Button variant="ghost" className="justify-start gap-3 text-muted-foreground hover:text-foreground" asChild onClick={() => setMobileOpen(false)}>
                      <Link to="/setup">
                        <Wand2 className="h-4 w-4" />
                        Setup Wizard
                      </Link>
                    </Button>
                    <div className="my-2 h-px bg-border" />
                    <Button variant="ghost" className="justify-start gap-3 text-destructive hover:text-destructive" onClick={() => { setMobileOpen(false); handleSignOut(); }}>
                      <LogOut className="h-4 w-4" />
                      Sign out
                    </Button>
                  </nav>
                </SheetContent>
              </Sheet>

              <div className="hidden lg:flex items-center gap-1">
                <div className="ml-1 h-6 w-px bg-border" />
                <KeyboardShortcutsHelp />
                <ThemeToggle />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9 border-2 border-primary/20">
                      <AvatarFallback className="bg-primary text-primary-foreground font-medium">
                        {user.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-popover" align="end">
                  <div className="flex items-center justify-start gap-2 p-3">
                    <div className="flex flex-col space-y-0.5 leading-none">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{user.email}</p>
                        {role && <Badge variant="outline" className="text-xs">{role}</Badge>}
                      </div>
                      <p className="text-xs text-muted-foreground">Manage your account</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowRerunConfirm(true)}>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Re-run Setup Wizard
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <AlertDialog open={showRerunConfirm} onOpenChange={setShowRerunConfirm}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Re-run Setup Wizard?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will regenerate your enterprise profile, AI personas, and dashboard configuration. Any customizations you've made may be overwritten.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={async () => {
                        if (!user) return;
                        await supabase
                          .from('user_onboarding_preferences')
                          .update({ onboarding_completed: false })
                          .eq('user_id', user.id);
                        navigate('/setup');
                      }}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          ) : (
            <>
              <ThemeToggle />
              <Button variant="ghost" asChild className="text-muted-foreground hover:text-foreground">
                <Link to="/login">Sign in</Link>
              </Button>
              <Button asChild className="ml-2 accent-gradient border-0 shadow-sm hover:shadow-md transition-shadow">
                <Link to="/signup">Get Started</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
