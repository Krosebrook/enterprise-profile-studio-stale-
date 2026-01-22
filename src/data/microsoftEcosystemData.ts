/**
 * Microsoft Ecosystem Deep Dive Data
 * 10 Microsoft AI products with detailed specifications
 */

export interface MicrosoftProduct {
  id: string;
  name: string;
  category: 'Agent Platform' | 'Low-Code' | 'Enterprise AI' | 'Data Platform' | 'Developer';
  description: string;
  keyFeatures: string[];
  aiCapabilities: string[];
  pricing: {
    model: string;
    tiers: { name: string; price: string; includes: string[] }[];
  };
  integrations: string[];
  targetUsers: string[];
  mcpSupport: boolean;
  agentTypes?: string[];
  connectorCount?: number;
  compliance: string[];
  releaseWave?: string;
  strengths: string[];
  limitations: string[];
  intRecommendation: string;
}

export interface MicrosoftLicenseOption {
  id: string;
  name: string;
  price: string;
  billingCycle: 'monthly' | 'annual';
  perUser: boolean;
  includes: string[];
  addOns?: { name: string; price: string }[];
}

export interface ProductRelationship {
  source: string;
  target: string;
  relationshipType: 'integrates' | 'extends' | 'powers' | 'manages';
  description: string;
}

