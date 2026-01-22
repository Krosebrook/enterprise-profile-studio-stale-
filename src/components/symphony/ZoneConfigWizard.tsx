import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, AlertTriangle, CheckCircle2, XCircle, 
  Building2, Stethoscope, ShoppingCart, Banknote, Factory, GraduationCap,
  ArrowRight, ArrowLeft, Sparkles, Settings, Save
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ZoneRule {
  id: string;
  name: string;
  description: string;
  zone: 'green' | 'yellow' | 'red';
  enabled: boolean;
  autoApprove?: boolean;
}

interface IndustryVertical {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  defaultRules: ZoneRule[];
}

const industries: IndustryVertical[] = [
  {
    id: 'healthcare',
    name: 'Healthcare',
    icon: Stethoscope,
    description: 'HIPAA-compliant automation with patient data protection',
    defaultRules: [
      { id: 'h1', name: 'Appointment Scheduling', description: 'Auto-schedule non-urgent appointments', zone: 'green', enabled: true, autoApprove: true },
      { id: 'h2', name: 'Insurance Verification', description: 'Verify patient insurance eligibility', zone: 'green', enabled: true, autoApprove: true },
      { id: 'h3', name: 'Prescription Refills', description: 'Process routine prescription renewals', zone: 'yellow', enabled: true, autoApprove: false },
      { id: 'h4', name: 'Medical Records Access', description: 'Handle PHI data requests', zone: 'yellow', enabled: true, autoApprove: false },
      { id: 'h5', name: 'Treatment Recommendations', description: 'AI-assisted diagnosis suggestions', zone: 'red', enabled: false, autoApprove: false },
      { id: 'h6', name: 'Emergency Triage', description: 'Critical care decision support', zone: 'red', enabled: false, autoApprove: false },
    ],
  },
  {
    id: 'finance',
    name: 'Finance',
    icon: Banknote,
    description: 'SEC/SOX-compliant with fraud detection safeguards',
    defaultRules: [
      { id: 'f1', name: 'Balance Inquiries', description: 'Respond to account balance requests', zone: 'green', enabled: true, autoApprove: true },
      { id: 'f2', name: 'Transaction History', description: 'Provide transaction reports', zone: 'green', enabled: true, autoApprove: true },
      { id: 'f3', name: 'Wire Transfers', description: 'Process domestic wire transfers', zone: 'yellow', enabled: true, autoApprove: false },
      { id: 'f4', name: 'Credit Decisions', description: 'Loan approval recommendations', zone: 'yellow', enabled: true, autoApprove: false },
      { id: 'f5', name: 'Large Transactions', description: 'Transfers exceeding $10,000', zone: 'red', enabled: false, autoApprove: false },
      { id: 'f6', name: 'Account Closures', description: 'Process account terminations', zone: 'red', enabled: false, autoApprove: false },
    ],
  },
  {
    id: 'retail',
    name: 'Retail',
    icon: ShoppingCart,
    description: 'Customer-focused automation with inventory management',
    defaultRules: [
      { id: 'r1', name: 'Product Recommendations', description: 'AI-powered product suggestions', zone: 'green', enabled: true, autoApprove: true },
      { id: 'r2', name: 'Order Status Updates', description: 'Tracking and delivery info', zone: 'green', enabled: true, autoApprove: true },
      { id: 'r3', name: 'Returns Processing', description: 'Handle return requests', zone: 'yellow', enabled: true, autoApprove: false },
      { id: 'r4', name: 'Price Matching', description: 'Competitor price adjustments', zone: 'yellow', enabled: true, autoApprove: false },
      { id: 'r5', name: 'Bulk Discounts', description: 'Large order negotiations', zone: 'red', enabled: false, autoApprove: false },
      { id: 'r6', name: 'VIP Customer Issues', description: 'High-value customer escalations', zone: 'red', enabled: false, autoApprove: false },
    ],
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    icon: Factory,
    description: 'Production optimization with safety compliance',
    defaultRules: [
      { id: 'm1', name: 'Inventory Alerts', description: 'Low stock notifications', zone: 'green', enabled: true, autoApprove: true },
      { id: 'm2', name: 'Maintenance Scheduling', description: 'Routine equipment maintenance', zone: 'green', enabled: true, autoApprove: true },
      { id: 'm3', name: 'Quality Control', description: 'Defect detection and reporting', zone: 'yellow', enabled: true, autoApprove: false },
      { id: 'm4', name: 'Production Changes', description: 'Line adjustments and scheduling', zone: 'yellow', enabled: true, autoApprove: false },
      { id: 'm5', name: 'Safety Incidents', description: 'Workplace safety issues', zone: 'red', enabled: false, autoApprove: false },
      { id: 'm6', name: 'Equipment Shutdown', description: 'Emergency production halts', zone: 'red', enabled: false, autoApprove: false },
    ],
  },
  {
    id: 'education',
    name: 'Education',
    icon: GraduationCap,
    description: 'FERPA-compliant with academic integrity safeguards',
    defaultRules: [
      { id: 'e1', name: 'Course Information', description: 'Class schedules and syllabi', zone: 'green', enabled: true, autoApprove: true },
      { id: 'e2', name: 'Assignment Help', description: 'Study resources and guidance', zone: 'green', enabled: true, autoApprove: true },
      { id: 'e3', name: 'Grade Inquiries', description: 'Student grade information', zone: 'yellow', enabled: true, autoApprove: false },
      { id: 'e4', name: 'Enrollment Changes', description: 'Course add/drop requests', zone: 'yellow', enabled: true, autoApprove: false },
      { id: 'e5', name: 'Academic Appeals', description: 'Grade disputes and appeals', zone: 'red', enabled: false, autoApprove: false },
      { id: 'e6', name: 'Disciplinary Actions', description: 'Student conduct issues', zone: 'red', enabled: false, autoApprove: false },
    ],
  },
  {
    id: 'general',
    name: 'General Business',
    icon: Building2,
    description: 'Standard business automation framework',
    defaultRules: [
      { id: 'g1', name: 'Email Responses', description: 'Routine email handling', zone: 'green', enabled: true, autoApprove: true },
      { id: 'g2', name: 'Meeting Scheduling', description: 'Calendar management', zone: 'green', enabled: true, autoApprove: true },
      { id: 'g3', name: 'Document Processing', description: 'Contract and form handling', zone: 'yellow', enabled: true, autoApprove: false },
      { id: 'g4', name: 'Vendor Communications', description: 'External partner interactions', zone: 'yellow', enabled: true, autoApprove: false },
      { id: 'g5', name: 'Financial Approvals', description: 'Budget and expense decisions', zone: 'red', enabled: false, autoApprove: false },
      { id: 'g6', name: 'Legal Matters', description: 'Contract negotiations and disputes', zone: 'red', enabled: false, autoApprove: false },
    ],
  },
];

