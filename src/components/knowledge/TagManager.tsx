import { useState } from 'react';
import { useKnowledgeDocuments } from '@/hooks/useKnowledgeBase';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tag, Settings2, Search, Hash } from 'lucide-react';

interface TagManagerProps {
  onSelectTag?: (tag: string) => void;
  selectedTags?: string[];
}

export function TagManager({ onSelectTag, selectedTags = [] }: TagManagerProps) {
  const { data: documents = [] } = useKnowledgeDocuments();
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);

  // Extract all unique tags with their counts
  const tagCounts = documents.reduce<Record<string, number>>((acc, doc) => {
    doc.tags?.forEach((tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {});

  // Sort tags by count (most used first)
  const sortedTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .filter(([tag]) => 
      tag.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Group tags by first letter
  const groupedTags = sortedTags.reduce<Record<string, [string, number][]>>((acc, [tag, count]) => {
    const letter = tag[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push([tag, count]);
    return acc;
  }, {});

  const totalTags = Object.keys(tagCounts).length;
  const totalTagUsage = Object.values(tagCounts).reduce((a, b) => a + b, 0);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings2 className="h-4 w-4" />
          Manage Tags
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5 text-primary" />
            Tag Management
          </DialogTitle>
          <DialogDescription>
            Browse and manage all tags in your knowledge base
          </DialogDescription>
        </DialogHeader>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border/50">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Hash className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalTags}</p>
              <p className="text-xs text-muted-foreground">Unique Tags</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border/50">
            <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
              <Tag className="h-5 w-5 text-accent-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalTagUsage}</p>
              <p className="text-xs text-muted-foreground">Total Usage</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Tags List */}
        <ScrollArea className="h-[300px] pr-4">
          {Object.keys(groupedTags).length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Tag className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No tags found</p>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(groupedTags)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([letter, tags]) => (
                  <div key={letter}>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                      {letter}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {tags.map(([tag, count]) => (
                        <Badge
                          key={tag}
                          variant={selectedTags.includes(tag) ? 'default' : 'secondary'}
                          className="cursor-pointer gap-1.5 py-1.5 px-3 hover:bg-primary/20 transition-colors"
                          onClick={() => {
                            onSelectTag?.(tag);
                          }}
                        >
                          <Tag className="h-3 w-3" />
                          {tag}
                          <span className="ml-1 text-xs opacity-60">({count})</span>
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </ScrollArea>

        {/* Popular Tags */}
        {sortedTags.length > 5 && (
          <div className="pt-4 border-t">
            <h4 className="text-sm font-medium mb-2">Most Used Tags</h4>
            <div className="flex flex-wrap gap-2">
              {sortedTags.slice(0, 5).map(([tag, count]) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="gap-1.5 py-1.5 px-3 cursor-pointer hover:bg-primary/10 transition-colors"
                  onClick={() => {
                    onSelectTag?.(tag);
                    setOpen(false);
                  }}
                >
                  <Tag className="h-3 w-3 text-primary" />
                  {tag}
                  <span className="ml-1 text-xs text-muted-foreground">({count})</span>
                </Badge>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// Hook to get all unique tags from documents
export function useAllTags() {
  const { data: documents = [] } = useKnowledgeDocuments();
  
  const allTags = documents.reduce<string[]>((acc, doc) => {
    doc.tags?.forEach((tag) => {
      if (!acc.includes(tag)) {
        acc.push(tag);
      }
    });
    return acc;
  }, []);
  
  return allTags.sort();
}
