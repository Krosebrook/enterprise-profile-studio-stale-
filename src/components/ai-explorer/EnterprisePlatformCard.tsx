import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { 
  Check, 
  ChevronRight, 
  ExternalLink, 
  Building2, 
  Shield, 
  Zap,
  Brain,
  Code,
  Users,
  Globe
} from 'lucide-react';
import { EnterprisePlatform } from '@/data/enterprisePlatformData';
import { cn } from '@/lib/utils';

interface EnterprisePlatformCardProps {
  platform: EnterprisePlatform;
  isSelected?: boolean;
  onToggleCompare?: () => void;
  maxCompareReached?: boolean;
}

export function EnterprisePlatformCard({
  platform,
  isSelected = false,
  onToggleCompare,
  maxCompareReached = false
}: EnterprisePlatformCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH PRIORITY':
        return 'bg-red-500/10 text-red-600 border-red-200';
      case 'BASELINE':
        return 'bg-blue-500/10 text-blue-600 border-blue-200';
      case 'DUAL PLATFORM':
        return 'bg-purple-500/10 text-purple-600 border-purple-200';
      case 'SPECIALIZED':
        return 'bg-amber-500/10 text-amber-600 border-amber-200';
      case 'COMPLIANCE':
        return 'bg-green-500/10 text-green-600 border-green-200';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getCapabilityIcon = (capability: string) => {
    switch (capability) {
      case 'coding':
        return <Code className="h-3 w-3" />;
      case 'compliance':
        return <Shield className="h-3 w-3" />;
      case 'productivity':
        return <Zap className="h-3 w-3" />;
      case 'creative':
        return <Brain className="h-3 w-3" />;
      case 'multilingual':
        return <Globe className="h-3 w-3" />;
      case 'customerService':
        return <Users className="h-3 w-3" />;
      default:
        return null;
    }
  };

  return (
    <Dialog>
      <Card 
        className={cn(
          "group relative overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer",
          isSelected && "ring-2 ring-primary"
        )}
      >
        <DialogTrigger asChild>
          <div>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="h-10 w-10 rounded-lg flex items-center justify-center font-bold text-white text-sm"
                    style={{ backgroundColor: platform.logoColor }}
                  >
                    {platform.provider.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm leading-tight">{platform.name}</h3>
                    <p className="text-xs text-muted-foreground">{platform.provider}</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {platform.priority}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Model & Focus */}
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">Model</p>
                <p className="text-sm font-medium truncate">{platform.model}</p>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-muted-foreground">Context</p>
                  <p className="font-medium">{platform.contextWindow}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Pricing</p>
                  <p className="font-medium">{platform.pricingDetails.monthly ? `$${platform.pricingDetails.monthly}/mo` : 'Custom'}</p>
                </div>
              </div>

              {/* Market Share Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Market Position</span>
                  <span className="font-medium">{platform.marketSharePercent}%</span>
                </div>
                <Progress value={platform.marketSharePercent} className="h-1.5" />
              </div>

              {/* Top Capabilities */}
              <div className="flex flex-wrap gap-1">
                {Object.entries(platform.enterpriseCapabilities)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 3)
                  .map(([key, value]) => (
                    <Badge 
                      key={key} 
                      variant="secondary" 
                      className="text-xs gap-1 capitalize"
                    >
                      {getCapabilityIcon(key)}
                      {key}: {value}/10
                    </Badge>
                  ))}
              </div>

              {/* INT Recommendation */}
              {platform.intRecommendation && (
                <div className={cn(
                  "rounded-lg p-2 border text-xs",
                  getPriorityColor(platform.intRecommendation.priority)
                )}>
                  <div className="flex items-center gap-1 font-medium mb-1">
                    <Building2 className="h-3 w-3" />
                    INT Inc. Priority: {platform.intRecommendation.priority}
                  </div>
                  <p className="text-muted-foreground line-clamp-2">
                    {platform.intRecommendation.rationale}
                  </p>
                </div>
              )}

              {/* Footer Actions */}
              <div className="flex items-center justify-between pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs gap-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleCompare?.();
                  }}
                  disabled={!isSelected && maxCompareReached}
                >
                  {isSelected ? (
                    <>
                      <Check className="h-3 w-3" />
                      Selected
                    </>
                  ) : (
                    'Compare'
                  )}
                </Button>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
            </CardContent>
          </div>
        </DialogTrigger>
      </Card>

      {/* Detail Modal */}
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div 
              className="h-12 w-12 rounded-lg flex items-center justify-center font-bold text-white"
              style={{ backgroundColor: platform.logoColor }}
            >
              {platform.provider.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <DialogTitle className="text-xl">{platform.name}</DialogTitle>
              <p className="text-sm text-muted-foreground">{platform.provider} • {platform.model}</p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Overview */}
          <div>
            <h4 className="font-semibold mb-2">Overview</h4>
            <p className="text-sm text-muted-foreground">{platform.details.description}</p>
          </div>

          <Separator />

          {/* Key Specifications */}
          <div>
            <h4 className="font-semibold mb-3">Key Specifications</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground">Market Share</p>
                <p className="font-medium">{platform.marketShare}</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground">Context Window</p>
                <p className="font-medium">{platform.contextWindow}</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground">Pricing</p>
                <p className="font-medium">{platform.pricingDetails.monthly ? `$${platform.pricingDetails.monthly}/user/mo` : platform.pricingDetails.enterprise}</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground">Compliance Score</p>
                <p className="font-medium">{platform.complianceDetails.score}/10</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground">Integration Score</p>
                <p className="font-medium">{platform.integrationDetails.score}/10</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground">Implementation</p>
                <p className="font-medium">{platform.benchmarks.implementationTime}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Compliance & Certifications */}
          <div>
            <h4 className="font-semibold mb-3">Compliance & Certifications</h4>
            <div className="flex flex-wrap gap-2">
              {platform.complianceDetails.certifications.map((cert) => (
                <Badge key={cert} variant="secondary" className="gap-1">
                  <Shield className="h-3 w-3" />
                  {cert}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Strengths */}
          <div>
            <h4 className="font-semibold mb-3">Key Strengths</h4>
            <ul className="space-y-2">
              {platform.details.strengths.map((strength, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          {/* Use Cases */}
          <div>
            <h4 className="font-semibold mb-3">Primary Use Cases</h4>
            <ul className="space-y-2">
              {platform.details.useCases.map((useCase, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <ChevronRight className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <span>{useCase}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* INT Recommendation */}
          {platform.intRecommendation && (
            <>
              <Separator />
              <div className={cn(
                "rounded-lg p-4 border",
                getPriorityColor(platform.intRecommendation.priority)
              )}>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  INT Inc. Recommendation
                </h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Priority:</strong> {platform.intRecommendation.priority}</p>
                  <p><strong>Departments:</strong> {platform.intRecommendation.departments.join(', ')}</p>
                  <p><strong>Rationale:</strong> {platform.intRecommendation.rationale}</p>
                  {platform.benchmarks.roi && (
                    <p><strong>Expected ROI:</strong> {platform.benchmarks.roi}</p>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Benchmarks */}
          {(platform.benchmarks.lmArenaElo || platform.benchmarks.sweBench) && (
            <>
              <Separator />
              <div>
                <h4 className="font-semibold mb-3">Performance Benchmarks</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {platform.benchmarks.lmArenaElo && (
                    <div className="bg-muted/50 rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold">{platform.benchmarks.lmArenaElo}</p>
                      <p className="text-xs text-muted-foreground">LMArena Elo</p>
                    </div>
                  )}
                  {platform.benchmarks.sweBench && (
                    <div className="bg-muted/50 rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold">{platform.benchmarks.sweBench}%</p>
                      <p className="text-xs text-muted-foreground">SWE-bench</p>
                    </div>
                  )}
                  {platform.benchmarks.gpqaDiamond && (
                    <div className="bg-muted/50 rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold">{platform.benchmarks.gpqaDiamond}%</p>
                      <p className="text-xs text-muted-foreground">GPQA Diamond</p>
                    </div>
                  )}
                  {platform.benchmarks.aime2025 && (
                    <div className="bg-muted/50 rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold">{platform.benchmarks.aime2025}%</p>
                      <p className="text-xs text-muted-foreground">AIME 2025</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
