/**
 * B2B Client Personas for INT Inc. AIaaS Platform
 * 8 client persona types with case studies and AI tool recommendations
 */

export interface ClientPersona {
  id: string;
  role: string;
  title: string;
  industry: string[];
  companySize: string;
  goals: string[];
  painPoints: string[];
  successMetrics: string[];
  techProficiency: 'Novice' | 'Medium' | 'Expert' | 'Strategic';
  budgetTier: 'Low' | 'Medium' | 'High' | 'Ultimate';
  decisionAuthority: 'Influencer' | 'Recommender' | 'Decision Maker' | 'Budget Owner';
  aiUseCases: string[];
  relatedServices: string[];
  confidence: 'high' | 'medium' | 'low';
}

export interface IntService {
  slug: string;
  name: string;
  shortDescription: string;
  industriesImplied: string[];
  rolesImplied: string[];
  painPoints: string[];
  valueProps: string[];
  deliverables: string[];
  confidence: 'high' | 'medium' | 'low';
}

export interface CaseStudy {
  id: string;
  title: string;
  clientName: string;
  industry: string;
  problem: string;
  solution: string;
  outcome: string;
  metrics: { name: string; value: string }[];
  rolesMentioned: string[];
  servicesUsed: string[];
  confidence: 'high' | 'medium' | 'low';
}

export interface AIToolRecommendation {
  platformId: string;
  platformName: string;
  ecosystem: string;
  relevanceScore: number;
  useCases: string[];
  rationale: string;
}

