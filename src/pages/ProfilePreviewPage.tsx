import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile, usePublishProfile } from '@/hooks/useProfiles';
import { generateProfilePDF } from '@/lib/pdf-generator';
import { 
  CompanyInfo, 
  BrandingInfo, 
  ServicesInfo, 
  TeamInfo, 
  ComplianceInfo 
} from '@/types/profile';
import { 
  Loader2, 
  ArrowLeft, 
  Globe, 
  ExternalLink,
  Building2,
  Mail,
  Phone,
  MapPin,
  Shield,
  Briefcase,
  Users,
  Share2,
  Download
} from 'lucide-react';
import { toast } from 'sonner';

export default function ProfilePreviewPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { data: profile, isLoading: profileLoading, error } = useProfile(id);
  const publishProfile = usePublishProfile();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (error) {
      navigate('/dashboard');
    }
  }, [error, navigate]);

  const handlePublish = async () => {
    if (!profile) return;
    await publishProfile.mutateAsync(profile.id);
  };

  const handleShare = () => {
    if (profile?.status === 'published') {
      navigator.clipboard.writeText(window.location.origin + '/p/' + profile.slug);
      toast.success('Profile URL copied to clipboard!');
    } else {
      toast.error('Publish your profile first to share it');
    }
  };

  const handleExportPDF = () => {
    if (!profile || !contentRef.current) return;
    
    const companyInfo = (profile.company_info || {}) as CompanyInfo;
    const branding = (profile.branding || {}) as BrandingInfo;
    const services = (Array.isArray(profile.services) ? { services: [] } : profile.services || {}) as ServicesInfo;
    const team = (Array.isArray(profile.team) ? { members: [] } : profile.team || {}) as TeamInfo;
    const compliance = (profile.compliance || {}) as ComplianceInfo;

    generateProfilePDF({
      name: profile.name,
      companyInfo,
      branding,
      services,
      team,
      compliance,
    });

    toast.success('PDF export started! Check your downloads.');
  };

  if (authLoading || profileLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  const companyInfo: CompanyInfo = (profile.company_info || {}) as CompanyInfo;
  const branding: BrandingInfo = (profile.branding || {}) as BrandingInfo;
  const services: ServicesInfo = (Array.isArray(profile.services) ? { services: [] } : profile.services || {}) as ServicesInfo;
  const team: TeamInfo = (Array.isArray(profile.team) ? { members: [] } : profile.team || {}) as TeamInfo;
  const compliance: ComplianceInfo = (profile.compliance || {}) as ComplianceInfo;

  const certificationLabels: Record<string, string> = {
    iso27001: 'ISO 27001',
    soc2: 'SOC 2',
    gdpr: 'GDPR',
    hipaa: 'HIPAA',
    pciDss: 'PCI DSS',
    ccpa: 'CCPA',
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pb-24 pt-20">
        {/* Preview Banner */}
        <div className="border-b border-border bg-muted/50">
          <div className="container flex items-center justify-between py-3">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to={`/profile/${profile.id}/edit`}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Editor
                </Link>
              </Button>
              <Badge variant={profile.status === 'published' ? 'default' : 'secondary'}>
                {profile.status === 'published' ? 'Published' : 'Draft Preview'}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportPDF}>
                <Download className="mr-2 h-4 w-4" />
                Export PDF
              </Button>
              {profile.status !== 'published' && (
                <Button 
                  size="sm" 
                  className="primary-gradient border-0"
                  onClick={handlePublish}
                  disabled={publishProfile.isPending}
                >
                  {publishProfile.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  <Globe className="mr-2 h-4 w-4" />
                  Publish
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div ref={contentRef} className="container max-w-4xl py-8">
          {/* Header */}
          <div 
            className="relative mb-8 overflow-hidden rounded-2xl p-8"
            style={{
              background: branding.primaryColor 
                ? `linear-gradient(135deg, ${branding.primaryColor}, ${branding.secondaryColor || branding.primaryColor})`
                : 'var(--gradient-hero)',
            }}
          >
            <div className="relative flex items-start gap-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
                {branding.logo ? (
                  <img src={branding.logo} alt="Logo" className="h-16 w-16 object-contain" />
                ) : (
                  <Building2 className="h-10 w-10 text-white" />
                )}
              </div>
              <div className="flex-1">
                <h1 className="font-display text-3xl font-bold text-white">
                  {companyInfo.name || profile.name}
                </h1>
                {companyInfo.tagline && (
                  <p className="mt-1 text-lg text-white/80">{companyInfo.tagline}</p>
                )}
                <div className="mt-4 flex flex-wrap gap-2">
                  {companyInfo.industry && (
                    <Badge className="bg-white/20 text-white hover:bg-white/30">
                      {companyInfo.industry}
                    </Badge>
                  )}
                  {companyInfo.founded && (
                    <Badge className="bg-white/20 text-white hover:bg-white/30">
                      Since {companyInfo.founded}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* About */}
          {companyInfo.description && (
            <Card className="mb-6 border-border/50">
              <CardContent className="pt-6">
                <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-semibold">
                  <Building2 className="h-5 w-5 text-primary" />
                  About
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {companyInfo.description}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Contact Info */}
          {(companyInfo.website || companyInfo.email || companyInfo.phone || companyInfo.headquarters) && (
            <Card className="mb-6 border-border/50">
              <CardContent className="pt-6">
                <h2 className="mb-4 font-display text-xl font-semibold">Contact</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {companyInfo.website && (
                    <a 
                      href={companyInfo.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-muted"
                    >
                      <Globe className="h-5 w-5 text-primary" />
                      <span className="text-sm">{companyInfo.website}</span>
                      <ExternalLink className="ml-auto h-4 w-4 text-muted-foreground" />
                    </a>
                  )}
                  {companyInfo.email && (
                    <a 
                      href={`mailto:${companyInfo.email}`}
                      className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-muted"
                    >
                      <Mail className="h-5 w-5 text-primary" />
                      <span className="text-sm">{companyInfo.email}</span>
                    </a>
                  )}
                  {companyInfo.phone && (
                    <a 
                      href={`tel:${companyInfo.phone}`}
                      className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-muted"
                    >
                      <Phone className="h-5 w-5 text-primary" />
                      <span className="text-sm">{companyInfo.phone}</span>
                    </a>
                  )}
                  {companyInfo.headquarters && (
                    <div className="flex items-center gap-3 rounded-lg p-3">
                      <MapPin className="h-5 w-5 text-primary" />
                      <span className="text-sm">{companyInfo.headquarters}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Services */}
          {services.services && services.services.length > 0 && (
            <Card className="mb-6 border-border/50">
              <CardContent className="pt-6">
                <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-semibold">
                  <Briefcase className="h-5 w-5 text-primary" />
                  Services
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {services.services.map((service) => (
                    <div 
                      key={service.id}
                      className="rounded-lg border border-border p-4 transition-colors hover:border-primary/50"
                    >
                      <h3 className="font-semibold">{service.title}</h3>
                      {service.description && (
                        <p className="mt-1 text-sm text-muted-foreground">
                          {service.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Team */}
          {team.members && team.members.length > 0 && (
            <Card className="mb-6 border-border/50">
              <CardContent className="pt-6">
                <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-semibold">
                  <Users className="h-5 w-5 text-primary" />
                  Team
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {team.members.map((member) => (
                    <div 
                      key={member.id}
                      className="flex items-center gap-4 rounded-lg border border-border p-4"
                    >
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={member.image} alt={member.name} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {member.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{member.name}</h3>
                        <p className="text-sm text-muted-foreground">{member.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Compliance */}
          {((compliance.certifications && compliance.certifications.length > 0) || compliance.awards) && (
            <Card className="border-border/50">
              <CardContent className="pt-6">
                <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-semibold">
                  <Shield className="h-5 w-5 text-primary" />
                  Compliance & Certifications
                </h2>
                {compliance.certifications && compliance.certifications.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {compliance.certifications.map((cert) => (
                      <Badge 
                        key={cert.id}
                        className="bg-success/10 text-success hover:bg-success/20"
                      >
                        {cert.name}
                      </Badge>
                    ))}
                  </div>
                )}
                {compliance.otherCertifications && (
                  <p className="mt-4 text-sm text-muted-foreground">
                    {compliance.otherCertifications}
                  </p>
                )}
                {compliance.awards && (
                  <div className="mt-4">
                    <h3 className="mb-2 font-medium">Awards & Recognition</h3>
                    <p className="text-sm text-muted-foreground">{compliance.awards}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </>
  );
}
