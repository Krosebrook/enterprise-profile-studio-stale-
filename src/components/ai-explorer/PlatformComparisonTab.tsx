import { useAIPlatforms } from '@/hooks/useAIPlatforms';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, Plus, AlertCircle } from 'lucide-react';
import { CAPABILITY_LABELS, CapabilityKey } from '@/types/ai-platforms';
import { cn } from '@/lib/utils';
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
  Legend,
  ResponsiveContainer,
} from 'recharts';

const radarCapabilities: CapabilityKey[] = [
  'reasoning',
  'codeGeneration',
  'multimodal',
  'speed',
  'costEfficiency',
  'enterpriseFeatures',
  'developerExperience',
  'dataPrivacy',
];

const colors = ['hsl(210, 100%, 50%)', 'hsl(24, 95%, 53%)', 'hsl(142, 76%, 36%)', 'hsl(280, 65%, 60%)'];

export function PlatformComparisonTab() {
  const { 
    platforms, 
    comparedPlatforms, 
    toggleComparison,
    getComparedPlatformData,
  } = useAIPlatforms();

  const comparedData = getComparedPlatformData();

  const radarData = radarCapabilities.map((cap) => {
    const dataPoint: Record<string, string | number> = {
      capability: CAPABILITY_LABELS[cap],
    };
    comparedData.forEach((platform) => {
      dataPoint[platform.name] = platform.capabilities[cap];
    });
    return dataPoint;
  });

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600 bg-green-50';
    if (score >= 5) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const availablePlatforms = platforms.filter(
    (p) => !comparedPlatforms.includes(p.id)
  );

  return (
    <div className="space-y-6">
      {/* Selection Area */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Select Platforms to Compare</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3 items-center">
            {comparedData.map((platform, index) => (
              <div 
                key={platform.id}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border bg-muted/50"
              >
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: colors[index] }}
                />
                <span className="font-medium text-sm">{platform.name}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5"
                  onClick={() => toggleComparison(platform.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
            
            {comparedPlatforms.length < 4 && (
              <Select onValueChange={(value) => toggleComparison(value)}>
                <SelectTrigger className="w-48">
                  <div className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    <SelectValue placeholder="Add platform" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {availablePlatforms.map((platform) => (
                    <SelectItem key={platform.id} value={platform.id}>
                      {platform.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </CardContent>
      </Card>

      {comparedData.length < 2 ? (
        <Card className="py-12">
          <CardContent className="flex flex-col items-center justify-center text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="font-semibold text-lg mb-2">Select at least 2 platforms</h3>
            <p className="text-muted-foreground max-w-md">
              Go to the Explorer tab to select platforms for comparison, or use the dropdown above.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Radar Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Capability Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis 
                      dataKey="capability" 
                      tick={{ fontSize: 11 }}
                    />
                    <PolarRadiusAxis 
                      angle={30} 
                      domain={[0, 10]} 
                      tick={{ fontSize: 10 }}
                    />
                    {comparedData.map((platform, index) => (
                      <Radar
                        key={platform.id}
                        name={platform.name}
                        dataKey={platform.name}
                        stroke={colors[index]}
                        fill={colors[index]}
                        fillOpacity={0.2}
                        strokeWidth={2}
                      />
                    ))}
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Comparison Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Detailed Comparison</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-medium">Attribute</th>
                    {comparedData.map((platform) => (
                      <th key={platform.id} className="text-left py-3 px-2 font-medium">
                        {platform.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-3 px-2 text-muted-foreground">Category</td>
                    {comparedData.map((p) => (
                      <td key={p.id} className="py-3 px-2">{p.category}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-2 text-muted-foreground">Priority</td>
                    {comparedData.map((p) => (
                      <td key={p.id} className="py-3 px-2">
                        <Badge variant={p.priority === 'Tier 1' ? 'default' : 'secondary'}>
                          {p.priority}
                        </Badge>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-2 text-muted-foreground">Pricing</td>
                    {comparedData.map((p) => (
                      <td key={p.id} className="py-3 px-2">{p.pricing}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-2 text-muted-foreground">Target Users</td>
                    {comparedData.map((p) => (
                      <td key={p.id} className="py-3 px-2">{p.targetUsers}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-2 text-muted-foreground">Context Window</td>
                    {comparedData.map((p) => (
                      <td key={p.id} className="py-3 px-2">{p.contextWindow || 'N/A'}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-2 text-muted-foreground">Compliance</td>
                    {comparedData.map((p) => (
                      <td key={p.id} className="py-3 px-2">
                        <div className="flex flex-wrap gap-1">
                          {p.compliance.map((c) => (
                            <Badge key={c} variant="outline" className="text-xs">{c}</Badge>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                  
                  {/* Capability Scores */}
                  <tr>
                    <td colSpan={comparedData.length + 1} className="py-3 px-2 font-semibold bg-muted/50">
                      Capability Scores
                    </td>
                  </tr>
                  {(Object.keys(CAPABILITY_LABELS) as CapabilityKey[]).map((cap) => (
                    <tr key={cap}>
                      <td className="py-2 px-2 text-muted-foreground text-xs">
                        {CAPABILITY_LABELS[cap]}
                      </td>
                      {comparedData.map((p) => (
                        <td key={p.id} className="py-2 px-2">
                          <span className={cn(
                            'inline-flex items-center justify-center w-8 h-6 rounded text-xs font-medium',
                            getScoreColor(p.capabilities[cap])
                          )}>
                            {p.capabilities[cap]}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
