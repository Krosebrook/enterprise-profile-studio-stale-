/**
 * INT Inc. Enterprise AI Platform Data
 * November 2025 - Updated from Enterprise AI Dashboard v2.0.0
 * Sources: Perplexity Deep Research, Forrester TEI, vendor announcements
 */

import { AIPlatform } from '@/types/ai-platforms';

// Extended platform interface for enterprise dashboard
export interface EnterprisePlatform extends AIPlatform {
  provider: string;
  model: string;
  marketSharePercent: number;
  contextWindowTokens: number;
  focus: string;
  pricingDetails: {
    monthly: number | null;
    annual: number | null;
    enterprise: string;
    notes: string;
  };
  complianceDetails: {
    score: number;
    certifications: string[];
    dataResidency: string[];
    encryption: string;
  };
  integrationDetails: {
    score: number;
    native: string[];
    available: string[];
    limited: string[];
  };
  enterpriseCapabilities: {
    productivity: number;
    creative: number;
    coding: number;
    compliance: number;
    multilingual: number;
    customerService: number;
  };
  details: {
    description: string;
    strengths: string[];
    useCases: string[];
    limitations: string[];
  };
  benchmarks: {
    lmArenaElo?: number;
    sweBench?: number;
    gpqaDiamond?: number;
    aime2025?: number;
    osWorld?: number;
    roi: string;
    implementationTime: string;
  };
  intRecommendation: {
    departments: string[];
    priority: 'BASELINE' | 'HIGH PRIORITY' | 'DUAL PLATFORM' | 'SPECIALIZED' | 'COMPLIANCE' | 'STANDARD' | 'OPTIONAL';
    rationale: string;
  };
}

