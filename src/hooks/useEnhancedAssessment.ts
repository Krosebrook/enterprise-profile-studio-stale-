/**
 * Enhanced Assessment Hook
 * 
 * Supports comprehensive AI readiness assessments for:
 * - Internal Employees (work profile optimization)
 * - Clients & Partners (organizational AI readiness)
 */

import { useState, useMemo, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { platforms } from '@/data/platformData';
import {
  AssessmentType,
  AssessmentResponse,
  AssessmentResult,
  DimensionScore,
  AssessmentRecommendation,
  RoadmapItem,
  PlatformMatch,
  ASSESSMENT_DIMENSIONS,
  getScoreLevel,
} from '@/types/assessment';
import {
  getQuestionsForType,
  getQuestionsByDimension,
  getTotalQuestionCount,
} from '@/data/assessmentQuestions';

interface AssessmentState {
  assessmentType: AssessmentType;
  currentDimensionIndex: number;
  currentQuestionIndex: number;
  responses: AssessmentResponse[];
  organizationName: string;
  contactEmail: string;
  isComplete: boolean;
}

const INITIAL_STATE: AssessmentState = {
  assessmentType: 'external',
  currentDimensionIndex: 0,
  currentQuestionIndex: 0,
  responses: [],
  organizationName: '',
  contactEmail: '',
  isComplete: false,
};

export function useEnhancedAssessment() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [state, setState] = useState<AssessmentState>(INITIAL_STATE);

  // Get questions organized by dimension for current assessment type
  const questionsByDimension = useMemo(
    () => getQuestionsByDimension(state.assessmentType),
    [state.assessmentType]
  );

  // Get applicable dimensions (those with questions)
  const applicableDimensions = useMemo(() => {
    return ASSESSMENT_DIMENSIONS.filter(
      (dim) => questionsByDimension[dim.id]?.length > 0
    );
  }, [questionsByDimension]);

  // Current dimension and questions
  const currentDimension = applicableDimensions[state.currentDimensionIndex];
  const currentQuestions = currentDimension
    ? questionsByDimension[currentDimension.id] || []
    : [];
  const currentQuestion = currentQuestions[state.currentQuestionIndex];

  // Progress calculation
  const totalQuestions = getTotalQuestionCount(state.assessmentType);
  const answeredQuestions = state.responses.length;
  const progressPercentage = totalQuestions > 0
    ? Math.round((answeredQuestions / totalQuestions) * 100)
    : 0;

  // Set assessment type
  const setAssessmentType = useCallback((type: AssessmentType) => {
    setState((prev) => ({
      ...INITIAL_STATE,
      assessmentType: type,
    }));
  }, []);

  // Set organization info
  const setOrganizationInfo = useCallback(
    (name: string, email: string) => {
      setState((prev) => ({
        ...prev,
        organizationName: name,
        contactEmail: email,
      }));
    },
    []
  );

  // Answer a question
  const answerQuestion = useCallback(
    (questionId: string, value: string | string[] | number) => {
      const question = currentQuestions.find((q) => q.id === questionId);
      if (!question) return;

      // Calculate score based on response
      let score = 0;
      if (question.type === 'rating' || question.type === 'slider') {
        const numValue = typeof value === 'number' ? value : parseFloat(value as string);
        const maxValue = question.maxValue || 5;
        score = (numValue / maxValue) * question.weight * 2;
      } else if (question.options) {
        if (Array.isArray(value)) {
          // Multiple selection
          score = value.reduce((acc, v) => {
            const option = question.options?.find((o) => o.value === v);
            return acc + (option?.score || 0);
          }, 0);
        } else {
          // Single selection
          const option = question.options.find((o) => o.value === value);
          score = option?.score || 0;
        }
        score = score * (question.weight / 3);
      }

      const response: AssessmentResponse = {
        questionId,
        dimensionId: question.dimensionId,
        value,
        score: Math.round(score * 10) / 10,
        timestamp: new Date().toISOString(),
      };

      setState((prev) => ({
        ...prev,
        responses: [
          ...prev.responses.filter((r) => r.questionId !== questionId),
          response,
        ],
      }));
    },
    [currentQuestions]
  );

  // Navigation
  const nextQuestion = useCallback(() => {
    setState((prev) => {
      const questions = questionsByDimension[applicableDimensions[prev.currentDimensionIndex]?.id] || [];
      
      if (prev.currentQuestionIndex < questions.length - 1) {
        // Move to next question in current dimension
        return { ...prev, currentQuestionIndex: prev.currentQuestionIndex + 1 };
      } else if (prev.currentDimensionIndex < applicableDimensions.length - 1) {
        // Move to next dimension
        return {
          ...prev,
          currentDimensionIndex: prev.currentDimensionIndex + 1,
          currentQuestionIndex: 0,
        };
      } else {
        // Assessment complete
        return { ...prev, isComplete: true };
      }
    });
  }, [questionsByDimension, applicableDimensions]);

  const prevQuestion = useCallback(() => {
    setState((prev) => {
      if (prev.currentQuestionIndex > 0) {
        return { ...prev, currentQuestionIndex: prev.currentQuestionIndex - 1 };
      } else if (prev.currentDimensionIndex > 0) {
        const prevDimensionQuestions =
          questionsByDimension[applicableDimensions[prev.currentDimensionIndex - 1]?.id] || [];
        return {
          ...prev,
          currentDimensionIndex: prev.currentDimensionIndex - 1,
          currentQuestionIndex: prevDimensionQuestions.length - 1,
        };
      }
      return prev;
    });
  }, [questionsByDimension, applicableDimensions]);

  const goToDimension = useCallback((index: number) => {
    setState((prev) => ({
      ...prev,
      currentDimensionIndex: Math.max(0, Math.min(index, applicableDimensions.length - 1)),
      currentQuestionIndex: 0,
    }));
  }, [applicableDimensions]);

  // Calculate dimension scores
  const calculateDimensionScores = useCallback((): DimensionScore[] => {
    return applicableDimensions.map((dimension) => {
      const dimensionResponses = state.responses.filter(
        (r) => r.dimensionId === dimension.id
      );
      const dimensionQuestions = questionsByDimension[dimension.id] || [];
      
      const score = dimensionResponses.reduce((acc, r) => acc + r.score, 0);
      const maxPossibleScore = dimensionQuestions.reduce(
        (acc, q) => acc + q.weight * 2,
        0
      );
      const percentage = maxPossibleScore > 0
        ? Math.round((score / maxPossibleScore) * 100)
        : 0;
      
      const level = getScoreLevel(percentage);
      
      // Identify gaps and strengths
      const gaps: string[] = [];
      const strengths: string[] = [];
      
      dimensionResponses.forEach((response) => {
        const question = dimensionQuestions.find((q) => q.id === response.questionId);
        if (!question) return;
        
        const normalizedScore = response.score / (question.weight * 2);
        if (normalizedScore < 0.4) {
          gaps.push(question.question);
        } else if (normalizedScore > 0.7) {
          strengths.push(question.question);
        }
      });

      return {
        dimensionId: dimension.id,
        dimensionName: dimension.name,
        score,
        maxScore: maxPossibleScore,
        percentage,
        level,
        gaps: gaps.slice(0, 3),
        strengths: strengths.slice(0, 3),
      };
    });
  }, [state.responses, applicableDimensions, questionsByDimension]);

  // Calculate total score
  const calculateTotalScore = useCallback((): number => {
    const dimensionScores = calculateDimensionScores();
    const totalPercentage = dimensionScores.reduce((acc, ds) => {
      const dimension = ASSESSMENT_DIMENSIONS.find((d) => d.id === ds.dimensionId);
      const weight = dimension?.weight || 10;
      return acc + (ds.percentage * weight) / 100;
    }, 0);
    return Math.round(totalPercentage);
  }, [calculateDimensionScores]);

  // Generate recommendations
  const generateRecommendations = useCallback((): AssessmentRecommendation[] => {
    const dimensionScores = calculateDimensionScores();
    const recommendations: AssessmentRecommendation[] = [];

    dimensionScores.forEach((ds) => {
      if (ds.level === 'critical') {
        recommendations.push({
          id: `rec_${ds.dimensionId}_critical`,
          priority: 'critical',
          category: ds.dimensionName,
          title: `Address Critical Gaps in ${ds.dimensionName}`,
          description: `Your ${ds.dimensionName.toLowerCase()} score indicates significant gaps that must be addressed before AI adoption.`,
          actionItems: ds.gaps.map((g) => `Review and improve: ${g}`),
          estimatedEffort: '3-6 months',
          expectedImpact: 'Foundation for AI readiness',
          relatedDimensions: [ds.dimensionId],
        });
      } else if (ds.level === 'developing') {
        recommendations.push({
          id: `rec_${ds.dimensionId}_develop`,
          priority: 'high',
          category: ds.dimensionName,
          title: `Strengthen ${ds.dimensionName}`,
          description: `Improving ${ds.dimensionName.toLowerCase()} will significantly enhance your AI readiness.`,
          actionItems: ds.gaps.map((g) => `Focus on: ${g}`),
          estimatedEffort: '2-4 months',
          expectedImpact: 'Improved AI adoption success rate',
          relatedDimensions: [ds.dimensionId],
        });
      }
    });

    // Sort by priority
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    return recommendations.sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );
  }, [calculateDimensionScores]);

  // Generate implementation roadmap
  const generateRoadmap = useCallback((): RoadmapItem[] => {
    const totalScore = calculateTotalScore();
    const dimensionScores = calculateDimensionScores();
    const roadmap: RoadmapItem[] = [];

    // Phase 1: Foundation (Weeks 1-4)
    const criticalDimensions = dimensionScores.filter((ds) => ds.level === 'critical');
    if (criticalDimensions.length > 0 || totalScore < 40) {
      roadmap.push({
        id: 'phase_1',
        phase: 1,
        phaseName: 'Foundation',
        title: 'Build AI Readiness Foundation',
        description: 'Address critical gaps and establish baseline capabilities',
        startWeek: 1,
        endWeek: 4,
        milestones: [
          'Complete infrastructure assessment',
          'Establish data governance baseline',
          'Define AI ethics guidelines',
          'Identify pilot use cases',
        ],
        dependencies: [],
        resources: ['IT Team', 'Leadership Sponsor', 'External Consultant'],
        estimatedCost: '$25,000 - $50,000',
        successMetrics: [
          'Infrastructure gaps documented',
          'Governance framework drafted',
          '3+ pilot use cases identified',
        ],
      });
    }

    // Phase 2: Pilot (Weeks 5-12)
    roadmap.push({
      id: 'phase_2',
      phase: 2,
      phaseName: 'Pilot',
      title: 'Launch AI Pilot Program',
      description: 'Implement and validate AI solutions with limited scope',
      startWeek: criticalDimensions.length > 0 ? 5 : 1,
      endWeek: criticalDimensions.length > 0 ? 12 : 8,
      milestones: [
        'Select pilot team and use case',
        'Deploy initial AI tools',
        'Conduct user training',
        'Gather feedback and metrics',
      ],
      dependencies: criticalDimensions.length > 0 ? ['phase_1'] : [],
      resources: ['Pilot Team (5-10 users)', 'IT Support', 'Training Resources'],
      estimatedCost: '$15,000 - $30,000',
      successMetrics: [
        '80% pilot user adoption',
        '20% productivity improvement',
        'User satisfaction > 4.0/5.0',
      ],
    });

    // Phase 3: Scale (Weeks 13-24)
    roadmap.push({
      id: 'phase_3',
      phase: 3,
      phaseName: 'Scale',
      title: 'Scale AI Deployment',
      description: 'Expand successful pilots to broader organization',
      startWeek: roadmap.length > 1 ? 13 : 9,
      endWeek: roadmap.length > 1 ? 24 : 20,
      milestones: [
        'Develop scaling strategy',
        'Roll out to additional departments',
        'Establish support processes',
        'Document best practices',
      ],
      dependencies: ['phase_2'],
      resources: ['Full IT Team', 'Department Champions', 'Change Management'],
      estimatedCost: '$50,000 - $150,000',
      successMetrics: [
        '50%+ organization adoption',
        'Documented ROI > 2x investment',
        'Support ticket volume stable',
      ],
    });

    // Phase 4: Optimize (Weeks 25-52)
    if (totalScore >= 60) {
      roadmap.push({
        id: 'phase_4',
        phase: 4,
        phaseName: 'Optimize',
        title: 'Optimize & Innovate',
        description: 'Refine AI capabilities and explore advanced use cases',
        startWeek: 25,
        endWeek: 52,
        milestones: [
          'Implement advanced AI features',
          'Develop custom AI solutions',
          'Establish AI Center of Excellence',
          'Pursue industry leadership',
        ],
        dependencies: ['phase_3'],
        resources: ['AI/ML Team', 'Innovation Budget', 'External Partners'],
        estimatedCost: '$100,000+',
        successMetrics: [
          'New AI use cases implemented',
          'Custom models deployed',
          'Industry recognition achieved',
        ],
      });
    }

    return roadmap;
  }, [calculateTotalScore, calculateDimensionScores]);

  // Match platforms based on assessment
  const matchPlatforms = useCallback((): PlatformMatch[] => {
    const dimensionScores = calculateDimensionScores();
    const totalScore = calculateTotalScore();
    
    return platforms
      .map((platform) => {
        let matchScore = 0;
        const matchReasons: string[] = [];
        const considerationPoints: string[] = [];

        // Score based on readiness level
        if (totalScore >= 70 && platform.priority === 'Tier 1') {
          matchScore += 30;
          matchReasons.push('Your high readiness aligns with enterprise-grade platforms');
        } else if (totalScore >= 40 && platform.priority === 'Tier 2') {
          matchScore += 25;
          matchReasons.push('Good fit for your current maturity level');
        } else if (totalScore < 40 && platform.capabilities.developerExperience >= 8) {
          matchScore += 20;
          matchReasons.push('User-friendly platform suitable for building AI skills');
        }

        // Check ecosystem alignment
        const techScore = dimensionScores.find((ds) => ds.dimensionId === 'technical_capabilities');
        if (techScore && techScore.percentage >= 60) {
          if (platform.capabilities.enterpriseFeatures >= 8) {
            matchScore += 15;
            matchReasons.push('Strong technical foundation supports enterprise features');
          }
        }

        // Check compliance requirements
        const govScore = dimensionScores.find((ds) => ds.dimensionId === 'governance_compliance');
        if (govScore && govScore.percentage >= 50 && platform.compliance.length >= 3) {
          matchScore += 15;
          matchReasons.push('Platform compliance meets your governance requirements');
        }

        // Add consideration points
        if (platform.capabilities.dataPrivacy < 7) {
          considerationPoints.push('Review data privacy capabilities for sensitive data');
        }
        if (platform.capabilities.onPremOption < 5) {
          considerationPoints.push('Cloud-only deployment - ensure cloud strategy aligns');
        }

        const implementationComplexity: 'low' | 'medium' | 'high' =
          matchScore >= 50 ? 'low' : matchScore >= 30 ? 'medium' : 'high';
        
        const estimatedROI =
          matchScore >= 50 ? '3-6 months payback' :
          matchScore >= 30 ? '6-12 months payback' : '12+ months payback';

        return {
          platformId: platform.id,
          platformName: platform.name,
          matchScore,
          matchReasons,
          considerationPoints,
          implementationComplexity,
          estimatedROI,
        } as PlatformMatch;
      })
      .filter((m) => m.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 10);
  }, [calculateDimensionScores, calculateTotalScore]);

  // Save assessment mutation
  const saveAssessment = useMutation({
    mutationFn: async (): Promise<AssessmentResult> => {
      if (!user) throw new Error('Must be logged in');

      const dimensionScores = calculateDimensionScores();
      const totalScore = calculateTotalScore();
      const recommendations = generateRecommendations();
      const roadmapItems = generateRoadmap();
      const platformMatches = matchPlatforms();

      const result: AssessmentResult = {
        id: crypto.randomUUID(),
        assessmentType: state.assessmentType,
        userId: user.id,
        organizationName: state.organizationName,
        contactEmail: state.contactEmail,
        totalScore,
        maxPossibleScore: 100,
        percentageScore: totalScore,
        dimensionScores,
        recommendations,
        roadmapItems,
        platformMatches,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Save to database
      const { error } = await supabase.from('ai_assessments').insert([
        {
          user_id: user.id,
          organization_profile: JSON.parse(JSON.stringify({
            name: state.organizationName,
            email: state.contactEmail,
            assessmentType: state.assessmentType,
          })),
          current_ai_usage: JSON.parse(JSON.stringify({})),
          technical_readiness: JSON.parse(JSON.stringify(
            dimensionScores.reduce((acc, ds) => {
              acc[ds.dimensionId] = ds;
              return acc;
            }, {} as Record<string, unknown>)
          )),
          budget_timeline: JSON.parse(JSON.stringify({})),
          readiness_score: totalScore,
          recommendations: JSON.parse(JSON.stringify({
            recommendations,
            roadmapItems,
            platformMatches,
          })),
        },
      ]);

      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai-assessments'] });
    },
  });

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
      return data;
    },
    enabled: !!user,
  });

  // Reset assessment
  const resetAssessment = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  // Get response for a question
  const getResponse = useCallback(
    (questionId: string) => {
      return state.responses.find((r) => r.questionId === questionId);
    },
    [state.responses]
  );

  return {
    // State
    assessmentType: state.assessmentType,
    currentDimension,
    currentQuestion,
    currentDimensionIndex: state.currentDimensionIndex,
    currentQuestionIndex: state.currentQuestionIndex,
    applicableDimensions,
    currentQuestions,
    responses: state.responses,
    isComplete: state.isComplete,
    organizationName: state.organizationName,
    contactEmail: state.contactEmail,
    
    // Progress
    totalQuestions,
    answeredQuestions,
    progressPercentage,
    
    // Actions
    setAssessmentType,
    setOrganizationInfo,
    answerQuestion,
    nextQuestion,
    prevQuestion,
    goToDimension,
    resetAssessment,
    getResponse,
    
    // Results
    calculateTotalScore,
    calculateDimensionScores,
    generateRecommendations,
    generateRoadmap,
    matchPlatforms,
    
    // Persistence
    saveAssessment,
    savedAssessments,
  };
}
