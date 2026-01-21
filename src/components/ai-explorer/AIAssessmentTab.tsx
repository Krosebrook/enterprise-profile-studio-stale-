import { useAIAssessment, INDUSTRIES, PRIMARY_OBJECTIVES, AI_TOOLS, SECURITY_REQUIREMENTS, BUDGET_RANGES, IMPLEMENTATION_TIMELINES, ROI_TIMELINES } from '@/hooks/useAIAssessment';
import { useAIPlatforms } from '@/hooks/useAIPlatforms';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ChevronLeft, 
  ChevronRight, 
  Building2, 
  Cpu, 
  Server, 
  Wallet,
  CheckCircle,
  Save,
  RotateCcw,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const STEPS = [
  { title: 'Organization', icon: Building2, description: 'Company profile & objectives' },
  { title: 'AI Usage', icon: Cpu, description: 'Current tools & expertise' },
  { title: 'Technical', icon: Server, description: 'Infrastructure & security' },
  { title: 'Budget', icon: Wallet, description: 'Investment & timeline' },
  { title: 'Results', icon: CheckCircle, description: 'Recommendations' },
];

export function AIAssessmentTab() {
  const { user } = useAuth();
  const { platforms } = useAIPlatforms();
  const {
    currentStep,
    organizationProfile,
    currentAiUsage,
    technicalReadiness,
    budgetTimeline,
    setOrganizationProfile,
    setCurrentAiUsage,
    setTechnicalReadiness,
    setBudgetTimeline,
    nextStep,
    prevStep,
    goToStep,
    resetAssessment,
    calculateReadinessScore,
    generateRecommendations,
    saveAssessment,
  } = useAIAssessment();

  const readinessScore = calculateReadinessScore();
  const recommendations = generateRecommendations();

  const handleSave = async () => {
    if (!user) {
      toast.error('Please sign in to save your assessment');
      return;
    }
    try {
      await saveAssessment.mutateAsync();
      toast.success('Assessment saved successfully');
    } catch (error) {
      toast.error('Failed to save assessment');
    }
  };

  const toggleArrayItem = (arr: string[], item: string) => {
    return arr.includes(item) 
      ? arr.filter(i => i !== item) 
      : [...arr, item];
  };

  const radarData = [
    { subject: 'Digital Maturity', score: organizationProfile.digitalMaturity * 20 },
    { subject: 'Team Proficiency', score: currentAiUsage.teamProficiency === 'expert' ? 100 : currentAiUsage.teamProficiency === 'intermediate' ? 60 : 30 },
    { subject: 'Data Infrastructure', score: technicalReadiness.dataInfrastructure * 20 },
    { subject: 'API Capabilities', score: technicalReadiness.apiCapabilities * 20 },
    { subject: 'Change Readiness', score: budgetTimeline.changeManagementReadiness * 20 },
  ];

  const getPlatformById = (id: string) => platforms.find(p => p.id === id);

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <Card>
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => (
              <button
                key={step.title}
                onClick={() => goToStep(index)}
                className={cn(
                  'flex flex-col items-center gap-1 flex-1 transition-colors',
                  index <= currentStep ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                <div className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors',
                  index < currentStep ? 'bg-primary border-primary text-primary-foreground' :
                  index === currentStep ? 'border-primary' : 'border-muted'
                )}>
                  <step.icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium hidden sm:block">{step.title}</span>
              </button>
            ))}
          </div>
          <Progress value={(currentStep / (STEPS.length - 1)) * 100} className="mt-4" />
        </CardContent>
      </Card>

      {/* Step Content */}
      <Card className="min-h-[500px]">
        <CardHeader>
          <CardTitle>{STEPS[currentStep].title}</CardTitle>
          <CardDescription>{STEPS[currentStep].description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Organization Profile */}
          {currentStep === 0 && (
            <>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label>Company Size (employees)</Label>
                  <span className="text-sm font-medium">{organizationProfile.companySize.toLocaleString()}</span>
                </div>
                <Slider
                  value={[organizationProfile.companySize]}
                  onValueChange={([v]) => setOrganizationProfile({ ...organizationProfile, companySize: v })}
                  min={1}
                  max={10000}
                  step={10}
                />
              </div>

              <div className="space-y-2">
                <Label>Industry</Label>
                <Select
                  value={organizationProfile.industry}
                  onValueChange={(v) => setOrganizationProfile({ ...organizationProfile, industry: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {INDUSTRIES.map((ind) => (
                      <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label>Digital Maturity Level</Label>
                  <span className="text-sm font-medium">{organizationProfile.digitalMaturity}/5</span>
                </div>
                <Slider
                  value={[organizationProfile.digitalMaturity]}
                  onValueChange={([v]) => setOrganizationProfile({ ...organizationProfile, digitalMaturity: v })}
                  min={1}
                  max={5}
                  step={1}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Basic</span>
                  <span>Advanced</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Primary Objectives (select all that apply)</Label>
                <div className="flex flex-wrap gap-2">
                  {PRIMARY_OBJECTIVES.map((obj) => (
                    <Badge
                      key={obj}
                      variant={organizationProfile.primaryObjectives.includes(obj) ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => setOrganizationProfile({
                        ...organizationProfile,
                        primaryObjectives: toggleArrayItem(organizationProfile.primaryObjectives, obj),
                      })}
                    >
                      {obj}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Step 2: Current AI Usage */}
          {currentStep === 1 && (
            <>
              <div className="space-y-2">
                <Label>Existing AI Tools in Use</Label>
                <div className="flex flex-wrap gap-2">
                  {AI_TOOLS.map((tool) => (
                    <Badge
                      key={tool}
                      variant={currentAiUsage.existingTools.includes(tool) ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => setCurrentAiUsage({
                        ...currentAiUsage,
                        existingTools: toggleArrayItem(currentAiUsage.existingTools, tool),
                      })}
                    >
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label>AI Budget (% of IT budget)</Label>
                  <span className="text-sm font-medium">{currentAiUsage.aiBudgetPercentage}%</span>
                </div>
                <Slider
                  value={[currentAiUsage.aiBudgetPercentage]}
                  onValueChange={([v]) => setCurrentAiUsage({ ...currentAiUsage, aiBudgetPercentage: v })}
                  min={0}
                  max={50}
                  step={1}
                />
              </div>

              <div className="space-y-2">
                <Label>Team AI Proficiency</Label>
                <Select
                  value={currentAiUsage.teamProficiency}
                  onValueChange={(v: 'novice' | 'intermediate' | 'expert') => 
                    setCurrentAiUsage({ ...currentAiUsage, teamProficiency: v })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="novice">Novice - Limited AI experience</SelectItem>
                    <SelectItem value="intermediate">Intermediate - Some AI projects</SelectItem>
                    <SelectItem value="expert">Expert - Extensive AI deployment</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label>Past AI Project Success Rate</Label>
                  <span className="text-sm font-medium">{currentAiUsage.pastProjectSuccess}%</span>
                </div>
                <Slider
                  value={[currentAiUsage.pastProjectSuccess]}
                  onValueChange={([v]) => setCurrentAiUsage({ ...currentAiUsage, pastProjectSuccess: v })}
                  min={0}
                  max={100}
                  step={5}
                />
              </div>
            </>
          )}

          {/* Step 3: Technical Readiness */}
          {currentStep === 2 && (
            <>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label>Data Infrastructure Maturity</Label>
                  <span className="text-sm font-medium">{technicalReadiness.dataInfrastructure}/5</span>
                </div>
                <Slider
                  value={[technicalReadiness.dataInfrastructure]}
                  onValueChange={([v]) => setTechnicalReadiness({ ...technicalReadiness, dataInfrastructure: v })}
                  min={1}
                  max={5}
                  step={1}
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label>API Integration Capabilities</Label>
                  <span className="text-sm font-medium">{technicalReadiness.apiCapabilities}/5</span>
                </div>
                <Slider
                  value={[technicalReadiness.apiCapabilities]}
                  onValueChange={([v]) => setTechnicalReadiness({ ...technicalReadiness, apiCapabilities: v })}
                  min={1}
                  max={5}
                  step={1}
                />
              </div>

              <div className="space-y-2">
                <Label>Security & Compliance Requirements</Label>
                <div className="flex flex-wrap gap-2">
                  {SECURITY_REQUIREMENTS.map((req) => (
                    <Badge
                      key={req}
                      variant={technicalReadiness.securityRequirements.includes(req) ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => setTechnicalReadiness({
                        ...technicalReadiness,
                        securityRequirements: toggleArrayItem(technicalReadiness.securityRequirements, req),
                      })}
                    >
                      {req}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Deployment Preference</Label>
                <Select
                  value={technicalReadiness.deploymentPreference}
                  onValueChange={(v: 'cloud' | 'on-premise' | 'hybrid') => 
                    setTechnicalReadiness({ ...technicalReadiness, deploymentPreference: v })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cloud">Cloud-only</SelectItem>
                    <SelectItem value="on-premise">On-premise</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {/* Step 4: Budget & Timeline */}
          {currentStep === 3 && (
            <>
              <div className="space-y-2">
                <Label>Budget Range</Label>
                <Select
                  value={budgetTimeline.budgetRange}
                  onValueChange={(v) => setBudgetTimeline({ ...budgetTimeline, budgetRange: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {BUDGET_RANGES.map((range) => (
                      <SelectItem key={range} value={range}>{range}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Implementation Timeline</Label>
                <Select
                  value={budgetTimeline.implementationTimeline}
                  onValueChange={(v) => setBudgetTimeline({ ...budgetTimeline, implementationTimeline: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {IMPLEMENTATION_TIMELINES.map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Expected ROI Timeline</Label>
                <Select
                  value={budgetTimeline.expectedRoiTimeline}
                  onValueChange={(v) => setBudgetTimeline({ ...budgetTimeline, expectedRoiTimeline: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ROI_TIMELINES.map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label>Change Management Readiness</Label>
                  <span className="text-sm font-medium">{budgetTimeline.changeManagementReadiness}/5</span>
                </div>
                <Slider
                  value={[budgetTimeline.changeManagementReadiness]}
                  onValueChange={([v]) => setBudgetTimeline({ ...budgetTimeline, changeManagementReadiness: v })}
                  min={1}
                  max={5}
                  step={1}
                />
              </div>
            </>
          )}

          {/* Step 5: Results */}
          {currentStep === 4 && (
            <div className="space-y-6">
              {/* Score */}
              <div className="text-center">
                <div className={cn(
                  'text-6xl font-bold mb-2',
                  readinessScore >= 70 ? 'text-green-600' :
                  readinessScore >= 40 ? 'text-yellow-600' : 'text-red-600'
                )}>
                  {readinessScore}
                </div>
                <div className="text-lg text-muted-foreground">AI Readiness Score</div>
              </div>

              {/* Radar Chart */}
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar
                      name="Your Score"
                      dataKey="score"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.3}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Assessment */}
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-sm">{recommendations.overallAssessment}</p>
              </div>

              {/* Platform Recommendations */}
              <div className="grid gap-4 sm:grid-cols-3">
                {recommendations.tier1Platforms.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2 text-green-600">Tier 1 Matches</h4>
                    <div className="space-y-1">
                      {recommendations.tier1Platforms.map((id) => {
                        const p = getPlatformById(id);
                        return p ? (
                          <Badge key={id} variant="outline" className="block">
                            {p.name}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
                {recommendations.tier2Platforms.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2 text-yellow-600">Tier 2 Matches</h4>
                    <div className="space-y-1">
                      {recommendations.tier2Platforms.map((id) => {
                        const p = getPlatformById(id);
                        return p ? (
                          <Badge key={id} variant="outline" className="block">
                            {p.name}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
                {recommendations.tier3Platforms.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2 text-muted-foreground">Consider</h4>
                    <div className="space-y-1">
                      {recommendations.tier3Platforms.map((id) => {
                        const p = getPlatformById(id);
                        return p ? (
                          <Badge key={id} variant="outline" className="block">
                            {p.name}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Items */}
              <div>
                <h4 className="font-medium mb-2">Recommended Actions</h4>
                <ul className="space-y-2">
                  {recommendations.actionItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 0}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>

        <div className="flex gap-2">
          <Button variant="ghost" onClick={resetAssessment}>
            <RotateCcw className="h-4 w-4 mr-1" />
            Reset
          </Button>
          
          {currentStep === 4 && user && (
            <Button onClick={handleSave} disabled={saveAssessment.isPending}>
              <Save className="h-4 w-4 mr-1" />
              Save Assessment
            </Button>
          )}
        </div>

        <Button
          onClick={nextStep}
          disabled={currentStep === STEPS.length - 1}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