export const microsoftProducts: MicrosoftProduct[] = [
  {
    id: 'copilot-studio',
    name: 'Microsoft Copilot Studio',
    category: 'Agent Platform',
    description: 'Low-code platform for building custom AI agents and extending Microsoft 365 Copilot with conversational experiences and automated workflows.',
    keyFeatures: [
      'Visual agent builder with drag-and-drop interface',
      'Topic-based conversation design',
      'Plugin and connector framework',
      'Multi-channel deployment (Teams, web, mobile)',
      'Generative AI orchestration',
      'Analytics and performance monitoring',
    ],
    aiCapabilities: [
      'GPT-4 powered responses',
      'Knowledge grounding from SharePoint/Dataverse',
      'Intent recognition and entity extraction',
      'Generative answers from documents',
      'Multi-turn conversation handling',
    ],
    pricing: {
      model: 'Capacity-based messages',
      tiers: [
        { name: 'Standard', price: '$200/tenant/month', includes: ['25,000 messages', 'Unlimited agents', 'Standard connectors'] },
        { name: 'Enterprise', price: 'Custom', includes: ['Unlimited messages', 'Premium connectors', 'Dedicated support'] },
      ],
    },
    integrations: ['Microsoft 365', 'Dynamics 365', 'Power Platform', 'Azure', 'SharePoint', 'Teams'],
    targetUsers: ['Citizen developers', 'IT admins', 'Business analysts', 'Customer service managers'],
    mcpSupport: true,
    agentTypes: ['Customer service', 'HR assistant', 'IT helpdesk', 'Sales enablement'],
    connectorCount: 1400,
    compliance: ['SOC2', 'HIPAA', 'GDPR', 'FedRAMP'],
    releaseWave: '2025 Wave 1',
    strengths: [
      'Deep Microsoft 365 integration',
      'No-code agent creation',
      'Enterprise security built-in',
      'Rapid deployment to Teams',
    ],
    limitations: [
      'Requires Power Platform licensing',
      'Limited customization for complex scenarios',
      'Message-based pricing can scale quickly',
    ],
    intRecommendation: 'Ideal for organizations already invested in Microsoft 365 looking to automate customer service or internal IT support. Start with HR FAQ or IT helpdesk use cases.',
  },
  {
    id: 'power-automate',
    name: 'Power Automate',
    category: 'Low-Code',
    description: 'Cloud-based workflow automation platform with AI Builder integration for intelligent document processing and decision automation.',
    keyFeatures: [
      'Cloud flows with 1000+ connectors',
      'Desktop flows for RPA',
      'Process mining and task mining',
      'Approval workflows',
      'AI Builder integration',
      'Copilot for flow creation',
    ],
    aiCapabilities: [
      'AI-assisted flow creation with Copilot',
      'Document processing (invoices, receipts, forms)',
      'Sentiment analysis in flows',
      'Object detection in images',
      'Text recognition (OCR)',
      'Prediction models',
    ],
    pricing: {
      model: 'Per user or per flow',
      tiers: [
        { name: 'Premium', price: '$15/user/month', includes: ['Unlimited cloud flows', 'Premium connectors', 'AI Builder credits'] },
        { name: 'Per Flow', price: '$100/flow/month', includes: ['5 users per flow', 'Premium connectors', 'Unlimited runs'] },
        { name: 'Process', price: '$150/user/month', includes: ['All Premium features', 'Process mining', 'Attended RPA'] },
      ],
    },
    integrations: ['Office 365', 'Dynamics 365', 'SharePoint', 'Azure', 'SAP', 'Salesforce', 'ServiceNow'],
    targetUsers: ['Business analysts', 'IT professionals', 'Process owners', 'Operations teams'],
    mcpSupport: false,
    connectorCount: 1000,
    compliance: ['SOC2', 'HIPAA', 'GDPR', 'FedRAMP', 'ISO 27001'],
    releaseWave: '2025 Wave 1',
    strengths: [
      'Extensive connector library',
      'RPA capabilities for legacy systems',
      'Process mining for discovery',
      'Low learning curve for basic flows',
    ],
    limitations: [
      'Complex error handling requires expertise',
      'Per-flow pricing can be expensive at scale',
      'Desktop flows require additional setup',
    ],
    intRecommendation: 'Best for automating approval workflows, document processing, and connecting Microsoft ecosystem to external tools. Combine with AI Builder for intelligent document automation.',
  },
  {
    id: 'power-apps',
    name: 'Power Apps',
    category: 'Low-Code',
    description: 'Low-code application development platform for building custom business apps with AI-powered features and Copilot assistance.',
    keyFeatures: [
      'Canvas apps with pixel-perfect control',
      'Model-driven apps from Dataverse',
      'Copilot for app generation',
      'Component library and templates',
      'Offline capabilities',
      'Integration with Power Platform',
    ],
    aiCapabilities: [
      'Copilot generates apps from description',
      'AI Builder components in apps',
      'GPT integration for in-app AI',
      'Smart data suggestions',
      'Natural language to formula conversion',
    ],
    pricing: {
      model: 'Per user or per app',
      tiers: [
        { name: 'Premium', price: '$20/user/month', includes: ['Unlimited apps', 'Dataverse access', 'Premium connectors'] },
        { name: 'Per App', price: '$5/user/app/month', includes: ['Single app access', 'Dataverse access', 'Standard connectors'] },
      ],
    },
    integrations: ['Dataverse', 'SharePoint', 'SQL Server', 'Azure', 'Dynamics 365'],
    targetUsers: ['Citizen developers', 'Business analysts', 'IT professionals', 'Department heads'],
    mcpSupport: false,
    connectorCount: 900,
    compliance: ['SOC2', 'HIPAA', 'GDPR', 'FedRAMP'],
    releaseWave: '2025 Wave 1',
    strengths: [
      'Rapid app development',
      'Deep Dataverse integration',
      'Copilot accelerates development',
      'Mobile-ready apps',
    ],
    limitations: [
      'Complex apps require pro developer skills',
      'Performance can degrade with complex logic',
      'Canvas apps require careful UX design',
    ],
    intRecommendation: 'Excellent for departmental apps, data collection, and extending Dynamics 365. Use Copilot to generate initial app structure, then customize.',
  },
  {
    id: 'power-pages',
    name: 'Power Pages',
    category: 'Low-Code',
    description: 'Low-code platform for building secure, data-driven external-facing websites with Copilot-assisted design.',
    keyFeatures: [
      'Visual page designer with templates',
      'Dataverse integration for dynamic content',
      'Authentication and security controls',
      'Copilot for content and styling',
      'Progressive web app capabilities',
      'Multi-language support',
    ],
    aiCapabilities: [
      'Copilot generates page layouts',
      'AI-assisted content writing',
      'Smart form creation',
      'Accessibility suggestions',
    ],
    pricing: {
      model: 'Capacity-based',
      tiers: [
        { name: 'Authenticated', price: '$200/site/month', includes: ['100 authenticated users', 'Custom domain', 'SSL'] },
        { name: 'Anonymous', price: '$75/site/month', includes: ['500,000 anonymous users', 'Custom domain', 'SSL'] },
      ],
    },
    integrations: ['Dataverse', 'Power Platform', 'Azure AD', 'SharePoint'],
    targetUsers: ['Web developers', 'Marketing teams', 'IT professionals'],
    mcpSupport: false,
    compliance: ['SOC2', 'GDPR'],
    strengths: [
      'Enterprise security for external sites',
      'Dataverse data on the web',
      'Copilot speeds up design',
    ],
    limitations: [
      'Limited design flexibility vs. custom web dev',
      'Pricing per site can add up',
      'Learning curve for non-web developers',
    ],
    intRecommendation: 'Good for customer portals, partner extranets, and event registration sites. Not recommended for complex marketing sites.',
  },
  {
    id: 'power-bi',
    name: 'Power BI',
    category: 'Low-Code',
    description: 'Business intelligence platform with AI-powered insights, natural language Q&A, and Copilot for report generation.',
    keyFeatures: [
      'Interactive dashboards and reports',
      'Natural language Q&A',
      'Copilot for report creation',
      'AI visuals and smart narratives',
      'Real-time streaming',
      'Embedded analytics',
    ],
    aiCapabilities: [
      'Copilot generates reports from prompts',
      'Quick Insights discovery',
      'Anomaly detection',
      'Q&A natural language queries',
      'Smart narratives auto-summary',
      'Key influencers analysis',
    ],
    pricing: {
      model: 'Per user',
      tiers: [
        { name: 'Pro', price: '$10/user/month', includes: ['Full authoring', 'Sharing', 'Standard capacity'] },
        { name: 'Premium Per User', price: '$20/user/month', includes: ['AI features', 'Larger datasets', 'Paginated reports'] },
        { name: 'Premium Capacity', price: '$4,995/month', includes: ['Dedicated capacity', 'Unlimited viewers', 'Advanced AI'] },
      ],
    },
    integrations: ['Excel', 'Azure', 'Dynamics 365', 'SharePoint', 'SQL Server', 'Dataverse'],
    targetUsers: ['Business analysts', 'Data analysts', 'Executives', 'IT professionals'],
    mcpSupport: false,
    compliance: ['SOC2', 'HIPAA', 'GDPR', 'FedRAMP', 'ISO 27001'],
    strengths: [
      'Industry-leading visualization',
      'Deep Microsoft integration',
      'Copilot for non-technical users',
      'Extensive community and templates',
    ],
    limitations: [
      'Complex DAX learning curve',
      'Premium features require upgrade',
      'Large models need Premium capacity',
    ],
    intRecommendation: 'Essential for any Microsoft shop. Copilot makes it accessible to business users who previously needed analyst support.',
  },
  {
    id: 'dataverse',
    name: 'Microsoft Dataverse',
    category: 'Data Platform',
    description: 'Secure, scalable data platform underlying Power Platform and Dynamics 365, with AI-ready data infrastructure.',
    keyFeatures: [
      'Relational data storage',
      'Business logic and workflows',
      'Security roles and row-level security',
      'Virtual tables and data connectors',
      'AI Builder integration',
      'Audit logging and versioning',
    ],
    aiCapabilities: [
      'AI Builder models on Dataverse data',
      'Copilot knowledge grounding source',
      'Semantic search capabilities',
      'Vector embedding storage (preview)',
    ],
    pricing: {
      model: 'Capacity-based',
      tiers: [
        { name: 'Included', price: 'Included with Power Apps/Dynamics', includes: ['Per-app capacity', 'Standard features'] },
        { name: 'Additional Capacity', price: '$40/GB/month', includes: ['Additional database storage', 'File storage'] },
      ],
    },
    integrations: ['Power Platform', 'Dynamics 365', 'Azure Synapse', 'Azure Data Lake'],
    targetUsers: ['IT admins', 'Data architects', 'Developers'],
    mcpSupport: true,
    compliance: ['SOC2', 'HIPAA', 'GDPR', 'FedRAMP', 'ISO 27001'],
    strengths: [
      'Enterprise-grade security',
      'Unified data model',
      'Foundation for AI features',
      'Automatic APIs',
    ],
    limitations: [
      'Capacity costs can grow quickly',
      'Complex for simple use cases',
      'Requires platform knowledge',
    ],
    intRecommendation: 'The backbone of Microsoft business apps. Essential for Copilot Studio agents and Power Platform apps. Plan capacity carefully.',
  },
  {
    id: 'ai-builder',
    name: 'AI Builder',
    category: 'Enterprise AI',
    description: 'No-code AI capability for Power Platform, enabling document processing, prediction, and custom models.',
    keyFeatures: [
      'Pre-built AI models',
      'Custom model training',
      'Document processing automation',
      'Object detection in images',
      'Text classification',
      'Integration with Power Apps/Automate',
    ],
    aiCapabilities: [
      'Invoice processing',
      'Receipt scanning',
      'Form processing',
      'Business card reader',
      'Sentiment analysis',
      'Entity extraction',
      'Custom predictions',
    ],
    pricing: {
      model: 'Credit-based',
      tiers: [
        { name: 'Included', price: 'Included with Power Apps Premium', includes: ['Limited AI credits', 'Pre-built models'] },
        { name: 'Add-on', price: '$500/month', includes: ['1M AI credits', 'Custom models', 'Priority processing'] },
      ],
    },
    integrations: ['Power Apps', 'Power Automate', 'Dataverse'],
    targetUsers: ['Citizen developers', 'Business analysts', 'Process owners'],
    mcpSupport: false,
    compliance: ['SOC2', 'GDPR'],
    strengths: [
      'No ML expertise required',
      'Pre-trained document models',
      'Seamless Power Platform integration',
    ],
    limitations: [
      'Credit consumption can be unpredictable',
      'Custom models require training data',
      'Limited to Power Platform use',
    ],
    intRecommendation: 'Start with pre-built models for invoices and receipts. Build custom models when you have 50+ training examples.',
  },
  {
    id: 'azure-ai-foundry',
    name: 'Azure AI Foundry',
    category: 'Developer',
    description: 'Unified platform for building, customizing, and deploying enterprise AI solutions with Azure OpenAI Service.',
    keyFeatures: [
      'Model catalog (OpenAI, Meta, Mistral)',
      'Fine-tuning and customization',
      'Prompt flow orchestration',
      'Content safety and guardrails',
      'Enterprise deployment options',
      'Responsible AI tooling',
    ],
    aiCapabilities: [
      'GPT-4 Turbo and GPT-4o',
      'DALL-E 3 image generation',
      'Whisper speech recognition',
      'Text embeddings',
      'Model fine-tuning',
      'RAG implementation',
    ],
    pricing: {
      model: 'Pay-as-you-go tokens',
      tiers: [
        { name: 'Standard', price: 'Per 1K tokens', includes: ['API access', 'Shared capacity'] },
        { name: 'Provisioned', price: 'Reserved capacity', includes: ['Guaranteed throughput', 'Lower latency'] },
      ],
    },
    integrations: ['Azure services', 'Power Platform', 'Microsoft 365', 'GitHub'],
    targetUsers: ['AI engineers', 'Developers', 'Data scientists'],
    mcpSupport: true,
    compliance: ['SOC2', 'HIPAA', 'GDPR', 'FedRAMP', 'ISO 27001'],
    strengths: [
      'Access to latest models',
      'Enterprise security and compliance',
      'Fine-tuning capabilities',
      'Integration with Azure ecosystem',
    ],
    limitations: [
      'Requires Azure subscription',
      'Complex pricing model',
      'Developer expertise required',
    ],
    intRecommendation: 'For custom AI applications requiring enterprise security. Use for RAG implementations and fine-tuned models. Pair with Copilot Studio for end-user access.',
  },
  {
    id: 'agent-365',
    name: 'Microsoft 365 Copilot (Agents)',
    category: 'Agent Platform',
    description: 'Enterprise AI assistant deeply integrated with Microsoft 365 apps, extensible with custom agents and plugins.',
    keyFeatures: [
      'Cross-app AI assistant',
      'Graph-grounded responses',
      'Meeting summaries and action items',
      'Email drafting and summarization',
      'Document generation',
      'Agent extensibility',
    ],
    aiCapabilities: [
      'GPT-4 Turbo reasoning',
      'Microsoft Graph context',
      'Multi-turn conversations',
      'Plugin orchestration',
      'Knowledge grounding',
      'Action execution',
    ],
    pricing: {
      model: 'Per user',
      tiers: [
        { name: 'Microsoft 365 Copilot', price: '$30/user/month', includes: ['All M365 apps', 'Graph grounding', 'Basic agents'] },
      ],
    },
    integrations: ['Outlook', 'Teams', 'Word', 'Excel', 'PowerPoint', 'SharePoint', 'OneDrive'],
    targetUsers: ['Knowledge workers', 'Executives', 'Sales teams', 'All Microsoft 365 users'],
    mcpSupport: true,
    agentTypes: ['Sales agent', 'HR agent', 'IT support', 'Project manager'],
    compliance: ['SOC2', 'HIPAA', 'GDPR', 'FedRAMP', 'ISO 27001'],
    releaseWave: '2025 Wave 1',
    strengths: [
      'Native Microsoft 365 integration',
      'Graph-grounded accuracy',
      'Meeting intelligence',
      'Enterprise security',
    ],
    limitations: [
      'Requires Microsoft 365 E3/E5',
      'Additional $30/user cost',
      'Adoption requires change management',
    ],
    intRecommendation: 'The cornerstone of Microsoft AI strategy. Deploy to executives and high-value users first. Measure time savings to build ROI case for broader rollout.',
  },
  {
    id: 'frontier-program',
    name: 'Frontier Firm Program',
    category: 'Enterprise AI',
    description: 'Microsoft program for organizations achieving AI maturity across their operations with dedicated support and resources.',
    keyFeatures: [
      'AI maturity assessment',
      'Executive sponsorship',
      'Technical advisory services',
      'Early access to features',
      'Change management support',
      'Industry benchmarking',
    ],
    aiCapabilities: [
      'Organization-wide AI adoption',
      'Custom AI development',
      'AI governance frameworks',
      'Continuous improvement cycles',
    ],
    pricing: {
      model: 'Program-based',
      tiers: [
        { name: 'Frontier Firm', price: 'Enterprise agreement required', includes: ['Dedicated support', 'Early access', 'Advisory services'] },
      ],
    },
    integrations: ['All Microsoft platforms'],
    targetUsers: ['C-suite', 'IT leadership', 'Digital transformation leads'],
    mcpSupport: false,
    compliance: ['Enterprise-level'],
    strengths: [
      'Microsoft partnership and support',
      'Structured AI adoption framework',
      'Industry peer networking',
    ],
    limitations: [
      'Requires significant commitment',
      'Enterprise agreement mandatory',
      'Not suitable for SMBs',
    ],
    intRecommendation: 'For enterprise clients committed to AI-first transformation. INT Inc. can help prepare organizations for Frontier Firm qualification.',
  },
];

