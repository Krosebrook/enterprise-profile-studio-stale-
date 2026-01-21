import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import {
  AIAssessment,
  OrganizationProfile,
  CurrentAiUsage,
  TechnicalReadiness,
  BudgetTimeline,
  AssessmentRecommendations,
} from '@/types/ai-platforms';
import { platforms } from '@/data/platformData';

const INITIAL_ORG_PROFILE: OrganizationProfile = {
  companySize: 100,
  industry: '',
  digitalMaturity: 3,
  primaryObjectives: [],
};

const INITIAL_AI_USAGE: CurrentAiUsage = {
  existingTools: [],
  aiBudgetPercentage: 5,
  teamProficiency: 'novice',
  pastProjectSuccess: 50,
};

const INITIAL_TECH_READINESS: TechnicalReadiness = {
  dataInfrastructure: 3,
  apiCapabilities: 3,
  securityRequirements: [],
  deploymentPreference: 'cloud',
};

const INITIAL_BUDGET_TIMELINE: BudgetTimeline = {
  budgetRange: '$10,000 - $50,000',
  implementationTimeline: '3-6 months',
  expectedRoiTimeline: '6-12 months',
  changeManagementReadiness: 3,
};

export function useAIAssessment() {
  const [currentStep, setCurrentStep] = useState(0);
  const [organizationProfile, setOrganizationProfile] = useState<OrganizationProfile>(INITIAL_ORG_PROFILE);
  const [currentAiUsage, setCurrentAiUsage] = useState<CurrentAiUsage>(INITIAL_AI_USAGE);
  const [technicalReadiness, setTechnicalReadiness] = useState<TechnicalReadiness>(INITIAL_TECH_READINESS);
  const [budgetTimeline, setBudgetTimeline] = useState<BudgetTimeline>(INITIAL_BUDGET_TIMELINE);
  
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Calculate readiness score
  const calculateReadinessScore = (): number => {
    let score = 0;

    // Organization profile (20% weight)
    const orgScore = (
      (organizationProfile.digitalMaturity / 5) * 50 +
      (organizationProfile.primaryObjectives.length > 0 ? 30 : 0) +
      (organizationProfile.industry ? 20 : 0)
    ) * 0.2;

    // Current AI usage (25% weight)
    const proficiencyScore = { novice: 20, intermediate: 50, expert: 100 }[currentAiUsage.teamProficiency];
    const usageScore = (
      (currentAiUsage.existingTools.length > 0 ? 30 : 0) +
      Math.min(currentAiUsage.aiBudgetPercentage * 2, 30) +
      (proficiencyScore * 0.2) +
      (currentAiUsage.pastProjectSuccess * 0.2)
    ) * 0.25;

    // Technical readiness (25% weight)
    const techScore = (
      (technicalReadiness.dataInfrastructure / 5) * 40 +
      (technicalReadiness.apiCapabilities / 5) * 40 +
      (technicalReadiness.securityRequirements.length > 0 ? 20 : 0)
    ) * 0.25;

    // Budget and timeline (30% weight)
    const budgetScore = (() => {
      if (budgetTimeline.budgetRange.includes('100,000')) return 80;
      if (budgetTimeline.budgetRange.includes('50,000')) return 60;
      if (budgetTimeline.budgetRange.includes('10,000')) return 40;
      return 20;
    })();
    const timelineScore = (
      budgetScore * 0.4 +
      (budgetTimeline.changeManagementReadiness / 5) * 60
    ) * 0.3;

    score = Math.round(orgScore + usageScore + techScore + timelineScore);
    return Math.min(100, Math.max(0, score));
  };

  // Generate recommendations based on assessment
  const generateRecommendations = (): AssessmentRecommendations => {
    const score = calculateReadinessScore();
    
    // Filter platforms based on assessment criteria
    const tier1Platforms: string[] = [];
    const tier2Platforms: string[] = [];
    const tier3Platforms: string[] = [];
    const actionItems: string[] = [];

    // Determine platform recommendations based on profile
    platforms.forEach((platform) => {
      let matchScore = 0;

      // Check enterprise requirements
      if (organizationProfile.companySize > 500 && platform.category === 'Enterprise') {
        matchScore += 30;
      }

      // Check compliance requirements
      if (technicalReadiness.securityRequirements.length > 0) {
        const hasCompliance = technicalReadiness.securityRequirements.every(
          (req) => platform.compliance.includes(req)
        );
        if (hasCompliance) matchScore += 25;
      }

      // Check deployment preference
      if (technicalReadiness.deploymentPreference === 'on-premise' && platform.capabilities.onPremOption >= 8) {
        matchScore += 20;
      }

      // Check team proficiency
      if (currentAiUsage.teamProficiency === 'novice' && platform.capabilities.developerExperience >= 8) {
        matchScore += 15;
      }

      // Sort into tiers
      if (matchScore >= 50) {
        tier1Platforms.push(platform.id);
      } else if (matchScore >= 25) {
        tier2Platforms.push(platform.id);
      } else if (platform.priority === 'Tier 1') {
        tier3Platforms.push(platform.id);
      }
    });

    // Generate action items
    if (score < 40) {
      actionItems.push('Focus on building foundational data infrastructure before large AI investments');
      actionItems.push('Start with simple productivity AI tools to build team familiarity');
      actionItems.push('Develop AI governance policies and compliance frameworks');
    } else if (score < 70) {
      actionItems.push('Consider pilot projects with Tier 2 platforms to validate use cases');
      actionItems.push('Invest in training programs to upskill your team');
      actionItems.push('Establish clear success metrics for AI initiatives');
    } else {
      actionItems.push('Ready for enterprise-scale AI deployment');
      actionItems.push('Consider multi-platform strategy for different use cases');
      actionItems.push('Focus on integration and workflow automation');
    }

    // Overall assessment
    let overallAssessment = '';
    if (score >= 80) {
      overallAssessment = 'Your organization is highly ready for AI adoption. You have strong infrastructure, experienced teams, and clear objectives. Focus on selecting the right platforms and scaling effectively.';
    } else if (score >= 60) {
      overallAssessment = 'Your organization has good AI readiness with some areas for improvement. Consider addressing gaps in team training or infrastructure before scaling AI initiatives.';
    } else if (score >= 40) {
      overallAssessment = 'Your organization is in the early stages of AI readiness. Start with pilot projects and focus on building foundational capabilities before major investments.';
    } else {
      overallAssessment = 'Your organization needs to build foundational capabilities before significant AI investment. Focus on data infrastructure, team training, and developing clear use cases.';
    }

    return {
      tier1Platforms: tier1Platforms.slice(0, 5),
      tier2Platforms: tier2Platforms.slice(0, 5),
      tier3Platforms: tier3Platforms.slice(0, 5),
      actionItems,
      overallAssessment,
    };
  };

  // Fetch saved assessments
  const { data: savedAssessments = [] } = useQuery({
    queryKey: ['ai-assessments', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('ai_assessments')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data.map((assessment): AIAssessment => ({
        id: assessment.id,
        userId: assessment.user_id,
        organizationProfile: assessment.organization_profile as unknown as OrganizationProfile,
        currentAiUsage: assessment.current_ai_usage as unknown as CurrentAiUsage,
        technicalReadiness: assessment.technical_readiness as unknown as TechnicalReadiness,
        budgetTimeline: assessment.budget_timeline as unknown as BudgetTimeline,
        readinessScore: assessment.readiness_score || 0,
        recommendations: assessment.recommendations as unknown as AssessmentRecommendations,
        createdAt: assessment.created_at,
        updatedAt: assessment.updated_at,
      }));
    },
    enabled: !!user,
  });

  // Save assessment mutation
  const saveAssessment = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('Must be logged in');
      
      const readinessScore = calculateReadinessScore();
      const recommendations = generateRecommendations();

      const { data, error } = await supabase
        .from('ai_assessments')
        .insert([{
          user_id: user.id,
          organization_profile: JSON.parse(JSON.stringify(organizationProfile)),
          current_ai_usage: JSON.parse(JSON.stringify(currentAiUsage)),
          technical_readiness: JSON.parse(JSON.stringify(technicalReadiness)),
          budget_timeline: JSON.parse(JSON.stringify(budgetTimeline)),
          readiness_score: readinessScore,
          recommendations: JSON.parse(JSON.stringify(recommendations)),
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai-assessments'] });
    },
  });

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));
  const goToStep = (step: number) => setCurrentStep(Math.min(Math.max(step, 0), 4));

  const resetAssessment = () => {
    setCurrentStep(0);
    setOrganizationProfile(INITIAL_ORG_PROFILE);
    setCurrentAiUsage(INITIAL_AI_USAGE);
    setTechnicalReadiness(INITIAL_TECH_READINESS);
    setBudgetTimeline(INITIAL_BUDGET_TIMELINE);
  };

  return {
    currentStep,
    organizationProfile,
    currentAiUsage,
    technicalReadiness,
    budgetTimeline,
    savedAssessments,
    setOrganizationProfile,
    setCurrentAiUsage,
    setTechnicalReadiness,
    setBudgetTimeline,
    nextStep,
    prevStep,
    goToStep,
    resetAssessment,
    calculateReadinessScore,
    generateRecommendations,
    saveAssessment,
  };
}

