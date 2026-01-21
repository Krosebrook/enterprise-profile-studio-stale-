import { useState, useMemo } from 'react';
import { useAIPlatforms } from '@/hooks/useAIPlatforms';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { CAPABILITY_LABELS, CapabilityKey, CATEGORIES } from '@/types/ai-platforms';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const capabilityKeys = Object.keys(CAPABILITY_LABELS) as CapabilityKey[];

export function CapabilityMatrixTab() {
  const { platforms } = useAIPlatforms();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const filteredPlatforms = useMemo(() => {
    return platforms.filter((platform) => {
      const matchesSearch = searchQuery === '' || 
        platform.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategories.length === 0 || 
        selectedCategories.includes(platform.category);

      return matchesSearch && matchesCategory;
    });
  }, [platforms, searchQuery, selectedCategories]);

  const toggleCategory = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter(c => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'bg-green-500 text-white';
    if (score >= 6) return 'bg-green-300 text-green-900';
    if (score >= 4) return 'bg-yellow-300 text-yellow-900';
    if (score >= 2) return 'bg-orange-300 text-orange-900';
    return 'bg-red-300 text-red-900';
  };

  const getScoreBg = (score: number) => {
    if (score >= 8) return 'bg-green-500';
    if (score >= 6) return 'bg-green-300';
    if (score >= 4) return 'bg-yellow-300';
    if (score >= 2) return 'bg-orange-300';
    return 'bg-red-300';
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search platforms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <Badge
              key={cat}
              variant={selectedCategories.includes(cat) ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => toggleCategory(cat)}
            >
              {cat}
            </Badge>
          ))}
        </div>
      </div>

      {/* Legend */}
      <Card>
        <CardContent className="py-3">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-sm font-medium text-muted-foreground">Score Legend:</span>
            <div className="flex items-center gap-3">
              {[
                { range: '8-10', color: 'bg-green-500', label: 'Excellent' },
                { range: '6-7', color: 'bg-green-300', label: 'Good' },
                { range: '4-5', color: 'bg-yellow-300', label: 'Moderate' },
                { range: '2-3', color: 'bg-orange-300', label: 'Limited' },
                { range: '0-1', color: 'bg-red-300', label: 'Weak' },
              ].map((item) => (
                <div key={item.range} className="flex items-center gap-1.5">
                  <div className={cn('w-4 h-4 rounded', item.color)} />
                  <span className="text-xs text-muted-foreground">{item.range}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Matrix */}
      <Card>
        <CardHeader className="pb-0">
          <CardTitle className="text-lg">
            Full Capability Matrix
            <span className="text-sm font-normal text-muted-foreground ml-2">
              ({filteredPlatforms.length} platforms × {capabilityKeys.length} capabilities)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="w-full">
            <div className="min-w-[1200px]">
              <table className="w-full text-xs">
                <thead className="sticky top-0 bg-background z-10">
                  <tr className="border-b">
                    <th className="text-left py-3 px-3 font-medium sticky left-0 bg-background z-20 min-w-[180px]">
                      Platform
                    </th>
                    {capabilityKeys.map((cap) => (
                      <Tooltip key={cap}>
                        <TooltipTrigger asChild>
                          <th className="py-3 px-1 font-medium text-center min-w-[40px] cursor-help">
                            <span className="block truncate max-w-[40px] mx-auto">
                              {CAPABILITY_LABELS[cap].split(' ')[0]}
                            </span>
                          </th>
                        </TooltipTrigger>
                        <TooltipContent>
                          {CAPABILITY_LABELS[cap]}
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredPlatforms.map((platform, idx) => (
                    <tr 
                      key={platform.id}
                      className={cn(
                        'hover:bg-muted/50 transition-colors',
                        idx % 2 === 0 && 'bg-muted/20'
                      )}
                    >
                      <td className="py-2 px-3 sticky left-0 bg-inherit z-10">
                        <div className="flex items-center gap-2">
                          <span className="font-medium truncate">{platform.name}</span>
                          <Badge variant="outline" className="text-[10px] px-1 py-0">
                            {platform.priority.replace('Tier ', 'T')}
                          </Badge>
                        </div>
                      </td>
                      {capabilityKeys.map((cap) => (
                        <td key={cap} className="py-2 px-1 text-center">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div 
                                className={cn(
                                  'w-7 h-7 mx-auto rounded flex items-center justify-center font-medium cursor-default',
                                  getScoreColor(platform.capabilities[cap])
                                )}
                              >
                                {platform.capabilities[cap]}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="font-medium">{platform.name}</p>
                              <p className="text-muted-foreground">
                                {CAPABILITY_LABELS[cap]}: {platform.capabilities[cap]}/10
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardContent>
      </Card>

      {filteredPlatforms.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No platforms match your search.</p>
        </div>
      )}
    </div>
  );
}
