import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Scale, X, Plus, ChevronRight, TrendingUp, 
  Briefcase, Target, Users,
  Calendar, BarChart3, Sparkles
} from 'lucide-react';
import { Deal, COMPARISON_CRITERIA, generateFullMockDeals, ComparisonCriteria } from '@/types/deals';
import { OnboardingUserProfile } from '@/types/onboarding';
import { cn } from '@/lib/utils';
import { FadeIn } from '@/components/ui/animations';

interface DealComparisonToolProps {
  profile: OnboardingUserProfile | null;
}

const formatValue = (value: string | number | boolean | undefined | null, format: ComparisonCriteria['format']): string => {
  if (value === undefined || value === null) return '—';
  
  switch (format) {
    case 'currency':
      if (typeof value === 'number') {
        if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
        if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
        return `$${value}`;
      }
      return String(value);
    case 'percentage':
      return `${value}%`;
    case 'number':
      return typeof value === 'number' ? value.toLocaleString() : String(value);
    case 'boolean':
      return value ? 'Yes' : 'No';
    case 'date':
      return new Date(String(value)).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    case 'match':
      return `${value}%`;
    default:
      return String(value);
  }
};

const getNestedValue = (obj: Deal, path: string): string | number | boolean | undefined | null => {
  const parts = path.split('.');
  let current: unknown = obj;
  
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }
  
  return current as string | number | boolean | undefined | null;
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'overview': return <Briefcase className="h-4 w-4" />;
    case 'metrics': return <BarChart3 className="h-4 w-4" />;
    case 'team': return <Users className="h-4 w-4" />;
    case 'timeline': return <Calendar className="h-4 w-4" />;
    case 'fit': return <Target className="h-4 w-4" />;
    default: return null;
  }
};

