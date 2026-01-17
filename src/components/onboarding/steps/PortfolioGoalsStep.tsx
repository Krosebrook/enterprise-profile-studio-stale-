import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { OnboardingTooltip } from '../OnboardingTooltip';
import { OnboardingUserProfile, INDUSTRIES, ASSET_CLASSES } from '@/types/onboarding';
import { Target, Clock, TrendingUp, PieChart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PortfolioGoalsStepProps {
  data: OnboardingUserProfile['portfolioGoals'];
  onChange: (data: Partial<OnboardingUserProfile['portfolioGoals']>) => void;
}

const timeHorizons = [
  { value: 'short', label: 'Short-term', description: '< 3 years', icon: '⚡' },
  { value: 'medium', label: 'Medium-term', description: '3-7 years', icon: '📈' },
  { value: 'long', label: 'Long-term', description: '7+ years', icon: '🎯' },
  { value: 'mixed', label: 'Mixed', description: 'Various horizons', icon: '🔄' },
] as const;

export function PortfolioGoalsStep({ data, onChange }: PortfolioGoalsStepProps) {
  const toggleArrayItem = <T extends string>(array: T[], item: T): T[] => {
    return array.includes(item)
      ? array.filter(i => i !== item)
      : [...array, item];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
          <Target className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="font-display text-xl font-bold">Portfolio Goals</h2>
          <p className="text-sm text-muted-foreground">Define your investment objectives and preferences</p>
        </div>
      </motion.div>

      {/* Time Horizon */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Clock className="h-5 w-5 text-primary" />
            Investment Time Horizon
            <OnboardingTooltip 
              content="How long you typically expect to hold investments before exiting."
              example="Long-term investors (7+ years) often focus on value creation over quick returns."
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {timeHorizons.map((horizon) => {
              const isSelected = data.timeHorizon === horizon.value;
              return (
                <motion.button
                  key={horizon.value}
                  type="button"
                  onClick={() => onChange({ timeHorizon: horizon.value })}
                  className={cn(
                    'flex flex-col items-center gap-2 rounded-lg border-2 p-4 text-center transition-all',
                    isSelected
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-2xl">{horizon.icon}</span>
                  <span className="font-medium">{horizon.label}</span>
                  <span className="text-xs text-muted-foreground">{horizon.description}</span>
                </motion.button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Target Returns */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="h-5 w-5 text-primary" />
            Target Return Expectations
            <OnboardingTooltip 
              content="Your expected annual return on investments. This helps filter opportunities."
            />
          </CardTitle>
          <CardDescription>
            Target: <span className="font-semibold text-primary">{data.targetReturnExpectation.percentage}%</span> {data.targetReturnExpectation.period === 'annual' ? 'per year' : 'total return'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Slider
              value={[data.targetReturnExpectation.percentage]}
              onValueChange={([value]) => onChange({
                targetReturnExpectation: { ...data.targetReturnExpectation, percentage: value }
              })}
              min={5}
              max={50}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>5% (Conservative)</span>
              <span>25% (Growth)</span>
              <span>50% (Aggressive)</span>
            </div>
          </div>
          
          <RadioGroup
            value={data.targetReturnExpectation.period}
            onValueChange={(value) => onChange({
              targetReturnExpectation: { ...data.targetReturnExpectation, period: value as 'annual' | 'total' }
            })}
            className="flex gap-4"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value="annual" id="annual" />
              <Label htmlFor="annual">Annual Return</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="total" id="total" />
              <Label htmlFor="total">Total Return</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Diversification */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <PieChart className="h-5 w-5 text-primary" />
            Diversification Preferences
            <OnboardingTooltip 
              content="Set limits on concentration to manage risk across your portfolio."
            />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm">Max Single Position</Label>
              <span className="text-sm font-medium text-primary">{data.diversificationPreferences.maxSinglePosition}%</span>
            </div>
            <Slider
              value={[data.diversificationPreferences.maxSinglePosition]}
              onValueChange={([value]) => onChange({
                diversificationPreferences: { ...data.diversificationPreferences, maxSinglePosition: value }
              })}
              min={1}
              max={50}
              step={1}
              className="w-full"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm">Max Sector Exposure</Label>
              <span className="text-sm font-medium text-primary">{data.diversificationPreferences.maxSectorExposure}%</span>
            </div>
            <Slider
              value={[data.diversificationPreferences.maxSectorExposure]}
              onValueChange={([value]) => onChange({
                diversificationPreferences: { ...data.diversificationPreferences, maxSectorExposure: value }
              })}
              min={10}
              max={100}
              step={5}
              className="w-full"
            />
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div>
              <Label className="font-medium">Prefer Multi-Asset Allocation</Label>
              <p className="text-xs text-muted-foreground">Spread investments across different asset classes</p>
            </div>
            <Switch
              checked={data.diversificationPreferences.preferMultiAsset}
              onCheckedChange={(checked) => onChange({
                diversificationPreferences: { ...data.diversificationPreferences, preferMultiAsset: checked }
              })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Sector & Asset Class Priorities */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Sector Priorities</CardTitle>
            <CardDescription>Sectors to prioritize</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {INDUSTRIES.slice(0, 8).map((sector) => {
                const isSelected = data.sectorPriorities.includes(sector);
                return (
                  <Badge
                    key={sector}
                    variant={isSelected ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => onChange({ sectorPriorities: toggleArrayItem(data.sectorPriorities, sector) })}
                  >
                    {sector}
                  </Badge>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Asset Class Focus</CardTitle>
            <CardDescription>Primary asset classes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {ASSET_CLASSES.map((assetClass) => {
                const isSelected = data.assetClassPriorities.includes(assetClass);
                return (
                  <Badge
                    key={assetClass}
                    variant={isSelected ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => onChange({ assetClassPriorities: toggleArrayItem(data.assetClassPriorities, assetClass) })}
                  >
                    {assetClass}
                  </Badge>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