export const enterprisePlatforms: EnterprisePlatform[] = [
  {
    id: 'msft-copilot',
    name: 'Microsoft Copilot',
    provider: 'Microsoft',
    model: 'GPT-5 + Work IQ',
    category: 'Enterprise',
    priority: 'Tier 1',
    ecosystem: 'microsoft',
    verdict: 'Best for Microsoft 365 ecosystem',
    marketShare: '70% F500 adoption',
    marketSharePercent: 70,
    pricing: '$30/user/month',
    contextWindow: '1M+ tokens',
    contextWindowTokens: 1000000,
    focus: 'Microsoft ecosystem integration',
    compliance: ['SOC 2', 'ISO 27001', 'GDPR', 'HIPAA', 'FedRAMP'],
    targetUsers: 'Office workers, Microsoft 365 users',
    logoColor: '#6366F1',
    specialties: ['Office automation', 'Teams integration', 'SharePoint search'],
    pricingDetails: {
      monthly: 30,
      annual: 324,
      enterprise: 'Custom',
      notes: 'Included in M365 E5; add-on for E3; $21 Business tier Dec 2025'
    },
    complianceDetails: {
      score: 9,
      certifications: ['SOC 2', 'ISO 27001', 'GDPR', 'HIPAA', 'FedRAMP'],
      dataResidency: ['US', 'EU', 'Regional'],
      encryption: 'AES-256'
    },
    integrationDetails: {
      score: 10,
      native: ['Microsoft 365', 'Teams', 'SharePoint', 'Azure AD', 'Power Platform'],
      available: ['Salesforce', 'Slack', 'GitHub'],
      limited: ['Google Workspace', 'AWS']
    },
    capabilities: {
      codeGeneration: 8,
      reasoning: 8,
      languageUnderstanding: 8,
      multimodal: 7,
      toolUse: 9,
      speed: 8,
      costEfficiency: 6,
      enterpriseFeatures: 10,
      developerExperience: 7,
      documentation: 8,
      vision: 7,
      audio: 5,
      functionCalling: 9,
      jsonReliability: 8,
      dataPrivacy: 9,
      onPremOption: 0,
      slaAvailability: 10,
      contextRecall: 9,
      timeToFirstToken: 8,
      tokensPerSecond: 8
    },
    enterpriseCapabilities: {
      productivity: 10,
      creative: 7,
      coding: 8,
      compliance: 8,
      multilingual: 7,
      customerService: 8
    },
    details: {
      description: 'Microsoft Copilot integrates deeply with the Microsoft 365 ecosystem, now powered by GPT-5 and Work IQ intelligence layer. Agent 365 provides autonomous task completion across Word, Excel, PowerPoint, Teams, and Outlook with persistent session memory and voice activation.',
      strengths: [
        'GPT-5 with Work IQ intelligence layer',
        'Agent 365 autonomous task completion',
        '1M+ token session memory',
        'Voice activation and natural language commands'
      ],
      useCases: [
        'Document creation and editing',
        'Email composition and management',
        'Meeting summaries and insights',
        'Data analysis in Excel'
      ],
      limitations: [
        'Requires M365 investment',
        'Limited outside Microsoft ecosystem'
      ]
    },
    benchmarks: {
      lmArenaElo: 1478,
      sweBench: 72.1,
      roi: '112-457%',
      implementationTime: '2-4 weeks'
    },
    intRecommendation: {
      departments: ['Sales'],
      priority: 'BASELINE',
      rationale: 'CRM integration + proposal automation'
    }
  },
  {
    id: 'google-gemini',
    name: 'Google Gemini Enterprise',
    provider: 'Google',
    model: 'Gemini 3 Pro (Nov 2025)',
    category: 'Foundation',
    priority: 'Tier 1',
    ecosystem: 'google',
    verdict: 'Top LMArena benchmark performance',
    marketShare: '80% F500 usage',
    marketSharePercent: 80,
    pricing: '$30/user/month',
    contextWindow: '2M tokens',
    contextWindowTokens: 2000000,
    focus: 'Cross-platform + multilingual',
    compliance: ['SOC 2', 'ISO 27001', 'GDPR', 'HIPAA'],
    targetUsers: 'Enterprise content teams',
    logoColor: '#3B82F6',
    specialties: ['Long context', 'Multilingual', 'Deep research'],
    pricingDetails: {
      monthly: 30,
      annual: 324,
      enterprise: 'Negotiable',
      notes: 'Gemini Business tier; enterprise pricing negotiable'
    },
    complianceDetails: {
      score: 9,
      certifications: ['SOC 2', 'ISO 27001', 'GDPR', 'HIPAA'],
      dataResidency: ['Global regions'],
      encryption: 'AES-256'
    },
    integrationDetails: {
      score: 9,
      native: ['Google Workspace', 'Google Cloud', 'BigQuery', 'Looker', 'Vertex AI'],
      available: ['Microsoft 365', 'Salesforce', 'Slack', 'GitHub'],
      limited: ['AWS']
    },
    capabilities: {
      codeGeneration: 9,
      reasoning: 10,
      languageUnderstanding: 9,
      multimodal: 10,
      toolUse: 8,
      speed: 7,
      costEfficiency: 8,
      enterpriseFeatures: 9,
      developerExperience: 8,
      documentation: 8,
      vision: 10,
      audio: 9,
      functionCalling: 8,
      jsonReliability: 8,
      dataPrivacy: 9,
      onPremOption: 0,
      slaAvailability: 9,
      contextRecall: 10,
      timeToFirstToken: 7,
      tokensPerSecond: 7
    },
    enterpriseCapabilities: {
      productivity: 9,
      creative: 8,
      coding: 9,
      compliance: 8,
      multilingual: 10,
      customerService: 8
    },
    details: {
      description: 'Google Gemini Enterprise now features Gemini 3 Pro (released Nov 18, 2025) with 1501 Elo on LMArena (top position), 91.9% GPQA Diamond, and 76.2% SWE-bench Verified. Deep Think mode achieves 41% on Humanity\'s Last Exam.',
      strengths: [
        '1501 Elo LMArena (top position)',
        'Deep Think mode (41% HLE)',
        '91.9% GPQA Diamond benchmark',
        'Generative UI interfaces'
      ],
      useCases: [
        'Large document analysis',
        'Multi-language translation and content',
        'Complex codebase review',
        'Research and data synthesis'
      ],
      limitations: [
        'Newer to enterprise market',
        'Google Workspace dependency for full features'
      ]
    },
    benchmarks: {
      lmArenaElo: 1501,
      sweBench: 76.2,
      gpqaDiamond: 91.9,
      roi: '60% content time reduction',
      implementationTime: '2-4 weeks'
    },
    intRecommendation: {
      departments: ['Marketing', 'Operations'],
      priority: 'DUAL PLATFORM',
      rationale: 'Content creation + multilingual reach'
    }
  },
  {
    id: 'openai-chatgpt',
    name: 'ChatGPT Enterprise',
    provider: 'OpenAI',
    model: 'GPT-5.1 (Nov 2025)',
    category: 'Foundation',
    priority: 'Tier 1',
    ecosystem: 'openai',
    verdict: 'Most versatile general-purpose AI',
    marketShare: '92% F500 usage',
    marketSharePercent: 92,
    pricing: '$60/user/month',
    contextWindow: '128K tokens',
    contextWindowTokens: 128000,
    focus: 'General purpose + creativity',
    compliance: ['SOC 2', 'ISO 27001', 'GDPR', 'HIPAA'],
    targetUsers: 'General enterprise use',
    logoColor: '#10B981',
    specialties: ['Creative content', 'Adaptive reasoning', 'Customer service'],
    pricingDetails: {
      monthly: 60,
      annual: 648,
      enterprise: 'Custom',
      notes: 'Enterprise tier; $25/user Team plan available'
    },
    complianceDetails: {
      score: 8,
      certifications: ['SOC 2', 'ISO 27001', 'GDPR', 'HIPAA'],
      dataResidency: ['US', 'EU options'],
      encryption: 'AES-256'
    },
    integrationDetails: {
      score: 8,
      native: ['Slack GPT', 'Custom GPTs', 'Plugins ecosystem'],
      available: ['Microsoft 365', 'Google Workspace', 'Salesforce', 'GitHub', 'AWS Bedrock'],
      limited: []
    },
    capabilities: {
      codeGeneration: 9,
      reasoning: 9,
      languageUnderstanding: 10,
      multimodal: 10,
      toolUse: 9,
      speed: 8,
      costEfficiency: 6,
      enterpriseFeatures: 9,
      developerExperience: 10,
      documentation: 10,
      vision: 10,
      audio: 9,
      functionCalling: 10,
      jsonReliability: 9,
      dataPrivacy: 8,
      onPremOption: 0,
      slaAvailability: 9,
      contextRecall: 8,
      timeToFirstToken: 8,
      tokensPerSecond: 8
    },
    enterpriseCapabilities: {
      productivity: 8,
      creative: 10,
      coding: 8,
      compliance: 7,
      multilingual: 8,
      customerService: 9
    },
    details: {
      description: 'ChatGPT Enterprise now powered by GPT-5.1 (released Nov 13, 2025) with adaptive reasoning that dynamically allocates thinking time. Achieves 94% AIME 2025, 74.9% SWE-bench Verified, 45% fewer hallucinations.',
      strengths: [
        '94% AIME 2025 benchmark',
        'Adaptive reasoning (dynamic thinking time)',
        '45% fewer hallucinations',
        '8 personality presets'
      ],
      useCases: [
        'Content creation and marketing',
        'Strategic planning and analysis',
        'Customer service automation',
        'Training and education'
      ],
      limitations: [
        'Higher pricing tier',
        'Potential rate limits on heavy usage'
      ]
    },
    benchmarks: {
      lmArenaElo: 1489,
      sweBench: 74.9,
      aime2025: 94,
      roi: '35% faster task completion',
      implementationTime: '1-2 weeks'
    },
    intRecommendation: {
      departments: ['Marketing', 'Customer Service', 'HR'],
      priority: 'SPECIALIZED',
      rationale: 'Creative content + conversational AI'
    }
  },
  {
    id: 'anthropic-claude',
    name: 'Anthropic Claude Enterprise',
    provider: 'Anthropic',
    model: 'Claude Opus 4.5 (Nov 2025)',
    category: 'Enterprise',
    priority: 'Tier 1',
    ecosystem: 'anthropic',
    verdict: 'Best-in-class safety & compliance',
    marketShare: 'Growing enterprise adoption',
    marketSharePercent: 45,
    pricing: '$30/user/month',
    contextWindow: '200K tokens (1M beta)',
    contextWindowTokens: 200000,
    focus: 'Safety + compliance',
    compliance: ['SOC 2', 'ISO 27001', 'GDPR', 'HIPAA (best-in-class)'],
    targetUsers: 'Regulated industries',
    logoColor: '#D97706',
    specialties: ['Constitutional AI', 'Code review', 'Compliance docs'],
    pricingDetails: {
      monthly: 30,
      annual: 324,
      enterprise: '$40-60 negotiable',
      notes: 'Team tier; 67% price reduction Nov 2025'
    },
    complianceDetails: {
      score: 10,
      certifications: ['SOC 2', 'ISO 27001', 'GDPR', 'HIPAA (best-in-class)'],
      dataResidency: ['US', 'Expanding'],
      encryption: 'AES-256 + Transparency'
    },
    integrationDetails: {
      score: 8,
      native: ['Slack Claude', 'AWS Bedrock'],
      available: ['Microsoft 365', 'Google Workspace', 'Salesforce', 'GitHub'],
      limited: []
    },
    capabilities: {
      codeGeneration: 10,
      reasoning: 10,
      languageUnderstanding: 10,
      multimodal: 9,
      toolUse: 9,
      speed: 7,
      costEfficiency: 8,
      enterpriseFeatures: 9,
      developerExperience: 9,
      documentation: 9,
      vision: 9,
      audio: 0,
      functionCalling: 9,
      jsonReliability: 9,
      dataPrivacy: 10,
      onPremOption: 0,
      slaAvailability: 9,
      contextRecall: 9,
      timeToFirstToken: 7,
      tokensPerSecond: 7
    },
    enterpriseCapabilities: {
      productivity: 8,
      creative: 8,
      coding: 10,
      compliance: 10,
      multilingual: 7,
      customerService: 8
    },
    details: {
      description: 'Anthropic Claude Enterprise now features Opus 4.5 (released Nov 24, 2025) with industry-leading 80.9% SWE-bench Verified and 66.3% OSWorld (computer use). New effort parameter, tool search, and 67% price reduction.',
      strengths: [
        '80.9% SWE-bench Verified (best)',
        '66.3% OSWorld computer use',
        'Effort parameter for compute control',
        '67% price reduction ($5/$25 per 1M tokens)'
      ],
      useCases: [
        'Healthcare data analysis',
        'Legal document review',
        'Compliance and audit support',
        'Agentic coding (multi-hour sessions)'
      ],
      limitations: [
        'Smaller integration ecosystem',
        'Growing enterprise presence'
      ]
    },
    benchmarks: {
      lmArenaElo: 1465,
      sweBench: 80.9,
      osWorld: 66.3,
      roi: '67% SOC 2 time savings',
      implementationTime: '2-3 weeks'
    },
    intRecommendation: {
      departments: ['Information Security', 'Finance', 'Legal'],
      priority: 'HIGH PRIORITY',
      rationale: '67% SOC 2 audit time savings + constitutional AI safety'
    }
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot Enterprise',
    provider: 'GitHub/Microsoft',
    model: 'Multi-model (GPT-5.1, Claude, Gemini)',
    category: 'Developer',
    priority: 'Tier 1',
    ecosystem: 'microsoft',
    verdict: 'Best-in-class code assistant',
    marketShare: '77% developer adoption',
    marketSharePercent: 77,
    pricing: '$39/user/month',
    contextWindow: 'Variable by model',
    contextWindowTokens: 128000,
    focus: 'Code generation + DevOps',
    compliance: ['SOC 2', 'ISO 27001', 'GDPR'],
    targetUsers: 'Developers, DevOps teams',
    logoColor: '#6366F1',
    specialties: ['Code completion', 'Pull requests', 'Documentation'],
    pricingDetails: {
      monthly: 39,
      annual: 420,
      enterprise: '$39/user/month',
      notes: 'Individual $10, Business $19, Enterprise $39'
    },
    complianceDetails: {
      score: 8,
      certifications: ['SOC 2', 'ISO 27001', 'GDPR'],
      dataResidency: ['GitHub Cloud'],
      encryption: 'AES-256'
    },
    integrationDetails: {
      score: 10,
      native: ['VS Code', 'JetBrains', 'Neovim', 'GitHub'],
      available: ['Azure DevOps'],
      limited: []
    },
    capabilities: {
      codeGeneration: 10,
      reasoning: 7,
      languageUnderstanding: 7,
      multimodal: 0,
      toolUse: 8,
      speed: 10,
      costEfficiency: 9,
      enterpriseFeatures: 8,
      developerExperience: 10,
      documentation: 9,
      vision: 0,
      audio: 0,
      functionCalling: 0,
      jsonReliability: 7,
      dataPrivacy: 7,
      onPremOption: 0,
      slaAvailability: 9,
      contextRecall: 7,
      timeToFirstToken: 10,
      tokensPerSecond: 10
    },
    enterpriseCapabilities: {
      productivity: 7,
      creative: 5,
      coding: 10,
      compliance: 6,
      multilingual: 5,
      customerService: 4
    },
    details: {
      description: 'GitHub Copilot Enterprise now includes AgentHQ with Plan Mode for multi-step task planning and context-isolated sub-agents. Supports multiple models including GPT-5.1, Claude Opus 4.5, and Gemini 3.',
      strengths: [
        'AgentHQ with Plan Mode',
        'Multi-model support (GPT-5.1, Claude, Gemini)',
        'Context-isolated sub-agents',
        'MCP integration for external tools'
      ],
      useCases: [
        'Code completion and generation',
        'Pull request reviews',
        'Documentation generation',
        'Multi-step coding workflows'
      ],
      limitations: [
        'Development-focused only',
        'Limited general business use'
      ]
    },
    benchmarks: {
      sweBench: 77,
      roi: '35% faster code completion; 55% faster task completion',
      implementationTime: '1 week'
    },
    intRecommendation: {
      departments: ['IT', 'DevOps'],
      priority: 'SPECIALIZED',
      rationale: 'IDE integration + documentation automation'
    }
  },
  {
    id: 'perplexity-enterprise',
    name: 'Perplexity Enterprise',
    provider: 'Perplexity',
    model: 'R1-1776 + Deep Research',
    category: 'Specialized',
    priority: 'Tier 2',
    ecosystem: 'independent',
    verdict: 'Best for real-time research',
    marketShare: 'Research-focused',
    marketSharePercent: 10,
    pricing: '$40/user/month',
    contextWindow: '128K tokens',
    contextWindowTokens: 128000,
    focus: 'Research + real-time search',
    compliance: ['SOC 2', 'GDPR', 'FedRAMP Prioritization'],
    targetUsers: 'Researchers, analysts',
    logoColor: '#8B5CF6',
    specialties: ['Deep research', 'Real-time search', 'Citations'],
    pricingDetails: {
      monthly: 40,
      annual: 432,
      enterprise: '$325/user/month',
      notes: 'Pro $40/mo; Enterprise $325/user/mo with advanced security'
    },
    complianceDetails: {
      score: 8,
      certifications: ['SOC 2', 'GDPR', 'FedRAMP Prioritization'],
      dataResidency: ['US'],
      encryption: 'AES-256'
    },
    integrationDetails: {
      score: 6,
      native: ['Browser extensions', 'API'],
      available: ['Slack', 'Custom integrations'],
      limited: ['Enterprise ecosystems']
    },
    capabilities: {
      codeGeneration: 6,
      reasoning: 8,
      languageUnderstanding: 8,
      multimodal: 5,
      toolUse: 7,
      speed: 9,
      costEfficiency: 6,
      enterpriseFeatures: 6,
      developerExperience: 7,
      documentation: 7,
      vision: 5,
      audio: 0,
      functionCalling: 6,
      jsonReliability: 7,
      dataPrivacy: 8,
      onPremOption: 0,
      slaAvailability: 7,
      contextRecall: 8,
      timeToFirstToken: 9,
      tokensPerSecond: 8
    },
    enterpriseCapabilities: {
      productivity: 7,
      creative: 6,
      coding: 6,
      compliance: 7,
      multilingual: 6,
      customerService: 6
    },
    details: {
      description: 'Perplexity Enterprise features FedRAMP prioritization (cleared), Deep Research for comprehensive analysis, R1-1776 uncensored reasoning model, and Comet browser for AI-native web.',
      strengths: [
        'FedRAMP prioritization cleared',
        'Deep Research capability',
        'R1-1776 reasoning model',
        'Real-time web search with citations'
      ],
      useCases: [
        'Market research',
        'Competitive intelligence',
        'Due diligence',
        'Academic research'
      ],
      limitations: [
        'Research-focused only',
        'Limited enterprise features'
      ]
    },
    benchmarks: {
      roi: 'Research-specific productivity gains',
      implementationTime: '1 week'
    },
    intRecommendation: {
      departments: ['Research Tasks'],
      priority: 'OPTIONAL',
      rationale: 'Best for competitive intelligence and due diligence'
    }
  },
  {
    id: 'xai-grok',
    name: 'xAI Grok Enterprise',
    provider: 'xAI',
    model: 'Grok 4.1 (Nov 2025)',
    category: 'Foundation',
    priority: 'Tier 2',
    ecosystem: 'independent',
    verdict: 'Emerging enterprise contender',
    marketShare: 'Emerging enterprise',
    marketSharePercent: 15,
    pricing: '$30/user/month',
    contextWindow: '2M tokens',
    contextWindowTokens: 2000000,
    focus: 'Real-time data + reasoning',
    compliance: ['SOC 2', 'GDPR'],
    targetUsers: 'Early adopters',
    logoColor: '#EF4444',
    specialties: ['Real-time data', 'X integration', 'Reasoning'],
    pricingDetails: {
      monthly: 30,
      annual: 324,
      enterprise: 'Competitive',
      notes: '$0.20-3/$5 per 1M tokens; Azure/Oracle Cloud available'
    },
    complianceDetails: {
      score: 7,
      certifications: ['SOC 2', 'GDPR'],
      dataResidency: ['US', 'Azure', 'Oracle'],
      encryption: 'AES-256'
    },
    integrationDetails: {
      score: 6,
      native: ['X/Twitter'],
      available: ['Azure', 'Oracle Cloud', 'API'],
      limited: ['Microsoft 365', 'Google Workspace']
    },
    capabilities: {
      codeGeneration: 7,
      reasoning: 8,
      languageUnderstanding: 8,
      multimodal: 7,
      toolUse: 6,
      speed: 8,
      costEfficiency: 8,
      enterpriseFeatures: 6,
      developerExperience: 7,
      documentation: 6,
      vision: 7,
      audio: 0,
      functionCalling: 6,
      jsonReliability: 7,
      dataPrivacy: 7,
      onPremOption: 0,
      slaAvailability: 7,
      contextRecall: 9,
      timeToFirstToken: 8,
      tokensPerSecond: 8
    },
    enterpriseCapabilities: {
      productivity: 7,
      creative: 8,
      coding: 7,
      compliance: 6,
      multilingual: 7,
      customerService: 7
    },
    details: {
      description: 'xAI Grok Enterprise features Grok 4.1 with 2M token context, real-time X/Twitter data access, and competitive enterprise pricing through Azure and Oracle Cloud.',
      strengths: [
        '2M token context window',
        'Real-time X/Twitter integration',
        'Competitive API pricing',
        'Azure/Oracle Cloud availability'
      ],
      useCases: [
        'Social media analysis',
        'Real-time trend monitoring',
        'Content creation',
        'Market sentiment analysis'
      ],
      limitations: [
        'Newer to enterprise market',
        'Limited enterprise integrations'
      ]
    },
    benchmarks: {
      roi: 'Emerging productivity metrics',
      implementationTime: '2-4 weeks'
    },
    intRecommendation: {
      departments: ['Marketing'],
      priority: 'OPTIONAL',
      rationale: 'Real-time social intelligence'
    }
  },
  {
    id: 'hubspot-breeze',
    name: 'HubSpot Breeze AI',
    provider: 'HubSpot',
    model: 'Breeze Agents (2025)',
    category: 'Productivity',
    priority: 'Tier 2',
    ecosystem: 'automation',
    verdict: 'Best for SMB marketing automation',
    marketShare: 'SMB/Mid-market',
    marketSharePercent: 20,
    pricing: '$10/user/month',
    contextWindow: 'Variable',
    contextWindowTokens: 64000,
    focus: 'Marketing + sales automation',
    compliance: ['SOC 2', 'GDPR'],
    targetUsers: 'Marketing and sales teams',
    logoColor: '#F97316',
    specialties: ['CRM automation', 'Lead nurturing', 'Content agent'],
    pricingDetails: {
      monthly: 10,
      annual: 108,
      enterprise: 'Credits-based',
      notes: '$10 per 1,000 credits; included in Pro+ plans'
    },
    complianceDetails: {
      score: 7,
      certifications: ['SOC 2', 'GDPR'],
      dataResidency: ['HubSpot Cloud'],
      encryption: 'AES-256'
    },
    integrationDetails: {
      score: 8,
      native: ['HubSpot CRM', 'Marketing Hub', 'Sales Hub', 'Service Hub'],
      available: ['Slack', 'Zapier', 'WhatsApp', 'Messenger'],
      limited: ['Enterprise ecosystems']
    },
    capabilities: {
      codeGeneration: 4,
      reasoning: 6,
      languageUnderstanding: 7,
      multimodal: 5,
      toolUse: 8,
      speed: 8,
      costEfficiency: 9,
      enterpriseFeatures: 6,
      developerExperience: 7,
      documentation: 8,
      vision: 4,
      audio: 0,
      functionCalling: 7,
      jsonReliability: 7,
      dataPrivacy: 7,
      onPremOption: 0,
      slaAvailability: 7,
      contextRecall: 6,
      timeToFirstToken: 8,
      tokensPerSecond: 8
    },
    enterpriseCapabilities: {
      productivity: 7,
      creative: 8,
      coding: 4,
      compliance: 6,
      multilingual: 6,
      customerService: 9
    },
    details: {
      description: 'HubSpot Breeze AI includes Customer Agent (50%+ ticket resolution), Prospecting Agent, Content Agent, and new Knowledge Base Agent. Breeze Studio provides centralized agent management.',
      strengths: [
        '50%+ ticket resolution rate',
        '40% faster time to close',
        'Breeze Studio management',
        'Multi-channel support'
      ],
      useCases: [
        'Customer support automation',
        'Lead prospecting',
        'Content creation',
        'Marketing automation'
      ],
      limitations: [
        'SMB-focused features',
        'Limited enterprise depth'
      ]
    },
    benchmarks: {
      roi: '76% conversion lift; 84% lead quality improvement',
      implementationTime: '1-2 weeks'
    },
    intRecommendation: {
      departments: ['SMB Marketing'],
      priority: 'OPTIONAL',
      rationale: 'INT Inc. already uses HubSpot - native integration'
    }
  }
];

