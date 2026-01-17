import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { OnboardingUserProfile } from '@/types/onboarding';
import { 
  User, Target, Briefcase, Users, Check, 
  DollarSign, Globe2, Clock, TrendingUp, Bell, Shield
} from 'lucide-react';

interface ReviewStepProps {
  profile: OnboardingUserProfile;
  onEditSection: (step: number) => void;
}

const formatCurrency = (value: number) => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
  return `$${value}`;
};

export function ReviewStep({ profile, onEditSection }: ReviewStepProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg"
        >
          <Check className="h-8 w-8" />
        </motion.div>
        <h2 className="font-display text-2xl font-bold">Review Your Preferences</h2>
        <p className="mt-2 text-muted-foreground">
          Here's a summary of your profile. Click any section to make changes.
        </p>
      </motion.div>

      {/* Profile Summary */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Welcome / About You */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card 
            className="h-full cursor-pointer border-border/50 transition-all hover:border-primary/50 hover:shadow-md"
            onClick={() => onEditSection(0)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="h-5 w-5 text-primary" />
                About You
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <span className="text-sm text-muted-foreground">Name:</span>
                <p className="font-medium">{profile.welcome.fullName || 'Not set'}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Role:</span>
                <p className="font-medium capitalize">{profile.welcome.role.replace(/_/g, ' ')}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Experience:</span>
                <p className="font-medium capitalize">{profile.welcome.experienceLevel}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Deal Sourcing */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card 
            className="h-full cursor-pointer border-border/50 transition-all hover:border-primary/50 hover:shadow-md"
            onClick={() => onEditSection(1)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="h-5 w-5 text-primary" />
                Deal Sourcing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <DollarSign className="h-3 w-3" /> Investment Range:
                </span>
                <p className="font-medium">
                  {formatCurrency(profile.dealSourcing.investmentSizeRange.min)} – {formatCurrency(profile.dealSourcing.investmentSizeRange.max)}
                </p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Industries:</span>
                <div className="mt-1 flex flex-wrap gap-1">
                  {profile.dealSourcing.targetIndustries.slice(0, 3).map(i => (
                    <Badge key={i} variant="secondary" className="text-xs">{i}</Badge>
                  ))}
                  {profile.dealSourcing.targetIndustries.length > 3 && (
                    <Badge variant="outline" className="text-xs">+{profile.dealSourcing.targetIndustries.length - 3}</Badge>
                  )}
                  {profile.dealSourcing.targetIndustries.length === 0 && (
                    <span className="text-sm text-muted-foreground">None selected</span>
                  )}
                </div>
              </div>
              <div>
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Globe2 className="h-3 w-3" /> Regions:
                </span>
                <p className="font-medium">
                  {profile.dealSourcing.geoPreferences.regions.join(', ') || 'No preference'}
                </p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Risk Tolerance:</span>
                <p className="font-medium capitalize">{profile.dealSourcing.riskTolerance.replace(/_/g, ' ')}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Portfolio Goals */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card 
            className="h-full cursor-pointer border-border/50 transition-all hover:border-primary/50 hover:shadow-md"
            onClick={() => onEditSection(2)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Briefcase className="h-5 w-5 text-primary" />
                Portfolio Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" /> Time Horizon:
                </span>
                <p className="font-medium capitalize">{profile.portfolioGoals.timeHorizon.replace(/_/g, ' ')}</p>
              </div>
              <div>
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <TrendingUp className="h-3 w-3" /> Target Return:
                </span>
                <p className="font-medium">
                  {profile.portfolioGoals.targetReturnExpectation.percentage}% {profile.portfolioGoals.targetReturnExpectation.period}
                </p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Asset Classes:</span>
                <div className="mt-1 flex flex-wrap gap-1">
                  {profile.portfolioGoals.assetClassPriorities.slice(0, 3).map(a => (
                    <Badge key={a} variant="secondary" className="text-xs">{a}</Badge>
                  ))}
                  {profile.portfolioGoals.assetClassPriorities.length > 3 && (
                    <Badge variant="outline" className="text-xs">+{profile.portfolioGoals.assetClassPriorities.length - 3}</Badge>
                  )}
                  {profile.portfolioGoals.assetClassPriorities.length === 0 && (
                    <span className="text-sm text-muted-foreground">None selected</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Community */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card 
            className="h-full cursor-pointer border-border/50 transition-all hover:border-primary/50 hover:shadow-md"
            onClick={() => onEditSection(3)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5 text-primary" />
                Community
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <span className="text-sm text-muted-foreground">Engagement Style:</span>
                <p className="font-medium capitalize">{profile.communityPreferences.networkingPriority.replace(/_/g, ' ')}</p>
              </div>
              <div>
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Bell className="h-3 w-3" /> Notifications:
                </span>
                <p className="font-medium capitalize">{profile.communityPreferences.notificationFrequency}</p>
              </div>
              <div>
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Shield className="h-3 w-3" /> Privacy:
                </span>
                <p className="font-medium capitalize">{profile.communityPreferences.privacySettings.profileVisibility.replace(/_/g, ' ')}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Peer Groups:</span>
                <p className="font-medium">
                  {profile.communityPreferences.peerGroupsOfInterest.length} selected
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* JSON Preview (collapsible for technical users) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Your Profile Data</CardTitle>
            <CardDescription>
              This data will be used to personalize your dashboard, recommendations, and notifications.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="max-h-64 overflow-auto rounded-lg bg-muted p-4 text-xs">
              {JSON.stringify(profile, null, 2)}
            </pre>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
