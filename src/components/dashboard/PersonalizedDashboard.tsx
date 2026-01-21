import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  TrendingUp, Target, Briefcase, Users, Bell, 
  ChevronRight, Sparkles, Globe2, DollarSign,
  Clock, AlertCircle, CheckCircle2, ArrowUpRight
} from 'lucide-react';
import { OnboardingUserProfile } from '@/types/onboarding';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { StaggerContainer, StaggerItem, FadeIn } from '@/components/ui/animations';

interface PersonalizedDashboardProps {
  profile: OnboardingUserProfile | null;
  userName: string;
}

interface MockDeal {
  id: string;
  name: string;
  industry: string;
  stage: string;
  amount: number;
  match: number;
  trending: boolean;
  description: string;
}

// Mock deal data - in production, this would come from an API
const generateMockDeals = (profile: OnboardingUserProfile | null): MockDeal[] => {
  if (!profile) return [];
  
  const { targetIndustries, riskTolerance, investmentSizeRange, dealStages } = profile.dealSourcing;
  
  const basDeals = [
    {
      id: '1',
      name: 'TechVenture AI',
      industry: 'Technology',
      stage: 'Series A',
      amount: 5000000,
      match: 95,
      trending: true,
      description: 'AI-powered enterprise automation platform',
    },
    {
      id: '2',
      name: 'HealthCore Systems',
      industry: 'Healthcare & Life Sciences',
      stage: 'Series B',
      amount: 15000000,
      match: 88,
      trending: false,
      description: 'Digital health infrastructure for hospitals',
    },
    {
      id: '3',
      name: 'GreenEnergy Solutions',
      industry: 'Energy & Utilities',
      stage: 'Growth Equity',
      amount: 25000000,
      match: 82,
      trending: true,
      description: 'Renewable energy storage technology',
    },
    {
      id: '4',
      name: 'FinServe Platform',
      industry: 'Financial Services',
      stage: 'Series C+',
      amount: 50000000,
      match: 78,
      trending: false,
      description: 'B2B payments infrastructure',
    },
    {
      id: '5',
      name: 'RetailTech Pro',
      industry: 'Consumer & Retail',
      stage: 'Series A',
      amount: 8000000,
      match: 75,
      trending: true,
      description: 'Omnichannel retail analytics',
    },
  ];

  // Filter and sort by match score
  return basDeals
    .filter(deal => {
      const industryMatch = targetIndustries.length === 0 || targetIndustries.includes(deal.industry);
      const stageMatch = dealStages.length === 0 || dealStages.includes(deal.stage);
      const sizeMatch = deal.amount >= investmentSizeRange.min * 0.5 && deal.amount <= investmentSizeRange.max * 2;
      return industryMatch || stageMatch || sizeMatch;
    })
    .sort((a, b) => b.match - a.match)
    .slice(0, 5);
};

const formatCurrency = (value: number) => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
  return `$${value}`;
};