export const clientPersonas: ClientPersona[] = [
  {
    id: 'cmo',
    role: 'CMO',
    title: 'Chief Marketing Officer',
    industry: ['SaaS', 'Technology', 'Retail', 'Financial Services'],
    companySize: '100-1000 employees',
    goals: [
      'Drive brand awareness and market positioning',
      'Increase marketing ROI and attribution accuracy',
      'Accelerate content production without sacrificing quality',
      'Personalize customer experiences at scale',
    ],
    painPoints: [
      'Content creation bottlenecks limiting campaign velocity',
      'Difficulty measuring true marketing impact on revenue',
      'Fragmented customer data across platforms',
      'Keeping pace with AI-powered competitors',
    ],
    successMetrics: [
      'Marketing Qualified Leads (MQLs)',
      'Customer Acquisition Cost (CAC)',
      'Brand sentiment scores',
      'Content engagement rates',
    ],
    techProficiency: 'Strategic',
    budgetTier: 'High',
    decisionAuthority: 'Budget Owner',
    aiUseCases: [
      'AI-powered content generation and optimization',
      'Predictive analytics for campaign performance',
      'Customer segmentation and personalization',
      'Competitive intelligence automation',
    ],
    relatedServices: ['brand-strategy', 'managed-marketing', 'content-strategy'],
    confidence: 'high',
  },
  {
    id: 'ops-lead',
    role: 'Ops Lead',
    title: 'Operations Lead / COO',
    industry: ['Manufacturing', 'Logistics', 'Healthcare', 'Professional Services'],
    companySize: '50-500 employees',
    goals: [
      'Streamline operational processes and reduce waste',
      'Improve cross-functional collaboration',
      'Automate repetitive workflows',
      'Maintain compliance while scaling operations',
    ],
    painPoints: [
      'Manual processes consuming team bandwidth',
      'Data silos preventing unified operational view',
      'Difficulty scaling processes with growth',
      'Compliance documentation overhead',
    ],
    successMetrics: [
      'Process cycle time reduction',
      'Operational cost savings',
      'Employee productivity metrics',
      'Compliance audit scores',
    ],
    techProficiency: 'Medium',
    budgetTier: 'Medium',
    decisionAuthority: 'Decision Maker',
    aiUseCases: [
      'Workflow automation and orchestration',
      'Document processing and extraction',
      'Process mining and optimization',
      'Compliance monitoring automation',
    ],
    relatedServices: ['operations-consulting', 'process-automation', 'ai-integration'],
    confidence: 'high',
  },
  {
    id: 'founder',
    role: 'Founder',
    title: 'Founder / CEO',
    industry: ['Startups', 'SaaS', 'E-commerce', 'Consulting'],
    companySize: '5-50 employees',
    goals: [
      'Accelerate product-market fit discovery',
      'Maximize team productivity with limited resources',
      'Build competitive advantage through AI adoption',
      'Scale operations without proportional headcount',
    ],
    painPoints: [
      'Wearing too many hats with limited time',
      'Need enterprise-grade AI on startup budget',
      'Uncertainty about which AI tools deliver real ROI',
      'Integration complexity across existing tools',
    ],
    successMetrics: [
      'Revenue growth rate',
      'Burn rate efficiency',
      'Time-to-market for features',
      'Customer retention rate',
    ],
    techProficiency: 'Expert',
    budgetTier: 'Low',
    decisionAuthority: 'Budget Owner',
    aiUseCases: [
      'AI-powered customer support automation',
      'Code generation and development acceleration',
      'Market research and competitive analysis',
      'Sales outreach personalization',
    ],
    relatedServices: ['startup-fundamentals', 'ai-integration', 'growth-engineering'],
    confidence: 'high',
  },
  {
    id: 'product-manager',
    role: 'Product Manager',
    title: 'Product Manager / Director of Product',
    industry: ['SaaS', 'Technology', 'Fintech', 'Healthcare Tech'],
    companySize: '50-500 employees',
    goals: [
      'Accelerate feature discovery and validation',
      'Improve user research synthesis efficiency',
      'Reduce time from ideation to launch',
      'Build AI-native product features',
    ],
    painPoints: [
      'Drowning in customer feedback without actionable insights',
      'Slow iteration cycles limiting experimentation',
      'Difficulty prioritizing with competing stakeholder demands',
      'Gap between AI vision and engineering capacity',
    ],
    successMetrics: [
      'Feature adoption rates',
      'Time-to-value for new releases',
      'Net Promoter Score (NPS)',
      'Sprint velocity',
    ],
    techProficiency: 'Expert',
    budgetTier: 'Medium',
    decisionAuthority: 'Recommender',
    aiUseCases: [
      'User feedback analysis and sentiment tracking',
      'Competitive feature benchmarking',
      'Automated PRD and spec generation',
      'AI feature prototyping and testing',
    ],
    relatedServices: ['ux-ui-design', 'web-development', 'ai-integration'],
    confidence: 'high',
  },
  {
    id: 'ecommerce-manager',
    role: 'Ecommerce Manager',
    title: 'E-commerce Manager / Digital Commerce Director',
    industry: ['Retail', 'D2C', 'Consumer Goods', 'Fashion'],
    companySize: '20-200 employees',
    goals: [
      'Increase online conversion rates',
      'Personalize shopping experiences at scale',
      'Optimize inventory and pricing dynamically',
      'Reduce cart abandonment rates',
    ],
    painPoints: [
      'Product catalog management complexity',
      'Customer service scaling during peak seasons',
      'Attribution across multiple sales channels',
      'Keeping product descriptions fresh and optimized',
    ],
    successMetrics: [
      'Conversion rate (CVR)',
      'Average order value (AOV)',
      'Customer lifetime value (CLV)',
      'Return rate reduction',
    ],
    techProficiency: 'Medium',
    budgetTier: 'Medium',
    decisionAuthority: 'Decision Maker',
    aiUseCases: [
      'AI product descriptions and SEO optimization',
      'Chatbot for customer support and recommendations',
      'Dynamic pricing optimization',
      'Visual search and product matching',
    ],
    relatedServices: ['web-development', 'content-strategy', 'managed-marketing'],
    confidence: 'high',
  },
  {
    id: 'vp-sales',
    role: 'VP Sales',
    title: 'VP of Sales / Chief Revenue Officer',
    industry: ['SaaS', 'Technology', 'Professional Services', 'Manufacturing'],
    companySize: '100-1000 employees',
    goals: [
      'Accelerate pipeline velocity and deal closure',
      'Improve sales rep productivity and quota attainment',
      'Enhance forecasting accuracy',
      'Reduce sales cycle length',
    ],
    painPoints: [
      'Reps spending too much time on admin vs. selling',
      'Inconsistent deal qualification and pipeline hygiene',
      'Difficulty scaling personalized outreach',
      'Forecast misses impacting business planning',
    ],
    successMetrics: [
      'Revenue growth',
      'Win rate improvement',
      'Average deal size',
      'Sales cycle length',
    ],
    techProficiency: 'Medium',
    budgetTier: 'High',
    decisionAuthority: 'Budget Owner',
    aiUseCases: [
      'AI-powered email and call scripts',
      'Deal scoring and prioritization',
      'Automated CRM data entry and enrichment',
      'Conversation intelligence and coaching',
    ],
    relatedServices: ['managed-marketing', 'crm-implementation', 'ai-integration'],
    confidence: 'high',
  },
  {
    id: 'cto',
    role: 'CTO',
    title: 'Chief Technology Officer / VP Engineering',
    industry: ['SaaS', 'Technology', 'Fintech', 'Healthcare'],
    companySize: '50-500 employees',
    goals: [
      'Accelerate development velocity without sacrificing quality',
      'Reduce technical debt and improve codebase health',
      'Implement AI/ML capabilities in products',
      'Attract and retain top engineering talent',
    ],
    painPoints: [
      'Developer time consumed by repetitive tasks',
      'Knowledge silos and onboarding friction',
      'Balancing innovation with maintenance',
      'Security and compliance requirements slowing delivery',
    ],
    successMetrics: [
      'Deployment frequency',
      'Mean time to recovery (MTTR)',
      'Code review turnaround',
      'Developer satisfaction scores',
    ],
    techProficiency: 'Expert',
    budgetTier: 'High',
    decisionAuthority: 'Budget Owner',
    aiUseCases: [
      'AI code generation and review',
      'Automated testing and QA',
      'Documentation generation',
      'Security vulnerability detection',
    ],
    relatedServices: ['web-development', 'ai-integration', 'security-consulting'],
    confidence: 'high',
  },
  {
    id: 'cs-lead',
    role: 'CS Lead',
    title: 'Customer Success Lead / VP Customer Experience',
    industry: ['SaaS', 'Technology', 'E-commerce', 'Financial Services'],
    companySize: '50-500 employees',
    goals: [
      'Reduce churn and increase net revenue retention',
      'Scale customer support without proportional headcount',
      'Proactively identify at-risk accounts',
      'Improve customer satisfaction and NPS',
    ],
    painPoints: [
      'Ticket volume exceeding team capacity',
      'Inconsistent support quality across channels',
      'Difficulty predicting churn before it happens',
      'Knowledge base maintenance overhead',
    ],
    successMetrics: [
      'Net Revenue Retention (NRR)',
      'Customer Satisfaction (CSAT)',
      'First response time',
      'Ticket resolution rate',
    ],
    techProficiency: 'Medium',
    budgetTier: 'Medium',
    decisionAuthority: 'Decision Maker',
    aiUseCases: [
      'AI-powered ticket routing and response',
      'Churn prediction and health scoring',
      'Self-service knowledge base automation',
      'Sentiment analysis across touchpoints',
    ],
    relatedServices: ['ai-integration', 'process-automation', 'crm-implementation'],
    confidence: 'high',
  },
];

