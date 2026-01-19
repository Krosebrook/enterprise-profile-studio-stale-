import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Loader2, Lightbulb, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AISuggestion {
  industries: string[];
  dealStructures: string[];
  stages: string[];
  regions: string[];
  riskTolerance: string;
  investmentRange: { min: number; max: number };
  reasoning: string;
  tips: string[];
}

interface AISuggestionsPanelProps {
  suggestions: AISuggestion | null;
  isLoading: boolean;
  onApplySuggestion: (field: string, values: string[] | string | { min: number; max: number }) => void;
  onApplyAll: () => void;
  appliedFields: string[];
}

const formatCurrency = (value: number) => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
  return `$${value}`;
};

export function AISuggestionsPanel({
  suggestions,
  isLoading,
  onApplySuggestion,
  onApplyAll,
  appliedFields,
}: AISuggestionsPanelProps) {
  if (isLoading) {
    return (
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="flex items-center justify-center py-8">
          <div className="flex flex-col items-center gap-3 text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="h-8 w-8 text-primary" />
            </motion.div>
            <p className="text-sm text-muted-foreground">
              Analyzing your profile to generate personalized suggestions...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!suggestions) return null;

  const suggestionItems = [
    { key: 'industries', label: 'Industries', values: suggestions.industries },
    { key: 'dealStructures', label: 'Deal Structures', values: suggestions.dealStructures },
    { key: 'stages', label: 'Deal Stages', values: suggestions.stages },
    { key: 'regions', label: 'Regions', values: suggestions.regions },
    { 
      key: 'riskTolerance', 
      label: 'Risk Tolerance', 
      values: [suggestions.riskTolerance.replace(/_/g, ' ')],
      singleValue: suggestions.riskTolerance
    },
    { 
      key: 'investmentRange', 
      label: 'Investment Range', 
      values: [`${formatCurrency(suggestions.investmentRange.min)} – ${formatCurrency(suggestions.investmentRange.max)}`],
      singleValue: suggestions.investmentRange
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="h-5 w-5 text-primary" />
            AI-Powered Suggestions
          </CardTitle>
          <CardDescription>{suggestions.reasoning}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Suggestion items */}
          <div className="grid gap-3">
            {suggestionItems.map((item) => {
              const isApplied = appliedFields.includes(item.key);
              return (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={cn(
                    'flex items-center justify-between rounded-lg border p-3 transition-all',
                    isApplied ? 'border-green-500/50 bg-green-50 dark:bg-green-950/20' : 'border-border bg-background'
                  )}
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.label}</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {item.values.map((val, i) => (
                        <Badge 
                          key={i} 
                          variant="secondary" 
                          className={cn(
                            'text-xs',
                            isApplied && 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                          )}
                        >
                          {typeof val === 'string' ? val : JSON.stringify(val)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant={isApplied ? 'ghost' : 'outline'}
                    onClick={() => onApplySuggestion(
                      item.key, 
                      item.singleValue !== undefined ? item.singleValue : item.values
                    )}
                    disabled={isApplied}
                    className="ml-3 shrink-0"
                  >
                    {isApplied ? (
                      <>
                        <Check className="mr-1 h-3 w-3" />
                        Applied
                      </>
                    ) : (
                      'Apply'
                    )}
                  </Button>
                </motion.div>
              );
            })}
          </div>

          {/* Apply all button */}
          <Button
            onClick={onApplyAll}
            className="w-full primary-gradient border-0"
            disabled={appliedFields.length === suggestionItems.length}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Apply All Suggestions
          </Button>

          {/* Tips */}
          {suggestions.tips.length > 0 && (
            <div className="mt-4 rounded-lg bg-muted/50 p-4">
              <p className="mb-2 flex items-center gap-2 text-sm font-medium">
                <Lightbulb className="h-4 w-4 text-accent" />
                Tips for You
              </p>
              <ul className="space-y-1">
                {suggestions.tips.map((tip, i) => (
                  <li key={i} className="text-sm text-muted-foreground">
                    • {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
