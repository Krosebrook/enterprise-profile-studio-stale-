// INT Inc. AI Platform Implementation Plan - Option E
// 10-week roadmap: November 25, 2025 - February 3, 2026
// Total Effort: 472 hours | Team Size: 8-12 members | Budget: $75K-125K

export interface RoadmapPhase {
  id: string;
  name: string;
  shortName: string;
  startWeek: number;
  endWeek: number;
  duration: number;
  category: 'Research' | 'Development' | 'Analysis' | 'Testing' | 'Enablement' | 'Launch';
  totalHours: number;
  team: string[];
  description: string;
  keyDeliverables: string[];
  criticalSuccessFactors?: string[];
}

export interface RoadmapTask {
  id: string;
  phaseId: string;
  task: string;
  owner: string;
  deliverable: string;
  status: 'Not Started' | 'In Progress' | 'Complete' | 'Blocked';
  dependencies: string[];
  effortHours: number;
  week: string;
}

export interface ProjectMetrics {
  totalWeeks: number;
  totalHours: number;
  teamSize: string;
  budgetRange: string;
  startDate: string;
  endDate: string;
  internalROI: string;
  externalRevenue: string;
}

export const projectMetrics: ProjectMetrics = {
  totalWeeks: 10,
  totalHours: 472,
  teamSize: '8-12',
  budgetRange: '$75K-$125K',
  startDate: 'November 25, 2025',
  endDate: 'February 3, 2026',
  internalROI: '20-35% productivity gains',
  externalRevenue: '$125K-$4M Year 1'
};