export function PersonalizedDashboard({ profile, userName }: PersonalizedDashboardProps) {
  const [deals, setDeals] = useState<MockDeal[]>([]);
  
  useEffect(() => {
    setDeals(generateMockDeals(profile));
  }, [profile]);

  if (!profile) {
    return (
      <Card className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/20">
        <CardContent className="flex items-center gap-4 py-6">
          <AlertCircle className="h-8 w-8 text-amber-500" />
          <div>
            <p className="font-medium">Complete your profile</p>
            <p className="text-sm text-muted-foreground">
              Finish onboarding to see personalized deal recommendations
            </p>
          </div>
          <Link to="/onboarding" className="ml-auto">
            <Button>Complete Setup</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  const { welcome, dealSourcing, portfolioGoals } = profile;

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <FadeIn>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold">
              Welcome back, {userName || welcome.fullName}
              <span className="the-dot ml-2" />
            </h1>
            <p className="text-muted-foreground">
              Here are your personalized insights and recommendations
            </p>
          </div>
          <Link to="/onboarding">
            <Button variant="outline" size="sm">
              Edit Preferences
            </Button>
          </Link>
        </div>
      </FadeIn>

      {/* Quick Stats */}
      <StaggerContainer className="grid gap-4 md:grid-cols-4">
        <StaggerItem>
          <Card className="card-hover">
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{deals.length}</p>
                <p className="text-sm text-muted-foreground">Matching Deals</p>
              </div>
            </CardContent>
          </Card>
        </StaggerItem>

        <StaggerItem>
          <Card className="card-hover">
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10">
                <TrendingUp className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{portfolioGoals.targetReturnExpectation.percentage}%</p>
                <p className="text-sm text-muted-foreground">Target Return</p>
              </div>
            </CardContent>
          </Card>
        </StaggerItem>

        <StaggerItem>
          <Card className="card-hover">
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                <DollarSign className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{formatCurrency(dealSourcing.investmentSizeRange.max)}</p>
                <p className="text-sm text-muted-foreground">Max Investment</p>
              </div>
            </CardContent>
          </Card>
        </StaggerItem>

        <StaggerItem>
          <Card className="card-hover">
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
                <Clock className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold capitalize">{portfolioGoals.timeHorizon}</p>
                <p className="text-sm text-muted-foreground">Time Horizon</p>
              </div>
            </CardContent>
          </Card>
        </StaggerItem>
      </StaggerContainer>

      {/* Deal Recommendations */}
      <FadeIn delay={0.2}>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Recommended Deals
                </CardTitle>
              <CardDescription>
                Based on your investment criteria and preferences
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Link to="/deals/compare">
                <Button variant="outline" size="sm">
                  Compare Deals
                </Button>
              </Link>
              <Button variant="outline" size="sm">
                View All
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deals.map((deal, index) => (
                <motion.div
                  key={deal.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex items-center justify-between rounded-lg border p-4 transition-all hover:border-primary/50 hover:bg-muted/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
                        <Briefcase className="h-6 w-6 text-primary" />
                      </div>
                      {deal.trending && (
                        <span className="absolute -right-1 -top-1 flex h-4 w-4">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                          <span className="relative inline-flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] text-white">
                            🔥
                          </span>
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{deal.name}</p>
                      <p className="text-sm text-muted-foreground">{deal.description}</p>
                      <div className="mt-1 flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {deal.industry}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {deal.stage}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatCurrency(deal.amount)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className={cn(
                          'h-4 w-4',
                          deal.match >= 90 ? 'text-green-500' : deal.match >= 80 ? 'text-primary' : 'text-muted-foreground'
                        )} />
                        <span className={cn(
                          'font-semibold',
                          deal.match >= 90 ? 'text-green-500' : deal.match >= 80 ? 'text-primary' : 'text-muted-foreground'
                        )}>
                          {deal.match}% match
                        </span>
                      </div>
                      <Progress value={deal.match} className="mt-1 h-1.5 w-20" />
                    </div>
                    <Button variant="ghost" size="icon" className="opacity-0 transition-opacity group-hover:opacity-100">
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      {/* Profile Summary */}
      <div className="grid gap-6 md:grid-cols-2">
        <FadeIn delay={0.3}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Globe2 className="h-5 w-5 text-primary" />
                Your Focus Areas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="mb-2 text-sm font-medium text-muted-foreground">Industries</p>
                <div className="flex flex-wrap gap-2">
                  {dealSourcing.targetIndustries.length > 0 ? (
                    dealSourcing.targetIndustries.map(industry => (
                      <Badge key={industry} variant="secondary">{industry}</Badge>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">All industries</span>
                  )}
                </div>
              </div>
              <Separator />
              <div>
                <p className="mb-2 text-sm font-medium text-muted-foreground">Geographic Regions</p>
                <div className="flex flex-wrap gap-2">
                  {dealSourcing.geoPreferences.regions.length > 0 ? (
                    dealSourcing.geoPreferences.regions.map(region => (
                      <Badge key={region} variant="outline">{region}</Badge>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">Global</span>
                  )}
                </div>
              </div>
              <Separator />
              <div>
                <p className="mb-2 text-sm font-medium text-muted-foreground">Asset Classes</p>
                <div className="flex flex-wrap gap-2">
                  {portfolioGoals.assetClassPriorities.length > 0 ? (
                    portfolioGoals.assetClassPriorities.map(asset => (
                      <Badge key={asset} variant="outline">{asset}</Badge>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">All asset classes</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn delay={0.4}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5 text-primary" />
                Community Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">Notification Frequency</span>
                </div>
                <Badge variant="secondary" className="capitalize">
                  {profile.communityPreferences.notificationFrequency}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">Engagement Style</span>
                </div>
                <Badge variant="secondary" className="capitalize">
                  {profile.communityPreferences.networkingPriority.replace(/_/g, ' ')}
                </Badge>
              </div>

              <Separator />

              <div>
                <p className="mb-2 text-sm font-medium text-muted-foreground">Peer Groups</p>
                <div className="flex flex-wrap gap-2">
                  {profile.communityPreferences.peerGroupsOfInterest.length > 0 ? (
                    profile.communityPreferences.peerGroupsOfInterest.slice(0, 4).map(group => (
                      <Badge key={group} variant="outline" className="text-xs">{group}</Badge>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">No groups selected</span>
                  )}
                  {profile.communityPreferences.peerGroupsOfInterest.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{profile.communityPreferences.peerGroupsOfInterest.length - 4} more
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}