const zoneConfig = {
  green: { label: 'Green Zone', icon: CheckCircle2, color: 'bg-success text-white', description: 'Fully automated, no human approval needed' },
  yellow: { label: 'Yellow Zone', icon: AlertTriangle, color: 'bg-warning text-white', description: 'Requires human review before action' },
  red: { label: 'Red Zone', icon: XCircle, color: 'bg-destructive text-white', description: 'Human-only, AI provides recommendations only' },
};

interface ZoneConfigWizardProps {
  onComplete?: (config: { industry: string; rules: ZoneRule[]; customInstructions: string }) => void;
}

export function ZoneConfigWizard({ onComplete }: ZoneConfigWizardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryVertical | null>(null);
  const [rules, setRules] = useState<ZoneRule[]>([]);
  const [customInstructions, setCustomInstructions] = useState('');

  const totalSteps = 4;

  const handleIndustrySelect = (industry: IndustryVertical) => {
    setSelectedIndustry(industry);
    setRules([...industry.defaultRules]);
  };

  const toggleRule = (ruleId: string, field: 'enabled' | 'autoApprove') => {
    setRules(prev => prev.map(rule => 
      rule.id === ruleId ? { ...rule, [field]: !rule[field] } : rule
    ));
  };

  const changeZone = (ruleId: string, zone: 'green' | 'yellow' | 'red') => {
    setRules(prev => prev.map(rule => 
      rule.id === ruleId ? { ...rule, zone, autoApprove: zone === 'green' } : rule
    ));
  };

  const handleComplete = () => {
    if (selectedIndustry) {
      onComplete?.({
        industry: selectedIndustry.id,
        rules,
        customInstructions,
      });
      toast.success('Zone configuration saved successfully!');
      setIsOpen(false);
      setStep(1);
    }
  };

  const resetWizard = () => {
    setStep(1);
    setSelectedIndustry(null);
    setRules([]);
    setCustomInstructions('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetWizard(); }}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Settings className="w-4 h-4" />
          Configure Zones
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Zone Configuration Wizard
          </DialogTitle>
        </DialogHeader>

        {/* Progress indicator */}
        <div className="flex items-center gap-2 mb-6">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors',
                step >= s ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              )}>
                {s}
              </div>
              {s < 4 && (
                <div className={cn(
                  'w-12 h-1 mx-1 rounded transition-colors',
                  step > s ? 'bg-primary' : 'bg-muted'
                )} />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Industry Selection */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="text-center mb-6">
                <h3 className="font-display text-lg font-semibold">Select Your Industry</h3>
                <p className="text-sm text-muted-foreground">Choose your industry vertical to load recommended automation rules</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {industries.map((industry) => (
                  <Card 
                    key={industry.id}
                    className={cn(
                      'cursor-pointer transition-all hover:shadow-md',
                      selectedIndustry?.id === industry.id && 'ring-2 ring-primary border-primary'
                    )}
                    onClick={() => handleIndustrySelect(industry)}
                  >
                    <CardContent className="p-4 text-center">
                      <industry.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <h4 className="font-medium text-sm">{industry.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{industry.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Green Zone Rules */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', zoneConfig.green.color)}>
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold">Green Zone — Full Automation</h3>
                  <p className="text-sm text-muted-foreground">{zoneConfig.green.description}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {rules.filter(r => r.zone === 'green').map((rule) => (
                  <Card key={rule.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{rule.name}</h4>
                        <p className="text-xs text-muted-foreground">{rule.description}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Switch 
                            checked={rule.enabled} 
                            onCheckedChange={() => toggleRule(rule.id, 'enabled')}
                          />
                          <Label className="text-xs">Enabled</Label>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => changeZone(rule.id, 'yellow')}
                          className="text-xs"
                        >
                          Move to Yellow →
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: Yellow & Red Zone Rules */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Yellow Zone */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', zoneConfig.yellow.color)}>
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold">Yellow Zone — Human Review</h3>
                    <p className="text-sm text-muted-foreground">{zoneConfig.yellow.description}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {rules.filter(r => r.zone === 'yellow').map((rule) => (
                    <Card key={rule.id} className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{rule.name}</h4>
                          <p className="text-xs text-muted-foreground">{rule.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" onClick={() => changeZone(rule.id, 'green')} className="text-xs">← Green</Button>
                          <Switch checked={rule.enabled} onCheckedChange={() => toggleRule(rule.id, 'enabled')} />
                          <Button variant="ghost" size="sm" onClick={() => changeZone(rule.id, 'red')} className="text-xs">Red →</Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Red Zone */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', zoneConfig.red.color)}>
                    <XCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold">Red Zone — Human Only</h3>
                    <p className="text-sm text-muted-foreground">{zoneConfig.red.description}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {rules.filter(r => r.zone === 'red').map((rule) => (
                    <Card key={rule.id} className="p-3 border-destructive/30">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{rule.name}</h4>
                          <p className="text-xs text-muted-foreground">{rule.description}</p>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => changeZone(rule.id, 'yellow')} className="text-xs">← Yellow</Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Review & Custom Instructions */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center mb-4">
                <Sparkles className="w-10 h-10 text-primary mx-auto mb-2" />
                <h3 className="font-display text-lg font-semibold">Review Configuration</h3>
                <p className="text-sm text-muted-foreground">Review your zone setup and add any custom instructions</p>
              </div>

              {/* Summary */}
              <div className="grid grid-cols-3 gap-4">
                {(['green', 'yellow', 'red'] as const).map((zone) => {
                  const config = zoneConfig[zone];
                  const count = rules.filter(r => r.zone === zone && r.enabled).length;
                  return (
                    <Card key={zone} className="p-4 text-center">
                      <Badge className={cn('mb-2', config.color)}>{config.label}</Badge>
                      <div className="text-2xl font-bold">{count}</div>
                      <div className="text-xs text-muted-foreground">Active Rules</div>
                    </Card>
                  );
                })}
              </div>

              {/* Custom Instructions */}
              <div className="space-y-2">
                <Label>Custom Instructions (Optional)</Label>
                <Textarea
                  placeholder="Add any additional automation guidelines or exceptions..."
                  value={customInstructions}
                  onChange={(e) => setCustomInstructions(e.target.value)}
                  rows={4}
                />
              </div>

              {/* Industry badge */}
              {selectedIndustry && (
                <div className="flex items-center gap-2 p-4 bg-muted/50 rounded-lg">
                  <selectedIndustry.icon className="w-5 h-5 text-primary" />
                  <span className="font-medium">{selectedIndustry.name}</span>
                  <span className="text-sm text-muted-foreground">— {selectedIndustry.description}</span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between pt-6 border-t">
          <Button
            variant="outline"
            onClick={() => setStep(s => Math.max(1, s - 1))}
            disabled={step === 1}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          {step < totalSteps ? (
            <Button
              onClick={() => setStep(s => s + 1)}
              disabled={step === 1 && !selectedIndustry}
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleComplete} className="btn-premium">
              <Save className="w-4 h-4 mr-2" />
              Save Configuration
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
