import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  X, 
  Grid, 
  List, 
  Table, 
  Building2,
  TrendingUp,
  DollarSign,
  Clock,
  Shield,
  Download,
  Filter
} from 'lucide-react';
import { EnterprisePlatformCard } from './EnterprisePlatformCard';
import { 
  enterprisePlatforms, 
  departments, 
  intConfig,
  benchmarks 
} from '@/data/enterprisePlatformData';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table as UITable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type ViewMode = 'grid' | 'list' | 'table';
type SortOption = 'name' | 'marketShare' | 'pricing' | 'compliance' | 'integration';

const PROVIDERS = [...new Set(enterprisePlatforms.map(p => p.provider))];
const PRIORITIES = ['HIGH PRIORITY', 'BASELINE', 'DUAL PLATFORM', 'SPECIALIZED', 'COMPLIANCE', 'STANDARD', 'OPTIONAL'];

export function EnterpriseDashboardTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [selectedPriority, setSelectedPriority] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('marketShare');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [comparedPlatforms, setComparedPlatforms] = useState<string[]>([]);

  const filteredPlatforms = useMemo(() => {
    let result = [...enterprisePlatforms];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.provider.toLowerCase().includes(query) ||
        p.model.toLowerCase().includes(query) ||
        p.focus.toLowerCase().includes(query)
      );
    }

    // Provider filter
    if (selectedProviders.length > 0) {
      result = result.filter(p => selectedProviders.includes(p.provider));
    }

    // Priority filter
    if (selectedPriority) {
      result = result.filter(p => p.intRecommendation.priority === selectedPriority);
    }

    // Sort
    switch (sortBy) {
      case 'marketShare':
        result.sort((a, b) => b.marketSharePercent - a.marketSharePercent);
        break;
      case 'pricing':
        result.sort((a, b) => (a.pricingDetails.monthly || 0) - (b.pricingDetails.monthly || 0));
        break;
      case 'compliance':
        result.sort((a, b) => b.complianceDetails.score - a.complianceDetails.score);
        break;
      case 'integration':
        result.sort((a, b) => b.integrationDetails.score - a.integrationDetails.score);
        break;
      default:
        result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [searchQuery, selectedProviders, selectedPriority, sortBy]);

  const toggleProvider = (provider: string) => {
    setSelectedProviders(prev => 
      prev.includes(provider) 
        ? prev.filter(p => p !== provider)
        : [...prev, provider]
    );
  };

  const toggleComparison = (platformId: string) => {
    setComparedPlatforms(prev => {
      if (prev.includes(platformId)) {
        return prev.filter(id => id !== platformId);
      }
      if (prev.length >= 4) return prev;
      return [...prev, platformId];
    });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedProviders([]);
    setSelectedPriority('');
  };

  const hasActiveFilters = searchQuery || selectedProviders.length > 0 || selectedPriority;

  const exportCSV = () => {
    let csv = 'Platform,Provider,Model,Market Share,Context Window,Monthly Price,Compliance Score,Integration Score,Priority,Departments\n';
    filteredPlatforms.forEach(p => {
      csv += `"${p.name}","${p.provider}","${p.model}","${p.marketShare}","${p.contextWindow}","${p.pricingDetails.monthly || 'Custom'}",${p.complianceDetails.score},${p.integrationDetails.score},"${p.intRecommendation.priority}","${p.intRecommendation.departments.join('; ')}"\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `INT_AI_Platforms_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">${(intConfig.investment.year1 / 1000).toFixed(0)}K</p>
                <p className="text-xs text-muted-foreground">Year 1 Investment</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10">
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{intConfig.investment.roi3Year}</p>
                <p className="text-xs text-muted-foreground">3-Year ROI</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Clock className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{intConfig.investment.breakeven}</p>
                <p className="text-xs text-muted-foreground">Breakeven</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Building2 className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{enterprisePlatforms.length}</p>
                <p className="text-xs text-muted-foreground">Platforms Analyzed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Controls */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search platforms by name, provider, or model..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="marketShare">Market Share</SelectItem>
              <SelectItem value="pricing">Pricing</SelectItem>
              <SelectItem value="compliance">Compliance</SelectItem>
              <SelectItem value="integration">Integration</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex border rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-none border-x"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'table' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('table')}
              className="rounded-l-none"
            >
              <Table className="h-4 w-4" />
            </Button>
          </div>

          <Button variant="outline" size="sm" onClick={exportCSV}>
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
            <Filter className="h-3 w-3" />
            Provider:
          </span>
          {PROVIDERS.map((provider) => (
            <Badge
              key={provider}
              variant={selectedProviders.includes(provider) ? 'default' : 'outline'}
              className="cursor-pointer transition-colors"
              onClick={() => toggleProvider(provider)}
            >
              {provider}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium text-muted-foreground">INT Priority:</span>
          <Badge
            variant={selectedPriority === '' ? 'default' : 'outline'}
            className="cursor-pointer transition-colors"
            onClick={() => setSelectedPriority('')}
          >
            All
          </Badge>
          {PRIORITIES.slice(0, 5).map((priority) => (
            <Badge
              key={priority}
              variant={selectedPriority === priority ? 'default' : 'outline'}
              className="cursor-pointer transition-colors"
              onClick={() => setSelectedPriority(priority)}
            >
              {priority}
            </Badge>
          ))}
        </div>

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
            <X className="h-4 w-4 mr-1" />
            Clear filters
          </Button>
        )}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredPlatforms.length} of {enterprisePlatforms.length} platforms
        </p>
        {comparedPlatforms.length > 0 && (
          <Badge variant="secondary" className="px-3">
            {comparedPlatforms.length}/4 selected for comparison
          </Badge>
        )}
      </div>

      {/* Platform Display */}
      {viewMode === 'table' ? (
        <Card>
          <UITable>
            <TableHeader>
              <TableRow>
                <TableHead>Platform</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Market Share</TableHead>
                <TableHead>Context</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Priority</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPlatforms.map((platform) => (
                <TableRow key={platform.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{platform.name}</TableCell>
                  <TableCell>{platform.provider}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{platform.model}</TableCell>
                  <TableCell>{platform.marketShare}</TableCell>
                  <TableCell>{platform.contextWindow}</TableCell>
                  <TableCell>{platform.pricingDetails.monthly ? `$${platform.pricingDetails.monthly}/mo` : 'Custom'}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {platform.intRecommendation.priority}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </UITable>
        </Card>
      ) : (
        <div className={cn(
          viewMode === 'grid' 
            ? 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            : 'space-y-4'
        )}>
          {filteredPlatforms.map((platform) => (
            <EnterprisePlatformCard
              key={platform.id}
              platform={platform}
              isSelected={comparedPlatforms.includes(platform.id)}
              onToggleCompare={() => toggleComparison(platform.id)}
              maxCompareReached={comparedPlatforms.length >= 4}
            />
          ))}
        </div>
      )}

      {filteredPlatforms.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No platforms match your filters.</p>
          <Button variant="link" onClick={clearFilters}>Clear all filters</Button>
        </div>
      )}
    </div>
  );
}