export function DealComparisonTool({ profile }: DealComparisonToolProps) {
  const allDeals = useMemo(() => generateFullMockDeals(), []);
  const [selectedDeals, setSelectedDeals] = useState<string[]>([]);
  const [showSelector, setShowSelector] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const selectedDealData = useMemo(() => 
    allDeals.filter(deal => selectedDeals.includes(deal.id)),
    [allDeals, selectedDeals]
  );

  const toggleDeal = (dealId: string) => {
    setSelectedDeals(prev => {
      if (prev.includes(dealId)) {
        return prev.filter(id => id !== dealId);
      }
      if (prev.length >= 4) {
        return prev; // Max 4 deals
      }
      return [...prev, dealId];
    });
  };

  const clearSelection = () => {
    setSelectedDeals([]);
    setShowSelector(true);
  };

  const filteredCriteria = useMemo(() => {
    if (activeCategory === 'all') return COMPARISON_CRITERIA;
    return COMPARISON_CRITERIA.filter(c => c.category === activeCategory);
  }, [activeCategory]);

  const getBestValue = (criteria: ComparisonCriteria) => {
    if (!criteria.higherIsBetter || selectedDealData.length === 0) return null;
    
    const values = selectedDealData.map(deal => ({
      id: deal.id,
      value: getNestedValue(deal, criteria.key)
    })).filter(v => v.value !== undefined && v.value !== null && typeof v.value === 'number');
    
    if (values.length === 0) return null;
    
    const sorted = [...values].sort((a, b) => {
      const aVal = a.value as number;
      const bVal = b.value as number;
      return criteria.higherIsBetter ? bVal - aVal : aVal - bVal;
    });
    
    return sorted[0]?.id;
  };

  const categories = ['all', 'overview', 'fit', 'metrics', 'team', 'timeline'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <FadeIn>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="flex items-center gap-2 font-display text-xl font-bold">
              <Scale className="h-5 w-5 text-primary" />
              Deal Comparison
            </h2>
            <p className="text-sm text-muted-foreground">
              Compare up to 4 deals side-by-side based on your portfolio criteria
            </p>
          </div>
          {selectedDeals.length > 0 && (
            <Button variant="outline" size="sm" onClick={clearSelection}>
              Clear Selection
            </Button>
          )}
        </div>
      </FadeIn>

      {/* Deal Selector */}
      <AnimatePresence>
        {showSelector && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Select Deals to Compare</CardTitle>
                <CardDescription>
                  Choose 2-4 deals from your recommendations ({selectedDeals.length}/4 selected)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {allDeals.map((deal) => (
                    <motion.div
                      key={deal.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        'flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-all',
                        selectedDeals.includes(deal.id)
                          ? 'border-primary bg-primary/5'
                          : 'hover:border-muted-foreground/50',
                        selectedDeals.length >= 4 && !selectedDeals.includes(deal.id)
                          ? 'cursor-not-allowed opacity-50'
                          : ''
                      )}
                      onClick={() => toggleDeal(deal.id)}
                    >
                      <Checkbox
                        checked={selectedDeals.includes(deal.id)}
                        disabled={selectedDeals.length >= 4 && !selectedDeals.includes(deal.id)}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium">{deal.name}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {deal.industry.split(' ')[0]}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {deal.match}% match
                          </span>
                        </div>
                      </div>
                      {deal.trending && (
                        <Badge variant="outline" className="shrink-0 text-xs">
                          🔥
                        </Badge>
                      )}
                    </motion.div>
                  ))}
                </div>

                {selectedDeals.length >= 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 flex justify-end"
                  >
                    <Button onClick={() => setShowSelector(false)}>
                      Compare Deals
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comparison View */}
      {!showSelector && selectedDeals.length >= 2 && (
        <FadeIn>
          <Card>
            <CardHeader className="border-b pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowSelector(true)}
                  >
                    <Plus className="mr-1 h-4 w-4" />
                    Modify Selection
                  </Button>
                </div>
                <Tabs value={activeCategory} onValueChange={setActiveCategory}>
                  <TabsList className="grid h-8 grid-cols-6">
                    {categories.map(cat => (
                      <TabsTrigger key={cat} value={cat} className="text-xs capitalize">
                        {cat}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="w-full">
                <div className="min-w-[800px]">
                  {/* Deal Headers */}
                  <div className="sticky top-0 z-10 grid border-b bg-background" 
                    style={{ gridTemplateColumns: `200px repeat(${selectedDealData.length}, 1fr)` }}>
                    <div className="border-r p-4">
                      <span className="text-sm font-medium text-muted-foreground">Criteria</span>
                    </div>
                    {selectedDealData.map((deal, index) => (
                      <div key={deal.id} className="relative border-r p-4 last:border-r-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-2 h-6 w-6 opacity-50 hover:opacity-100"
                          onClick={() => toggleDeal(deal.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            'flex h-10 w-10 items-center justify-center rounded-lg',
                            index === 0 ? 'bg-primary/10' : 
                            index === 1 ? 'bg-accent/10' :
                            index === 2 ? 'bg-green-500/10' : 'bg-orange-500/10'
                          )}>
                            <Briefcase className={cn(
                              'h-5 w-5',
                              index === 0 ? 'text-primary' : 
                              index === 1 ? 'text-accent' :
                              index === 2 ? 'text-green-500' : 'text-orange-500'
                            )} />
                          </div>
                          <div>
                            <p className="font-semibold">{deal.name}</p>
                            <p className="text-xs text-muted-foreground">{deal.stage}</p>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <Progress value={deal.match} className="h-1.5 flex-1" />
                          <span className={cn(
                            'text-xs font-medium',
                            deal.match >= 90 ? 'text-green-500' : 
                            deal.match >= 80 ? 'text-primary' : 'text-muted-foreground'
                          )}>
                            {deal.match}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Comparison Rows */}
                  {filteredCriteria.map((criteria, idx) => {
                    const bestDealId = getBestValue(criteria);
                    const showCategoryHeader = idx === 0 || 
                      filteredCriteria[idx - 1]?.category !== criteria.category;

                    return (
                      <div key={criteria.id}>
                        {activeCategory === 'all' && showCategoryHeader && (
                          <div className="flex items-center gap-2 bg-muted/50 px-4 py-2">
                            {getCategoryIcon(criteria.category)}
                            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                              {criteria.category}
                            </span>
                          </div>
                        )}
                        <div 
                          className="grid border-b transition-colors hover:bg-muted/30"
                          style={{ gridTemplateColumns: `200px repeat(${selectedDealData.length}, 1fr)` }}
                        >
                          <div className="flex items-center border-r px-4 py-3">
                            <span className="text-sm text-muted-foreground">{criteria.label}</span>
                          </div>
                          {selectedDealData.map((deal) => {
                            const value = getNestedValue(deal, criteria.key);
                            const isBest = bestDealId === deal.id;
                            const numValue = typeof value === 'number' ? value : 0;
                            
                            return (
                              <div 
                                key={deal.id}
                                className={cn(
                                  'flex items-center justify-between border-r px-4 py-3 last:border-r-0',
                                  isBest && 'bg-green-50 dark:bg-green-950/20'
                                )}
                              >
                                <span className={cn(
                                  'font-medium',
                                  criteria.format === 'match' && numValue >= 90 && 'text-green-500',
                                  criteria.format === 'match' && numValue >= 80 && numValue < 90 && 'text-primary',
                                  criteria.format === 'boolean' && value && 'text-green-500',
                                  criteria.format === 'boolean' && !value && 'text-muted-foreground'
                                )}>
                                  {formatValue(value, criteria.format)}
                                </span>
                                {isBest && (
                                  <Badge variant="outline" className="ml-2 border-green-500 text-green-500">
                                    <TrendingUp className="mr-1 h-3 w-3" />
                                    Best
                                  </Badge>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </FadeIn>
      )}

      {/* Portfolio Fit Analysis */}
      {!showSelector && selectedDeals.length >= 2 && profile && (
        <FadeIn delay={0.2}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Sparkles className="h-5 w-5 text-primary" />
                Portfolio Fit Analysis
              </CardTitle>
              <CardDescription>
                How each deal aligns with your investment criteria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {selectedDealData.map((deal) => {
                  const { dealSourcing, portfolioGoals } = profile;
                  
                  // Calculate fit scores
                  const industryFit = dealSourcing.targetIndustries.length === 0 || 
                    dealSourcing.targetIndustries.includes(deal.industry);
                  const stageFit = dealSourcing.dealStages.length === 0 || 
                    dealSourcing.dealStages.includes(deal.stage);
                  const sizeFit = deal.amount >= dealSourcing.investmentSizeRange.min * 0.5 && 
                    deal.amount <= dealSourcing.investmentSizeRange.max * 2;
                  
                  // Risk assessment based on metrics
                  let riskLevel: 'low' | 'medium' | 'high' = 'medium';
                  if (deal.metrics.runway && deal.metrics.runway >= 24 && deal.metrics.grossMargin >= 60) {
                    riskLevel = 'low';
                  } else if (deal.metrics.runway && deal.metrics.runway < 12) {
                    riskLevel = 'high';
                  }
                  
                  const riskFit = 
                    (dealSourcing.riskTolerance === 'conservative' && riskLevel === 'low') ||
                    (dealSourcing.riskTolerance === 'moderate' && riskLevel !== 'high') ||
                    (dealSourcing.riskTolerance === 'aggressive' || dealSourcing.riskTolerance === 'very_aggressive');

                  const fitItems = [
                    { label: 'Industry', fit: industryFit },
                    { label: 'Stage', fit: stageFit },
                    { label: 'Size', fit: sizeFit },
                    { label: 'Risk', fit: riskFit },
                  ];

                  const fitScore = fitItems.filter(item => item.fit).length;
                  const fitPercentage = (fitScore / fitItems.length) * 100;

                  return (
                    <Card key={deal.id} className="border-border/50">
                      <CardContent className="pt-4">
                        <div className="mb-3 flex items-center justify-between">
                          <p className="font-medium">{deal.name}</p>
                          <Badge variant={fitPercentage >= 75 ? 'default' : 'secondary'}>
                            {fitScore}/{fitItems.length}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          {fitItems.map((item) => (
                            <div key={item.label} className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">{item.label}</span>
                              <span className={item.fit ? 'text-green-500' : 'text-red-500'}>
                                {item.fit ? '✓' : '✗'}
                              </span>
                            </div>
                          ))}
                        </div>
                        <Progress value={fitPercentage} className="mt-3 h-1.5" />
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      )}
    </div>
  );
}
