// Onboarding User Profile Schema
export interface OnboardingUserProfile {
  // Welcome/Basic Info
  welcome: {
    fullName: string;
    role: 'individual_investor' | 'fund_manager' | 'family_office' | 'institutional' | 'advisor';
    experienceLevel: 'novice' | 'intermediate' | 'experienced' | 'expert';
    completedAt?: string;
  };

  // Deal Sourcing Criteria
  dealSourcing: {
    targetIndustries: string[];
    investmentSizeRange: {
      min: number;
      max: number;
      currency: string;
    };
    preferredDealStructures: string[];
    geoPreferences: {
      regions: string[];
      excludedCountries: string[];
    };
    riskTolerance: 'conservative' | 'moderate' | 'aggressive' | 'very_aggressive';
    dealStages: string[];
    completedAt?: string;
  };

  // Portfolio Goals
  portfolioGoals: {
    timeHorizon: 'short' | 'medium' | 'long' | 'mixed';
    targetReturnExpectation: {
      percentage: number;
      period: 'annual' | 'total';
    };
    diversificationPreferences: {
      maxSinglePosition: number;
      maxSectorExposure: number;
      preferMultiAsset: boolean;
    };
    sectorPriorities: string[];
    assetClassPriorities: string[];
    completedAt?: string;
  };

  // Community Preferences
  communityPreferences: {
    peerGroupsOfInterest: string[];
    networkingPriority: 'networking' | 'knowledge_sharing' | 'both' | 'minimal';
    notificationFrequency: 'realtime' | 'daily' | 'weekly' | 'monthly';
    privacySettings: {
      profileVisibility: 'public' | 'network_only' | 'private';
      sharePortfolio: boolean;
      shareDealFlow: boolean;
      allowMessages: boolean;
    };
    completedAt?: string;
  };

  // Metadata
  metadata: {
    startedAt: string;
    completedAt?: string;
    skippedSteps: string[];
    version: string;
  };
}

// Step configuration types
export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  isOptional?: boolean;
  shouldShow?: (profile: Partial<OnboardingUserProfile>) => boolean;
}

// Industry options
export const INDUSTRIES = [
  'Technology',
  'Healthcare & Life Sciences',
  'Financial Services',
  'Real Estate',
  'Energy & Utilities',
  'Consumer & Retail',
  'Industrial & Manufacturing',
  'Media & Entertainment',
  'Transportation & Logistics',
  'Agriculture & Food',
  'Education',
  'Telecommunications',
] as const;

// Deal structures
export const DEAL_STRUCTURES = [
  'Equity',
  'Debt',
  'Convertible Notes',
  'SAFE',
  'Revenue-Based Financing',
  'Joint Venture',
  'Mezzanine',
  'Preferred Equity',
] as const;

// Geographic regions
export const REGIONS = [
  'North America',
  'Europe',
  'Asia Pacific',
  'Latin America',
  'Middle East',
  'Africa',
  'Global',
] as const;

// Deal stages
export const DEAL_STAGES = [
  'Pre-Seed',
  'Seed',
  'Series A',
  'Series B',
  'Series C+',
  'Growth Equity',
  'Buyout',
  'Secondary',
] as const;

// Asset classes
export const ASSET_CLASSES = [
  'Private Equity',
  'Venture Capital',
  'Real Estate',
  'Private Credit',
  'Infrastructure',
  'Natural Resources',
  'Hedge Funds',
  'Co-Investments',
] as const;

// Peer groups
export const PEER_GROUPS = [
  'Angel Investors',
  'VC Fund Managers',
  'PE Professionals',
  'Family Office Executives',
  'Institutional LPs',
  'Industry Experts',
  'Legal & Tax Advisors',
  'Service Providers',
] as const;

// Default empty profile
export const createEmptyOnboardingProfile = (): OnboardingUserProfile => ({
  welcome: {
    fullName: '',
    role: 'individual_investor',
    experienceLevel: 'intermediate',
  },
  dealSourcing: {
    targetIndustries: [],
    investmentSizeRange: {
      min: 100000,
      max: 1000000,
      currency: 'USD',
    },
    preferredDealStructures: [],
    geoPreferences: {
      regions: [],
      excludedCountries: [],
    },
    riskTolerance: 'moderate',
    dealStages: [],
  },
  portfolioGoals: {
    timeHorizon: 'medium',
    targetReturnExpectation: {
      percentage: 15,
      period: 'annual',
    },
    diversificationPreferences: {
      maxSinglePosition: 10,
      maxSectorExposure: 30,
      preferMultiAsset: true,
    },
    sectorPriorities: [],
    assetClassPriorities: [],
  },
  communityPreferences: {
    peerGroupsOfInterest: [],
    networkingPriority: 'both',
    notificationFrequency: 'daily',
    privacySettings: {
      profileVisibility: 'network_only',
      sharePortfolio: false,
      shareDealFlow: false,
      allowMessages: true,
    },
  },
  metadata: {
    startedAt: new Date().toISOString(),
    skippedSteps: [],
    version: '1.0.0',
  },
});
