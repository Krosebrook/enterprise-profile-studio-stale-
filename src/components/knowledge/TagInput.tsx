import { useState, useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X, Plus, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TagInputProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  suggestions?: string[];
  placeholder?: string;
  className?: string;
}

export function TagInput({ 
  tags, 
  onTagsChange, 
  suggestions = [], 
  placeholder = 'Add a tag',
  className 
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter suggestions based on input
  const filteredSuggestions = suggestions.filter(
    (suggestion) =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase()) &&
      !tags.includes(suggestion)
  ).slice(0, 8);

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim().toLowerCase();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      onTagsChange([...tags, trimmedTag]);
      setInputValue('');
      setShowSuggestions(false);
      setSelectedIndex(0);
    }
  };

  const removeTag = (tagToRemove: string) => {
    onTagsChange(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (showSuggestions && filteredSuggestions.length > 0) {
        addTag(filteredSuggestions[selectedIndex]);
      } else if (inputValue) {
        addTag(inputValue);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => 
        Math.min(prev + 1, filteredSuggestions.length - 1)
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    }
  };

  // Close suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <div className="flex flex-wrap gap-2 items-center p-2 border rounded-md bg-background min-h-[42px] focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        {tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="gap-1 py-1 px-2 bg-primary/10 text-primary hover:bg-primary/20"
          >
            <Tag className="h-3 w-3" />
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="ml-1 hover:text-destructive transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        <Input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setShowSuggestions(true);
            setSelectedIndex(0);
          }}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? placeholder : ''}
          className="flex-1 min-w-[120px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto"
        />
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && inputValue && filteredSuggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 py-1 bg-popover border rounded-md shadow-lg max-h-[200px] overflow-y-auto">
          {filteredSuggestions.map((suggestion, index) => (
            <button
              key={suggestion}
              type="button"
              className={cn(
                'w-full px-3 py-2 text-left text-sm flex items-center gap-2 hover:bg-accent transition-colors',
                index === selectedIndex && 'bg-accent'
              )}
              onClick={() => addTag(suggestion)}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <Tag className="h-3 w-3 text-muted-foreground" />
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {/* Create new tag option */}
      {showSuggestions && inputValue && !filteredSuggestions.includes(inputValue.toLowerCase()) && (
        <div className="absolute z-50 w-full mt-1 py-1 bg-popover border rounded-md shadow-lg">
          <button
            type="button"
            className="w-full px-3 py-2 text-left text-sm flex items-center gap-2 hover:bg-accent transition-colors"
            onClick={() => addTag(inputValue)}
          >
            <Plus className="h-3 w-3 text-primary" />
            <span>Create tag: <strong>{inputValue}</strong></span>
          </button>
        </div>
      )}
    </div>
  );
}