export const INDUSTRIES = [
  'Technology',
  'Financial Services',
  'Healthcare',
  'Manufacturing',
  'Retail & E-commerce',
  'Professional Services',
  'Education',
  'Media & Entertainment',
  'Real Estate',
  'Energy & Utilities',
  'Transportation & Logistics',
  'Government',
  'Non-profit',
  'Other',
];

export const PRIMARY_OBJECTIVES = [
  'Increase productivity',
  'Reduce costs',
  'Improve customer experience',
  'Accelerate innovation',
  'Automate workflows',
  'Enhance decision-making',
  'Generate content',
  'Improve data analysis',
  'Code development',
  'Research & development',
];

export const AI_TOOLS = [
  'ChatGPT / OpenAI',
  'Claude / Anthropic',
  'GitHub Copilot',
  'Microsoft Copilot',
  'Google Gemini',
  'Midjourney / DALL-E',
  'Zapier / Make automation',
  'Custom ML models',
  'Other LLMs',
  'None',
];

export const SECURITY_REQUIREMENTS = ['SOC2', 'HIPAA', 'GDPR', 'FedRAMP', 'ISO 27001'];

export const BUDGET_RANGES = [
  'Under $10,000',
  '$10,000 - $50,000',
  '$50,000 - $100,000',
  '$100,000 - $500,000',
  '$500,000+',
];

export const IMPLEMENTATION_TIMELINES = [
  '1-3 months',
  '3-6 months',
  '6-12 months',
  '12+ months',
];

export const ROI_TIMELINES = [
  '3-6 months',
  '6-12 months',
  '12-24 months',
  '24+ months',
];