export const licensingOptions: MicrosoftLicenseOption[] = [
  {
    id: 'power-platform-premium',
    name: 'Power Platform Premium',
    price: '$20',
    billingCycle: 'monthly',
    perUser: true,
    includes: ['Power Apps Premium', 'Power Automate Premium', 'Dataverse access', 'AI Builder credits'],
    addOns: [
      { name: 'Additional AI Builder', price: '$500/month' },
      { name: 'Power Pages', price: '$200/site/month' },
    ],
  },
  {
    id: 'm365-copilot',
    name: 'Microsoft 365 Copilot',
    price: '$30',
    billingCycle: 'monthly',
    perUser: true,
    includes: ['Copilot in all M365 apps', 'Graph grounding', 'Meeting intelligence', 'Email assistance'],
  },
  {
    id: 'copilot-studio-standalone',
    name: 'Copilot Studio Standalone',
    price: '$200',
    billingCycle: 'monthly',
    perUser: false,
    includes: ['25,000 messages', 'Unlimited agents', 'Standard connectors'],
    addOns: [
      { name: 'Additional messages', price: '$100/25K messages' },
    ],
  },
  {
    id: 'power-bi-pro',
    name: 'Power BI Pro',
    price: '$10',
    billingCycle: 'monthly',
    perUser: true,
    includes: ['Full report authoring', 'Sharing and collaboration', 'Data refresh'],
  },
  {
    id: 'power-bi-premium-per-user',
    name: 'Power BI Premium Per User',
    price: '$20',
    billingCycle: 'monthly',
    perUser: true,
    includes: ['All Pro features', 'AI visuals', 'Paginated reports', 'Larger datasets'],
  },
  {
    id: 'azure-openai-payg',
    name: 'Azure OpenAI Pay-As-You-Go',
    price: 'Variable',
    billingCycle: 'monthly',
    perUser: false,
    includes: ['Token-based billing', 'Model access', 'API usage'],
  },
];