export const intServices: IntService[] = [
  {
    slug: 'brand-strategy',
    name: 'Brand Strategy',
    shortDescription: 'Develop brand identity that tells your story and resonates with your audience.',
    industriesImplied: ['SaaS', 'Professional Services', 'Retail', 'Technology'],
    rolesImplied: ['CMO', 'Founder', 'Marketing Director'],
    painPoints: [
      'Inconsistent brand messaging across channels',
      'Difficulty differentiating from competitors',
      'Brand not resonating with target audience',
    ],
    valueProps: [
      'Unified brand voice and visual identity',
      'Competitive differentiation strategy',
      'Brand guidelines for consistent execution',
    ],
    deliverables: [
      'Brand positioning statement',
      'Visual identity system',
      'Brand guidelines document',
      'Messaging framework',
    ],
    confidence: 'high',
  },
  {
    slug: 'ux-ui-design',
    name: 'UX/UI Design',
    shortDescription: 'Create intuitive, beautiful interfaces that users love.',
    industriesImplied: ['SaaS', 'Technology', 'E-commerce', 'Fintech'],
    rolesImplied: ['Product Manager', 'CTO', 'Founder'],
    painPoints: [
      'Poor user adoption due to confusing interfaces',
      'High customer support volume from UX issues',
      'Conversion bottlenecks in user flows',
    ],
    valueProps: [
      'User-centered design process',
      'Improved conversion rates',
      'Reduced support burden',
    ],
    deliverables: [
      'User research insights',
      'Wireframes and prototypes',
      'Design system components',
      'Usability testing reports',
    ],
    confidence: 'high',
  },
  {
    slug: 'growth-engineering',
    name: 'Growth Engineering',
    shortDescription: 'Build and optimize systems for sustainable growth.',
    industriesImplied: ['SaaS', 'Technology', 'E-commerce'],
    rolesImplied: ['Founder', 'CTO', 'VP Sales', 'CMO'],
    painPoints: [
      'Slow time-to-market for growth experiments',
      'Lack of data infrastructure for optimization',
      'Manual processes limiting scale',
    ],
    valueProps: [
      'Rapid experimentation capability',
      'Data-driven decision making',
      'Automated growth loops',
    ],
    deliverables: [
      'Growth strategy roadmap',
      'A/B testing infrastructure',
      'Analytics implementation',
      'Automation workflows',
    ],
    confidence: 'high',
  },
  {
    slug: 'ai-integration',
    name: 'AI Integration',
    shortDescription: 'Implement AI solutions that drive real business outcomes.',
    industriesImplied: ['SaaS', 'Technology', 'Healthcare', 'Financial Services'],
    rolesImplied: ['CTO', 'Ops Lead', 'Product Manager', 'Founder'],
    painPoints: [
      'Uncertainty about AI ROI and use cases',
      'Integration complexity with existing systems',
      'Lack of internal AI expertise',
    ],
    valueProps: [
      'Proven AI implementation methodology',
      'Vendor-agnostic platform selection',
      'Measurable ROI from AI initiatives',
    ],
    deliverables: [
      'AI readiness assessment',
      'Platform recommendation report',
      'Integration implementation',
      'Team training and enablement',
    ],
    confidence: 'high',
  },
];

