import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Clock, 
  Sparkles,
  Calculator
} from 'lucide-react';

export function ROICalculatorWidget() {
  const [teamSize, setTeamSize] = useState(25);
  const [currentSpend, setCurrentSpend] = useState(5000);

  const calculations = useMemo(() => {
    // Productivity gains: 5 hours saved per employee per month
    const hoursSavedPerEmployee = 5;
    const avgHourlyRate = 50; // Average hourly cost
    const productivitySavings = teamSize * hoursSavedPerEmployee * avgHourlyRate;
    
    // AI tool consolidation savings (typically 30% of fragmented spend)
    const consolidationSavings = currentSpend * 0.3;
    
    // Recommended tier based on team size
    let recommendedTier = 'Starter';
    let tierCost = 299;
    if (teamSize > 50) {
      recommendedTier = 'Enterprise';
      tierCost = teamSize * 15; // Estimated per-seat enterprise pricing
    } else if (teamSize > 10) {
      recommendedTier = 'Professional';
      tierCost = 799;
    }
    
    // Total monthly savings
    const totalMonthlySavings = productivitySavings + consolidationSavings - tierCost;
    const annualSavings = totalMonthlySavings * 12;
    const roi = tierCost > 0 ? ((totalMonthlySavings / tierCost) * 100).toFixed(0) : 0;
    
    return {
      productivitySavings,
      consolidationSavings,
      recommendedTier,
      tierCost,
      totalMonthlySavings,
      annualSavings,
      roi,
      hoursSavedTotal: teamSize * hoursSavedPerEmployee
    };
  }, [teamSize, currentSpend]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <Card className="border-primary/20 shadow-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="font-display text-xl">ROI Calculator</CardTitle>
            <CardDescription>Estimate your potential savings</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-8">
        {/* Team Size Slider */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Team Size</span>
            </div>
            <Badge variant="secondary" className="font-mono">
              {teamSize} employees
            </Badge>
          </div>
          <Slider
            value={[teamSize]}
            onValueChange={(value) => setTeamSize(value[0])}
            min={5}
            max={200}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>5</span>
            <span>200+</span>
          </div>
        </div>

        {/* Current AI Spend Slider */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Current Monthly AI Spend</span>
            </div>
            <Badge variant="secondary" className="font-mono">
              {formatCurrency(currentSpend)}
            </Badge>
          </div>
          <Slider
            value={[currentSpend]}
            onValueChange={(value) => setCurrentSpend(value[0])}
            min={500}
            max={50000}
            step={500}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>$500</span>
            <span>$50,000+</span>
          </div>
        </div>

        {/* Results */}
        <div className="border-t border-border pt-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-sm font-semibold text-accent">Your Estimated Savings</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-muted/50 p-4">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Hours Saved/Month</span>
              </div>
              <p className="font-display text-2xl font-bold text-foreground">
                {calculations.hoursSavedTotal}
              </p>
            </div>
            <div className="rounded-lg bg-muted/50 p-4">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">ROI</span>
              </div>
              <p className="font-display text-2xl font-bold text-accent">
                {calculations.roi}%
              </p>
            </div>
          </div>

          <div className="rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Productivity Gains</span>
              <span className="font-medium text-foreground">
                +{formatCurrency(calculations.productivitySavings)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Tool Consolidation</span>
              <span className="font-medium text-foreground">
                +{formatCurrency(calculations.consolidationSavings)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                {calculations.recommendedTier} Plan
              </span>
              <span className="font-medium text-muted-foreground">
                -{formatCurrency(calculations.tierCost)}
              </span>
            </div>
            <div className="border-t border-border/50 pt-3 mt-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Net Monthly Savings</span>
                <span className={`font-display text-xl font-bold ${calculations.totalMonthlySavings > 0 ? 'text-accent' : 'text-destructive'}`}>
                  {formatCurrency(calculations.totalMonthlySavings)}
                </span>
              </div>
            </div>
          </div>

          <div className="text-center pt-2">
            <p className="text-sm text-muted-foreground">
              Projected annual savings: 
              <span className="font-semibold text-foreground ml-1">
                {formatCurrency(calculations.annualSavings)}
              </span>
            </p>
            <Badge className="mt-3 accent-gradient border-0">
              Recommended: {calculations.recommendedTier}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
