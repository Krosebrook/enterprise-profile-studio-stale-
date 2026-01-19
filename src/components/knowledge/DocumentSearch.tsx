import { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useKnowledgeDocuments, KnowledgeDocument } from '@/hooks/useKnowledgeBase';
import { useSearchHistory } from '@/hooks/useSearchHistory';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Search,
  FileText,
  Tag,
  Calendar,
  Globe,
  Lock,
  X,
  ArrowRight,
  Sparkles,
  Clock,
  History,
  Trash2,
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

interface SearchResult {
  document: KnowledgeDocument;
  score: number;
  matches: {
    field: 'title' | 'content' | 'description' | 'tags' | 'category';
    text: string;
    highlights: { start: number; end: number }[];
  }[];
}

function highlightText(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;
  
  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
  
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="bg-primary/30 text-foreground rounded px-0.5">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

function getContextSnippet(content: string, query: string, maxLength = 150): string {
  const lowerContent = content.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const index = lowerContent.indexOf(lowerQuery);
  
  if (index === -1) {
    return content.slice(0, maxLength) + (content.length > maxLength ? '...' : '');
  }
  
  const start = Math.max(0, index - 50);
  const end = Math.min(content.length, index + query.length + 100);
  
  let snippet = content.slice(start, end);
  if (start > 0) snippet = '...' + snippet;
  if (end < content.length) snippet = snippet + '...';
  
  return snippet;
}

function searchDocuments(documents: KnowledgeDocument[], query: string): SearchResult[] {
  if (!query.trim() || query.length < 2) return [];
  
  const lowerQuery = query.toLowerCase();
  const queryWords = lowerQuery.split(/\s+/).filter(w => w.length > 1);
  
  const results: SearchResult[] = [];
  
  for (const doc of documents) {
    let score = 0;
    const matches: SearchResult['matches'] = [];
    
    // Title match (highest weight)
    if (doc.title.toLowerCase().includes(lowerQuery)) {
      score += 100;
      matches.push({
        field: 'title',
        text: doc.title,
        highlights: [],
      });
    } else {
      // Partial word matching in title
      const titleWords = doc.title.toLowerCase().split(/\s+/);
      for (const qWord of queryWords) {
        if (titleWords.some(tw => tw.includes(qWord))) {
          score += 30;
        }
      }
    }
    
    // Description match
    if (doc.description?.toLowerCase().includes(lowerQuery)) {
      score += 50;
      matches.push({
        field: 'description',
        text: doc.description,
        highlights: [],
      });
    }
    
    // Content match (full text search)
    const lowerContent = doc.content.toLowerCase();
    if (lowerContent.includes(lowerQuery)) {
      // Count occurrences for relevance
      const occurrences = (lowerContent.match(new RegExp(lowerQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
      score += 20 + Math.min(occurrences * 5, 50);
      matches.push({
        field: 'content',
        text: getContextSnippet(doc.content, query),
        highlights: [],
      });
    } else {
      // Word-level matching in content
      for (const qWord of queryWords) {
        if (lowerContent.includes(qWord)) {
          score += 10;
          if (!matches.some(m => m.field === 'content')) {
            matches.push({
              field: 'content',
              text: getContextSnippet(doc.content, qWord),
              highlights: [],
            });
          }
        }
      }
    }
    
    // Tag match
    const matchingTags = doc.tags.filter(tag => 
      tag.toLowerCase().includes(lowerQuery) || 
      queryWords.some(qw => tag.toLowerCase().includes(qw))
    );
    if (matchingTags.length > 0) {
      score += 40 * matchingTags.length;
      matches.push({
        field: 'tags',
        text: matchingTags.join(', '),
        highlights: [],
      });
    }
    
    // Category match
    if (doc.category.toLowerCase().includes(lowerQuery)) {
      score += 30;
      matches.push({
        field: 'category',
        text: doc.category,
        highlights: [],
      });
    }
    
    if (score > 0) {
      results.push({ document: doc, score, matches });
    }
  }
  
  // Sort by score descending
  return results.sort((a, b) => b.score - a.score);
}

interface DocumentSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DocumentSearch({ isOpen, onClose }: DocumentSearchProps) {
  const navigate = useNavigate();
  const { data: documents = [] } = useKnowledgeDocuments();
  const { 
    history, 
    recentDocs, 
    addToHistory, 
    addToRecentDocs, 
    removeFromHistory, 
    clearHistory 
  } = useSearchHistory();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'search' | 'recent'>('search');
  
  const results = useMemo(() => searchDocuments(documents, query), [documents, query]);
  
  // Reset selection when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [results]);
  
  // Handle result click - track history and recent
  const handleResultClick = useCallback((doc: KnowledgeDocument) => {
    addToHistory(query);
    addToRecentDocs({
      id: doc.id,
      slug: doc.slug,
      title: doc.title,
      category: doc.category,
    });
    navigate(`/knowledge/${doc.slug}`);
    onClose();
  }, [query, addToHistory, addToRecentDocs, navigate, onClose]);
  
  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      handleResultClick(results[selectedIndex].document);
    }
  }, [results, selectedIndex, handleResultClick]);

  // Handle history item click
  const handleHistoryClick = useCallback((searchQuery: string) => {
    setQuery(searchQuery);
  }, []);
  
  // Clear on close
  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setActiveTab('search');
    }
  }, [isOpen]);
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl p-0 gap-0 overflow-hidden">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="sr-only">Search Documents</DialogTitle>
        </DialogHeader>
        
        <div className="p-4 border-b border-border/40">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search all documents..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-10 pr-10 h-12 text-lg border-0 bg-muted/50 focus-visible:ring-1"
              autoFocus
            />
            {query && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                onClick={() => setQuery('')}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Tabs for Search vs Recent */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'search' | 'recent')} className="flex-1">
          <div className="px-4 pt-2 border-b border-border/20">
            <TabsList className="h-8 bg-transparent p-0 gap-4">
              <TabsTrigger 
                value="search" 
                className="h-8 px-0 pb-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                <Search className="h-3.5 w-3.5 mr-1.5" />
                Search
              </TabsTrigger>
              <TabsTrigger 
                value="recent" 
                className="h-8 px-0 pb-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                <Clock className="h-3.5 w-3.5 mr-1.5" />
                Recent
                {recentDocs.length > 0 && (
                  <Badge variant="secondary" className="ml-1.5 h-5 px-1.5 text-[10px]">
                    {recentDocs.length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="search" className="m-0">
            <ScrollArea className="max-h-[50vh]">
              {query.length < 2 ? (
                <div className="p-6">
                  {/* Search History */}
                  {history.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                          <History className="h-4 w-4" />
                          Recent Searches
                        </h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-xs text-muted-foreground hover:text-destructive"
                          onClick={clearHistory}
                        >
                          Clear
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {history.map((item) => (
                          <Badge
                            key={item.query}
                            variant="outline"
                            className="cursor-pointer gap-1.5 py-1.5 px-3 hover:bg-muted/50 transition-colors group"
                            onClick={() => handleHistoryClick(item.query)}
                          >
                            <Search className="h-3 w-3 text-muted-foreground" />
                            {item.query}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeFromHistory(item.query);
                              }}
                              className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-3 w-3 text-muted-foreground hover:text-destructive" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Default state */}
                  <div className="text-center text-muted-foreground py-4">
                    <Sparkles className="h-8 w-8 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">Type at least 2 characters to search</p>
                    <p className="text-xs mt-1 opacity-70">
                      Searches title, content, description, tags, and categories
                    </p>
                  </div>
                </div>
              ) : results.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <FileText className="h-8 w-8 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">No documents found for "{query}"</p>
                  <p className="text-xs mt-1 opacity-70">
                    Try different keywords or check spelling
                  </p>
                </div>
              ) : (
                <div className="p-2">
                  <div className="px-3 py-2 text-xs text-muted-foreground font-medium">
                    {results.length} result{results.length !== 1 ? 's' : ''} found
                  </div>
                  
                  {results.map((result, index) => (
                    <div
                      key={result.document.id}
                      onClick={() => handleResultClick(result.document)}
                      className={cn(
                        'block p-3 rounded-lg transition-colors cursor-pointer',
                        index === selectedIndex
                          ? 'bg-primary/10 border border-primary/20'
                          : 'hover:bg-muted/50'
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            {result.document.is_public ? (
                              <Globe className="h-3.5 w-3.5 text-success flex-shrink-0" />
                            ) : (
                              <Lock className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                            )}
                            <h4 className="font-medium text-foreground truncate">
                              {highlightText(result.document.title, query)}
                            </h4>
                          </div>
                          
                          {/* Show matched content */}
                          {result.matches.map((match, i) => (
                            <div key={i} className="mt-1">
                              {match.field === 'content' && (
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                  {highlightText(match.text, query)}
                                </p>
                              )}
                              {match.field === 'description' && (
                                <p className="text-sm text-muted-foreground line-clamp-1">
                                  {highlightText(match.text, query)}
                                </p>
                              )}
                            </div>
                          ))}
                          
                          <div className="flex items-center gap-2 mt-2 flex-wrap">
                            <Badge variant="outline" className="text-xs">
                              {result.document.category}
                            </Badge>
                            
                            {result.matches.some(m => m.field === 'tags') && (
                              <div className="flex items-center gap-1">
                                <Tag className="h-3 w-3 text-muted-foreground" />
                                {result.document.tags.slice(0, 3).map(tag => (
                                  <Badge 
                                    key={tag} 
                                    variant="secondary" 
                                    className="text-xs"
                                  >
                                    {highlightText(tag, query)}
                                  </Badge>
                                ))}
                              </div>
                            )}
                            
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {format(new Date(result.document.updated_at), 'MMM d')}
                            </span>
                          </div>
                        </div>
                        
                        <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="recent" className="m-0">
            <ScrollArea className="max-h-[50vh]">
              <div className="p-4">
                {recentDocs.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Clock className="h-8 w-8 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">No recent documents</p>
                    <p className="text-xs mt-1 opacity-70">
                      Documents you view will appear here
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Recently Viewed
                    </h4>
                    {recentDocs.map((doc) => (
                      <Link
                        key={doc.id}
                        to={`/knowledge/${doc.slug}`}
                        onClick={() => {
                          addToRecentDocs(doc);
                          onClose();
                        }}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <FileText className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{doc.title}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <Badge variant="outline" className="text-[10px] py-0">
                                {doc.category}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {formatDistanceToNow(new Date(doc.timestamp), { addSuffix: true })}
                              </span>
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
        
        <div className="p-3 border-t border-border/40 bg-muted/20 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">↑↓</kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">Enter</kbd>
              Open
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">Esc</kbd>
              Close
            </span>
          </div>
          <span className="opacity-70">Full-text search</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
