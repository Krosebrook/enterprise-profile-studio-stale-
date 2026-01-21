import { AIPlatform, CAPABILITY_LABELS, CapabilityKey } from '@/types/ai-platforms';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Check, Shield, Zap, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlatformCardProps {
  platform: AIPlatform;
  isSelected?: boolean;
  onToggleCompare?: () => void;
  maxCompareReached?: boolean;
}

const ecosystemColors: Record<string, string> = {
  anthropic: 'bg-amber-500',
  openai: 'bg-emerald-500',
  microsoft: 'bg-blue-500',
  google: 'bg-red-500',
  automation: 'bg-purple-500',
  langchain: 'bg-orange-500',
  'open-source': 'bg-slate-500',
  independent: 'bg-cyan-500',
};

const topCapabilities: CapabilityKey[] = [
  'reasoning',
  'codeGeneration',
  'multimodal',
  'speed',
  'costEfficiency',
];

export function PlatformCard({
  platform,
  isSelected = false,
  onToggleCompare,
  maxCompareReached = false,
}: PlatformCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'bg-green-500';
    if (score >= 5) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card className={cn(
      'transition-all duration-200 hover:shadow-md',
      isSelected && 'ring-2 ring-primary'
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className={cn(
              'w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm',
              ecosystemColors[platform.ecosystem] || 'bg-gray-500'
            )}>
              {platform.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <h3 className="font-semibold text-sm">{platform.name}</h3>
              <p className="text-xs text-muted-foreground">{platform.category}</p>
            </div>
          </div>
          <Badge 
            variant={platform.priority === 'Tier 1' ? 'default' : 'secondary'}
            className="text-xs"
          >
            {platform.priority}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Verdict */}
        <p className="text-xs text-muted-foreground line-clamp-2">
          {platform.verdict}
        </p>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Zap className="h-3 w-3" />
            <span className="truncate">{platform.pricing}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Target className="h-3 w-3" />
            <span className="truncate">{platform.marketShare || 'N/A'}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Shield className="h-3 w-3" />
            <span className="truncate">{platform.compliance.length} certs</span>
          </div>
        </div>

        {/* Top Capabilities */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Key Capabilities</p>
          <div className="space-y-1.5">
            {topCapabilities.map((cap) => (
              <div key={cap} className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground w-24 truncate">
                  {CAPABILITY_LABELS[cap]}
                </span>
                <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={cn('h-full rounded-full', getScoreColor(platform.capabilities[cap]))}
                    style={{ width: `${platform.capabilities[cap] * 10}%` }}
                  />
                </div>
                <span className="text-xs font-medium w-4 text-right">
                  {platform.capabilities[cap]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Badges */}
        {platform.compliance.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {platform.compliance.slice(0, 3).map((cert) => (
              <Badge key={cert} variant="outline" className="text-xs px-1.5 py-0">
                {cert}
              </Badge>
            ))}
            {platform.compliance.length > 3 && (
              <Badge variant="outline" className="text-xs px-1.5 py-0">
                +{platform.compliance.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Compare Button */}
        {onToggleCompare && (
          <Button
            variant={isSelected ? 'default' : 'outline'}
            size="sm"
            className="w-full"
            onClick={onToggleCompare}
            disabled={!isSelected && maxCompareReached}
          >
            {isSelected ? (
              <>
                <Check className="h-4 w-4 mr-1" />
                Selected
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-1" />
                Compare
              </>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
