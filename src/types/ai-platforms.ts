export interface PlatformCapabilities {
  codeGeneration: number;
  reasoning: number;
  languageUnderstanding: number;
  multimodal: number;
  toolUse: number;
  speed: number;
  costEfficiency: number;
  enterpriseFeatures: number;
  developerExperience: number;
  documentation: number;
  vision: number;
  audio: number;
  functionCalling: number;
  jsonReliability: number;
  dataPrivacy: number;
  onPremOption: number;
  slaAvailability: number;
  contextRecall: number;
  timeToFirstToken: number;
  tokensPerSecond: number;
}

export interface AIPlatform {
  id: string;
  name: string;
  category: 'Foundation' | 'Specialized' | 'Enterprise' | 'Developer' | 'Productivity' | 'Automation';
  priority: 'Tier 1' | 'Tier 2' | 'Tier 3';
  ecosystem: 'anthropic' | 'openai' | 'microsoft' | 'google' | 'automation' | 'langchain' | 'open-source' | 'independent';
  verdict: string;
  marketShare?: string;
  pricing: string;
  contextWindow?: string;
  compliance: string[];
  targetUsers: string;
  logoColor: string;
  specialties: string[];
  capabilities: PlatformCapabilities;
}

export interface AIAssessment {
  id: string;
  userId: string;
  organizationProfile: OrganizationProfile;
  currentAiUsage: CurrentAiUsage;
  technicalReadiness: TechnicalReadiness;
  budgetTimeline: BudgetTimeline;
  readinessScore: number;
  recommendations: AssessmentRecommendations;
  createdAt: string;
  updatedAt: string;
}

export interface OrganizationProfile {
  companySize: number;
  industry: string;
  digitalMaturity: number;
  primaryObjectives: string[];
}

export interface CurrentAiUsage {
  existingTools: string[];
  aiBudgetPercentage: number;
  teamProficiency: 'novice' | 'intermediate' | 'expert';
  pastProjectSuccess: number;
}

export interface TechnicalReadiness {
  dataInfrastructure: number;
  apiCapabilities: number;
  securityRequirements: string[];
  deploymentPreference: 'cloud' | 'on-premise' | 'hybrid';
}

export interface BudgetTimeline {
  budgetRange: string;
  implementationTimeline: string;
  expectedRoiTimeline: string;
  changeManagementReadiness: number;
}

export interface AssessmentRecommendations {
  tier1Platforms: string[];
  tier2Platforms: string[];
  tier3Platforms: string[];
  actionItems: string[];
  overallAssessment: string;
}

export interface ROICalculation {
  id: string;
  userId: string;
  name: string;
  inputs: ROIInputs;
  outputs: ROIOutputs;
  platformIds: string[];
  createdAt: string;
}

export interface ROIInputs {
  employees: number;
  averageSalary: number;
  adoptionPercentage: number;
  weeklyProductivityGain: number;
  annualPlatformCost: number;
  trainingCost: number;
}

export interface ROIOutputs {
  hourlyRate: number;
  annualProductivityValue: number;
  totalCost: number;
  netBenefit: number;
  roiPercentage: number;
  paybackMonths: number;
}

export interface DocumentVersion {
  id: string;
  documentId: string;
  userId: string;
  versionNumber: number;
  title: string;
  content: string;
  description?: string;
  category?: string;
  tags: string[];
  changeSummary?: string;
  createdAt: string;
}

export interface DocumentFavorite {
  id: string;
  userId: string;
  documentId: string;
  createdAt: string;
}

export type CapabilityKey = keyof PlatformCapabilities;

export const CAPABILITY_LABELS: Record<CapabilityKey, string> = {
  codeGeneration: 'Code Generation',
  reasoning: 'Reasoning',
  languageUnderstanding: 'Language Understanding',
  multimodal: 'Multimodal',
  toolUse: 'Tool Use',
  speed: 'Speed',
  costEfficiency: 'Cost Efficiency',
  enterpriseFeatures: 'Enterprise Features',
  developerExperience: 'Developer Experience',
  documentation: 'Documentation',
  vision: 'Vision',
  audio: 'Audio',
  functionCalling: 'Function Calling',
  jsonReliability: 'JSON Reliability',
  dataPrivacy: 'Data Privacy',
  onPremOption: 'On-Prem Option',
  slaAvailability: 'SLA Availability',
  contextRecall: 'Context Recall',
  timeToFirstToken: 'Time to First Token',
  tokensPerSecond: 'Tokens per Second',
};

export const CATEGORIES = ['Foundation', 'Specialized', 'Enterprise', 'Developer', 'Productivity', 'Automation'] as const;
export const PRIORITIES = ['Tier 1', 'Tier 2', 'Tier 3'] as const;
export const ECOSYSTEMS = ['anthropic', 'openai', 'microsoft', 'google', 'automation', 'langchain', 'open-source', 'independent'] as const;
