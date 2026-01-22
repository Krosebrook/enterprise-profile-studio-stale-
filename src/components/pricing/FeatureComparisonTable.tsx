import { Check, Minus } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

type FeatureValue = boolean | string;

interface Feature {
  name: string;
  category: string;
  starter: FeatureValue;
  professional: FeatureValue;
  enterprise: FeatureValue;
}

const features: Feature[] = [
  // Personas & Users
  { name: 'Employee Personas', category: 'Personas & Users', starter: '10', professional: '50', enterprise: 'Unlimited' },
  { name: 'Team Members', category: 'Personas & Users', starter: '5', professional: '25', enterprise: 'Unlimited' },
  { name: 'Admin Accounts', category: 'Personas & Users', starter: '1', professional: '5', enterprise: 'Unlimited' },
  { name: 'Role-Based Access Control', category: 'Personas & Users', starter: false, professional: true, enterprise: true },
  
  // Ecosystem Exports
  { name: 'Claude Export', category: 'Ecosystem Exports', starter: true, professional: true, enterprise: true },
  { name: 'Google Gemini Export', category: 'Ecosystem Exports', starter: true, professional: true, enterprise: true },
  { name: 'Microsoft Copilot Export', category: 'Ecosystem Exports', starter: false, professional: true, enterprise: true },
  { name: 'OpenAI/ChatGPT Export', category: 'Ecosystem Exports', starter: false, professional: true, enterprise: true },
  { name: 'Custom API JSON Export', category: 'Ecosystem Exports', starter: false, professional: true, enterprise: true },
  { name: 'n8n Workflow Templates', category: 'Ecosystem Exports', starter: false, professional: true, enterprise: true },
  { name: 'Bulk Export (ZIP)', category: 'Ecosystem Exports', starter: false, professional: true, enterprise: true },
  
  // Knowledge Base
  { name: 'Knowledge Documents', category: 'Knowledge Base', starter: '5', professional: 'Unlimited', enterprise: 'Unlimited' },
  { name: 'Document Versioning', category: 'Knowledge Base', starter: false, professional: true, enterprise: true },
  { name: 'Folder Organization', category: 'Knowledge Base', starter: true, professional: true, enterprise: true },
  { name: 'AI Document Generation', category: 'Knowledge Base', starter: '10/mo', professional: '100/mo', enterprise: 'Unlimited' },
  
  // Analytics & Reporting
  { name: 'Basic Analytics', category: 'Analytics & Reporting', starter: true, professional: true, enterprise: true },
  { name: 'Advanced Analytics', category: 'Analytics & Reporting', starter: false, professional: true, enterprise: true },
  { name: 'Usage Reports', category: 'Analytics & Reporting', starter: false, professional: true, enterprise: true },
  { name: 'Custom Dashboards', category: 'Analytics & Reporting', starter: false, professional: false, enterprise: true },
  { name: 'API Usage Metrics', category: 'Analytics & Reporting', starter: false, professional: true, enterprise: true },
  
  // Integration & API
  { name: 'REST API Access', category: 'Integration & API', starter: false, professional: true, enterprise: true },
  { name: 'Webhooks', category: 'Integration & API', starter: false, professional: true, enterprise: true },
  { name: 'API Rate Limit', category: 'Integration & API', starter: '-', professional: '1K/day', enterprise: 'Unlimited' },
  { name: 'Zapier/Make Integration', category: 'Integration & API', starter: false, professional: true, enterprise: true },
  
  // Security & Compliance
  { name: 'SSO (SAML/OIDC)', category: 'Security & Compliance', starter: false, professional: false, enterprise: true },
  { name: 'Audit Logs', category: 'Security & Compliance', starter: false, professional: true, enterprise: true },
  { name: 'Data Encryption', category: 'Security & Compliance', starter: true, professional: true, enterprise: true },
  { name: 'GDPR Compliance', category: 'Security & Compliance', starter: true, professional: true, enterprise: true },
  { name: 'SOC 2 Type II', category: 'Security & Compliance', starter: false, professional: true, enterprise: true },
  { name: 'HIPAA Compliance', category: 'Security & Compliance', starter: false, professional: false, enterprise: true },
  { name: 'On-Premise Deployment', category: 'Security & Compliance', starter: false, professional: false, enterprise: true },
  
  // Support
  { name: 'Email Support', category: 'Support', starter: true, professional: true, enterprise: true },
  { name: 'Priority Support', category: 'Support', starter: false, professional: true, enterprise: true },
  { name: 'Dedicated Success Manager', category: 'Support', starter: false, professional: false, enterprise: true },
  { name: 'Custom SLAs', category: 'Support', starter: false, professional: false, enterprise: true },
  { name: 'Training Sessions', category: 'Support', starter: false, professional: '2/year', enterprise: 'Unlimited' },
  { name: 'White-Label Options', category: 'Support', starter: false, professional: false, enterprise: true },
];

const categories = [...new Set(features.map(f => f.category))];

function FeatureCell({ value }: { value: FeatureValue }) {
  if (typeof value === 'boolean') {
    return value ? (
      <Check className="h-5 w-5 text-accent mx-auto" />
    ) : (
      <Minus className="h-4 w-4 text-muted-foreground/50 mx-auto" />
    );
  }
  return (
    <span className="text-sm font-medium text-foreground">{value}</span>
  );
}

export function FeatureComparisonTable() {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="w-[300px] font-display font-semibold text-foreground">
              Features
            </TableHead>
            <TableHead className="text-center w-[140px]">
              <div className="font-display font-semibold text-foreground">Starter</div>
              <div className="text-xs text-muted-foreground font-normal mt-0.5">$299/mo</div>
            </TableHead>
            <TableHead className="text-center w-[140px] bg-primary/5">
              <div className="font-display font-semibold text-primary">Professional</div>
              <div className="text-xs text-muted-foreground font-normal mt-0.5">$799/mo</div>
              <Badge className="accent-gradient border-0 text-[10px] px-2 py-0 mt-1">Popular</Badge>
            </TableHead>
            <TableHead className="text-center w-[140px]">
              <div className="font-display font-semibold text-foreground">Enterprise</div>
              <div className="text-xs text-muted-foreground font-normal mt-0.5">Custom</div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <>
              <TableRow key={category} className="bg-muted/30 hover:bg-muted/30">
                <TableCell 
                  colSpan={4} 
                  className="py-3 font-display font-semibold text-sm text-foreground"
                >
                  {category}
                </TableCell>
              </TableRow>
              {features
                .filter((f) => f.category === category)
                .map((feature, index) => (
                  <TableRow key={`${category}-${index}`}>
                    <TableCell className="text-sm text-muted-foreground py-3">
                      {feature.name}
                    </TableCell>
                    <TableCell className="text-center py-3">
                      <FeatureCell value={feature.starter} />
                    </TableCell>
                    <TableCell className="text-center py-3 bg-primary/5">
                      <FeatureCell value={feature.professional} />
                    </TableCell>
                    <TableCell className="text-center py-3">
                      <FeatureCell value={feature.enterprise} />
                    </TableCell>
                  </TableRow>
                ))}
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
