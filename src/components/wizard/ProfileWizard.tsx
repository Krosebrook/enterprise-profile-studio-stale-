import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { WizardProgress, WizardStep } from './WizardProgress';
import { CompanyInfoStep } from './steps/CompanyInfoStep';
import { BrandingStep } from './steps/BrandingStep';
import { ServicesStep } from './steps/ServicesStep';
import { TeamStep } from './steps/TeamStep';
import { ComplianceStep } from './steps/ComplianceStep';
import { DocumentImportDialog } from '@/components/shared/DocumentImportDialog';
import { useUpdateProfile } from '@/hooks/useProfiles';
import type { ProfileExtractionData } from '@/hooks/useDocumentExtraction';
import { EnterpriseProfile, CompanyInfo, BrandingInfo, ServicesInfo, TeamInfo, ComplianceInfo } from '@/types/profile';
import { Building2, Palette, Briefcase, Users, Shield, ArrowLeft, ArrowRight, Save, Eye, Loader2, FileUp } from 'lucide-react';
import { toast } from 'sonner';

interface ProfileWizardProps {
  profile: EnterpriseProfile;
}

const wizardSteps: WizardStep[] = [
  { id: 'company', title: 'Company Info', description: 'Basic details', icon: <Building2 className="h-5 w-5" /> },
  { id: 'branding', title: 'Branding', description: 'Colors & assets', icon: <Palette className="h-5 w-5" /> },
  { id: 'services', title: 'Services', description: 'What you offer', icon: <Briefcase className="h-5 w-5" /> },
  { id: 'team', title: 'Team', description: 'Key personnel', icon: <Users className="h-5 w-5" /> },
  { id: 'compliance', title: 'Compliance', description: 'Certifications', icon: <Shield className="h-5 w-5" /> },
];

export function ProfileWizard({ profile }: ProfileWizardProps) {
  const navigate = useNavigate();
  const updateProfile = useUpdateProfile();
  const [currentStep, setCurrentStep] = useState(0);
  const [saving, setSaving] = useState(false);

  // Local state for each section
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(profile.company_info || {});
  const [branding, setBranding] = useState<BrandingInfo>(profile.branding || {});
  const [services, setServices] = useState<ServicesInfo>(profile.services || {});
  const [team, setTeam] = useState<TeamInfo>(profile.team || {});
  const [compliance, setCompliance] = useState<ComplianceInfo>(profile.compliance || {});

  // Update local state when profile changes
  useEffect(() => {
    setCompanyInfo(profile.company_info || {});
    setBranding(profile.branding || {});
    setServices(profile.services || {});
    setTeam(profile.team || {});
    setCompliance(profile.compliance || {});
  }, [profile]);

  // Handle data extraction from document import
  const handleDocumentExtraction = (data: ProfileExtractionData) => {
    // Update company info
    if (data.company_info) {
      setCompanyInfo(prev => ({
        ...prev,
        name: data.company_info.name || prev.name,
        tagline: data.company_info.tagline || prev.tagline,
        description: data.company_info.description || prev.description,
        industry: data.company_info.industry || prev.industry,
        size: data.company_info.size || prev.size,
        founded: data.company_info.founded || prev.founded,
        headquarters: data.company_info.headquarters || prev.headquarters,
        website: data.company_info.website || prev.website,
        email: data.company_info.email || prev.email,
        phone: data.company_info.phone || prev.phone,
      }));
    }
    // Update branding (map to correct property names)
    if (data.branding) {
      setBranding(prev => ({
        ...prev,
        primaryColor: data.branding.primary_color || prev.primaryColor,
        secondaryColor: data.branding.secondary_color || prev.secondaryColor,
      }));
    }
    // Update services (generate IDs for new services)
    if (data.services?.length) {
      setServices(prev => ({
        ...prev,
        services: [...(prev.services || []), ...data.services.map(s => ({
          id: crypto.randomUUID(),
          title: s.title,
          description: s.description,
        }))],
      }));
    }
    // Update team (generate IDs and map role to title)
    if (data.team_members?.length) {
      setTeam(prev => ({
        ...prev,
        members: [...(prev.members || []), ...data.team_members.map(m => ({
          id: crypto.randomUUID(),
          name: m.name,
          title: m.role, // map role to title
          bio: m.bio,
        }))],
      }));
    }
    // Update compliance (create certification objects from strings)
    if (data.compliance?.certifications?.length) {
      setCompliance(prev => ({
        ...prev,
        certifications: [
          ...(prev.certifications || []),
          ...data.compliance.certifications.map(cert => ({
            id: crypto.randomUUID(),
            name: cert,
            issuer: '',
          }))
        ],
      }));
    }
  };

  const saveProgress = async () => {
    setSaving(true);
    try {
      await updateProfile.mutateAsync({
        id: profile.id,
        updates: {
          company_info: companyInfo,
          branding,
          services,
          team,
          compliance,
        },
      });
      toast.success('Progress saved');
    } catch (error) {
      // Error is handled by the hook
    } finally {
      setSaving(false);
    }
  };

  const handleNext = async () => {
    await saveProgress();
    if (currentStep < wizardSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePreview = async () => {
    await saveProgress();
    navigate(`/profile/${profile.id}/preview`);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <CompanyInfoStep data={companyInfo} onChange={setCompanyInfo} />;
      case 1:
        return <BrandingStep data={branding} onChange={setBranding} />;
      case 2:
        return (
          <ServicesStep 
            data={services.services || []} 
            onChange={(newServices) => setServices({ ...services, services: newServices })} 
            companyContext={{
              companyName: companyInfo.name,
              industry: companyInfo.industry,
              description: companyInfo.description,
            }}
          />
        );
      case 3:
        return <TeamStep data={team.members || []} onChange={(newMembers) => setTeam({ ...team, members: newMembers })} />;
      case 4:
        return <ComplianceStep data={compliance} onChange={setCompliance} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24 pt-20">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
            <DocumentImportDialog
              extractionType="profile"
              onDataExtracted={(data) => handleDocumentExtraction(data as ProfileExtractionData)}
              trigger={
                <Button variant="outline" className="gap-2">
                  <FileUp className="h-4 w-4" />
                  Import from Document
                </Button>
              }
              title="Import Profile from Document"
              description="Upload company documents, pitch decks, or about pages to auto-fill profile fields. Only explicitly stated information will be extracted."
            />
          </div>
          <h1 className="font-display text-3xl font-bold">{profile.name}</h1>
          <p className="mt-1 text-muted-foreground">
            Complete each section to build your enterprise profile
          </p>
        </div>

        {/* Progress */}
        <WizardProgress
          steps={wizardSteps}
          currentStep={currentStep}
          onStepClick={setCurrentStep}
        />

        {/* Current Step Content */}
        <div className="animate-fade-in">
          {renderCurrentStep()}
        </div>

        {/* Navigation */}
        <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-background/95 backdrop-blur">
          <div className="container flex max-w-4xl items-center justify-between py-4">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={saveProgress}
                disabled={saving}
              >
                {saving ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Save
              </Button>

              {currentStep === wizardSteps.length - 1 ? (
                <Button
                  onClick={handlePreview}
                  className="primary-gradient border-0"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Preview & Publish
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  className="primary-gradient border-0"
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
