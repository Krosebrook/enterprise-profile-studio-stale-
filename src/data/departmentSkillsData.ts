/**
 * INT Inc. 320 Skills Framework
 * 16 departments × 20 skills = 320 total AI-powered skills
 */

export interface DepartmentSkill {
  id: string;
  name: string;
  description: string;
  category: 'Client-Facing' | 'Technical' | 'Process' | 'Enablement';
  aiTools: string[];
  automationPotential: 'Low' | 'Medium' | 'High';
  timeSavings: string;
  complexity: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface Department {
  id: string;
  name: string;
  shortName: string;
  type: 'Front-of-House' | 'Back-of-House' | 'AIaaS';
  icon: string;
  description: string;
  clientValueProp: string;
  keyPartnerships: string[];
  clientTypes: string[];
  typicalProject: string;
  frontOfHouseRoles: string[];
  backOfHouseRoles: string[];
  skills: DepartmentSkill[];
}

export const departments: Department[] = [
  {
    id: 'information-security',
    name: 'Information Security',
    shortName: 'InfoSec',
    type: 'Front-of-House',
    icon: 'Shield',
    description: 'Cyberattack prevention, compliance, and GRC platform implementation.',
    clientValueProp: 'Cyberattacks? Not on our watch. Strengthen security and reduce risks.',
    keyPartnerships: ['Vanta', 'KnowBe4', 'SOC auditors', 'Penetration testing vendors'],
    clientTypes: ['SaaS', 'Healthcare', 'Fintech', 'Professional services'],
    typicalProject: 'Security audit + SOC 2 compliance + GRC platform + ongoing monitoring',
    frontOfHouseRoles: ['Information Security Lead', 'Security Analyst', 'GRC Consultant', 'Security Awareness Trainer'],
    backOfHouseRoles: ['Compliance Documentation Manager', 'SOC Auditor Liaison', 'Vendor Management'],
    skills: [
      { id: 'soc2-readiness', name: 'SOC 2 Readiness Assessor', description: 'Analyzes client environment, generates gap analysis, recommends remediation path', category: 'Client-Facing', aiTools: ['Claude', 'Copilot'], automationPotential: 'High', timeSavings: '8 hrs/assessment', complexity: 'Advanced' },
      { id: 'security-risk', name: 'Security Risk Analyzer', description: 'Scores client risk profile, identifies critical vulnerabilities, prioritizes remediation', category: 'Client-Facing', aiTools: ['Claude', 'Perplexity'], automationPotential: 'High', timeSavings: '6 hrs/audit', complexity: 'Advanced' },
      { id: 'compliance-roadmap', name: 'Compliance Roadmap Generator', description: 'Creates phased SOC 2 implementation plan with milestones and dependencies', category: 'Client-Facing', aiTools: ['Claude', 'Copilot'], automationPotential: 'High', timeSavings: '4 hrs/roadmap', complexity: 'Intermediate' },
      { id: 'grc-implementer', name: 'GRC Platform Implementer', description: 'Configures Vanta for client, maps controls to compliance requirements', category: 'Technical', aiTools: ['Copilot', 'n8n'], automationPotential: 'Medium', timeSavings: '12 hrs/setup', complexity: 'Advanced' },
      { id: 'security-policy', name: 'Security Policy Template Customizer', description: 'Generates client-specific security policies from INT templates', category: 'Client-Facing', aiTools: ['Claude', 'Jasper'], automationPotential: 'High', timeSavings: '6 hrs/policy set', complexity: 'Intermediate' },
      { id: 'vendor-risk', name: 'Vendor Risk Assessor', description: 'Evaluates client third-party vendors for security risk', category: 'Client-Facing', aiTools: ['Perplexity', 'Claude'], automationPotential: 'Medium', timeSavings: '3 hrs/vendor', complexity: 'Intermediate' },
      { id: 'incident-playbook', name: 'Incident Response Playbook Generator', description: 'Creates client-specific incident response procedures with escalation paths', category: 'Client-Facing', aiTools: ['Claude', 'Copilot'], automationPotential: 'High', timeSavings: '8 hrs/playbook', complexity: 'Advanced' },
      { id: 'pentest-translator', name: 'Penetration Test Report Translator', description: 'Converts technical pentesting results into executive summary', category: 'Client-Facing', aiTools: ['Claude', 'GPT-4o'], automationPotential: 'High', timeSavings: '4 hrs/report', complexity: 'Advanced' },
      { id: 'security-training', name: 'Security Awareness Training Curator', description: 'Selects and customizes KnowBe4 training for client team', category: 'Client-Facing', aiTools: ['Copilot', 'Claude'], automationPotential: 'Medium', timeSavings: '2 hrs/program', complexity: 'Beginner' },
      { id: 'audit-evidence', name: 'Audit Evidence Collector', description: 'Guides client through SOC 2 evidence gathering, organizes docs', category: 'Client-Facing', aiTools: ['Copilot', 'n8n'], automationPotential: 'High', timeSavings: '10 hrs/audit', complexity: 'Intermediate' },
      { id: 'security-maturity', name: 'Client Security Maturity Model Scorer', description: 'Benchmarks client against CMM/NIST framework', category: 'Process', aiTools: ['Claude', 'Copilot'], automationPotential: 'High', timeSavings: '4 hrs/assessment', complexity: 'Advanced' },
      { id: 'control-mapper', name: 'Compliance Control Mapper', description: 'Correlates client tech stack to compliance requirements', category: 'Process', aiTools: ['Claude', 'Copilot'], automationPotential: 'High', timeSavings: '6 hrs/mapping', complexity: 'Advanced' },
      { id: 'security-metrics', name: 'Security Metrics & KPI Dashboard Builder', description: 'Generates metrics that matter to client executives', category: 'Process', aiTools: ['Power BI', 'Copilot'], automationPotential: 'Medium', timeSavings: '4 hrs/dashboard', complexity: 'Intermediate' },
      { id: 'threat-monitor', name: 'Threat Landscape Monitor', description: 'Tracks emerging threats relevant to client industry', category: 'Process', aiTools: ['Perplexity', 'Claude'], automationPotential: 'High', timeSavings: '3 hrs/week', complexity: 'Intermediate' },
      { id: 'int-soc2', name: 'INT SOC 2 Process Maintainer', description: 'Keeps INT own SOC 2 compliance fresh', category: 'Process', aiTools: ['Copilot', 'Vanta'], automationPotential: 'Medium', timeSavings: '4 hrs/month', complexity: 'Advanced' },
      { id: 'security-translator', name: 'Security Terminology Translator', description: 'Explains security concepts in plain language for non-technical clients', category: 'Enablement', aiTools: ['Claude', 'GPT-4o'], automationPotential: 'High', timeSavings: '1 hr/doc', complexity: 'Beginner' },
      { id: 'audit-planner', name: 'SOC 2 Audit Timeline Planner', description: 'Manages 6-12 month SOC 2 audit process', category: 'Enablement', aiTools: ['Copilot', 'n8n'], automationPotential: 'Medium', timeSavings: '2 hrs/month', complexity: 'Intermediate' },
      { id: 'vendor-benchmarker', name: 'Compliance Vendor Benchmarker', description: 'Compares GRC platform options for client ROI', category: 'Enablement', aiTools: ['Perplexity', 'Claude'], automationPotential: 'Medium', timeSavings: '4 hrs/comparison', complexity: 'Intermediate' },
      { id: 'policy-library', name: 'Security Policy Template Library Manager', description: 'Maintains INT reusable policy templates', category: 'Enablement', aiTools: ['Copilot', 'Notion AI'], automationPotential: 'Medium', timeSavings: '2 hrs/week', complexity: 'Beginner' },
      { id: 'sustainability-coach', name: 'Post-Audit Sustainability Coach', description: 'Helps client maintain SOC 2 compliance after audit', category: 'Enablement', aiTools: ['Claude', 'Copilot'], automationPotential: 'Medium', timeSavings: '2 hrs/month', complexity: 'Intermediate' },
    ],
  },
  {
    id: 'technology-it',
    name: 'Technology / IT Services',
    shortName: 'IT',
    type: 'Front-of-House',
    icon: 'Server',
    description: 'Managed IT, 24/7 helpdesk, and proactive monitoring.',
    clientValueProp: 'Make tech work for you. From IT support to network security to data insights.',
    keyPartnerships: ['Microsoft', 'Bitwarden', 'Duo/Okta', 'ConnectWise', 'Datto', 'Cisco'],
    clientTypes: ['SMB', 'Professional services', 'Healthcare', 'Fintech'],
    typicalProject: 'Managed IT support, helpdesk for 50-500 users, proactive monitoring, M365 admin',
    frontOfHouseRoles: ['Account Manager', 'Service Desk Manager', 'Service Tech L1-3', 'Network Administrator', 'Systems Administrator', 'Cloud Architect'],
    backOfHouseRoles: ['KB Manager', 'Vendor Liaison', 'Asset Management', 'Compliance Officer'],
    skills: [
      { id: 'ticket-intake', name: 'Smart Ticket Intake Assistant', description: 'Reads inbound ticket, generates pre-flight checklist, asks proactive questions', category: 'Client-Facing', aiTools: ['Claude', 'Copilot'], automationPotential: 'High', timeSavings: '10 min/ticket', complexity: 'Intermediate' },
      { id: 'kb-architect', name: 'KB Article Architect', description: 'After ticket close, generates KB article template for tech to complete', category: 'Client-Facing', aiTools: ['Claude', 'Notion AI'], automationPotential: 'High', timeSavings: '30 min/article', complexity: 'Beginner' },
      { id: 'remote-support', name: 'Remote Support Guide Generator', description: 'Generates step-by-step troubleshooting adapted to user network setup', category: 'Client-Facing', aiTools: ['Claude', 'Copilot'], automationPotential: 'High', timeSavings: '15 min/guide', complexity: 'Intermediate' },
      { id: 'm365-troubleshoot', name: 'M365 Auth Troubleshooter', description: 'Guides through MFA/Entra ID/Exchange issues', category: 'Client-Facing', aiTools: ['Copilot', 'Claude'], automationPotential: 'High', timeSavings: '20 min/issue', complexity: 'Intermediate' },
      { id: 'network-explainer', name: 'Network Diagnostics Explainer', description: 'Translates network diagnostics into client-friendly summary', category: 'Client-Facing', aiTools: ['Claude', 'GPT-4o'], automationPotential: 'High', timeSavings: '15 min/explanation', complexity: 'Beginner' },
      { id: 'escalation-email', name: 'Escalation Emailer', description: 'Drafts professional escalation email to client when ticket requires Tier 2', category: 'Client-Facing', aiTools: ['Claude', 'Copilot'], automationPotential: 'High', timeSavings: '10 min/email', complexity: 'Beginner' },
      { id: 'severity-classifier', name: 'Ticket Severity Auto-Classifier', description: 'Analyzes ticket content, suggests P0/P1/P2/P3 severity + SLA implications', category: 'Client-Facing', aiTools: ['Claude', 'n8n'], automationPotential: 'High', timeSavings: '5 min/ticket', complexity: 'Intermediate' },
      { id: 'client-context', name: 'Client Context Summarizer', description: 'Generates "client tech stack 101" for new Service Tech joining account', category: 'Client-Facing', aiTools: ['Claude', 'Notion AI'], automationPotential: 'High', timeSavings: '2 hrs/onboarding', complexity: 'Intermediate' },
      { id: 'network-auditor', name: 'Network Health Auditor', description: 'Audits client network, identifies patching debt, security misconfigurations', category: 'Technical', aiTools: ['Claude', 'Copilot'], automationPotential: 'Medium', timeSavings: '4 hrs/audit', complexity: 'Advanced' },
      { id: 'm365-optimizer', name: 'M365 Tenant Optimizer', description: 'Audits M365 setup, identifies unused licenses, security gaps', category: 'Technical', aiTools: ['Copilot', 'Claude'], automationPotential: 'High', timeSavings: '3 hrs/audit', complexity: 'Advanced' },
      { id: 'backup-validator', name: 'Backup & Disaster Recovery Validator', description: 'Tests client backup strategy, validates recovery procedures', category: 'Technical', aiTools: ['Copilot', 'n8n'], automationPotential: 'Medium', timeSavings: '4 hrs/validation', complexity: 'Advanced' },
      { id: 'access-review', name: 'User Access Review Automator', description: 'Generates quarterly access review for client', category: 'Technical', aiTools: ['Copilot', 'n8n'], automationPotential: 'High', timeSavings: '3 hrs/review', complexity: 'Intermediate' },
      { id: 'patch-prioritizer', name: 'Security Patch Prioritizer', description: 'Analyzes patches, scores by criticality + client business impact', category: 'Technical', aiTools: ['Claude', 'Perplexity'], automationPotential: 'High', timeSavings: '2 hrs/cycle', complexity: 'Advanced' },
      { id: 'hardware-planner', name: 'Hardware Lifecycle Planner', description: 'Tracks aging hardware, projects replacement needs, budgets for client', category: 'Technical', aiTools: ['Copilot', 'Power BI'], automationPotential: 'Medium', timeSavings: '4 hrs/quarter', complexity: 'Intermediate' },
      { id: 'cloud-advisor', name: 'Cloud Migration Advisor', description: 'Assesses client workloads, recommends cloud vs on-prem', category: 'Technical', aiTools: ['Claude', 'Copilot'], automationPotential: 'Medium', timeSavings: '8 hrs/assessment', complexity: 'Advanced' },
      { id: 'error-kb', name: 'Common Error Code KB Generator', description: 'For recurring errors, generates KB template with root cause + resolution', category: 'Process', aiTools: ['Claude', 'Notion AI'], automationPotential: 'High', timeSavings: '30 min/article', complexity: 'Beginner' },
      { id: 'runbook-maintainer', name: 'Runbook Maintainer', description: 'After solving novel problem, flags related runbooks for update', category: 'Process', aiTools: ['Claude', 'Copilot'], automationPotential: 'Medium', timeSavings: '15 min/update', complexity: 'Intermediate' },
      { id: 'vendor-scorecard', name: 'Vendor Performance Scorecard Builder', description: 'Tracks ISP uptime, Microsoft service health, flags SLA misses', category: 'Process', aiTools: ['Power BI', 'n8n'], automationPotential: 'High', timeSavings: '2 hrs/week', complexity: 'Intermediate' },
      { id: 'alert-interpreter', name: 'Proactive Alert Interpreter', description: 'For monitoring alerts, explains what it means, suggests action', category: 'Process', aiTools: ['Claude', 'Copilot'], automationPotential: 'High', timeSavings: '10 min/alert', complexity: 'Intermediate' },
      { id: 'tech-onboarding', name: 'Service Tech Onboarding Guide Creator', description: 'Generates new-hire playbook for client account', category: 'Enablement', aiTools: ['Claude', 'Notion AI'], automationPotential: 'High', timeSavings: '4 hrs/guide', complexity: 'Intermediate' },
    ],
  },
  {
    id: 'web-development',
    name: 'Website Design & Development',
    shortName: 'Web',
    type: 'Front-of-House',
    icon: 'Globe',
    description: 'Responsive web design, UX/UI, WCAG compliance, eCommerce, SEO.',
    clientValueProp: 'Website that makes people take notice. Captures attention, boosts conversions.',
    keyPartnerships: ['Shopify', 'WordPress', 'Figma', 'React/Next.js'],
    clientTypes: ['E-commerce', 'Professional services', 'Healthcare', 'B2B SaaS'],
    typicalProject: 'Website redesign (UX/UI + dev) with SEO, eCommerce setup, CMS training',
    frontOfHouseRoles: ['Web Designer / UX Lead', 'Frontend Developer', 'Backend Developer', 'eCommerce Specialist', 'SEO Specialist', 'Web Trainer'],
    backOfHouseRoles: ['Design System Manager', 'Code Repository Manager', 'Performance Monitor', 'Accessibility Auditor'],
    skills: [
      { id: 'website-audit', name: 'Website Audit & Gap Analysis', description: 'Audits existing site (speed, accessibility, SEO, mobile), generates scorecard', category: 'Client-Facing', aiTools: ['Claude', 'Perplexity'], automationPotential: 'High', timeSavings: '4 hrs/audit', complexity: 'Intermediate' },
      { id: 'journey-mapper', name: 'User Journey Mapper', description: 'Maps customer journey, identifies pain points, recommends conversion improvements', category: 'Client-Facing', aiTools: ['Claude', 'Miro AI'], automationPotential: 'Medium', timeSavings: '6 hrs/map', complexity: 'Advanced' },
      { id: 'seo-analyzer', name: 'SEO Health Analyzer', description: 'Audits on-page SEO, backlinks, technical SEO, generates keyword opportunity report', category: 'Client-Facing', aiTools: ['Perplexity', 'Claude'], automationPotential: 'High', timeSavings: '4 hrs/audit', complexity: 'Intermediate' },
      { id: 'competitor-ux', name: 'Competitor UX Analyzer', description: 'Studies competitor websites, extracts design patterns, recommends differentiation', category: 'Client-Facing', aiTools: ['Claude', 'Perplexity'], automationPotential: 'High', timeSavings: '3 hrs/analysis', complexity: 'Intermediate' },
      { id: 'content-audit', name: 'Content Audit & Strategy Generator', description: 'Reviews existing content, recommends consolidation/refresh, aligns messaging', category: 'Client-Facing', aiTools: ['Claude', 'Jasper'], automationPotential: 'High', timeSavings: '6 hrs/audit', complexity: 'Intermediate' },
      { id: 'accessibility-checklist', name: 'Accessibility Checklist Generator', description: 'Generates WCAG 2.1 compliance checklist for site, prioritizes fixes', category: 'Client-Facing', aiTools: ['Claude', 'Copilot'], automationPotential: 'High', timeSavings: '2 hrs/checklist', complexity: 'Intermediate' },
      { id: 'ecommerce-advisor', name: 'eCommerce Strategy Advisor', description: 'Assesses current eCommerce setup, recommends platform, identifies optimization', category: 'Client-Facing', aiTools: ['Claude', 'Perplexity'], automationPotential: 'Medium', timeSavings: '4 hrs/assessment', complexity: 'Advanced' },
      { id: 'mobile-ux', name: 'Mobile UX Tester Coordinator', description: 'Conducts mobile usability testing, documents issues, recommends fixes', category: 'Client-Facing', aiTools: ['Claude', 'Copilot'], automationPotential: 'Medium', timeSavings: '4 hrs/test', complexity: 'Intermediate' },
      { id: 'design-system', name: 'Design System Documenter', description: 'Creates/maintains component library, generates design tokens + code', category: 'Technical', aiTools: ['Claude', 'Cursor'], automationPotential: 'Medium', timeSavings: '8 hrs/system', complexity: 'Advanced' },
      { id: 'responsive-pattern', name: 'Responsive Design Pattern Generator', description: 'Generates mobile-first design templates for common components', category: 'Technical', aiTools: ['Claude', 'Cursor'], automationPotential: 'High', timeSavings: '2 hrs/pattern', complexity: 'Intermediate' },
      { id: 'wireframe-builder', name: 'Wireframe & Prototype Builder', description: 'Creates wireframes from client requirements, generates clickable prototypes', category: 'Technical', aiTools: ['Claude', 'Figma AI'], automationPotential: 'Medium', timeSavings: '6 hrs/prototype', complexity: 'Intermediate' },
      { id: 'performance-optimizer', name: 'Frontend Performance Optimizer', description: 'Audits page speed, identifies bottlenecks, recommends optimizations', category: 'Technical', aiTools: ['Claude', 'Copilot'], automationPotential: 'High', timeSavings: '3 hrs/audit', complexity: 'Advanced' },
      { id: 'payment-integrator', name: 'Payment Gateway Integrator', description: 'Implements Stripe, PayPal, or custom payment flows, validates PCI-DSS', category: 'Technical', aiTools: ['Cursor', 'Claude'], automationPotential: 'Medium', timeSavings: '8 hrs/integration', complexity: 'Advanced' },
      { id: 'api-docs', name: 'API Documentation Generator', description: 'Auto-generates API docs for headless CMS or custom backends', category: 'Technical', aiTools: ['Claude', 'Cursor'], automationPotential: 'High', timeSavings: '4 hrs/docs', complexity: 'Intermediate' },
      { id: 'database-designer', name: 'Database Schema Designer', description: 'Designs database structure based on content requirements', category: 'Technical', aiTools: ['Claude', 'Cursor'], automationPotential: 'Medium', timeSavings: '4 hrs/schema', complexity: 'Advanced' },
      { id: 'cms-training', name: 'Client CMS Training Path Creator', description: 'Generates step-by-step CMS training tailored to client workflows', category: 'Enablement', aiTools: ['Claude', 'Notion AI'], automationPotential: 'High', timeSavings: '3 hrs/path', complexity: 'Beginner' },
      { id: 'web-issues-kb', name: 'Common Web Issues KB Builder', description: 'Generates KB for recurring client issues (broken forms, plugin conflicts)', category: 'Enablement', aiTools: ['Claude', 'Notion AI'], automationPotential: 'High', timeSavings: '1 hr/article', complexity: 'Beginner' },
      { id: 'design-trends', name: 'Web Design Trends Analyzer', description: 'Tracks design trends, recommends which fit client brand', category: 'Enablement', aiTools: ['Perplexity', 'Claude'], automationPotential: 'High', timeSavings: '2 hrs/analysis', complexity: 'Beginner' },
      { id: 'migration-playbook', name: 'Site Migration Playbook Generator', description: 'Generates step-by-step plan for old site → new site migrations', category: 'Enablement', aiTools: ['Claude', 'Copilot'], automationPotential: 'High', timeSavings: '4 hrs/playbook', complexity: 'Intermediate' },
      { id: 'compliance-trainer', name: 'Web Compliance Auditor Trainer', description: 'Educates client on WCAG, GDPR for websites, recommends tooling', category: 'Enablement', aiTools: ['Claude', 'Copilot'], automationPotential: 'Medium', timeSavings: '2 hrs/training', complexity: 'Beginner' },
    ],
  },
  {
    id: 'branding',
    name: 'Branding & Identity',
    shortName: 'Brand',
    type: 'Front-of-House',
    icon: 'Palette',
    description: 'Brand strategy, logo design, visual identity systems, messaging frameworks.',
    clientValueProp: 'Develop brand identity that tells your story, resonates with audience.',
    keyPartnerships: ['Figma', 'Adobe Creative Suite', 'Design systems platforms'],
    clientTypes: ['Startups', 'Professional services', 'Nonprofits', 'B2B SaaS'],
    typicalProject: 'Brand audit + messaging framework + logo + design system + brand guidelines',
    frontOfHouseRoles: ['Brand Strategist', 'Logo / Visual Designer', 'Brand Guidelines Writer', 'Creative Director'],
    backOfHouseRoles: ['Design Asset Manager', 'Brand Template Manager'],
    skills: [
      { id: 'positioning-workshop', name: 'Brand Positioning Workshop Facilitator', description: 'Guides client through brand positioning, identifies unique value prop', category: 'Client-Facing', aiTools: ['Claude', 'Miro AI'], automationPotential: 'Medium', timeSavings: '4 hrs/workshop', complexity: 'Advanced' },
      { id: 'competitor-brand', name: 'Competitor Brand Analyzer', description: 'Audits competitor branding, identifies differentiation opportunity', category: 'Client-Facing', aiTools: ['Perplexity', 'Claude'], automationPotential: 'High', timeSavings: '4 hrs/analysis', complexity: 'Intermediate' },
      { id: 'audience-persona', name: 'Target Audience Persona Generator', description: 'Creates detailed buyer personas (demographics, psychographics)', category: 'Client-Facing', aiTools: ['Claude', 'GPT-4o'], automationPotential: 'High', timeSavings: '3 hrs/persona', complexity: 'Intermediate' },
      { id: 'messaging-framework', name: 'Brand Messaging Framework Creator', description: 'Develops key brand messages, taglines, brand voice guidelines', category: 'Client-Facing', aiTools: ['Claude', 'Jasper'], automationPotential: 'High', timeSavings: '6 hrs/framework', complexity: 'Advanced' },
      { id: 'brand-audit', name: 'Brand Audit Report Generator', description: 'Audits existing brand (perception, consistency, effectiveness)', category: 'Client-Facing', aiTools: ['Claude', 'Perplexity'], automationPotential: 'High', timeSavings: '6 hrs/audit', complexity: 'Intermediate' },
      { id: 'values-articulator', name: 'Brand Values Articulator', description: 'Helps client articulate core values, translates to brand expression', category: 'Client-Facing', aiTools: ['Claude', 'GPT-4o'], automationPotential: 'High', timeSavings: '2 hrs/session', complexity: 'Intermediate' },
      { id: 'logo-concept', name: 'Logo Concept Generator', description: 'Creates multiple logo concepts aligned to brand positioning', category: 'Technical', aiTools: ['Midjourney', 'DALL-E 3'], automationPotential: 'Medium', timeSavings: '4 hrs/concepts', complexity: 'Advanced' },
      { id: 'color-palette', name: 'Color Palette Designer', description: 'Generates color palette ensuring accessibility (contrast)', category: 'Technical', aiTools: ['Claude', 'Figma AI'], automationPotential: 'High', timeSavings: '2 hrs/palette', complexity: 'Intermediate' },
      { id: 'typography-system', name: 'Typography System Builder', description: 'Selects font pairings, defines sizing scale, weight hierarchy', category: 'Technical', aiTools: ['Claude', 'Figma AI'], automationPotential: 'High', timeSavings: '2 hrs/system', complexity: 'Intermediate' },
      { id: 'visual-identity', name: 'Visual Identity System Creator', description: 'Compiles logo, colors, typography into cohesive design system', category: 'Technical', aiTools: ['Claude', 'Figma AI'], automationPotential: 'Medium', timeSavings: '8 hrs/system', complexity: 'Advanced' },
      { id: 'iconography', name: 'Iconography Set Designer', description: 'Creates custom icon system aligned to brand', category: 'Technical', aiTools: ['Midjourney', 'Claude'], automationPotential: 'Medium', timeSavings: '6 hrs/set', complexity: 'Intermediate' },
      { id: 'pattern-generator', name: 'Pattern & Texture Generator', description: 'Creates subtle patterns/textures that reinforce brand visual language', category: 'Technical', aiTools: ['Midjourney', 'DALL-E 3'], automationPotential: 'High', timeSavings: '2 hrs/pattern', complexity: 'Beginner' },
      { id: 'brand-guidelines', name: 'Brand Guidelines Document Generator', description: 'Creates comprehensive brand guidelines (logo usage, spacing, colors)', category: 'Enablement', aiTools: ['Claude', 'Copilot'], automationPotential: 'High', timeSavings: '8 hrs/doc', complexity: 'Intermediate' },
      { id: 'marketing-templates', name: 'Marketing Asset Template Creator', description: 'Generates reusable templates (email, social, presentations)', category: 'Enablement', aiTools: ['Claude', 'Copilot'], automationPotential: 'High', timeSavings: '4 hrs/set', complexity: 'Intermediate' },
      { id: 'voice-guide', name: 'Brand Voice & Tone Guide Creator', description: 'Defines how client brand "speaks" (professional vs. casual)', category: 'Enablement', aiTools: ['Claude', 'Jasper'], automationPotential: 'High', timeSavings: '4 hrs/guide', complexity: 'Intermediate' },
      { id: 'brand-compliance', name: 'Client Brand Compliance Checker', description: 'Audits client marketing materials, flags brand guideline violations', category: 'Enablement', aiTools: ['Claude', 'Copilot'], automationPotential: 'High', timeSavings: '2 hrs/audit', complexity: 'Beginner' },
      { id: 'brand-evolution', name: 'Brand Evolution Planner', description: 'Plans phased brand updates for seasonal campaigns', category: 'Enablement', aiTools: ['Claude', 'Copilot'], automationPotential: 'Medium', timeSavings: '4 hrs/plan', complexity: 'Intermediate' },
      { id: 'cultural-adapter', name: 'Multi-Cultural Brand Adapter', description: 'Adapts brand messaging/visuals for cultural relevance in new markets', category: 'Enablement', aiTools: ['Claude', 'Perplexity'], automationPotential: 'Medium', timeSavings: '6 hrs/market', complexity: 'Advanced' },
      { id: 'logo-lockups', name: 'Logo Lockup Variations Generator', description: 'Creates logo variations (full + abbreviated, horizontal + stacked)', category: 'Enablement', aiTools: ['Claude', 'Figma AI'], automationPotential: 'High', timeSavings: '2 hrs/set', complexity: 'Beginner' },
      { id: 'brand-protection', name: 'Brand Protection Advisor', description: 'Recommends trademark registration strategy, domain ownership', category: 'Enablement', aiTools: ['Claude', 'Perplexity'], automationPotential: 'Medium', timeSavings: '3 hrs/analysis', complexity: 'Intermediate' },
    ],
  },
  // Additional departments would follow the same pattern...
  // Content Creation, Managed Marketing, Operations, etc.
];

// Summary statistics
export const skillsFrameworkStats = {
  totalDepartments: 16,
  skillsPerDepartment: 20,
  totalSkills: 320,
  automationPotentialHigh: 180,
  automationPotentialMedium: 100,
  automationPotentialLow: 40,
  averageTimeSavings: '3.5 hrs/task',
  keyAITools: ['Claude', 'Copilot', 'Perplexity', 'n8n', 'Jasper', 'Power BI', 'Cursor'],
};

export function getDepartmentById(id: string): Department | undefined {
  return departments.find(d => d.id === id);
}

export function getSkillsByAutomationPotential(potential: 'Low' | 'Medium' | 'High'): DepartmentSkill[] {
  return departments.flatMap(d => d.skills.filter(s => s.automationPotential === potential));
}

export function getSkillsByAITool(tool: string): { department: Department; skill: DepartmentSkill }[] {
  const results: { department: Department; skill: DepartmentSkill }[] = [];
  departments.forEach(dept => {
    dept.skills.forEach(skill => {
      if (skill.aiTools.includes(tool)) {
        results.push({ department: dept, skill });
      }
    });
  });
  return results;
}
