import { useState } from 'react';
import { useROICalculator } from '@/hooks/useROICalculator';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Save, 
  RotateCcw, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Users,
  Trash2,
  History,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from 'recharts';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export function ROICalculatorTab() {
  const { user } = useAuth();
  const {
    inputs,
    outputs,
    threeYearProjection,
    savedCalculations,
    updateInput,
    resetInputs,
    loadCalculation,
    saveCalculation,
    deleteCalculation,
  } = useROICalculator();

  const [saveName, setSaveName] = useState('');
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);

  const handleSave = async () => {
    if (!saveName.trim()) {
      toast.error('Please enter a name for this calculation');
      return;
    }
    try {
      await saveCalculation.mutateAsync({ name: saveName });
      toast.success('Calculation saved successfully');
      setSaveName('');
      setSaveDialogOpen(false);
    } catch (error) {
      toast.error('Failed to save calculation');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCalculation.mutateAsync(id);
      toast.success('Calculation deleted');
    } catch (error) {
      toast.error('Failed to delete calculation');
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const costBenefitData = [
    { name: 'Platform Cost', value: inputs.annualPlatformCost, fill: 'hsl(var(--destructive))' },
    { name: 'Training Cost', value: inputs.trainingCost, fill: 'hsl(var(--warning))' },
    { name: 'Productivity Value', value: outputs.annualProductivityValue, fill: 'hsl(var(--primary))' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Input Panel */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>ROI Calculator</CardTitle>
            <CardDescription>
              Estimate the return on investment for AI platform adoption
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Employees */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <Label className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Number of Employees
                </Label>
                <span className="text-sm font-medium">{inputs.employees.toLocaleString()}</span>
              </div>
              <Slider
                value={[inputs.employees]}
                onValueChange={([v]) => updateInput('employees', v)}
                min={10}
                max={10000}
                step={10}
              />
            </div>

            {/* Average Salary */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <Label className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Average Annual Salary
                </Label>
                <span className="text-sm font-medium">{formatCurrency(inputs.averageSalary)}</span>
              </div>
              <Slider
                value={[inputs.averageSalary]}
                onValueChange={([v]) => updateInput('averageSalary', v)}
                min={30000}
                max={300000}
                step={5000}
              />
            </div>

            {/* Adoption Percentage */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <Label>AI Tool Adoption Rate</Label>
                <span className="text-sm font-medium">{inputs.adoptionPercentage}%</span>
              </div>
              <Slider
                value={[inputs.adoptionPercentage]}
                onValueChange={([v]) => updateInput('adoptionPercentage', v)}
                min={10}
                max={100}
                step={5}
              />
            </div>

            {/* Weekly Productivity Gain */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <Label className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Weekly Hours Saved (per employee)
                </Label>
                <span className="text-sm font-medium">{inputs.weeklyProductivityGain} hrs</span>
              </div>
              <Slider
                value={[inputs.weeklyProductivityGain]}
                onValueChange={([v]) => updateInput('weeklyProductivityGain', v)}
                min={1}
                max={20}
                step={0.5}
              />
            </div>

            {/* Annual Platform Cost */}
            <div className="space-y-2">
              <Label>Annual Platform Cost</Label>
              <Input
                type="number"
                value={inputs.annualPlatformCost}
                onChange={(e) => updateInput('annualPlatformCost', Number(e.target.value))}
                className="font-mono"
              />
            </div>

            {/* Training Cost */}
            <div className="space-y-2">
              <Label>One-Time Training Cost</Label>
              <Input
                type="number"
                value={inputs.trainingCost}
                onChange={(e) => updateInput('trainingCost', Number(e.target.value))}
                className="font-mono"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={resetInputs}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              {user && (
                <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Save className="h-4 w-4 mr-2" />
                      Save Calculation
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Save ROI Calculation</DialogTitle>
                      <DialogDescription>
                        Give this calculation a name to save it for later reference.
                      </DialogDescription>
                    </DialogHeader>
                    <Input
                      placeholder="e.g., Q1 2024 Estimate"
                      value={saveName}
                      onChange={(e) => setSaveName(e.target.value)}
                    />
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSave} disabled={saveCalculation.isPending}>
                        Save
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Results Panel */}
        <div className="space-y-4">
          {/* Key Metrics */}
          <Card className={cn(
            outputs.roiPercentage >= 100 ? 'border-green-500/50' : 
            outputs.roiPercentage >= 0 ? 'border-yellow-500/50' : 'border-red-500/50'
          )}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                ROI Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className={cn(
                  'text-4xl font-bold',
                  outputs.roiPercentage >= 100 ? 'text-green-600' :
                  outputs.roiPercentage >= 0 ? 'text-yellow-600' : 'text-red-600'
                )}>
                  {outputs.roiPercentage.toFixed(0)}%
                </div>
                <div className="text-sm text-muted-foreground">Return on Investment</div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="p-3 rounded-lg bg-muted">
                  <div className="font-medium">{formatCurrency(outputs.annualProductivityValue)}</div>
                  <div className="text-xs text-muted-foreground">Annual Value</div>
                </div>
                <div className="p-3 rounded-lg bg-muted">
                  <div className="font-medium">{formatCurrency(outputs.totalCost)}</div>
                  <div className="text-xs text-muted-foreground">Total Cost</div>
                </div>
                <div className="p-3 rounded-lg bg-muted">
                  <div className={cn(
                    'font-medium',
                    outputs.netBenefit >= 0 ? 'text-green-600' : 'text-red-600'
                  )}>
                    {formatCurrency(outputs.netBenefit)}
                  </div>
                  <div className="text-xs text-muted-foreground">Net Benefit</div>
                </div>
                <div className="p-3 rounded-lg bg-muted">
                  <div className="font-medium">
                    {outputs.paybackMonths < 999 ? `${outputs.paybackMonths.toFixed(1)} mo` : 'N/A'}
                  </div>
                  <div className="text-xs text-muted-foreground">Payback Period</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Saved Calculations */}
          {user && savedCalculations.length > 0 && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Saved Calculations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {savedCalculations.slice(0, 5).map((calc) => (
                  <div 
                    key={calc.id}
                    className="flex items-center justify-between p-2 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <button
                      className="flex-1 text-left"
                      onClick={() => loadCalculation(calc)}
                    >
                      <div className="font-medium text-sm">{calc.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(calc.createdAt).toLocaleDateString()}
                      </div>
                    </button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() => handleDelete(calc.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Cost vs Benefit */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Cost vs. Benefit Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={costBenefitData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                  <YAxis type="category" dataKey="name" width={120} />
                  <Tooltip formatter={(v: number) => formatCurrency(v)} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* 3-Year Projection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">3-Year Projection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={threeYearProjection}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" tickFormatter={(v) => `Year ${v}`} />
                  <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(v: number) => formatCurrency(v)} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="cumulativeBenefit" 
                    name="Cumulative Benefit"
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="cumulativeCost" 
                    name="Cumulative Cost"
                    stroke="hsl(var(--destructive))" 
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="netValue" 
                    name="Net Value"
                    stroke="hsl(var(--success))" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
