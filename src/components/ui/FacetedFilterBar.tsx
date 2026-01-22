import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Filter, 
  X, 
  Save, 
  RotateCcw,
  ChevronDown,
  Search,
  SlidersHorizontal,
  Bookmark,
  Check,
} from 'lucide-react';
import { FilterPreset, FacetedFilter } from '@/types/enterprise-dashboard';

interface FacetedFilterBarProps {
  filters: FacetedFilter[];
  onFilterChange: (filterId: string, value: unknown) => void;
  onClearAll: () => void;
  presets?: FilterPreset[];
  onSavePreset?: (name: string) => void;
  onLoadPreset?: (preset: FilterPreset) => void;
  onDeletePreset?: (presetId: string) => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  className?: string;
  mode?: 'live' | 'batch';
  onApplyFilters?: () => void;
}

export function FacetedFilterBar({
  filters,
  onFilterChange,
  onClearAll,
  presets = [],
  onSavePreset,
  onLoadPreset,
  onDeletePreset,
  searchValue = '',
  onSearchChange,
  searchPlaceholder = 'Search...',
  className = '',
  mode = 'live',
  onApplyFilters,
}: FacetedFilterBarProps) {
  const [showPresetDialog, setShowPresetDialog] = useState(false);
  const [newPresetName, setNewPresetName] = useState('');
  const [expandedFilter, setExpandedFilter] = useState<string | null>(null);

  const activeFilterCount = filters.filter((f) => f.isActive).length;

  const handleSavePreset = useCallback(() => {
    if (newPresetName.trim() && onSavePreset) {
      onSavePreset(newPresetName.trim());
      setNewPresetName('');
      setShowPresetDialog(false);
    }
  }, [newPresetName, onSavePreset]);

  const renderFilterControl = (filter: FacetedFilter) => {
    switch (filter.type) {
      case 'select':
        return (
          <div className="space-y-2">
            {filter.options?.map((option) => (
              <button
                key={option.value}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                  filter.value === option.value
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
                onClick={() => onFilterChange(filter.id, option.value)}
              >
                <span>{option.label}</span>
                {option.count !== undefined && (
                  <Badge variant="secondary" className="text-xs">
                    {option.count}
                  </Badge>
                )}
              </button>
            ))}
          </div>
        );

      case 'multi-select':
        const selectedValues = (filter.value as string[]) || [];
        return (
          <div className="space-y-2">
            {filter.options?.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer hover:bg-muted transition-colors"
              >
                <Checkbox
                  checked={selectedValues.includes(option.value)}
                  onCheckedChange={(checked) => {
                    const newValues = checked
                      ? [...selectedValues, option.value]
                      : selectedValues.filter((v) => v !== option.value);
                    onFilterChange(filter.id, newValues);
                  }}
                  // WCAG compliant focus ring
                  className="border-2 data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                />
                <span className="flex-1 text-sm">{option.label}</span>
                {option.count !== undefined && (
                  <Badge variant="outline" className="text-xs">
                    {option.count}
                  </Badge>
                )}
              </label>
            ))}
          </div>
        );

      case 'range':
        const rangeValue = (filter.value as [number, number]) || [0, 100];
        return (
          <div className="px-3 py-2 space-y-4">
            <Slider
              value={rangeValue}
              onValueChange={(value) => onFilterChange(filter.id, value)}
              min={0}
              max={100}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{rangeValue[0]}</span>
              <span>{rangeValue[1]}</span>
            </div>
          </div>
        );

      case 'boolean':
        return (
          <div className="px-3 py-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <Checkbox
                checked={filter.value as boolean}
                onCheckedChange={(checked) => onFilterChange(filter.id, checked)}
                className="border-2 data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              />
              <span className="text-sm">{filter.label}</span>
            </label>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Horizontal Filter Bar - WCAG compliant with proper contrast */}
      <div className="flex flex-wrap items-center gap-2 p-3 rounded-lg bg-muted/30 border border-border">
        {/* Search */}
        {onSearchChange && (
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="pl-9 h-9 bg-background border-input focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label={searchPlaceholder}
            />
          </div>
        )}

        {/* Filter Dropdowns */}
        {filters.map((filter) => (
          <Popover
            key={filter.id}
            open={expandedFilter === filter.id}
            onOpenChange={(open) => setExpandedFilter(open ? filter.id : null)}
          >
            <PopoverTrigger asChild>
              <Button
                variant={filter.isActive ? 'default' : 'outline'}
                size="sm"
                className={`gap-2 h-9 ${
                  filter.isActive 
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                    : 'bg-background hover:bg-muted'
                }`}
                aria-expanded={expandedFilter === filter.id}
                aria-haspopup="listbox"
              >
                {filter.label}
                {filter.isActive && (
                  <Badge 
                    variant="secondary" 
                    className="h-5 px-1.5 text-xs bg-primary-foreground/20 text-primary-foreground"
                  >
                    {Array.isArray(filter.value) ? filter.value.length : 1}
                  </Badge>
                )}
                <ChevronDown className="h-3.5 w-3.5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent 
              className="w-64 p-2" 
              align="start"
              role="listbox"
              aria-label={`${filter.label} options`}
            >
              <ScrollArea className="max-h-64">
                {renderFilterControl(filter)}
              </ScrollArea>
              {filter.isActive && (
                <div className="pt-2 mt-2 border-t">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-muted-foreground hover:text-foreground"
                    onClick={() => onFilterChange(filter.id, filter.type === 'multi-select' ? [] : null)}
                  >
                    <X className="h-3.5 w-3.5 mr-2" />
                    Clear {filter.label}
                  </Button>
                </div>
              )}
            </PopoverContent>
          </Popover>
        ))}

        {/* Presets */}
        {(presets.length > 0 || onSavePreset) && (
          <Popover open={showPresetDialog} onOpenChange={setShowPresetDialog}>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2 h-9 bg-background"
                aria-label="Filter presets"
              >
                <Bookmark className="h-3.5 w-3.5" />
                Presets
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-2" align="end">
              <div className="space-y-2">
                {presets.length > 0 && (
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground px-2">Saved Presets</Label>
                    {presets.map((preset) => (
                      <div 
                        key={preset.id} 
                        className="flex items-center justify-between px-2 py-1.5 rounded hover:bg-muted"
                      >
                        <button
                          className="flex-1 text-left text-sm"
                          onClick={() => {
                            onLoadPreset?.(preset);
                            setShowPresetDialog(false);
                          }}
                        >
                          {preset.name}
                        </button>
                        {onDeletePreset && !preset.isDefault && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => onDeletePreset(preset.id)}
                            aria-label={`Delete ${preset.name} preset`}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                {onSavePreset && (
                  <div className="pt-2 border-t space-y-2">
                    <Label className="text-xs text-muted-foreground px-2">Save Current Filters</Label>
                    <div className="flex gap-2 px-2">
                      <Input
                        value={newPresetName}
                        onChange={(e) => setNewPresetName(e.target.value)}
                        placeholder="Preset name"
                        className="h-8 text-sm"
                        onKeyDown={(e) => e.key === 'Enter' && handleSavePreset()}
                      />
                      <Button
                        size="sm"
                        className="h-8"
                        onClick={handleSavePreset}
                        disabled={!newPresetName.trim()}
                      >
                        <Save className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
        )}

        {/* Clear All & Apply (batch mode) */}
        <div className="flex items-center gap-2 ml-auto">
          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 h-9 text-muted-foreground hover:text-foreground"
              onClick={onClearAll}
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Clear ({activeFilterCount})
            </Button>
          )}
          {mode === 'batch' && onApplyFilters && (
            <Button size="sm" className="gap-2 h-9" onClick={onApplyFilters}>
              <Check className="h-3.5 w-3.5" />
              Apply Filters
            </Button>
          )}
        </div>
      </div>

      {/* Active Filter Tags */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Active:</span>
          {filters
            .filter((f) => f.isActive)
            .map((filter) => (
              <Badge
                key={filter.id}
                variant="secondary"
                className="gap-1.5 pr-1 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20"
              >
                <span className="text-xs font-medium">{filter.label}:</span>
                <span className="text-xs">
                  {Array.isArray(filter.value) 
                    ? `${filter.value.length} selected` 
                    : String(filter.value)}
                </span>
                <button
                  className="ml-1 p-0.5 rounded hover:bg-primary/20 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
                  onClick={() => onFilterChange(filter.id, filter.type === 'multi-select' ? [] : null)}
                  aria-label={`Remove ${filter.label} filter`}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
        </div>
      )}
    </div>
  );
}
