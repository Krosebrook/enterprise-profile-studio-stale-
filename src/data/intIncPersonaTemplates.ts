/**
 * INT Inc. Persona Templates
 * Pre-configured personas based on INT Inc. organizational taxonomy
 */

import type { PersonaTemplate } from './personaTemplates';

export const intIncPersonaTemplates: PersonaTemplate[] = [
  // Information Security Templates
  {
    id: 'int-grc-analyst',
    name: 'GRC Analyst (INT Inc.)',
    description: 'Governance, Risk & Compliance specialist for SOC 2, ISO 27001, HIPAA audits',
    icon: 'Shield',
    color: 'bg-red-600',
    data: {
      job_title: 'GRC Analyst',
      department: 'Information Security',
      communication_style: {
        formality: 'formal',
        detail_level: 'detailed',
        examples_preference: 'extensive',
        technical_depth: 'technical',
      },
      work_preferences: {
        focus_time: 'morning',
        collaboration_style: 'async',
        decision_making: 'data_driven',
        feedback_preference: 'direct',
      },
      skills: ['SOC 2', 'ISO 27001', 'HIPAA', 'NIST CSF', 'Risk Assessment', 'Policy Writing', 'Audit Preparation'],
      expertise_areas: ['Compliance Frameworks', 'Security Audits', 'Policy Development', 'Gap Analysis'],
      tools_used: ['Claude', 'Perplexity AI', 'Microsoft Copilot', 'OneTrust', 'Drata', 'Notion'],
      pain_points: [
        'Writing comprehensive security policies from scratch',
        'Keeping up with changing compliance requirements',
        'Preparing evidence packages for audits',
        'Explaining technical controls to non-technical stakeholders',
      ],
      goals: [
        'Reduce audit preparation time by 50%',
        'Maintain continuous compliance across frameworks',
        'Automate policy updates and gap tracking',
        'Improve client CSAT on compliance deliverables',
      ],
      ai_interaction_style: 'comprehensive',
      preferred_response_length: 'long',
      preferred_tone: 'formal',
    },
  },
  {
    id: 'int-security-analyst',
    name: 'Security Analyst (INT Inc.)',
    description: 'Threat intelligence and incident response specialist',
    icon: 'AlertTriangle',
    color: 'bg-orange-600',
    data: {
      job_title: 'Security Analyst',
      department: 'Information Security',
      communication_style: {
        formality: 'balanced',
        detail_level: 'detailed',
        examples_preference: 'extensive',
        technical_depth: 'technical',
      },
      work_preferences: {
        focus_time: 'flexible',
        collaboration_style: 'realtime',
        decision_making: 'data_driven',
        feedback_preference: 'direct',
      },
      skills: ['Threat Intelligence', 'Incident Response', 'SIEM', 'Vulnerability Assessment', 'CVE Analysis', 'Malware Analysis'],
      expertise_areas: ['Threat Hunting', 'Security Monitoring', 'Incident Investigation', 'Vulnerability Management'],
      tools_used: ['Perplexity AI', 'ChatGPT', 'Claude', 'Splunk', 'CrowdStrike', 'VirusTotal'],
      pain_points: [
        'Researching new threats and vulnerabilities quickly',
        'Writing incident reports under time pressure',
        'Correlating threat data across multiple sources',
        'Staying current with emerging attack techniques',
      ],
      goals: [
        'Reduce mean-time-to-detect by 40%',
        'Automate threat intelligence gathering',
        'Improve incident report quality and speed',
        'Build comprehensive threat knowledge base',
      ],
      ai_interaction_style: 'comprehensive',
      preferred_response_length: 'medium',
      preferred_tone: 'professional',
    },
  },

  // Technology / IT Services Templates
  {
    id: 'int-it-support-specialist',
    name: 'IT Support Specialist (INT Inc.)',
    description: 'Tier 1-2 technical support and ticket resolution',
    icon: 'Headphones',
    color: 'bg-blue-600',
    data: {
      job_title: 'IT Support Specialist',
      department: 'Technology / IT Services',
      communication_style: {
        formality: 'balanced',
        detail_level: 'balanced',
        examples_preference: 'moderate',
        technical_depth: 'balanced',
      },
      work_preferences: {
        focus_time: 'morning',
        collaboration_style: 'realtime',
        decision_making: 'collaborative',
        feedback_preference: 'coaching',
      },
      skills: ['Troubleshooting', 'Windows/Mac Support', 'M365 Administration', 'Network Basics', 'Documentation'],
      expertise_areas: ['End-User Support', 'Ticket Management', 'Knowledge Base Creation', 'Remote Support'],
      tools_used: ['ChatGPT', 'Microsoft Copilot', 'ConnectWise', 'TeamViewer', 'SharePoint'],
      pain_points: [
        'Writing consistent, helpful ticket responses',
        'Creating KB articles from resolved tickets',
        'Handling high ticket volume efficiently',
        'Escalating complex issues with good context',
      ],
      goals: [
        'Reduce first-response time by 30%',
        'Increase first-contact resolution rate',
        'Build self-service knowledge base',
        'Improve client satisfaction scores',
      ],
      ai_interaction_style: 'balanced',
      preferred_response_length: 'short',
      preferred_tone: 'casual',
    },
  },
  {
    id: 'int-network-admin',
    name: 'Network Administrator (INT Inc.)',
    description: 'Network infrastructure design, configuration, and troubleshooting',
    icon: 'Network',
    color: 'bg-indigo-600',
    data: {
      job_title: 'Network Administrator',
      department: 'Technology / IT Services',
      communication_style: {
        formality: 'balanced',
        detail_level: 'detailed',
        examples_preference: 'extensive',
        technical_depth: 'technical',
      },
      work_preferences: {
        focus_time: 'afternoon',
        collaboration_style: 'async',
        decision_making: 'data_driven',
        feedback_preference: 'direct',
      },
      skills: ['Cisco', 'Juniper', 'Firewall Management', 'VPN', 'Network Monitoring', 'Automation'],
      expertise_areas: ['Network Design', 'Security Architecture', 'Performance Optimization', 'Disaster Recovery'],
      tools_used: ['Claude', 'ChatGPT', 'Microsoft Copilot', 'PRTG', 'SolarWinds', 'Ansible'],
      pain_points: [
        'Generating device configurations quickly',
        'Documenting network architectures',
        'Troubleshooting complex connectivity issues',
        'Automating repetitive network tasks',
      ],
      goals: [
        'Reduce configuration time by 50%',
        'Maintain 99.9% network uptime',
        'Automate routine monitoring tasks',
        'Improve network documentation quality',
      ],
      ai_interaction_style: 'comprehensive',
      preferred_response_length: 'long',
      preferred_tone: 'professional',
    },
  },

  // Managed Marketing Templates
  {
    id: 'int-content-strategist',
    name: 'Content Strategist (INT Inc.)',
    description: 'Long-form content creation and content strategy development',
    icon: 'FileText',
    color: 'bg-pink-600',
    data: {
      job_title: 'Content Strategist',
      department: 'Managed Marketing',
      communication_style: {
        formality: 'balanced',
        detail_level: 'detailed',
        examples_preference: 'extensive',
        technical_depth: 'simplified',
      },
      work_preferences: {
        focus_time: 'morning',
        collaboration_style: 'async',
        decision_making: 'collaborative',
        feedback_preference: 'coaching',
      },
      skills: ['Content Strategy', 'SEO Writing', 'Thought Leadership', 'Case Studies', 'Whitepapers', 'Brand Voice'],
      expertise_areas: ['B2B Content Marketing', 'Lead Generation Content', 'Technical Writing for Non-Technical Audiences'],
      tools_used: ['Claude', 'ChatGPT', 'Perplexity AI', 'Grammarly', 'HubSpot', 'WordPress'],
      pain_points: [
        'Producing high-quality long-form content consistently',
        'Researching industry topics thoroughly',
        'Maintaining brand voice across content types',
        'Creating SEO-optimized content efficiently',
      ],
      goals: [
        'Double content production without sacrificing quality',
        'Improve content engagement metrics by 40%',
        'Establish clients as thought leaders',
        'Streamline content approval workflows',
      ],
      ai_interaction_style: 'comprehensive',
      preferred_response_length: 'long',
      preferred_tone: 'professional',
    },
  },
  {
    id: 'int-digital-marketing-specialist',
    name: 'Digital Marketing Specialist (INT Inc.)',
    description: 'Campaign management, social media, and marketing automation',
    icon: 'Share2',
    color: 'bg-purple-600',
    data: {
      job_title: 'Digital Marketing Specialist',
      department: 'Managed Marketing',
      communication_style: {
        formality: 'casual',
        detail_level: 'balanced',
        examples_preference: 'moderate',
        technical_depth: 'simplified',
      },
      work_preferences: {
        focus_time: 'morning',
        collaboration_style: 'mixed',
        decision_making: 'data_driven',
        feedback_preference: 'direct',
      },
      skills: ['Social Media Marketing', 'Email Marketing', 'PPC', 'Marketing Automation', 'Analytics', 'A/B Testing'],
      expertise_areas: ['Campaign Management', 'Lead Nurturing', 'Performance Marketing', 'Marketing Analytics'],
      tools_used: ['ChatGPT', 'Perplexity AI', 'Canva AI', 'HubSpot', 'Google Ads', 'Meta Ads Manager'],
      pain_points: [
        'Creating fresh social content daily',
        'Writing compelling ad copy variations',
        'Analyzing campaign performance quickly',
        'Personalizing email campaigns at scale',
      ],
      goals: [
        'Increase social engagement by 50%',
        'Improve email open rates to 30%+',
        'Reduce cost-per-lead by 25%',
        'Automate routine campaign tasks',
      ],
      ai_interaction_style: 'concise',
      preferred_response_length: 'short',
      preferred_tone: 'casual',
    },
  },

  // Operations Templates
  {
    id: 'int-operations-consultant',
    name: 'Operations Consultant (INT Inc.)',
    description: 'Process optimization and AI enablement consultant',
    icon: 'Cog',
    color: 'bg-emerald-600',
    data: {
      job_title: 'Operations Consultant',
      department: 'Operations',
      communication_style: {
        formality: 'formal',
        detail_level: 'detailed',
        examples_preference: 'extensive',
        technical_depth: 'balanced',
      },
      work_preferences: {
        focus_time: 'morning',
        collaboration_style: 'mixed',
        decision_making: 'data_driven',
        feedback_preference: 'direct',
      },
      skills: ['Process Mapping', 'Lean Six Sigma', 'Change Management', 'SOPs', 'Workflow Automation', 'AI Implementation'],
      expertise_areas: ['Business Process Optimization', 'AI Enablement', 'Operational Excellence', 'Performance Metrics'],
      tools_used: ['Claude', 'Microsoft Copilot', 'Notion AI', 'Lucidchart', 'Monday.com', 'Power Automate'],
      pain_points: [
        'Documenting complex business processes',
        'Identifying automation opportunities',
        'Writing clear SOPs and runbooks',
        'Measuring process improvement impact',
      ],
      goals: [
        'Achieve 30% efficiency gains for clients',
        'Reduce SOP creation time by 60%',
        'Implement AI tools that deliver measurable ROI',
        'Build scalable process frameworks',
      ],
      ai_interaction_style: 'comprehensive',
      preferred_response_length: 'medium',
      preferred_tone: 'professional',
    },
  },

  // Executive Templates
  {
    id: 'int-vp-technical-services',
    name: 'VP Technical Services (INT Inc.)',
    description: 'Executive leader overseeing InfoSec and Technology departments',
    icon: 'Crown',
    color: 'bg-amber-600',
    data: {
      job_title: 'VP Technical Services',
      department: 'Executive',
      communication_style: {
        formality: 'formal',
        detail_level: 'concise',
        examples_preference: 'minimal',
        technical_depth: 'balanced',
      },
      work_preferences: {
        focus_time: 'morning',
        collaboration_style: 'realtime',
        decision_making: 'collaborative',
        feedback_preference: 'direct',
      },
      skills: ['Strategic Planning', 'Team Leadership', 'Client Relationship Management', 'Budget Management', 'Risk Assessment'],
      expertise_areas: ['Technical Strategy', 'Service Delivery', 'Team Development', 'Vendor Management'],
      tools_used: ['Microsoft Copilot', 'Claude', 'Perplexity AI', 'PowerPoint', 'Excel', 'Teams'],
      pain_points: [
        'Preparing executive presentations quickly',
        'Analyzing department performance metrics',
        'Staying current on technology trends',
        'Communicating technical concepts to board/clients',
      ],
      goals: [
        'Drive 85%+ AI adoption across teams',
        'Achieve 20% revenue growth from technical services',
        'Improve team productivity by 30%',
        'Establish thought leadership in AI implementation',
      ],
      ai_interaction_style: 'concise',
      preferred_response_length: 'short',
      preferred_tone: 'professional',
    },
  },

  // Finance Templates
  {
    id: 'int-finance-analyst',
    name: 'Finance Analyst (INT Inc.)',
    description: 'Financial analysis, reporting, and budgeting specialist',
    icon: 'DollarSign',
    color: 'bg-green-700',
    data: {
      job_title: 'Finance Analyst',
      department: 'Finance',
      communication_style: {
        formality: 'formal',
        detail_level: 'detailed',
        examples_preference: 'moderate',
        technical_depth: 'balanced',
      },
      work_preferences: {
        focus_time: 'morning',
        collaboration_style: 'async',
        decision_making: 'data_driven',
        feedback_preference: 'direct',
      },
      skills: ['Financial Modeling', 'Budgeting', 'Forecasting', 'Excel/Power BI', 'Variance Analysis', 'Reporting'],
      expertise_areas: ['Financial Planning & Analysis', 'Cost Analysis', 'ROI Calculations', 'Cash Flow Management'],
      tools_used: ['Microsoft Copilot', 'ChatGPT', 'Excel', 'Power BI', 'QuickBooks', 'NetSuite'],
      pain_points: [
        'Building complex financial models quickly',
        'Automating routine reporting tasks',
        'Analyzing large datasets for insights',
        'Presenting financial data to non-finance stakeholders',
      ],
      goals: [
        'Reduce month-end close time by 40%',
        'Automate 60% of routine reporting',
        'Improve forecast accuracy to 95%+',
        'Provide real-time financial insights',
      ],
      ai_interaction_style: 'balanced',
      preferred_response_length: 'medium',
      preferred_tone: 'formal',
    },
  },
];

export const getIntIncTemplateById = (id: string): PersonaTemplate | undefined => {
  return intIncPersonaTemplates.find(t => t.id === id);
};

export const getIntIncTemplatesByDepartment = (department: string): PersonaTemplate[] => {
  return intIncPersonaTemplates.filter(t => t.data.department === department);
};

export const INT_INC_DEPARTMENTS = [
  'Information Security',
  'Technology / IT Services',
  'Managed Marketing',
  'Operations',
  'Executive',
  'Finance',
  'Website Design & Development',
  'Branding & Identity',
  'Content Creation & Strategy',
] as const;
