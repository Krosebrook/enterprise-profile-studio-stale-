import { useState, useMemo } from 'react';
import { useKnowledgeDocuments } from '@/hooks/useKnowledgeBase';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Tag, X, Search, Check, ChevronDown, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MultiTagFilterProps {
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

export function MultiTagFilter({ selectedTags, onTagsChange }: MultiTagFilterProps) {
  const { data: documents = [] } = useKnowledgeDocuments();
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Extract all unique tags with their counts
  const tagCounts = useMemo(() => {
    return documents.reduce<Record<string, number>>((acc, doc) => {
      doc.tags?.forEach((tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {});
  }, [documents]);

  // Sort tags by count and filter by search term
  const filteredTags = useMemo(() => {
    return Object.entries(tagCounts)
      .filter(([tag]) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => b[1] - a[1]);
  }, [tagCounts, searchTerm]);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter(t => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const clearAllTags = () => {
    onTagsChange([]);
  };

  return (
    <div className="flex items-center gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "gap-2 h-9",
              selectedTags.length > 0 && "border-primary text-primary"
            )}
          >
            <Filter className="h-4 w-4" />
            Filter by Tags
            {selectedTags.length > 0 && (
              <Badge variant="secondary" className="ml-1 px-1.5 py-0 text-xs">
                {selectedTags.length}
              </Badge>
            )}
            <ChevronDown className="h-3 w-3 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72 p-0" align="start">
          <div className="p-3 border-b border-border/40">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 h-8"
              />
            </div>
          </div>

          <ScrollArea className="h-[240px]">
            <div className="p-2">
              {filteredTags.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground text-sm">
                  <Tag className="h-6 w-6 mx-auto mb-2 opacity-50" />
                  <p>No tags found</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredTags.map(([tag, count]) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={cn(
                          "w-full flex items-center justify-between px-2 py-1.5 rounded-md text-sm transition-colors",
                          isSelected
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-muted"
                        )}
                      >
                        <span className="flex items-center gap-2">
                          <Tag className="h-3.5 w-3.5" />
                          <span className="truncate">{tag}</span>
                        </span>
                        <span className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">
                            {count}
                          </span>
                          {isSelected && (
                            <Check className="h-4 w-4 text-primary" />
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </ScrollArea>

          {selectedTags.length > 0 && (
            <div className="p-2 border-t border-border/40">
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-xs"
                onClick={clearAllTags}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>

      {/* Selected tags display */}
      {selectedTags.length > 0 && (
        <div className="flex items-center gap-1.5 flex-wrap">
          {selectedTags.map(tag => (
            <Badge
              key={tag}
              variant="secondary"
              className="gap-1 py-1 px-2 cursor-pointer hover:bg-destructive/10 transition-colors"
              onClick={() => toggleTag(tag)}
            >
              <Tag className="h-3 w-3" />
              {tag}
              <X className="h-3 w-3 ml-0.5" />
            </Badge>
          ))}
          {selectedTags.length > 1 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-xs text-muted-foreground hover:text-destructive"
              onClick={clearAllTags}
            >
              Clear all
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
