import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { DealComparisonTool } from '@/components/deals/DealComparisonTool';
import { OnboardingUserProfile } from '@/types/onboarding';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DealComparisonPage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<OnboardingUserProfile | null>(null);

  useEffect(() => {
    // Load profile from localStorage
    const savedProfile = localStorage.getItem('onboarding_profile');
    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile));
      } catch (e) {
        console.error('Failed to parse onboarding profile:', e);
      }
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {!profile && (
              <Card className="mb-6 border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/20">
                <CardContent className="flex items-center gap-4 py-6">
                  <AlertCircle className="h-8 w-8 text-amber-500" />
                  <div>
                    <p className="font-medium">Complete your profile for better matching</p>
                    <p className="text-sm text-muted-foreground">
                      Set up your investment preferences to see personalized match scores
                    </p>
                  </div>
                  <Link to="/onboarding" className="ml-auto">
                    <Button>Complete Setup</Button>
                  </Link>
                </CardContent>
              </Card>
            )}

            <DealComparisonTool profile={profile} />
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
