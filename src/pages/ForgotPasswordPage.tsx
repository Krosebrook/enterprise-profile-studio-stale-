import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Mail, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      setSent(true);
      toast.success('Password reset email sent!');
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
        <div className="fixed inset-0 halftone-pattern opacity-30 pointer-events-none" />
        <Card className="relative w-full max-w-md animate-scale-in border-border/50 shadow-xl bg-card">
          <CardHeader className="space-y-4 text-center pb-2">
            <div className="mx-auto flex items-center justify-center gap-1">
              <span className="font-display text-2xl font-bold">int</span>
              <span className="the-dot-lg animate-pulse-dot" />
              <span className="font-display text-2xl font-bold">nc</span>
            </div>
            <div className="space-y-1">
              <CardTitle className="font-display text-xl">Reset your password</CardTitle>
              <CardDescription>
                {sent
                  ? 'Check your email for a reset link.'
                  : "Enter your email and we'll send you a reset link."}
              </CardDescription>
            </div>
          </CardHeader>

          {!sent ? (
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10 border-border/60 focus:border-primary"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4 pt-2">
                <Button type="submit" className="w-full accent-gradient border-0 shadow-md" size="lg" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Send Reset Link
                </Button>
                <Link to="/login" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-accent">
                  <ArrowLeft className="h-3 w-3" /> Back to sign in
                </Link>
              </CardFooter>
            </form>
          ) : (
            <CardContent className="pt-4 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                We sent a reset link to <strong>{email}</strong>. Click it to set a new password.
              </p>
              <Link to="/login" className="inline-flex items-center gap-1 text-sm text-accent hover:underline">
                <ArrowLeft className="h-3 w-3" /> Back to sign in
              </Link>
            </CardContent>
          )}
        </Card>
      </div>
    </>
  );
}