export const caseStudies: CaseStudy[] = [
  {
    id: 'northwind-saas',
    title: 'Northwind SaaS Growth',
    clientName: 'Northwind Technologies',
    industry: 'B2B SaaS',
    problem: 'Customer churn rate of 8.2% was eroding growth gains. Support team overwhelmed with repetitive inquiries.',
    solution: 'Implemented AI-powered customer health scoring with proactive outreach automation. Deployed conversational AI for tier-1 support.',
    outcome: 'Reduced churn by 2.9 percentage points within 6 months. Support team handles 40% more tickets with same headcount.',
    metrics: [
      { name: 'Churn Reduction', value: '-2.9%' },
      { name: 'Support Capacity', value: '+40%' },
      { name: 'NPS Improvement', value: '+15 pts' },
    ],
    rolesMentioned: ['CS Lead', 'CTO', 'Ops Lead'],
    servicesUsed: ['ai-integration', 'process-automation'],
    confidence: 'high',
  },
  {
    id: 'contoso-retail',
    title: 'Contoso Retail Conversion',
    clientName: 'Contoso Retail Group',
    industry: 'E-commerce',
    problem: 'Conversion rate stalled at 1.8%. Product catalog of 50,000 SKUs with inconsistent descriptions hurting SEO.',
    solution: 'Deployed AI product description generator with SEO optimization. Implemented visual search and personalized recommendations.',
    outcome: 'Conversion rate increased to 2.1% (+18% improvement). Organic traffic up 35% within 4 months.',
    metrics: [
      { name: 'CVR Lift', value: '+18%' },
      { name: 'Organic Traffic', value: '+35%' },
      { name: 'Descriptions Updated', value: '50K' },
    ],
    rolesMentioned: ['Ecommerce Manager', 'CMO', 'Product Manager'],
    servicesUsed: ['content-strategy', 'ai-integration', 'web-development'],
    confidence: 'high',
  },
  {
    id: 'fabrikam-fintech',
    title: 'Fabrikam Fintech Rebrand',
    clientName: 'Fabrikam Financial',
    industry: 'Fintech',
    problem: 'Outdated brand identity limiting enterprise sales. Sales cycle averaging 9 months with low win rate.',
    solution: 'Complete brand repositioning with AI-powered sales enablement. Implemented conversation intelligence for coaching.',
    outcome: 'Sales pipeline doubled within 90 days. Average deal size increased 25%.',
    metrics: [
      { name: 'Pipeline Growth', value: '2x' },
      { name: 'Deal Size', value: '+25%' },
      { name: 'Sales Cycle', value: '-22%' },
    ],
    rolesMentioned: ['VP Sales', 'CMO', 'Founder'],
    servicesUsed: ['brand-strategy', 'ai-integration', 'managed-marketing'],
    confidence: 'high',
  },
];