// Department configurations with AI recommendations
export interface DepartmentConfig {
  id: string;
  name: string;
  icon: string;
  teamSize: string;
  primaryPlatform: string;
  secondaryPlatform: string;
  priority: string;
  useCases: {
    title: string;
    description: string;
    platform: string;
    roi: string;
  }[];
}

export const departments: Record<string, DepartmentConfig> = {
  sales: {
    id: 'sales',
    name: 'Sales',
    icon: 'chart-line',
    teamSize: '3-5',
    primaryPlatform: 'Microsoft Copilot',
    secondaryPlatform: 'ChatGPT Enterprise',
    priority: 'BASELINE',
    useCases: [
      { title: 'Lead Qualification Automation', description: 'Automatically score and prioritize leads based on historical data and engagement patterns.', platform: 'ChatGPT Enterprise', roi: '35% increase in qualified leads' },
      { title: 'Email Campaign Optimization', description: 'Generate personalized email content and optimize send times for maximum engagement.', platform: 'Microsoft Copilot', roi: '28% higher open rates' },
      { title: 'Sales Forecasting', description: 'Predict quarterly revenue and identify at-risk deals using AI-powered analytics.', platform: 'Google Gemini Enterprise', roi: '15% forecast accuracy improvement' },
      { title: 'Proposal Generation', description: 'Create customized sales proposals and RFP responses in minutes instead of hours.', platform: 'ChatGPT Enterprise', roi: '70% time savings' },
      { title: 'Competitive Intelligence', description: 'Monitor competitor pricing, features, and market positioning automatically.', platform: 'Perplexity Enterprise', roi: '40% better win rates' }
    ]
  },
  marketing: {
    id: 'marketing',
    name: 'Marketing',
    icon: 'megaphone',
    teamSize: '3-5',
    primaryPlatform: 'Google Gemini Enterprise',
    secondaryPlatform: 'ChatGPT Enterprise',
    priority: 'DUAL PLATFORM',
    useCases: [
      { title: 'Content Generation', description: 'Create blog posts, social media content, and ad copy at scale while maintaining brand voice.', platform: 'ChatGPT Enterprise', roi: '10x content output' },
      { title: 'SEO Optimization', description: 'Analyze content performance and generate SEO-optimized content recommendations.', platform: 'Google Gemini Enterprise', roi: '45% organic traffic increase' },
      { title: 'Campaign Analytics', description: 'Deep dive into campaign performance with AI-powered insights and recommendations.', platform: 'Microsoft Copilot', roi: '25% ROAS improvement' },
      { title: 'Brand Voice Training', description: 'Train AI models on your brand guidelines to ensure consistent messaging.', platform: 'ChatGPT Enterprise', roi: '90% brand consistency' },
      { title: 'A/B Test Analysis', description: 'Automatically analyze test results and recommend winning variations.', platform: 'Google Gemini Enterprise', roi: '50% faster testing cycles' }
    ]
  },
  infosec: {
    id: 'infosec',
    name: 'Information Security',
    icon: 'shield-check',
    teamSize: '4-6',
    primaryPlatform: 'Anthropic Claude Enterprise',
    secondaryPlatform: 'Perplexity Enterprise',
    priority: 'HIGH PRIORITY',
    useCases: [
      { title: 'Policy Generation', description: 'Draft comprehensive security policies aligned with ISO 27001, SOC 2, NIST frameworks.', platform: 'Anthropic Claude Enterprise', roi: '67% time savings' },
      { title: 'Threat Intelligence', description: 'Real-time CVE tracking, vulnerability analysis, and threat monitoring.', platform: 'Perplexity Enterprise', roi: 'Real-time intelligence' },
      { title: 'Compliance Documentation', description: 'Generate audit evidence and compliance reports automatically.', platform: 'Anthropic Claude Enterprise', roi: '67% SOC 2 audit time savings' },
      { title: 'Incident Analysis', description: 'Analyze security incidents and generate response recommendations.', platform: 'Anthropic Claude Enterprise', roi: '50% faster response' },
      { title: 'Vendor Assessment', description: 'Automate third-party security questionnaire responses.', platform: 'Anthropic Claude Enterprise', roi: '70% faster assessments' }
    ]
  },
  it: {
    id: 'it',
    name: 'IT & DevOps',
    icon: 'server',
    teamSize: '5-7',
    primaryPlatform: 'GitHub Copilot Enterprise',
    secondaryPlatform: 'Google Gemini Enterprise',
    priority: 'SPECIALIZED',
    useCases: [
      { title: 'Code Review Assistance', description: 'Automated code review for security vulnerabilities and best practices.', platform: 'GitHub Copilot Enterprise', roi: '60% fewer bugs in production' },
      { title: 'Documentation Generation', description: 'Auto-generate technical documentation from code and comments.', platform: 'ChatGPT Enterprise', roi: '85% documentation time saved' },
      { title: 'Incident Response', description: 'AI-powered triage and resolution suggestions for IT incidents.', platform: 'Microsoft Copilot', roi: '45% faster resolution' },
      { title: 'Infrastructure Optimization', description: 'Analyze cloud usage and recommend cost-saving optimizations.', platform: 'Google Gemini Enterprise', roi: '30% infrastructure savings' },
      { title: 'API Development', description: 'Generate API endpoints and documentation from specifications.', platform: 'GitHub Copilot Enterprise', roi: '50% faster API development' }
    ]
  },
  operations: {
    id: 'operations',
    name: 'Operations',
    icon: 'cog',
    teamSize: '3-5',
    primaryPlatform: 'Google Gemini Enterprise',
    secondaryPlatform: 'Anthropic Claude Enterprise',
    priority: 'DUAL PLATFORM',
    useCases: [
      { title: 'SOP Documentation', description: 'Create and maintain standardized operating procedures.', platform: 'Anthropic Claude Enterprise', roi: '70% faster documentation' },
      { title: 'Process Analysis', description: 'Analyze workflows and identify optimization opportunities.', platform: 'Google Gemini Enterprise', roi: '35% efficiency improvement' },
      { title: 'Meeting Transcription', description: 'Transcribe meetings and extract action items automatically.', platform: 'Notion AI 3.0', roi: '20-minute autonomous agents' },
      { title: 'Vendor Comparison', description: 'Research and compare vendor offerings systematically.', platform: 'Perplexity Enterprise', roi: 'Verified citations' },
      { title: 'Resource Planning', description: 'Optimize resource allocation across projects and teams.', platform: 'Google Gemini Enterprise', roi: '25% better utilization' }
    ]
  },
  finance: {
    id: 'finance',
    name: 'Finance & Accounting',
    icon: 'dollar-sign',
    teamSize: '2-4',
    primaryPlatform: 'Microsoft Copilot',
    secondaryPlatform: 'Anthropic Claude Enterprise',
    priority: 'COMPLIANCE',
    useCases: [
      { title: 'Invoice Processing', description: 'Automate invoice data extraction and approval workflows.', platform: 'Microsoft Copilot', roi: '80% processing time savings' },
      { title: 'Expense Analysis', description: 'Identify spending patterns and anomalies across departments.', platform: 'Google Gemini Enterprise', roi: '12% cost reduction' },
      { title: 'Financial Reporting', description: 'Generate comprehensive financial reports with AI-powered insights.', platform: 'ChatGPT Enterprise', roi: '90% faster reporting' },
      { title: 'Fraud Detection', description: 'Identify suspicious transactions and patterns in real-time.', platform: 'Anthropic Claude Enterprise', roi: '95% fraud detection rate' },
      { title: 'Audit Preparation', description: 'Automatically compile and organize documentation for audits.', platform: 'Anthropic Claude Enterprise', roi: '70% audit prep time saved' }
    ]
  },
  hr: {
    id: 'hr',
    name: 'HR & Talent',
    icon: 'users',
    teamSize: '2-3',
    primaryPlatform: 'ChatGPT Enterprise',
    secondaryPlatform: 'Microsoft Copilot',
    priority: 'STANDARD',
    useCases: [
      { title: 'Resume Screening', description: 'Automatically screen resumes and rank candidates based on job requirements.', platform: 'ChatGPT Enterprise', roi: '75% screening time reduction' },
      { title: 'Employee Onboarding', description: 'Create personalized onboarding plans and automate documentation.', platform: 'Microsoft Copilot', roi: '60% faster onboarding' },
      { title: 'Performance Review Analysis', description: 'Analyze performance data to identify trends and improvement opportunities.', platform: 'Google Gemini Enterprise', roi: '85% manager time savings' },
      { title: 'Job Description Generation', description: 'Create inclusive, optimized job postings that attract top talent.', platform: 'ChatGPT Enterprise', roi: '40% more applications' },
      { title: 'Training Content Creation', description: 'Develop personalized learning paths and training materials.', platform: 'ChatGPT Enterprise', roi: '50% training cost reduction' }
    ]
  },
  customerService: {
    id: 'customer-service',
    name: 'Customer Service',
    icon: 'headset',
    teamSize: '3-5',
    primaryPlatform: 'ChatGPT Enterprise',
    secondaryPlatform: 'Google Gemini Enterprise',
    priority: 'HIGH PRIORITY',
    useCases: [
      { title: 'Ticket Classification', description: 'Automatically categorize and route support tickets to appropriate teams.', platform: 'Microsoft Copilot', roi: '50% faster routing' },
      { title: 'Response Generation', description: 'Draft personalized customer responses based on ticket context and history.', platform: 'ChatGPT Enterprise', roi: '40% response time reduction' },
      { title: 'Sentiment Analysis', description: 'Monitor customer sentiment and flag escalation-worthy interactions.', platform: 'Anthropic Claude Enterprise', roi: '30% churn reduction' },
      { title: 'Knowledge Base Automation', description: 'Automatically generate and update help articles from resolved tickets.', platform: 'Google Gemini Enterprise', roi: '65% fewer repeat tickets' },
      { title: 'Multilingual Support', description: 'Provide real-time translation for global customer interactions.', platform: 'Google Gemini Enterprise', roi: '80 languages supported' }
    ]
  }
};

