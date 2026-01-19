import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AIGenerateButton } from '@/components/ui/AIGenerateButton';
import { CompanyInfo } from '@/types/profile';
import { Building2, Globe, MapPin, Phone, Mail } from 'lucide-react';

interface CompanyInfoStepProps {
  data: CompanyInfo;
  onChange: (data: CompanyInfo) => void;
}

export function CompanyInfoStep({ data, onChange }: CompanyInfoStepProps) {
  const handleChange = (field: keyof CompanyInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handleAIGenerate = (field: keyof CompanyInfo, value: string) => {
    handleChange(field, value);
  };

  return (
    <div className="space-y-6">
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-display">
            <Building2 className="h-5 w-5 text-primary" />
            Basic Information
          </CardTitle>
          <CardDescription>
            Enter your company's core details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                placeholder="Acme Corporation"
                value={data.name || ''}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="tagline">Tagline</Label>
                <AIGenerateButton
                  type="tagline"
                  context={{
                    companyName: data.name,
                    industry: data.industry,
                    description: data.description,
                  }}
                  onGenerate={(value) => handleAIGenerate('tagline', value)}
                  disabled={!data.name}
                />
              </div>
              <Input
                id="tagline"
                placeholder="Innovation for tomorrow"
                value={data.tagline || ''}
                onChange={(e) => handleChange('tagline', e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="description">Company Description *</Label>
              <AIGenerateButton
                type="description"
                context={{
                  companyName: data.name,
                  industry: data.industry,
                  tagline: data.tagline,
                }}
                onGenerate={(value) => handleAIGenerate('description', value)}
                disabled={!data.name}
              />
            </div>
            <Textarea
              id="description"
              placeholder="Tell us about your company, mission, and values..."
              rows={4}
              value={data.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                placeholder="Technology, Healthcare, Finance..."
                value={data.industry || ''}
                onChange={(e) => handleChange('industry', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="founded">Year Founded</Label>
              <Input
                id="founded"
                type="number"
                placeholder="2020"
                value={data.founded || ''}
                onChange={(e) => handleChange('founded', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-display">
            <Globe className="h-5 w-5 text-primary" />
            Contact Information
          </CardTitle>
          <CardDescription>
            How can people reach your company?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="website">
                <Globe className="mr-2 inline h-4 w-4" />
                Website
              </Label>
              <Input
                id="website"
                type="url"
                placeholder="https://example.com"
                value={data.website || ''}
                onChange={(e) => handleChange('website', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">
                <Mail className="mr-2 inline h-4 w-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="contact@example.com"
                value={data.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone">
                <Phone className="mr-2 inline h-4 w-4" />
                Phone
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={data.phone || ''}
                onChange={(e) => handleChange('phone', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">
                <MapPin className="mr-2 inline h-4 w-4" />
                Address
              </Label>
              <Input
                id="address"
                placeholder="123 Business Ave, City, State"
                value={data.headquarters || ''}
                onChange={(e) => handleChange('headquarters', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
