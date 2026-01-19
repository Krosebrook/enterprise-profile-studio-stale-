import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { OnboardingTooltip } from '../OnboardingTooltip';
import { AISuggestionsPanel } from '../AISuggestionsPanel';
import { useAISuggestions } from '@/hooks/useAISuggestions';
import { OnboardingUserProfile, INDUSTRIES, DEAL_STRUCTURES, REGIONS, DEAL_STAGES } from '@/types/onboarding';
import { Target, DollarSign, Globe2, Shield, Layers, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DealSourcingStepProps {
  data: OnboardingUserProfile['dealSourcing'];
  onChange: (data: Partial<OnboardingUserProfile['dealSourcing']>) => void;
  welcomeData?: OnboardingUserProfile['welcome'];
}

const riskLevels = [
  { value: 'conservative', label: 'Conservative', color: 'bg-green-500', description: 'Stable, lower-risk opportunities' },
  { value: 'moderate', label: 'Moderate', color: 'bg-blue-500', description: 'Balanced risk-reward' },
  { value: 'aggressive', label: 'Aggressive', color: 'bg-orange-500', description: 'Higher risk, higher potential' },
  { value: 'very_aggressive', label: 'Very Aggressive', color: 'bg-red-500', description: 'Maximum growth focus' },
] as const;

const formatCurrency = (value: number) => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
  return `$${value}`;
};