// 25 AI Quick Wins Framework
export interface AIWin {
  id: number;
  title: string;
  tool: string;
  description: string;
  hours: number;
  improvement: string;
}

export const aiWins: Record<string, AIWin[]> = {
  infosec: [
    { id: 1, title: 'Automated Policy Generation', tool: 'Claude Team', description: 'Draft ISO 27001/SOC 2 policies', hours: 40, improvement: '67%' },
    { id: 2, title: 'Threat Intelligence Research', tool: 'Perplexity', description: 'Real-time CVE tracking & analysis', hours: 20, improvement: 'Real-time' },
    { id: 3, title: 'Client Security Reports', tool: 'Claude', description: 'Executive summaries from technical data', hours: 30, improvement: '70%' },
    { id: 4, title: 'Control Mapping Automation', tool: 'ChatGPT', description: 'Framework crosswalk generation', hours: 15, improvement: '55%' }
  ],
  marketing: [
    { id: 5, title: 'Blog Content Generation', tool: 'Gemini + ChatGPT', description: 'SEO-optimized articles', hours: 0, improvement: '60%' },
    { id: 6, title: 'Social Media Scheduling', tool: 'ChatGPT', description: 'Platform-specific post creation', hours: 0, improvement: '40%' },
    { id: 7, title: 'Email Campaign Copy', tool: 'Gemini', description: 'Multi-variant A/B testing copy', hours: 0, improvement: '76%' },
    { id: 8, title: 'Case Study Drafting', tool: 'Claude', description: 'Client success story creation', hours: 0, improvement: '50%' },
    { id: 9, title: 'Visual Asset Generation', tool: 'Canva AI + DALL-E', description: 'Brand-aligned graphics', hours: 0, improvement: '70%' }
  ],
  it: [
    { id: 10, title: 'Code Completion & Review', tool: 'GitHub Copilot', description: '35% faster code completion', hours: 35, improvement: '55%' },
    { id: 11, title: 'Technical Documentation', tool: 'Claude', description: 'API docs, runbooks, KB articles', hours: 25, improvement: '80%' },
    { id: 12, title: 'Infrastructure Scripting', tool: 'Copilot', description: 'PowerShell/Terraform automation', hours: 20, improvement: '40%' },
    { id: 13, title: 'Ticket Resolution Analysis', tool: 'Freshdesk AI', description: 'Pattern detection & routing', hours: 0, improvement: '50%+' }
  ],
  operations: [
    { id: 18, title: 'SOP Documentation', tool: 'Claude', description: 'Standardized procedure creation', hours: 0, improvement: '70%' },
    { id: 19, title: 'Process Analysis', tool: 'Gemini', description: 'Workflow optimization insights', hours: 0, improvement: '2M context' },
    { id: 20, title: 'Meeting Transcription', tool: 'Notion AI', description: 'Action items & summaries', hours: 0, improvement: '20-min agents' },
    { id: 21, title: 'Vendor Comparison Research', tool: 'Perplexity', description: 'Real-time market analysis', hours: 0, improvement: 'Citations' }
  ],
  sales: [
    { id: 22, title: 'Proposal Generation', tool: 'Copilot', description: 'RFP responses & proposals', hours: 0, improvement: '43%' },
    { id: 23, title: 'Email Personalization', tool: 'HubSpot Breeze', description: 'Lead nurturing at scale', hours: 0, improvement: '84%' },
    { id: 24, title: 'Client Meeting Prep', tool: 'Perplexity', description: 'Company research & intel', hours: 0, improvement: 'Real-time' },
    { id: 25, title: 'Customer Success QBRs', tool: 'Claude', description: 'Quarterly review presentations', hours: 0, improvement: '60%' }
  ]
};

