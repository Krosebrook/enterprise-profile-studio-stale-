import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAnalytics } from '@/hooks/useAnalytics';
import { 
  CompanyInfo, 
  BrandingInfo, 
  ServicesInfo, 
  TeamInfo, 
  ComplianceInfo 
} from '@/types/profile';
import { 
  Loader2, 
  Globe, 
  ExternalLink,
  Building2,
  Mail,
  Phone,
  MapPin,
  Shield,
  Briefcase,
  Users,
} from 'lucide-react';

export default function PublicProfilePage() {
  const { slug } = useParams<{ slug: string }>();
  const { trackEvent } = useAnalytics();

  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['public-profile', slug],
    queryFn: async () => {
      if (!slug) return null;
      
      const { data, error } = await supabase
        .from('enterprise_profiles')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  useEffect(() => {
    if (profile?.id) {
      trackEvent(profile.id, 'view', { source: 'public_page' });
    }
  }, [profile?.id, trackEvent]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <Building2 className="mb-4 h-16 w-16 text-muted-foreground" />
        <h1 className="mb-2 text-2xl font-bold">Profile Not Found</h1>
        <p className="text-muted-foreground">
          This profile doesn't exist or is not published yet.
        </p>
      </div>
    );
  }

  const rawCompanyInfo = profile.company_info || {};
  const rawBranding = profile.branding || {};
  const rawServices = profile.services;
  const rawTeam = profile.team;
  const rawCompliance = profile.compliance || {};

  const companyInfo = rawCompanyInfo as unknown as CompanyInfo;
  const branding = rawBranding as unknown as BrandingInfo;
  const services: ServicesInfo = Array.isArray(rawServices) 
    ? { services: [] } 
    : (rawServices as unknown as ServicesInfo) || { services: [] };
  const team: TeamInfo = Array.isArray(rawTeam) 
    ? { members: [] } 
    : (rawTeam as unknown as TeamInfo) || { members: [] };
  const compliance = rawCompliance as unknown as ComplianceInfo;

  const handleContactClick = (type: string) => {
    trackEvent(profile.id, 'contact_click', { contact_type: type });
  };

  return (
    <div className="min-h-screen bg-background">
      {branding.coverImage && (
        <div className="relative h-48 md:h-64">
          <img src={branding.coverImage} alt="Cover" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>
      )}

      <div className={`relative ${branding.coverImage ? '-mt-20' : 'pt-8'}`}>
        <div className="container max-w-4xl">
          <div 
            className="overflow-hidden rounded-2xl p-8"
            style={{
              background: branding.primaryColor 
                ? `linear-gradient(135deg, ${branding.primaryColor}, ${branding.secondaryColor || branding.primaryColor})`
                : 'linear-gradient(135deg, hsl(221 83% 53%), hsl(263 70% 50%))',
            }}
          >
            <div className="flex items-start gap-6">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
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
                    <Badge className="bg-white/20 text-white hover:bg-white/30">{companyInfo.industry}</Badge>
                  )}
                  {companyInfo.founded && (
                    <Badge className="bg-white/20 text-white hover:bg-white/30">Since {companyInfo.founded}</Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-4xl py-8">
        {companyInfo.description && (
          <Card className="mb-6 border-border/50">
            <CardContent className="pt-6">
              <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-semibold">
                <Building2 className="h-5 w-5 text-primary" />
                About
              </h2>
              <p className="leading-relaxed text-muted-foreground">{companyInfo.description}</p>
            </CardContent>
          </Card>
        )}

        {(companyInfo.website || companyInfo.email || companyInfo.phone || companyInfo.headquarters) && (
          <Card className="mb-6 border-border/50">
            <CardContent className="pt-6">
              <h2 className="mb-4 font-display text-xl font-semibold">Contact</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {companyInfo.website && (
                  <a href={companyInfo.website} target="_blank" rel="noopener noreferrer" onClick={() => handleContactClick('website')} className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-muted">
                    <Globe className="h-5 w-5 text-primary" />
                    <span className="text-sm">{companyInfo.website}</span>
                    <ExternalLink className="ml-auto h-4 w-4 text-muted-foreground" />
                  </a>
                )}
                {companyInfo.email && (
                  <a href={`mailto:${companyInfo.email}`} onClick={() => handleContactClick('email')} className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-muted">
                    <Mail className="h-5 w-5 text-primary" />
                    <span className="text-sm">{companyInfo.email}</span>
                  </a>
                )}
                {companyInfo.phone && (
                  <a href={`tel:${companyInfo.phone}`} onClick={() => handleContactClick('phone')} className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-muted">
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

        {services.services && services.services.length > 0 && (
          <Card className="mb-6 border-border/50">
            <CardContent className="pt-6">
              <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-semibold">
                <Briefcase className="h-5 w-5 text-primary" />
                Services
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {services.services.map((service) => (
                  <div key={service.id} className="rounded-lg border border-border p-4 transition-colors hover:border-primary/50">
                    <h3 className="font-semibold">{service.title}</h3>
                    {service.description && <p className="mt-1 text-sm text-muted-foreground">{service.description}</p>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {team.members && team.members.length > 0 && (
          <Card className="mb-6 border-border/50">
            <CardContent className="pt-6">
              <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-semibold">
                <Users className="h-5 w-5 text-primary" />
                Team
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {team.members.map((member) => (
                  <div key={member.id} className="flex items-center gap-4 rounded-lg border border-border p-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.image} alt={member.name} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {member.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
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

        {(compliance.certifications && compliance.certifications.length > 0) && (
          <Card className="border-border/50">
            <CardContent className="pt-6">
              <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-semibold">
                <Shield className="h-5 w-5 text-primary" />
                Compliance & Certifications
              </h2>
              <div className="flex flex-wrap gap-2">
                {compliance.certifications.map((cert) => (
                  <Badge key={cert.id} className="bg-success/10 text-success hover:bg-success/20">
                    {cert.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>Powered by Enterprise Profile Builder</p>
        </div>
      </div>
    </div>
  );
}
