import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Brain, Sparkles, Target, Zap, TrendingUp, Award, CheckCircle2, Loader2 } from 'lucide-react';
import { useAIRecommendations, type UsagePatterns, type PlatformRecommendation } from '@/hooks/useAIRecommendations';
import { useAuth } from '@/contexts/AuthContext';

const useCases = [
  'Code Generation & Development',
  'Content Creation & Marketing',
  'Data Analysis & Insights',
  'Customer Support Automation',
  'Document Processing',
  'Enterprise Search',
  'Workflow Automation',
  'Research & Analysis'
];

const budgetOptions = [
  { value: 'startup', label: 'Startup ($0-$500/mo)' },
  { value: 'growth', label: 'Growth ($500-$2,000/mo)' },
  { value: 'enterprise', label: 'Enterprise ($2,000-$10,000/mo)' },
  { value: 'unlimited', label: 'Unlimited ($10,000+/mo)' }
];

const technicalLevels = [
  { value: 'beginner', label: 'Beginner - No-code preferred' },
  { value: 'intermediate', label: 'Intermediate - Some coding' },
  { value: 'advanced', label: 'Advanced - Full API access' },
  { value: 'expert', label: 'Expert - Custom deployments' }
];

const industries = [
  'Technology', 'Healthcare', 'Finance', 'Retail', 'Manufacturing',
  'Education', 'Legal', 'Media', 'Government', 'Other'
];

const capabilities = [
  'Reasoning', 'Speed', 'Cost Efficiency', 'Code Generation',
  'Writing Quality', 'Multimodal', 'Enterprise Security', 'API Flexibility'
];

