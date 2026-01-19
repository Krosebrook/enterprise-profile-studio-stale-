/**
 * Enterprise Profile Type Definitions
 * 
 * This file contains all type definitions for enterprise profiles,
 * replacing the generic Record<string, any> types with proper interfaces.
 */

export interface CompanyInfo {
  name?: string;
  tagline?: string;
  description?: string;
  industry?: string;
  founded?: string;
  size?: string;
  headquarters?: string;
  website?: string;
  email?: string;
  phone?: string;
}

export interface BrandingInfo {
  logo?: string;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  fontFamily?: string;
  customCSS?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon?: string;
  category?: string;
}

export interface ServicesInfo {
  services?: Service[];
  capabilities?: string[];
  specializations?: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio?: string;
  image?: string;
  email?: string;
  linkedin?: string;
  twitter?: string;
}

export interface TeamInfo {
  members?: TeamMember[];
  culture?: string;
  values?: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date?: string;
  expirationDate?: string;
  credentialUrl?: string;
}

export interface ComplianceInfo {
  certifications?: Certification[];
  securityStandards?: string[];
  privacyPolicy?: string;
  termsOfService?: string;
  dataProtection?: string[];
}

export interface ProfileMetadata {
  createdAt?: string;
  updatedAt?: string;
  version?: number;
  template?: string;
  isPublished?: boolean;
  customFields?: Record<string, string | number | boolean>;
}

export interface EnterpriseProfile {
  id: string;
  user_id: string;
  name: string;
  slug: string | null;
  description?: string;
  status: 'draft' | 'published' | 'archived';
  company_info: CompanyInfo;
  branding: BrandingInfo;
  services: ServicesInfo;
  team: TeamInfo;
  compliance: ComplianceInfo;
  metadata: ProfileMetadata;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProfileTemplate {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  data: Partial<EnterpriseProfile>;
}

export interface AnalyticsEvent {
  id: string;
  profile_id: string;
  event_type: 'view' | 'share' | 'contact' | 'download' | 'export';
  event_data?: Record<string, string | number | boolean>;
  created_at: string;
}

export interface AnalyticsData {
  totalViews: number;
  totalShares: number;
  totalContactClicks: number;
  totalServiceViews: number;
  viewsByDate: Array<{ date: string; count: number }>;
  recentEvents: AnalyticsEvent[];
}
