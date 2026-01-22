/**
 * Enhanced AI Readiness Assessment Types
 * 
 * Supports assessments for:
 * - Internal Employees (work profile optimization)
 * - Clients & Partners (organizational AI readiness)
 */

export type AssessmentType = 'internal' | 'external';

export interface AssessmentDimension {
  id: string;
  name: string;
  description: string;
  weight: number;
  questions: AssessmentQuestion[];
}

export interface AssessmentQuestion {
  id: string;
  dimensionId: string;
  question: string;
  type: 'single' | 'multiple' | 'slider' | 'text' | 'rating';
  options?: QuestionOption[];
  skipLogic?: SkipLogicRule[];
  required: boolean;
  helpText?: string;
  minValue?: number;
  maxValue?: number;
  weight: number;
}

export interface QuestionOption {
  value: string;
  label: string;
  score: number;
  description?: string;
}

export interface SkipLogicRule {
  questionId: string;
  condition: 'equals' | 'notEquals' | 'greaterThan' | 'lessThan' | 'contains';
  value: string | number;
  skipToQuestionId?: string;
  skipDimension?: string;
}

export interface AssessmentResponse {
  questionId: string;
  dimensionId: string;
  value: string | string[] | number;
  score: number;
  timestamp: string;
}

export interface AssessmentResult {
  id: string;
  assessmentType: AssessmentType;
  userId: string;
  organizationName?: string;
  contactEmail?: string;
  totalScore: number;
  maxPossibleScore: number;
  percentageScore: number;
  dimensionScores: DimensionScore[];
  recommendations: AssessmentRecommendation[];
  roadmapItems: RoadmapItem[];
  platformMatches: PlatformMatch[];
  createdAt: string;
  updatedAt: string;
}

export interface DimensionScore {
  dimensionId: string;
  dimensionName: string;
  score: number;
  maxScore: number;
  percentage: number;
  level: 'critical' | 'developing' | 'competent' | 'advanced' | 'leading';
  gaps: string[];
  strengths: string[];
}

export interface AssessmentRecommendation {
  id: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  category: string;
  title: string;
  description: string;
  actionItems: string[];
  estimatedEffort: string;
  expectedImpact: string;
  relatedDimensions: string[];
}

export interface RoadmapItem {
  id: string;
  phase: number;
  phaseName: string;
  title: string;
  description: string;
  startWeek: number;
  endWeek: number;
  milestones: string[];
  dependencies: string[];
  resources: string[];
  estimatedCost?: string;
  successMetrics: string[];
}

export interface PlatformMatch {
  platformId: string;
  platformName: string;
  matchScore: number;
  matchReasons: string[];
  considerationPoints: string[];
  implementationComplexity: 'low' | 'medium' | 'high';
  estimatedROI: string;
}

// Assessment Dimension Definitions
export const ASSESSMENT_DIMENSIONS: AssessmentDimension[] = [
  {
    id: 'organizational_culture',
    name: 'Organizational Culture & Leadership',
    description: 'Evaluates leadership support, change readiness, and innovation culture',
    weight: 15,
    questions: [],
  },
  {
    id: 'data_infrastructure',
    name: 'Data & Infrastructure',
    description: 'Assesses data quality, governance, and technical infrastructure',
    weight: 20,
    questions: [],
  },
  {
    id: 'technical_capabilities',
    name: 'Technical Capabilities',
    description: 'Evaluates IT skills, API readiness, and integration capacity',
    weight: 15,
    questions: [],
  },
  {
    id: 'talent_skills',
    name: 'Talent & Skills',
    description: 'Measures team AI proficiency and training programs',
    weight: 15,
    questions: [],
  },
  {
    id: 'governance_compliance',
    name: 'Governance & Compliance',
    description: 'Evaluates AI policies, ethics frameworks, and regulatory compliance',
    weight: 15,
    questions: [],
  },
  {
    id: 'business_strategy',
    name: 'Business Strategy & Use Cases',
    description: 'Assesses strategic alignment and identified use cases',
    weight: 10,
    questions: [],
  },
  {
    id: 'budget_resources',
    name: 'Budget & Resources',
    description: 'Evaluates financial commitment and resource allocation',
    weight: 10,
    questions: [],
  },
];

// Score Level Thresholds
export const SCORE_LEVELS = {
  critical: { min: 0, max: 20, label: 'Critical', color: 'red' },
  developing: { min: 21, max: 40, label: 'Developing', color: 'orange' },
  competent: { min: 41, max: 60, label: 'Competent', color: 'yellow' },
  advanced: { min: 61, max: 80, label: 'Advanced', color: 'green' },
  leading: { min: 81, max: 100, label: 'Leading', color: 'emerald' },
} as const;

export function getScoreLevel(percentage: number): keyof typeof SCORE_LEVELS {
  if (percentage <= 20) return 'critical';
  if (percentage <= 40) return 'developing';
  if (percentage <= 60) return 'competent';
  if (percentage <= 80) return 'advanced';
  return 'leading';
}