export function AIRecommendationEngine() {
  const { user } = useAuth();
  const { loading, result, getRecommendations, clearRecommendations } = useAIRecommendations();
  
  const [usagePatterns, setUsagePatterns] = useState<UsagePatterns>({
    primaryUseCase: '',
    teamSize: 5,
    budget: 'growth',
    technicalLevel: 'intermediate',
    industryFocus: 'Technology',
    priorityCapabilities: []
  });

  const [currentPlatforms, setCurrentPlatforms] = useState<string[]>([]);

  const toggleCapability = (cap: string) => {
    setUsagePatterns(prev => ({
      ...prev,
      priorityCapabilities: prev.priorityCapabilities.includes(cap)
        ? prev.priorityCapabilities.filter(c => c !== cap)
        : [...prev.priorityCapabilities, cap]
    }));
  };

  const handleGetRecommendations = () => {
    if (!usagePatterns.primaryUseCase) {
      return;
    }
    getRecommendations(usagePatterns, currentPlatforms.length > 0 ? currentPlatforms : undefined);
  };

  const getEffortColor = (effort?: string) => {
    switch (effort) {
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Brain className="h-7 w-7 text-primary" />
            AI Recommendation Engine
          </h2>
          <p className="text-muted-foreground mt-1">
            Get personalized AI platform recommendations based on your usage patterns
          </p>
        </div>
        {result && (
          <Button variant="outline" onClick={clearRecommendations}>
            Start Over
          </Button>
        )}
      </div>

      {!result ? (
        /* Input Form */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Primary Use Case */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="h-5 w-5 text-blue-500" />
                Primary Use Case
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={usagePatterns.primaryUseCase}
                onValueChange={(value) => setUsagePatterns(prev => ({ ...prev, primaryUseCase: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your primary use case..." />
                </SelectTrigger>
                <SelectContent>
                  {useCases.map(uc => (
                    <SelectItem key={uc} value={uc}>{uc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Team Size */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Team Size: {usagePatterns.teamSize} users</CardTitle>
            </CardHeader>
            <CardContent>
              <Slider
                value={[usagePatterns.teamSize]}
                onValueChange={(value) => setUsagePatterns(prev => ({ ...prev, teamSize: value[0] }))}
                max={500}
                min={1}
                step={1}
                className="mt-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>1</span>
                <span>100</span>
                <span>250</span>
                <span>500+</span>
              </div>
            </CardContent>
          </Card>

          {/* Budget */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-green-500" />
                Budget Range
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={usagePatterns.budget}
                onValueChange={(value) => setUsagePatterns(prev => ({ ...prev, budget: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {budgetOptions.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Technical Level */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Zap className="h-5 w-5 text-yellow-500" />
                Technical Level
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={usagePatterns.technicalLevel}
                onValueChange={(value) => setUsagePatterns(prev => ({ ...prev, technicalLevel: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {technicalLevels.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Industry Focus */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Industry Focus</CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={usagePatterns.industryFocus}
                onValueChange={(value) => setUsagePatterns(prev => ({ ...prev, industryFocus: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {industries.map(ind => (
                    <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Current Platforms */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Current Platforms (Optional)</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="e.g., ChatGPT, GitHub Copilot (comma-separated)"
                value={currentPlatforms.join(', ')}
                onChange={(e) => setCurrentPlatforms(e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
              />
            </CardContent>
          </Card>

          {/* Priority Capabilities */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="h-5 w-5 text-purple-500" />
                Priority Capabilities (Select up to 4)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {capabilities.map(cap => (
                  <Badge
                    key={cap}
                    variant={usagePatterns.priorityCapabilities.includes(cap) ? "default" : "outline"}
                    className="cursor-pointer text-sm px-3 py-1.5 transition-all"
                    onClick={() => usagePatterns.priorityCapabilities.length < 4 || usagePatterns.priorityCapabilities.includes(cap) ? toggleCapability(cap) : null}
                  >
                    {usagePatterns.priorityCapabilities.includes(cap) && (
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                    )}
                    {cap}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Generate Button */}
          <div className="lg:col-span-2">
            <Button
              size="lg"
              className="w-full gap-2"
              onClick={handleGetRecommendations}
              disabled={loading || !usagePatterns.primaryUseCase}
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Analyzing Your Needs...
                </>
              ) : (
                <>
                  <Brain className="h-5 w-5" />
                  Get AI-Powered Recommendations
                </>
              )}
            </Button>
            {!user && (
              <p className="text-center text-sm text-muted-foreground mt-2">
                Sign in to save your recommendations
              </p>
            )}
          </div>
        </div>
      ) : (
        /* Results */
        <div className="space-y-6">
          {/* Strategy Overview */}
          <Card className="bg-gradient-to-r from-primary/10 to-purple-500/10 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-6 w-6 text-primary" />
                Overall Strategy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">{result.overallStrategy}</p>
              
              {result.suggestedStack && (
                <div className="mt-4 pt-4 border-t border-border/50">
                  <h4 className="font-semibold mb-2">Suggested Stack:</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="default" className="text-sm">
                      Primary: {result.suggestedStack.primary}
                    </Badge>
                    {result.suggestedStack.secondary && (
                      <Badge variant="secondary" className="text-sm">
                        Secondary: {result.suggestedStack.secondary}
                      </Badge>
                    )}
                    {result.suggestedStack.specialized?.map(spec => (
                      <Badge key={spec} variant="outline" className="text-sm">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {result.recommendations.map((rec: PlatformRecommendation, index: number) => (
              <Card key={rec.platformName} className={index === 0 ? 'border-primary/50 ring-2 ring-primary/20' : ''}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{rec.platformName}</CardTitle>
                    <Badge variant={index === 0 ? 'default' : 'secondary'}>
                      {rec.matchScore}% match
                    </Badge>
                  </div>
                  <Badge variant="outline" className="w-fit">{rec.category}</Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Match Score</span>
                      <span className="font-medium">{rec.matchScore}%</span>
                    </div>
                    <Progress value={rec.matchScore} className="h-2" />
                  </div>

                  <p className="text-sm text-muted-foreground">{rec.reasoning}</p>

                  <div>
                    <h5 className="text-sm font-medium mb-2">Key Strengths:</h5>
                    <div className="flex flex-wrap gap-1">
                      {rec.keyStrengths.slice(0, 3).map(strength => (
                        <Badge key={strength} variant="outline" className="text-xs">
                          {strength}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {rec.considerations && rec.considerations.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium mb-2">Considerations:</h5>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {rec.considerations.slice(0, 2).map(c => (
                          <li key={c}>• {c}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t">
                    {rec.estimatedROI && (
                      <span className="text-xs text-muted-foreground">
                        ROI: {rec.estimatedROI}
                      </span>
                    )}
                    {rec.implementationEffort && (
                      <Badge className={`text-xs ${getEffortColor(rec.implementationEffort)}`}>
                        {rec.implementationEffort} effort
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