// ROI benchmarks from industry research
export const benchmarks = {
  forrester: {
    source: 'Forrester TEI',
    url: 'https://tei.forrester.com/go/microsoft/M365Copilot/',
    metrics: {
      roiRange: '112-457%',
      costReduction: '20%',
      revenueIncrease: '6%',
      paybackPeriod: '< 6 months'
    }
  },
  lse: {
    source: 'LSE/Protiviti 2024',
    url: 'https://www.lse.ac.uk/News/Latest-news-from-LSE/2024/j-October-24',
    metrics: {
      productivityGain: '20-40%',
      adoptionRate: '90%+',
      satisfactionTarget: '80%+'
    }
  },
  ey: {
    source: 'EY 2025 Survey',
    url: 'https://www.ey.com/en_gl/newsroom/2025/11',
    metrics: {
      productivityPotential: '40%',
      implementationGap: 'Talent strategy gaps'
    }
  },
  readai: {
    source: 'Read.ai S&P 500 Analysis',
    url: 'https://www.read.ai/post/productivity-ai-users',
    metrics: {
      aiUserStockGrowth: '17.2%',
      sp500Growth: '13.3%',
      outperformance: '29%'
    }
  }
};

// INT Inc. specific configuration
export const intConfig = {
  companyName: 'INT Inc.',
  teamSize: 58,
  phase1Users: 40,
  currentStack: {
    crm: 'HubSpot',
    productivity: 'Microsoft 365',
    helpdesk: 'Freshdesk',
    devops: 'GitLab'
  },
  investment: {
    year1: 46180,
    year3: 138540,
    breakeven: 'Month 6',
    roi3Year: '626%'
  },
  strategy: 'Hybrid Intelligence - Microsoft foundation + specialized tools'
};
