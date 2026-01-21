import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ComplianceInfo, Certification } from '@/types/profile';
import { Shield, FileCheck, Award } from 'lucide-react';

interface ComplianceStepProps {
  data: ComplianceInfo;
  onChange: (data: ComplianceInfo) => void;
}

// Extended data with additional fields used by the UI
interface ExtendedComplianceData extends Omit<ComplianceInfo, 'certifications'> {
  certifications?: Certification[];
  selectedCertIds?: string[];
  otherCertifications?: string;
  awards?: string;
  registrationNumber?: string;
  taxId?: string;
  insuranceInfo?: string;
}

const commonCertifications = [
  { id: 'iso27001', label: 'ISO 27001', description: 'Information Security Management' },
  { id: 'soc2', label: 'SOC 2', description: 'Service Organization Control' },
  { id: 'gdpr', label: 'GDPR Compliant', description: 'General Data Protection Regulation' },
  { id: 'hipaa', label: 'HIPAA Compliant', description: 'Health Insurance Portability and Accountability' },
  { id: 'pciDss', label: 'PCI DSS', description: 'Payment Card Industry Data Security' },
  { id: 'ccpa', label: 'CCPA Compliant', description: 'California Consumer Privacy Act' },
];

export function ComplianceStep({ data, onChange }: ComplianceStepProps) {
  // Extract selected cert IDs from the certifications array
  const selectedCertIds = (data.certifications || []).map(c => c.id);
  const extendedData = data as unknown as ExtendedComplianceData;
  
  const handleChange = (field: string, value: string | string[]) => {
    onChange({ ...data, [field]: value } as ComplianceInfo);
  };

  const toggleCertification = (certId: string) => {
    const cert = commonCertifications.find(c => c.id === certId);
    if (!cert) return;
    
    const currentCerts = data.certifications || [];
    const isSelected = currentCerts.some(c => c.id === certId);
    
    let updatedCerts: Certification[];
    if (isSelected) {
      updatedCerts = currentCerts.filter(c => c.id !== certId);
    } else {
      updatedCerts = [...currentCerts, { id: certId, name: cert.label, issuer: 'Standard' }];
    }
    
    onChange({ ...data, certifications: updatedCerts });
  };

  return (
    <div className="space-y-6">
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-display">
            <Shield className="h-5 w-5 text-primary" />
            Certifications & Compliance
          </CardTitle>
          <CardDescription>
            Select the certifications and compliance standards your company holds
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            {commonCertifications.map((cert) => (
              <div
                key={cert.id}
                className="flex items-start gap-3 rounded-lg border border-border p-3 transition-colors hover:border-primary/50"
              >
                <Checkbox
                  id={cert.id}
                  checked={selectedCertIds.includes(cert.id)}
                  onCheckedChange={() => toggleCertification(cert.id)}
                />
                <div className="flex-1">
                  <Label 
                    htmlFor={cert.id} 
                    className="cursor-pointer font-medium"
                  >
                    {cert.label}
                  </Label>
                  <p className="text-xs text-muted-foreground">{cert.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-display">
            <Award className="h-5 w-5 text-primary" />
            Additional Credentials
          </CardTitle>
          <CardDescription>
            Add any other certifications, awards, or accreditations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="otherCerts">Other Certifications</Label>
            <Input
              id="otherCerts"
              placeholder="e.g., AWS Partner, Microsoft Gold Partner..."
              value={extendedData.otherCertifications || ''}
              onChange={(e) => handleChange('otherCertifications', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="awards">Awards & Recognition</Label>
            <Textarea
              id="awards"
              placeholder="List notable awards, recognition, or industry accolades..."
              value={extendedData.awards || ''}
              onChange={(e) => handleChange('awards', e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-display">
            <FileCheck className="h-5 w-5 text-primary" />
            Legal Information
          </CardTitle>
          <CardDescription>
            Optional legal and business registration details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="registrationNumber">Business Registration Number</Label>
              <Input
                id="registrationNumber"
                placeholder="Company registration ID"
                value={extendedData.registrationNumber || ''}
                onChange={(e) => handleChange('registrationNumber', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="taxId">Tax ID / VAT Number</Label>
              <Input
                id="taxId"
                placeholder="Tax identification number"
                value={extendedData.taxId || ''}
                onChange={(e) => handleChange('taxId', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="insuranceInfo">Insurance Information</Label>
            <Input
              id="insuranceInfo"
              placeholder="Professional liability, E&O insurance details..."
              value={extendedData.insuranceInfo || ''}
              onChange={(e) => handleChange('insuranceInfo', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