export const roadmapPhases: RoadmapPhase[] = [
  {
    id: 'phase-1',
    name: '1. Research & Data Integration',
    shortName: 'Research',
    startWeek: 1,
    endWeek: 2,
    duration: 2,
    category: 'Research',
    totalHours: 66,
    team: ['Research Team (2)', 'Platform Analyst (1)', 'Compliance Lead (1)'],
    description: 'Build comprehensive, current knowledge base',
    keyDeliverables: [
      'Industry benchmark data (Manufacturing, Healthcare, Financial Services, Professional Services)',
      'Updated platform database with November 2025 pricing for 125+ platforms',
      'Compliance roadmap (GDPR, CCPA 2026, HIPAA, FedRAMP, SOX)',
      'Emerging platforms added (Siemens Xcelerator, Epic EHR AI, BlackRock Aladdin, Kimble AI)',
      'Real client case studies compiled by industry vertical',
      'INT Inc. service-to-platform capability mapping'
    ],
    criticalSuccessFactors: [
      'Access to current industry reports (McKinsey, Gartner, Forrester)',
      'Vendor cooperation for roadmap intelligence',
      'Compliance expert availability'
    ]
  },
  {
    id: 'phase-2',
    name: '2. Templates & Deliverables',
    shortName: 'Templates',
    startWeek: 2,
    endWeek: 3,
    duration: 2,
    category: 'Development',
    totalHours: 58,
    team: ['Design Team (1)', 'Development Team (2)', 'Content Team (1)'],
    description: 'Create professional, reusable client-facing materials',
    keyDeliverables: [
      'White-label report templates (Executive Summary, Technical Deep-Dive, Board Overview)',
      'Industry-specific assessment wizards (4 verticals minimum)',
      'RFP response templates with auto-population',
      'Case study module with filtering (industry, platform, use case)'
    ]
  },
  {
    id: 'phase-3',
    name: '3. Competitive Analysis',
    shortName: 'Competitive',
    startWeek: 3,
    endWeek: 4,
    duration: 2,
    category: 'Analysis',
    totalHours: 46,
    team: ['Strategy Team (2)', 'Development Team (1)', 'Partnerships Lead (1)'],
    description: 'Understand and differentiate from market competitors',
    keyDeliverables: [
      'Big 4 & SI positioning analysis (Deloitte, IBM, Accenture, KPMG, McKinsey)',
      'Interactive competitive matrix dashboard',
      'INT Inc. differentiation playbook by vertical',
      'Vendor partner program opportunities'
    ]
  },
  {
    id: 'phase-4',
    name: '4. Advanced Features',
    shortName: 'Features',
    startWeek: 4,
    endWeek: 6,
    duration: 3,
    category: 'Development',
    totalHours: 96,
    team: ['Development Team (3)', 'Data Scientist (1)', 'Platform Analyst (1)'],
    description: 'Build sophisticated analysis and automation capabilities',
    keyDeliverables: [
      'Scenario modeling engine (phased vs. big-bang, ROI sensitivity)',
      'AI maturity scoring algorithm',
      'Automated proposal generation pipeline',
      'Multi-vendor orchestration planning tool',
      'Real-time vendor API integrations'
    ]
  },
  {
    id: 'phase-5',
    name: '5. Market Intelligence',
    shortName: 'Market Intel',
    startWeek: 6,
    endWeek: 7,
    duration: 2,
    category: 'Analysis',
    totalHours: 48,
    team: ['Research Team (2)', 'Strategy Lead (1)', 'Content Team (1)'],
    description: 'Develop proprietary market insights and positioning',
    keyDeliverables: [
      'Industry-specific AI adoption reports',
      'Competitive intelligence dashboard',
      'Vendor roadmap tracking system',
      'Market trend analysis tools'
    ]
  },
  {
    id: 'phase-6',
    name: '6. Testing & QA',
    shortName: 'Testing',
    startWeek: 7,
    endWeek: 8,
    duration: 2,
    category: 'Testing',
    totalHours: 56,
    team: ['QA Team (2)', 'Development Team (1)', 'User Testing Group (5)'],
    description: 'Ensure platform quality and reliability',
    keyDeliverables: [
      'Comprehensive test suite (unit, integration, E2E)',
      'User acceptance testing results',
      'Performance benchmarks',
      'Security audit report',
      'Accessibility compliance verification'
    ]
  },
  {
    id: 'phase-7',
    name: '7. Training & Documentation',
    shortName: 'Training',
    startWeek: 8,
    endWeek: 9,
    duration: 2,
    category: 'Enablement',
    totalHours: 52,
    team: ['Training Lead (1)', 'Content Team (2)', 'Subject Matter Experts (3)'],
    description: 'Enable team members and document processes',
    keyDeliverables: [
      'User training materials (video, guides, quick-start)',
      'Admin documentation',
      'API documentation for integrations',
      'Runbooks for common scenarios',
      'Train-the-trainer program'
    ]
  },
  {
    id: 'phase-8',
    name: '8. Board Presentation & Launch',
    shortName: 'Launch',
    startWeek: 9,
    endWeek: 10,
    duration: 2,
    category: 'Launch',
    totalHours: 50,
    team: ['Executive Sponsor (1)', 'Strategy Lead (1)', 'Development Lead (1)', 'Marketing (1)'],
    description: 'Secure approval and execute go-live',
    keyDeliverables: [
      'Executive presentation deck',
      'ROI business case documentation',
      'Go-live checklist completion',
      'Launch communications',
      'Success metrics dashboard'
    ]
  }
];