/**
 * Generate AI tool recommendations for a client persona
 * Maps persona characteristics to relevant platforms from all 50 in the catalog
 */
export function getAIToolRecommendations(personaId: string): AIToolRecommendation[] {
  const recommendations: Record<string, AIToolRecommendation[]> = {
    'cmo': [
      { platformId: 'jasper', platformName: 'Jasper', ecosystem: 'independent', relevanceScore: 95, useCases: ['Marketing content generation', 'Brand voice consistency'], rationale: 'Purpose-built for marketing teams with brand voice training' },
      { platformId: 'claude-3-5-sonnet', platformName: 'Claude 3.5 Sonnet', ecosystem: 'anthropic', relevanceScore: 92, useCases: ['Strategy documents', 'Campaign analysis'], rationale: 'Superior reasoning for complex marketing strategy' },
      { platformId: 'perplexity-pro', platformName: 'Perplexity Pro', ecosystem: 'independent', relevanceScore: 88, useCases: ['Competitive research', 'Market intelligence'], rationale: 'Real-time web search with citations for credible research' },
      { platformId: 'microsoft-copilot-365', platformName: 'Microsoft 365 Copilot', ecosystem: 'microsoft', relevanceScore: 85, useCases: ['Presentations', 'Email drafting'], rationale: 'Deep integration with existing Office workflows' },
      { platformId: 'midjourney', platformName: 'Midjourney', ecosystem: 'independent', relevanceScore: 82, useCases: ['Campaign visuals', 'Social media assets'], rationale: 'Highest quality image generation for brand content' },
      { platformId: 'notion-ai', platformName: 'Notion AI', ecosystem: 'independent', relevanceScore: 78, useCases: ['Marketing docs', 'Team collaboration'], rationale: 'Integrated writing assistant for marketing documentation' },
    ],
    'ops-lead': [
      { platformId: 'zapier-ai', platformName: 'Zapier Central', ecosystem: 'automation', relevanceScore: 95, useCases: ['Workflow automation', 'Cross-app integrations'], rationale: 'No-code automation accessible to operations teams' },
      { platformId: 'n8n', platformName: 'n8n', ecosystem: 'automation', relevanceScore: 90, useCases: ['Complex workflows', 'Self-hosted automation'], rationale: 'Self-hosted option for compliance-sensitive operations' },
      { platformId: 'microsoft-copilot-365', platformName: 'Microsoft 365 Copilot', ecosystem: 'microsoft', relevanceScore: 88, useCases: ['Process documentation', 'Data analysis'], rationale: 'Excel and SharePoint integration for operational data' },
      { platformId: 'claude-3-5-sonnet', platformName: 'Claude 3.5 Sonnet', ecosystem: 'anthropic', relevanceScore: 85, useCases: ['SOP generation', 'Process documentation'], rationale: 'Excellent at creating structured operational documents' },
      { platformId: 'make-ai', platformName: 'Make', ecosystem: 'automation', relevanceScore: 82, useCases: ['Visual workflows', 'API integrations'], rationale: 'Visual workflow builder for complex operational processes' },
      { platformId: 'notion-ai', platformName: 'Notion AI', ecosystem: 'independent', relevanceScore: 78, useCases: ['Knowledge base', 'Team wiki'], rationale: 'Central knowledge repository for operational procedures' },
    ],
    'founder': [
      { platformId: 'claude-3-5-sonnet', platformName: 'Claude 3.5 Sonnet', ecosystem: 'anthropic', relevanceScore: 95, useCases: ['Strategy', 'Coding', 'Analysis'], rationale: 'Best all-around capability for founders wearing multiple hats' },
      { platformId: 'cursor', platformName: 'Cursor', ecosystem: 'independent', relevanceScore: 92, useCases: ['Rapid prototyping', 'Code development'], rationale: 'Accelerates development for technical founders' },
      { platformId: 'perplexity-pro', platformName: 'Perplexity Pro', ecosystem: 'independent', relevanceScore: 88, useCases: ['Market research', 'Competitor analysis'], rationale: 'Fast research with reliable sources for decision-making' },
      { platformId: 'gpt-4o', platformName: 'GPT-4o', ecosystem: 'openai', relevanceScore: 85, useCases: ['Multimodal tasks', 'General assistance'], rationale: 'Most versatile for varied founder responsibilities' },
      { platformId: 'zapier-ai', platformName: 'Zapier Central', ecosystem: 'automation', relevanceScore: 82, useCases: ['Tool integration', 'Workflow automation'], rationale: 'Connects startup tools without engineering resources' },
      { platformId: 'chatgpt-plus', platformName: 'ChatGPT Plus', ecosystem: 'openai', relevanceScore: 78, useCases: ['General tasks', 'Brainstorming'], rationale: 'Low cost entry point with broad capabilities' },
    ],
    'product-manager': [
      { platformId: 'claude-3-5-sonnet', platformName: 'Claude 3.5 Sonnet', ecosystem: 'anthropic', relevanceScore: 95, useCases: ['PRD writing', 'User story generation'], rationale: 'Superior at structured product documentation' },
      { platformId: 'perplexity-pro', platformName: 'Perplexity Pro', ecosystem: 'independent', relevanceScore: 90, useCases: ['Competitive analysis', 'Feature research'], rationale: 'Research competitors and market trends with citations' },
      { platformId: 'notion-ai', platformName: 'Notion AI', ecosystem: 'independent', relevanceScore: 88, useCases: ['Product docs', 'Team collaboration'], rationale: 'Native integration with common PM workflow tools' },
      { platformId: 'gpt-4o', platformName: 'GPT-4o', ecosystem: 'openai', relevanceScore: 85, useCases: ['User feedback analysis', 'Prototyping ideas'], rationale: 'Multimodal capability for analyzing product data' },
      { platformId: 'github-copilot', platformName: 'GitHub Copilot', ecosystem: 'microsoft', relevanceScore: 80, useCases: ['Understanding code', 'Technical specs'], rationale: 'Helps bridge gap between PM and engineering' },
      { platformId: 'cursor', platformName: 'Cursor', ecosystem: 'independent', relevanceScore: 75, useCases: ['Prototype building', 'Code review'], rationale: 'Enables PMs to build quick prototypes' },
    ],
    'ecommerce-manager': [
      { platformId: 'jasper', platformName: 'Jasper', ecosystem: 'independent', relevanceScore: 95, useCases: ['Product descriptions', 'SEO content'], rationale: 'Templates specifically for e-commerce content' },
      { platformId: 'claude-3-5-sonnet', platformName: 'Claude 3.5 Sonnet', ecosystem: 'anthropic', relevanceScore: 90, useCases: ['Bulk descriptions', 'Catalog optimization'], rationale: 'Handles large-scale product content generation' },
      { platformId: 'midjourney', platformName: 'Midjourney', ecosystem: 'independent', relevanceScore: 88, useCases: ['Product imagery', 'Lifestyle photos'], rationale: 'High-quality visuals for product marketing' },
      { platformId: 'gpt-4o', platformName: 'GPT-4o', ecosystem: 'openai', relevanceScore: 85, useCases: ['Customer support', 'Product Q&A'], rationale: 'Powers chatbots for customer inquiries' },
      { platformId: 'zapier-ai', platformName: 'Zapier Central', ecosystem: 'automation', relevanceScore: 82, useCases: ['Order automation', 'Inventory sync'], rationale: 'Connects Shopify, fulfillment, and inventory systems' },
      { platformId: 'perplexity-pro', platformName: 'Perplexity Pro', ecosystem: 'independent', relevanceScore: 78, useCases: ['Market trends', 'Competitor pricing'], rationale: 'Research competitor strategies and market trends' },
    ],
    'vp-sales': [
      { platformId: 'gpt-4o', platformName: 'GPT-4o', ecosystem: 'openai', relevanceScore: 95, useCases: ['Email personalization', 'Call prep'], rationale: 'Most natural conversation and personalization' },
      { platformId: 'claude-3-5-sonnet', platformName: 'Claude 3.5 Sonnet', ecosystem: 'anthropic', relevanceScore: 92, useCases: ['Proposal writing', 'Deal analysis'], rationale: 'Superior for complex sales documents' },
      { platformId: 'microsoft-copilot-365', platformName: 'Microsoft 365 Copilot', ecosystem: 'microsoft', relevanceScore: 90, useCases: ['CRM integration', 'Email drafting'], rationale: 'Deep Dynamics 365 and Outlook integration' },
      { platformId: 'perplexity-pro', platformName: 'Perplexity Pro', ecosystem: 'independent', relevanceScore: 85, useCases: ['Prospect research', 'Industry intel'], rationale: 'Real-time research on prospects and industries' },
      { platformId: 'elevenlabs', platformName: 'ElevenLabs', ecosystem: 'independent', relevanceScore: 78, useCases: ['Video messages', 'Training content'], rationale: 'Personalized video sales outreach at scale' },
      { platformId: 'zapier-ai', platformName: 'Zapier Central', ecosystem: 'automation', relevanceScore: 75, useCases: ['CRM automation', 'Lead enrichment'], rationale: 'Automates data entry and lead workflows' },
    ],
    'cto': [
      { platformId: 'github-copilot', platformName: 'GitHub Copilot', ecosystem: 'microsoft', relevanceScore: 98, useCases: ['Code completion', 'Code review'], rationale: 'Essential developer productivity tool' },
      { platformId: 'cursor', platformName: 'Cursor', ecosystem: 'independent', relevanceScore: 95, useCases: ['AI-native development', 'Codebase chat'], rationale: 'Most advanced AI code editor available' },
      { platformId: 'claude-3-5-sonnet', platformName: 'Claude 3.5 Sonnet', ecosystem: 'anthropic', relevanceScore: 92, useCases: ['Architecture design', 'Technical docs'], rationale: 'Best-in-class code generation and reasoning' },
      { platformId: 'langchain', platformName: 'LangChain', ecosystem: 'langchain', relevanceScore: 88, useCases: ['AI application building', 'Agent development'], rationale: 'Framework for building AI-native features' },
      { platformId: 'aws-bedrock', platformName: 'AWS Bedrock', ecosystem: 'independent', relevanceScore: 85, useCases: ['Enterprise AI infrastructure', 'Model selection'], rationale: 'Multi-model access within AWS ecosystem' },
      { platformId: 'huggingface', platformName: 'Hugging Face', ecosystem: 'open-source', relevanceScore: 82, useCases: ['Model experimentation', 'Fine-tuning'], rationale: 'Access to latest models and community resources' },
    ],
    'cs-lead': [
      { platformId: 'gpt-4o', platformName: 'GPT-4o', ecosystem: 'openai', relevanceScore: 95, useCases: ['Support chatbot', 'Ticket responses'], rationale: 'Most natural customer conversations' },
      { platformId: 'claude-3-5-sonnet', platformName: 'Claude 3.5 Sonnet', ecosystem: 'anthropic', relevanceScore: 92, useCases: ['Complex ticket resolution', 'Documentation'], rationale: 'Better at nuanced customer issues' },
      { platformId: 'zapier-ai', platformName: 'Zapier Central', ecosystem: 'automation', relevanceScore: 88, useCases: ['Ticket routing', 'CRM updates'], rationale: 'Automates support workflows across tools' },
      { platformId: 'notion-ai', platformName: 'Notion AI', ecosystem: 'independent', relevanceScore: 85, useCases: ['Knowledge base', 'Team docs'], rationale: 'Self-updating internal knowledge repository' },
      { platformId: 'cohere-command-r-plus', platformName: 'Cohere Command R+', ecosystem: 'independent', relevanceScore: 82, useCases: ['RAG implementation', 'Knowledge search'], rationale: 'Enterprise-grade RAG for support knowledge' },
      { platformId: 'microsoft-copilot-365', platformName: 'Microsoft 365 Copilot', ecosystem: 'microsoft', relevanceScore: 78, useCases: ['Email responses', 'Meeting summaries'], rationale: 'Integrated workflow for CS communications' },
    ],
  };

  return recommendations[personaId] || [];
}

/**
 * Get related services for a client persona
 */
export function getRelatedServices(personaId: string): IntService[] {
  const persona = clientPersonas.find(p => p.id === personaId);
  if (!persona) return [];
  return intServices.filter(s => persona.relatedServices.includes(s.slug));
}

/**
 * Get case studies relevant to a client persona
 */
export function getRelatedCaseStudies(personaId: string): CaseStudy[] {
  const persona = clientPersonas.find(p => p.id === personaId);
  if (!persona) return [];
  return caseStudies.filter(cs => cs.rolesMentioned.includes(persona.role));
}