export const productRelationships: ProductRelationship[] = [
  { source: 'copilot-studio', target: 'dataverse', relationshipType: 'powers', description: 'Dataverse provides knowledge grounding for Copilot Studio agents' },
  { source: 'copilot-studio', target: 'power-automate', relationshipType: 'integrates', description: 'Agents can trigger Power Automate flows for actions' },
  { source: 'power-automate', target: 'ai-builder', relationshipType: 'extends', description: 'AI Builder adds intelligence to automation flows' },
  { source: 'power-apps', target: 'dataverse', relationshipType: 'powers', description: 'Dataverse is the primary data source for Power Apps' },
  { source: 'power-apps', target: 'ai-builder', relationshipType: 'extends', description: 'AI Builder components embedded in Power Apps' },
  { source: 'power-bi', target: 'dataverse', relationshipType: 'integrates', description: 'Power BI connects to Dataverse for reporting' },
  { source: 'agent-365', target: 'copilot-studio', relationshipType: 'extends', description: 'Copilot Studio creates custom agents for M365 Copilot' },
  { source: 'agent-365', target: 'azure-ai-foundry', relationshipType: 'powers', description: 'Azure AI Foundry models power M365 Copilot responses' },
  { source: 'azure-ai-foundry', target: 'copilot-studio', relationshipType: 'powers', description: 'Custom models from Foundry can be used in Copilot Studio' },
  { source: 'power-pages', target: 'dataverse', relationshipType: 'powers', description: 'Power Pages displays Dataverse data externally' },
];

