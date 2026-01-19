import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { BrandingInfo } from '@/types/profile';
import { Palette, Image } from 'lucide-react';

interface BrandingStepProps {
  data: BrandingInfo;
  onChange: (data: BrandingInfo) => void;
}

export function BrandingStep({ data, onChange }: BrandingStepProps) {
  const handleChange = (field: keyof BrandingInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-display">
            <Image className="h-5 w-5 text-primary" />
            Brand Assets
          </CardTitle>
          <CardDescription>
            Upload your logo and cover image
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Company Logo</Label>
              <ImageUpload
                value={data.logo || ''}
                onChange={(url) => handleChange('logo', url)}
                folder="logos"
                aspectRatio="square"
                placeholder="Upload company logo"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Cover Image</Label>
              <ImageUpload
                value={data.coverImage || ''}
                onChange={(url) => handleChange('coverImage', url)}
                folder="covers"
                aspectRatio="landscape"
                placeholder="Upload cover image"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-display">
            <Palette className="h-5 w-5 text-primary" />
            Brand Colors
          </CardTitle>
          <CardDescription>
            Define your brand's color palette
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="primaryColor">Primary Color</Label>
              <div className="flex gap-2">
                <Input
                  id="primaryColor"
                  type="color"
                  className="h-10 w-14 cursor-pointer p-1"
                  value={data.primaryColor || '#3B82F6'}
                  onChange={(e) => handleChange('primaryColor', e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="#3B82F6"
                  value={data.primaryColor || '#3B82F6'}
                  onChange={(e) => handleChange('primaryColor', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="secondaryColor">Secondary Color</Label>
              <div className="flex gap-2">
                <Input
                  id="secondaryColor"
                  type="color"
                  className="h-10 w-14 cursor-pointer p-1"
                  value={data.secondaryColor || '#8B5CF6'}
                  onChange={(e) => handleChange('secondaryColor', e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="#8B5CF6"
                  value={data.secondaryColor || '#8B5CF6'}
                  onChange={(e) => handleChange('secondaryColor', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="accentColor">Accent Color</Label>
              <div className="flex gap-2">
                <Input
                  id="accentColor"
                  type="color"
                  className="h-10 w-14 cursor-pointer p-1"
                  value={data.accentColor || '#10B981'}
                  onChange={(e) => handleChange('accentColor', e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="#10B981"
                  value={data.accentColor || '#10B981'}
                  onChange={(e) => handleChange('accentColor', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          {/* Color Preview */}
          <div className="mt-4 rounded-lg border border-border p-4">
            <p className="mb-3 text-sm font-medium text-muted-foreground">Preview</p>
            <div className="flex gap-4">
              <div 
                className="h-16 w-16 rounded-lg shadow-md transition-transform hover:scale-105"
                style={{ backgroundColor: data.primaryColor || '#3B82F6' }}
              />
              <div 
                className="h-16 w-16 rounded-lg shadow-md transition-transform hover:scale-105"
                style={{ backgroundColor: data.secondaryColor || '#8B5CF6' }}
              />
              <div 
                className="h-16 w-16 rounded-lg shadow-md transition-transform hover:scale-105"
                style={{ backgroundColor: data.accentColor || '#10B981' }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="brandFonts">Brand Fonts</Label>
            <Input
              id="brandFonts"
              placeholder="Inter, Roboto, Open Sans..."
              value={data.fontFamily || ''}
              onChange={(e) => handleChange('fontFamily', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
