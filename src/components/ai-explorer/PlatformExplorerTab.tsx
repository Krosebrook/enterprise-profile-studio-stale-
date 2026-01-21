import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, X, Grid, List } from 'lucide-react';
import { useAIPlatforms } from '@/hooks/useAIPlatforms';
import { PlatformCard } from './PlatformCard';
import { CATEGORIES, PRIORITIES, ECOSYSTEMS } from '@/types/ai-platforms';
import { cn } from '@/lib/utils';

type ViewMode = 'grid' | 'list';

export function PlatformExplorerTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [selectedEcosystems, setSelectedEcosystems] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  
  const { 
    platforms, 
    comparedPlatforms, 
    toggleComparison,
    isInComparison,
  } = useAIPlatforms();

  const filteredPlatforms = useMemo(() => {
    return platforms.filter((platform) => {
      const matchesSearch = searchQuery === '' || 
        platform.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        platform.verdict.toLowerCase().includes(searchQuery.toLowerCase()) ||
        platform.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategories.length === 0 || 
        selectedCategories.includes(platform.category);
      
      const matchesPriority = selectedPriorities.length === 0 || 
        selectedPriorities.includes(platform.priority);
      
      const matchesEcosystem = selectedEcosystems.length === 0 || 
        selectedEcosystems.includes(platform.ecosystem);

      return matchesSearch && matchesCategory && matchesPriority && matchesEcosystem;
    });
  }, [platforms, searchQuery, selectedCategories, selectedPriorities, selectedEcosystems]);

  const toggleFilter = (
    value: string, 
    selected: string[], 
    setSelected: (v: string[]) => void
  ) => {
    if (selected.includes(value)) {
      setSelected(selected.filter(v => v !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedPriorities([]);
    setSelectedEcosystems([]);
  };

  const hasActiveFilters = searchQuery || selectedCategories.length || selectedPriorities.length || selectedEcosystems.length;

  return (
    <div className="space-y-6">
      {/* Search and View Toggle */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search platforms by name, specialty, or feature..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
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
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          {comparedPlatforms.length > 0 && (
            <Badge variant="secondary" className="px-3">
              {comparedPlatforms.length}/4 selected
            </Badge>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-3">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium text-muted-foreground w-20">Category:</span>
          {CATEGORIES.map((cat) => (
            <Badge
              key={cat}
              variant={selectedCategories.includes(cat) ? 'default' : 'outline'}
              className="cursor-pointer transition-colors"
              onClick={() => toggleFilter(cat, selectedCategories, setSelectedCategories)}
            >
              {cat}
            </Badge>
          ))}
        </div>

        {/* Priorities */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium text-muted-foreground w-20">Priority:</span>
          {PRIORITIES.map((pri) => (
            <Badge
              key={pri}
              variant={selectedPriorities.includes(pri) ? 'default' : 'outline'}
              className="cursor-pointer transition-colors"
              onClick={() => toggleFilter(pri, selectedPriorities, setSelectedPriorities)}
            >
              {pri}
            </Badge>
          ))}
        </div>

        {/* Ecosystems */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium text-muted-foreground w-20">Ecosystem:</span>
          {ECOSYSTEMS.map((eco) => (
            <Badge
              key={eco}
              variant={selectedEcosystems.includes(eco) ? 'default' : 'outline'}
              className="cursor-pointer transition-colors capitalize"
              onClick={() => toggleFilter(eco, selectedEcosystems, setSelectedEcosystems)}
            >
              {eco}
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
          Showing {filteredPlatforms.length} of {platforms.length} platforms
        </p>
      </div>

      {/* Platform Grid/List */}
      <div className={cn(
        viewMode === 'grid' 
          ? 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          : 'space-y-4'
      )}>
        {filteredPlatforms.map((platform) => (
          <PlatformCard
            key={platform.id}
            platform={platform}
            isSelected={isInComparison(platform.id)}
            onToggleCompare={() => toggleComparison(platform.id)}
            maxCompareReached={comparedPlatforms.length >= 4}
          />
        ))}
      </div>

      {filteredPlatforms.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No platforms match your filters.</p>
          <Button variant="link" onClick={clearFilters}>Clear all filters</Button>
        </div>
      )}
    </div>
  );
}