export const frontierFirmStats = {
  productivityGain: '22%',
  adoptionRate: '78%',
  roiTimeline: '6-12 months',
  keyPillars: [
    { name: 'Leadership Commitment', description: 'Executive sponsorship and AI-first strategy' },
    { name: 'Change Management', description: 'Structured adoption and training programs' },
    { name: 'Technical Foundation', description: 'Modern data infrastructure and security' },
    { name: 'Use Case Portfolio', description: 'Identified and prioritized AI opportunities' },
    { name: 'Governance Framework', description: 'Responsible AI policies and monitoring' },
  ],
  readinessChecklist: [
    'Microsoft 365 E3/E5 deployment',
    'SharePoint content organized and tagged',
    'Power Platform governance established',
    'Data classification in place',
    'Executive AI champion identified',
    'Pilot user group selected',
    'Success metrics defined',
    'Change management plan created',
  ],
};

export const mcpCapabilities = {
  description: 'Model Context Protocol (MCP) enables AI assistants to connect with external data sources and tools securely.',
  supportedProducts: ['copilot-studio', 'agent-365', 'azure-ai-foundry', 'dataverse'],
  servers: [
    { name: 'SharePoint MCP Server', capability: 'Document access and search' },
    { name: 'Dataverse MCP Server', capability: 'Business data queries' },
    { name: 'Graph MCP Server', capability: 'User and organizational context' },
    { name: 'Azure Blob MCP Server', capability: 'File storage access' },
  ],
  benefits: [
    'Secure data access without data movement',
    'Real-time information retrieval',
    'Consistent context across AI tools',
    'Reduced hallucination through grounding',
  ],
};

export function getProductById(id: string): MicrosoftProduct | undefined {
  return microsoftProducts.find(p => p.id === id);
}

export function getProductsByCategory(category: MicrosoftProduct['category']): MicrosoftProduct[] {
  return microsoftProducts.filter(p => p.category === category);
}

export function getRelatedProducts(productId: string): { product: MicrosoftProduct; relationship: ProductRelationship }[] {
  const relationships = productRelationships.filter(
    r => r.source === productId || r.target === productId
  );
  
  return relationships.map(r => {
    const relatedId = r.source === productId ? r.target : r.source;
    const product = microsoftProducts.find(p => p.id === relatedId);
    return { product: product!, relationship: r };
  }).filter(r => r.product);
}