export const roadmapTasks: RoadmapTask[] = [
  // Phase 1 Tasks
  {
    id: 'task-1-1',
    phaseId: 'phase-1',
    task: 'Gather industry benchmarks (Manufacturing, Healthcare, Financial Services, Professional Services)',
    owner: 'Research Team',
    deliverable: 'Industry benchmark data spreadsheet',
    status: 'Not Started',
    dependencies: [],
    effortHours: 16,
    week: 'Week 1'
  },
  {
    id: 'task-1-2',
    phaseId: 'phase-1',
    task: 'Research regulatory roadmaps (GDPR, CCPA 2026, HIPAA, SOX)',
    owner: 'Compliance Lead',
    deliverable: 'Compliance timeline document',
    status: 'Not Started',
    dependencies: [],
    effortHours: 8,
    week: 'Week 1'
  },
  {
    id: 'task-1-3',
    phaseId: 'phase-1',
    task: 'Update platform database with Nov 2025 pricing, maturity scores, vendor roadmaps',
    owner: 'Platform Analyst',
    deliverable: 'Updated platform database JSON',
    status: 'Not Started',
    dependencies: [],
    effortHours: 12,
    week: 'Week 1'
  },
  {
    id: 'task-1-4',
    phaseId: 'phase-1',
    task: 'Add emerging platforms (Siemens Xcelerator, Epic EHR AI, BlackRock Aladdin, Kimble AI)',
    owner: 'Platform Analyst',
    deliverable: 'Expanded platform database (140+ platforms)',
    status: 'Not Started',
    dependencies: ['task-1-3'],
    effortHours: 10,
    week: 'Week 1-2'
  },
  {
    id: 'task-1-5',
    phaseId: 'phase-1',
    task: 'Compile real client case studies and testimonials by industry',
    owner: 'Content Team',
    deliverable: 'Case study library',
    status: 'Not Started',
    dependencies: ['task-1-1'],
    effortHours: 12,
    week: 'Week 2'
  },
  {
    id: 'task-1-6',
    phaseId: 'phase-1',
    task: 'Map INT Inc. services to AI platform capabilities',
    owner: 'Strategy Lead',
    deliverable: 'Service-platform mapping matrix',
    status: 'Not Started',
    dependencies: ['task-1-3'],
    effortHours: 8,
    week: 'Week 2'
  },
  // Phase 2 Tasks
  {
    id: 'task-2-1',
    phaseId: 'phase-2',
    task: 'Design white-label report templates (Executive Summary, Technical Deep-Dive, Board Overview)',
    owner: 'Design Team',
    deliverable: 'PDF/PPT templates',
    status: 'Not Started',
    dependencies: [],
    effortHours: 16,
    week: 'Week 2'
  },
  {
    id: 'task-2-2',
    phaseId: 'phase-2',
    task: 'Build industry-specific assessment wizards (4 industries minimum)',
    owner: 'Development Team',
    deliverable: 'Interactive assessment flows',
    status: 'Not Started',
    dependencies: ['task-1-1'],
    effortHours: 20,
    week: 'Week 2-3'
  },
  {
    id: 'task-2-3',
    phaseId: 'phase-2',
    task: 'Create RFP response templates with auto-population from assessment data',
    owner: 'Content Team',
    deliverable: 'RFP template library',
    status: 'Not Started',
    dependencies: ['task-2-1'],
    effortHours: 12,
    week: 'Week 3'
  },
  {
    id: 'task-2-4',
    phaseId: 'phase-2',
    task: 'Build case study module with filtering by industry, platform, use case',
    owner: 'Development Team',
    deliverable: 'Case study database UI',
    status: 'Not Started',
    dependencies: ['task-1-5'],
    effortHours: 10,
    week: 'Week 3'
  },
  // Phase 3 Tasks
  {
    id: 'task-3-1',
    phaseId: 'phase-3',
    task: 'Research Big 4 & SI positioning (Deloitte, IBM, Accenture, KPMG, McKinsey)',
    owner: 'Strategy Team',
    deliverable: 'Competitive intelligence report',
    status: 'Not Started',
    dependencies: [],
    effortHours: 12,
    week: 'Week 3'
  },
  {
    id: 'task-3-2',
    phaseId: 'phase-3',
    task: 'Build competitive matrix dashboard (capabilities, speed, pricing, compliance)',
    owner: 'Development Team',
    deliverable: 'Interactive competitive matrix',
    status: 'Not Started',
    dependencies: ['task-3-1'],
    effortHours: 16,
    week: 'Week 3-4'
  },
  {
    id: 'task-3-3',
    phaseId: 'phase-3',
    task: 'Document INT Inc. differentiation points for each vertical',
    owner: 'Strategy Lead',
    deliverable: 'Differentiation playbook',
    status: 'Not Started',
    dependencies: ['task-3-2'],
    effortHours: 8,
    week: 'Week 4'
  },
  {
    id: 'task-3-4',
    phaseId: 'phase-3',
    task: 'Map vendor partner programs and INT Inc. channel opportunities',
    owner: 'Partnerships Lead',
    deliverable: 'Partner program analysis',
    status: 'Not Started',
    dependencies: ['task-1-3'],
    effortHours: 10,
    week: 'Week 4'
  },
  // Phase 4 Tasks
  {
    id: 'task-4-1',
    phaseId: 'phase-4',
    task: 'Build scenario modeling engine (phased vs. big-bang, ROI sensitivity)',
    owner: 'Development Team',
    deliverable: 'Scenario calculator module',
    status: 'Not Started',
    dependencies: ['task-1-3'],
    effortHours: 24,
    week: 'Week 4'
  },
  {
    id: 'task-4-2',
    phaseId: 'phase-4',
    task: 'Develop AI maturity scoring algorithm with industry benchmarks',
    owner: 'Data Scientist',
    deliverable: 'Maturity score engine',
    status: 'Not Started',
    dependencies: ['task-1-1'],
    effortHours: 20,
    week: 'Week 4-5'
  },
  {
    id: 'task-4-3',
    phaseId: 'phase-4',
    task: 'Create automated proposal generation pipeline',
    owner: 'Development Team',
    deliverable: 'Proposal automation system',
    status: 'Not Started',
    dependencies: ['task-2-1', 'task-4-2'],
    effortHours: 24,
    week: 'Week 5'
  },
  {
    id: 'task-4-4',
    phaseId: 'phase-4',
    task: 'Build multi-vendor orchestration planning tool',
    owner: 'Development Team',
    deliverable: 'Vendor orchestration UI',
    status: 'Not Started',
    dependencies: ['task-1-3'],
    effortHours: 16,
    week: 'Week 5-6'
  },
  {
    id: 'task-4-5',
    phaseId: 'phase-4',
    task: 'Implement real-time vendor API integrations',
    owner: 'Platform Analyst',
    deliverable: 'Live pricing & availability feeds',
    status: 'Not Started',
    dependencies: ['task-1-3'],
    effortHours: 12,
    week: 'Week 6'
  },
  // Phase 5 Tasks
  {
    id: 'task-5-1',
    phaseId: 'phase-5',
    task: 'Develop industry-specific AI adoption reports',
    owner: 'Research Team',
    deliverable: '4 industry white papers',
    status: 'Not Started',
    dependencies: ['task-1-1', 'task-1-5'],
    effortHours: 16,
    week: 'Week 6'
  },
  {
    id: 'task-5-2',
    phaseId: 'phase-5',
    task: 'Build competitive intelligence dashboard',
    owner: 'Development Team',
    deliverable: 'Live competitive tracker',
    status: 'Not Started',
    dependencies: ['task-3-1'],
    effortHours: 12,
    week: 'Week 6-7'
  },
  {
    id: 'task-5-3',
    phaseId: 'phase-5',
    task: 'Create vendor roadmap tracking system',
    owner: 'Platform Analyst',
    deliverable: 'Roadmap visualization tool',
    status: 'Not Started',
    dependencies: ['task-1-3'],
    effortHours: 10,
    week: 'Week 7'
  },
  {
    id: 'task-5-4',
    phaseId: 'phase-5',
    task: 'Build market trend analysis tools',
    owner: 'Data Scientist',
    deliverable: 'Trend analytics dashboard',
    status: 'Not Started',
    dependencies: ['task-4-2'],
    effortHours: 10,
    week: 'Week 7'
  },
  // Phase 6 Tasks
  {
    id: 'task-6-1',
    phaseId: 'phase-6',
    task: 'Develop comprehensive test suite (unit, integration, E2E)',
    owner: 'QA Team',
    deliverable: 'Automated test coverage',
    status: 'Not Started',
    dependencies: ['task-4-3'],
    effortHours: 20,
    week: 'Week 7'
  },
  {
    id: 'task-6-2',
    phaseId: 'phase-6',
    task: 'Conduct user acceptance testing with pilot group',
    owner: 'QA Team',
    deliverable: 'UAT report & feedback',
    status: 'Not Started',
    dependencies: ['task-6-1'],
    effortHours: 16,
    week: 'Week 7-8'
  },
  {
    id: 'task-6-3',
    phaseId: 'phase-6',
    task: 'Run performance benchmarks and optimization',
    owner: 'Development Team',
    deliverable: 'Performance report',
    status: 'Not Started',
    dependencies: ['task-6-1'],
    effortHours: 10,
    week: 'Week 8'
  },
  {
    id: 'task-6-4',
    phaseId: 'phase-6',
    task: 'Complete security audit and penetration testing',
    owner: 'Security Team',
    deliverable: 'Security audit report',
    status: 'Not Started',
    dependencies: ['task-6-1'],
    effortHours: 10,
    week: 'Week 8'
  },
  // Phase 7 Tasks
  {
    id: 'task-7-1',
    phaseId: 'phase-7',
    task: 'Create user training materials (video tutorials, guides)',
    owner: 'Training Lead',
    deliverable: 'Training content library',
    status: 'Not Started',
    dependencies: ['task-6-2'],
    effortHours: 16,
    week: 'Week 8'
  },
  {
    id: 'task-7-2',
    phaseId: 'phase-7',
    task: 'Write admin and developer documentation',
    owner: 'Content Team',
    deliverable: 'Technical documentation',
    status: 'Not Started',
    dependencies: ['task-6-2'],
    effortHours: 12,
    week: 'Week 8-9'
  },
  {
    id: 'task-7-3',
    phaseId: 'phase-7',
    task: 'Develop API documentation for partner integrations',
    owner: 'Development Team',
    deliverable: 'API reference guide',
    status: 'Not Started',
    dependencies: ['task-4-5'],
    effortHours: 10,
    week: 'Week 9'
  },
  {
    id: 'task-7-4',
    phaseId: 'phase-7',
    task: 'Create operational runbooks for common scenarios',
    owner: 'Operations Team',
    deliverable: 'Runbook library',
    status: 'Not Started',
    dependencies: ['task-6-2'],
    effortHours: 8,
    week: 'Week 9'
  },
  {
    id: 'task-7-5',
    phaseId: 'phase-7',
    task: 'Conduct train-the-trainer sessions',
    owner: 'Training Lead',
    deliverable: 'Certified trainers',
    status: 'Not Started',
    dependencies: ['task-7-1'],
    effortHours: 6,
    week: 'Week 9'
  },
  // Phase 8 Tasks
  {
    id: 'task-8-1',
    phaseId: 'phase-8',
    task: 'Prepare executive presentation deck',
    owner: 'Strategy Lead',
    deliverable: 'Board presentation',
    status: 'Not Started',
    dependencies: ['task-5-1', 'task-6-2'],
    effortHours: 12,
    week: 'Week 9'
  },
  {
    id: 'task-8-2',
    phaseId: 'phase-8',
    task: 'Finalize ROI business case documentation',
    owner: 'Strategy Lead',
    deliverable: 'ROI analysis package',
    status: 'Not Started',
    dependencies: ['task-4-1'],
    effortHours: 8,
    week: 'Week 9-10'
  },
  {
    id: 'task-8-3',
    phaseId: 'phase-8',
    task: 'Complete go-live checklist and runthrough',
    owner: 'Development Lead',
    deliverable: 'Go-live sign-off',
    status: 'Not Started',
    dependencies: ['task-6-4', 'task-7-2'],
    effortHours: 10,
    week: 'Week 10'
  },
  {
    id: 'task-8-4',
    phaseId: 'phase-8',
    task: 'Execute launch communications plan',
    owner: 'Marketing',
    deliverable: 'Launch announcements',
    status: 'Not Started',
    dependencies: ['task-8-1'],
    effortHours: 8,
    week: 'Week 10'
  },
  {
    id: 'task-8-5',
    phaseId: 'phase-8',
    task: 'Deploy success metrics dashboard',
    owner: 'Development Team',
    deliverable: 'Live metrics tracking',
    status: 'Not Started',
    dependencies: ['task-8-3'],
    effortHours: 12,
    week: 'Week 10'
  }
];

// Color scheme matching the Gantt chart image
export const categoryColors: Record<string, string> = {
  Research: 'hsl(185, 77%, 46%)',    // Cyan/Teal
  Development: 'hsl(146, 50%, 36%)', // Green
  Analysis: 'hsl(295, 35%, 41%)',    // Purple
  Testing: 'hsl(48, 57%, 56%)',      // Gold/Yellow
  Enablement: 'hsl(189, 25%, 46%)',  // Slate cyan
  Launch: 'hsl(0, 67%, 56%)'         // Red
};

// Tailwind-compatible semantic colors
export const categoryTailwindColors: Record<string, string> = {
  Research: 'bg-cyan-500',
  Development: 'bg-emerald-600',
  Analysis: 'bg-purple-600',
  Testing: 'bg-amber-500',
  Enablement: 'bg-slate-500',
  Launch: 'bg-red-500'
};

export const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Research': return 'Search';
    case 'Development': return 'Code';
    case 'Analysis': return 'BarChart3';
    case 'Testing': return 'TestTube';
    case 'Enablement': return 'GraduationCap';
    case 'Launch': return 'Rocket';
    default: return 'Circle';
  }
};