export function DealSourcingStep({ data, onChange, welcomeData }: DealSourcingStepProps) {
  const { suggestions, isLoading, generateSuggestions } = useAISuggestions();
  const [appliedFields, setAppliedFields] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Generate AI suggestions when the step loads
  useEffect(() => {
    if (welcomeData?.role && welcomeData?.experienceLevel && !suggestions && !isLoading) {
      generateSuggestions(welcomeData.role, welcomeData.experienceLevel, {
        targetIndustries: data.targetIndustries,
        riskTolerance: data.riskTolerance,
      });
      setShowSuggestions(true);
    }
  }, [welcomeData, generateSuggestions, suggestions, isLoading, data.targetIndustries, data.riskTolerance]);

  const toggleArrayItem = <T extends string>(array: T[], item: T): T[] => {
    return array.includes(item)
      ? array.filter(i => i !== item)
      : [...array, item];
  };

  const handleApplySuggestion = (field: string, values: string[] | string | { min: number; max: number }) => {
    switch (field) {
      case 'industries':
        onChange({ targetIndustries: values as string[] });
        break;
      case 'dealStructures':
        onChange({ preferredDealStructures: values as string[] });
        break;
      case 'stages':
        onChange({ dealStages: values as string[] });
        break;
      case 'regions':
        onChange({ geoPreferences: { ...data.geoPreferences, regions: values as string[] } });
        break;
      case 'riskTolerance':
        onChange({ riskTolerance: values as typeof data.riskTolerance });
        break;
      case 'investmentRange':
        onChange({ investmentSizeRange: { ...data.investmentSizeRange, ...(values as { min: number; max: number }) } });
        break;
    }
    setAppliedFields(prev => [...prev, field]);
  };

  const handleApplyAll = () => {
    if (!suggestions) return;
    
    onChange({
      targetIndustries: suggestions.industries.filter(i => INDUSTRIES.includes(i)) as string[],
      preferredDealStructures: suggestions.dealStructures.filter(s => DEAL_STRUCTURES.includes(s)) as string[],
      dealStages: suggestions.stages.filter(s => DEAL_STAGES.includes(s)) as string[],
      geoPreferences: { 
        ...data.geoPreferences, 
        regions: suggestions.regions.filter(r => REGIONS.includes(r)) as string[]
      },
      riskTolerance: suggestions.riskTolerance as typeof data.riskTolerance,
      investmentSizeRange: { ...data.investmentSizeRange, ...suggestions.investmentRange },
    });
    setAppliedFields(['industries', 'dealStructures', 'stages', 'regions', 'riskTolerance', 'investmentRange']);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <Target className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold">Deal Sourcing Criteria</h2>
            <p className="text-sm text-muted-foreground">Define the types of deals you're looking for</p>
          </div>
        </div>
        {!showSuggestions && welcomeData && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              generateSuggestions(welcomeData.role, welcomeData.experienceLevel);
              setShowSuggestions(true);
            }}
            className="gap-2"
          >
            <Sparkles className="h-4 w-4" />
            Get AI Suggestions
          </Button>
        )}
      </motion.div>

      {/* AI Suggestions Panel */}
      {showSuggestions && (
        <AISuggestionsPanel
          suggestions={suggestions}
          isLoading={isLoading}
          onApplySuggestion={handleApplySuggestion}
          onApplyAll={handleApplyAll}
          appliedFields={appliedFields}
        />
      )}

      {/* Target Industries */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Layers className="h-5 w-5 text-primary" />
            Target Industries
            <OnboardingTooltip 
              content="Select the sectors where you want to focus your deal sourcing. You can adjust this anytime."
              example="Select Technology and Healthcare for life sciences tech deals."
            />
          </CardTitle>
          <CardDescription>Select all that interest you</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {INDUSTRIES.map((industry) => {
              const isSelected = data.targetIndustries.includes(industry);
              return (
                <motion.button
                  key={industry}
                  type="button"
                  onClick={() => onChange({ targetIndustries: toggleArrayItem(data.targetIndustries, industry) })}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Badge
                    variant={isSelected ? 'default' : 'outline'}
                    className={cn(
                      'cursor-pointer px-3 py-1.5 text-sm transition-all',
                      isSelected && 'bg-primary'
                    )}
                  >
                    {industry}
                  </Badge>
                </motion.button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Investment Size Range */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <DollarSign className="h-5 w-5 text-primary" />
            Investment Size Range
            <OnboardingTooltip 
              content="The typical amount you'd invest per deal. This helps us show relevant opportunities."
            />
          </CardTitle>
          <CardDescription>
            {formatCurrency(data.investmentSizeRange.min)} – {formatCurrency(data.investmentSizeRange.max)}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label className="text-sm text-muted-foreground">Minimum Investment</Label>
            <Slider
              value={[data.investmentSizeRange.min]}
              onValueChange={([value]) => onChange({
                investmentSizeRange: { ...data.investmentSizeRange, min: value }
              })}
              min={10000}
              max={10000000}
              step={10000}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>$10K</span>
              <span>$10M</span>
            </div>
          </div>
          <div className="space-y-3">
            <Label className="text-sm text-muted-foreground">Maximum Investment</Label>
            <Slider
              value={[data.investmentSizeRange.max]}
              onValueChange={([value]) => onChange({
                investmentSizeRange: { ...data.investmentSizeRange, max: value }
              })}
              min={data.investmentSizeRange.min}
              max={100000000}
              step={100000}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatCurrency(data.investmentSizeRange.min)}</span>
              <span>$100M</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Deal Structures & Stages */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Preferred Deal Structures</CardTitle>
            <CardDescription>How you like to invest</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {DEAL_STRUCTURES.map((structure) => {
                const isSelected = data.preferredDealStructures.includes(structure);
                return (
                  <Badge
                    key={structure}
                    variant={isSelected ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => onChange({ preferredDealStructures: toggleArrayItem(data.preferredDealStructures, structure) })}
                  >
                    {structure}
                  </Badge>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Deal Stages</CardTitle>
            <CardDescription>Company maturity preference</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {DEAL_STAGES.map((stage) => {
                const isSelected = data.dealStages.includes(stage);
                return (
                  <Badge
                    key={stage}
                    variant={isSelected ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => onChange({ dealStages: toggleArrayItem(data.dealStages, stage) })}
                  >
                    {stage}
                  </Badge>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Geographic Preferences */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Globe2 className="h-5 w-5 text-primary" />
            Geographic Preferences
            <OnboardingTooltip content="Choose regions where you're interested in sourcing deals." />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {REGIONS.map((region) => {
              const isSelected = data.geoPreferences.regions.includes(region);
              return (
                <Badge
                  key={region}
                  variant={isSelected ? 'default' : 'outline'}
                  className="cursor-pointer px-3 py-1.5"
                  onClick={() => onChange({
                    geoPreferences: {
                      ...data.geoPreferences,
                      regions: toggleArrayItem(data.geoPreferences.regions, region)
                    }
                  })}
                >
                  {region}
                </Badge>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Risk Tolerance */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="h-5 w-5 text-primary" />
            Risk Tolerance
            <OnboardingTooltip 
              content="Your comfort level with investment risk. This influences deal recommendations."
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {riskLevels.map((level) => {
              const isSelected = data.riskTolerance === level.value;
              return (
                <motion.button
                  key={level.value}
                  type="button"
                  onClick={() => onChange({ riskTolerance: level.value })}
                  className={cn(
                    'flex flex-col items-center gap-2 rounded-lg border-2 p-4 text-center transition-all',
                    isSelected
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={cn('h-3 w-3 rounded-full', level.color)} />
                  <span className="font-medium">{level.label}</span>
                  <span className="text-xs text-muted-foreground">{level.description}</span>
                </motion.button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
