// Deal types for the application

export interface Deal {
  id: string;
  name: string;
  industry: string;
  stage: string;
  amount: number;
  match: number;
  trending: boolean;
  description: string;
  // Extended fields for comparison
  metrics: DealMetrics;
  team: DealTeam;
  timeline: DealTimeline;
}

export interface DealMetrics {
  revenue: number;
  revenueGrowth: number;
  grossMargin: number;
  burnRate?: number;
  runway?: number;
  customers: number;
  arr?: number; // Annual Recurring Revenue
  mrr?: number; // Monthly Recurring Revenue
}

export interface DealTeam {
  size: number;
  founders: number;
  advisors: number;
  previousExits: boolean;
}

export interface DealTimeline {
  founded: string;
  lastRound?: string;
  targetClose: string;
  dueDiligencePhase: 'initial' | 'detailed' | 'final';
}

export interface ComparisonCriteria {
  id: string;
  label: string;
  key: keyof Deal | string;
  category: 'overview' | 'metrics' | 'team' | 'timeline' | 'fit';
  format: 'currency' | 'percentage' | 'number' | 'text' | 'boolean' | 'date' | 'match';
  higherIsBetter?: boolean;
}

export const COMPARISON_CRITERIA: ComparisonCriteria[] = [
  // Overview
  { id: 'name', label: 'Deal Name', key: 'name', category: 'overview', format: 'text' },
  { id: 'industry', label: 'Industry', key: 'industry', category: 'overview', format: 'text' },
  { id: 'stage', label: 'Stage', key: 'stage', category: 'overview', format: 'text' },
  { id: 'amount', label: 'Deal Size', key: 'amount', category: 'overview', format: 'currency' },
  { id: 'match', label: 'Match Score', key: 'match', category: 'fit', format: 'match', higherIsBetter: true },
  
  // Metrics
  { id: 'revenue', label: 'Revenue', key: 'metrics.revenue', category: 'metrics', format: 'currency', higherIsBetter: true },
  { id: 'revenueGrowth', label: 'Revenue Growth', key: 'metrics.revenueGrowth', category: 'metrics', format: 'percentage', higherIsBetter: true },
  { id: 'grossMargin', label: 'Gross Margin', key: 'metrics.grossMargin', category: 'metrics', format: 'percentage', higherIsBetter: true },
  { id: 'burnRate', label: 'Burn Rate', key: 'metrics.burnRate', category: 'metrics', format: 'currency', higherIsBetter: false },
  { id: 'runway', label: 'Runway (months)', key: 'metrics.runway', category: 'metrics', format: 'number', higherIsBetter: true },
  { id: 'customers', label: 'Customers', key: 'metrics.customers', category: 'metrics', format: 'number', higherIsBetter: true },
  { id: 'arr', label: 'ARR', key: 'metrics.arr', category: 'metrics', format: 'currency', higherIsBetter: true },
  
  // Team
  { id: 'teamSize', label: 'Team Size', key: 'team.size', category: 'team', format: 'number' },
  { id: 'founders', label: 'Founders', key: 'team.founders', category: 'team', format: 'number' },
  { id: 'advisors', label: 'Advisors', key: 'team.advisors', category: 'team', format: 'number' },
  { id: 'previousExits', label: 'Previous Exits', key: 'team.previousExits', category: 'team', format: 'boolean', higherIsBetter: true },
  
  // Timeline
  { id: 'founded', label: 'Founded', key: 'timeline.founded', category: 'timeline', format: 'date' },
  { id: 'targetClose', label: 'Target Close', key: 'timeline.targetClose', category: 'timeline', format: 'date' },
  { id: 'dueDiligence', label: 'DD Phase', key: 'timeline.dueDiligencePhase', category: 'timeline', format: 'text' },
];

// Generate mock deals with full data
export const generateFullMockDeals = (): Deal[] => [
  {
    id: '1',
    name: 'TechVenture AI',
    industry: 'Technology',
    stage: 'Series A',
    amount: 5000000,
    match: 95,
    trending: true,
    description: 'AI-powered enterprise automation platform',
    metrics: {
      revenue: 1200000,
      revenueGrowth: 180,
      grossMargin: 75,
      burnRate: 250000,
      runway: 18,
      customers: 45,
      arr: 1200000,
      mrr: 100000,
    },
    team: {
      size: 28,
      founders: 2,
      advisors: 4,
      previousExits: true,
    },
    timeline: {
      founded: '2021-03-15',
      lastRound: '2022-06-01',
      targetClose: '2024-03-31',
      dueDiligencePhase: 'detailed',
    },
  },
  {
    id: '2',
    name: 'HealthCore Systems',
    industry: 'Healthcare & Life Sciences',
    stage: 'Series B',
    amount: 15000000,
    match: 88,
    trending: false,
    description: 'Digital health infrastructure for hospitals',
    metrics: {
      revenue: 8500000,
      revenueGrowth: 95,
      grossMargin: 68,
      burnRate: 500000,
      runway: 24,
      customers: 120,
      arr: 8500000,
      mrr: 708333,
    },
    team: {
      size: 85,
      founders: 3,
      advisors: 6,
      previousExits: true,
    },
    timeline: {
      founded: '2019-08-22',
      lastRound: '2022-01-15',
      targetClose: '2024-04-15',
      dueDiligencePhase: 'final',
    },
  },
  {
    id: '3',
    name: 'GreenEnergy Solutions',
    industry: 'Energy & Utilities',
    stage: 'Growth Equity',
    amount: 25000000,
    match: 82,
    trending: true,
    description: 'Renewable energy storage technology',
    metrics: {
      revenue: 22000000,
      revenueGrowth: 65,
      grossMargin: 42,
      burnRate: 800000,
      runway: 30,
      customers: 35,
      arr: 18000000,
    },
    team: {
      size: 150,
      founders: 2,
      advisors: 8,
      previousExits: false,
    },
    timeline: {
      founded: '2017-01-10',
      lastRound: '2021-09-20',
      targetClose: '2024-06-30',
      dueDiligencePhase: 'initial',
    },
  },
  {
    id: '4',
    name: 'FinServe Platform',
    industry: 'Financial Services',
    stage: 'Series C+',
    amount: 50000000,
    match: 78,
    trending: false,
    description: 'B2B payments infrastructure',
    metrics: {
      revenue: 45000000,
      revenueGrowth: 55,
      grossMargin: 58,
      burnRate: 1200000,
      runway: 36,
      customers: 500,
      arr: 45000000,
      mrr: 3750000,
    },
    team: {
      size: 220,
      founders: 4,
      advisors: 10,
      previousExits: true,
    },
    timeline: {
      founded: '2016-05-01',
      lastRound: '2022-11-01',
      targetClose: '2024-05-15',
      dueDiligencePhase: 'detailed',
    },
  },
  {
    id: '5',
    name: 'RetailTech Pro',
    industry: 'Consumer & Retail',
    stage: 'Series A',
    amount: 8000000,
    match: 75,
    trending: true,
    description: 'Omnichannel retail analytics',
    metrics: {
      revenue: 2500000,
      revenueGrowth: 120,
      grossMargin: 72,
      burnRate: 300000,
      runway: 20,
      customers: 85,
      arr: 2500000,
      mrr: 208333,
    },
    team: {
      size: 35,
      founders: 2,
      advisors: 3,
      previousExits: false,
    },
    timeline: {
      founded: '2020-11-01',
      lastRound: '2022-08-15',
      targetClose: '2024-04-01',
      dueDiligencePhase: 'initial',
    },
  },
  {
    id: '6',
    name: 'LogiChain AI',
    industry: 'Transportation & Logistics',
    stage: 'Series B',
    amount: 20000000,
    match: 72,
    trending: false,
    description: 'AI-powered supply chain optimization',
    metrics: {
      revenue: 12000000,
      revenueGrowth: 85,
      grossMargin: 55,
      burnRate: 600000,
      runway: 28,
      customers: 200,
      arr: 12000000,
      mrr: 1000000,
    },
    team: {
      size: 95,
      founders: 3,
      advisors: 5,
      previousExits: true,
    },
    timeline: {
      founded: '2018-06-15',
      lastRound: '2022-03-01',
      targetClose: '2024-07-31',
      dueDiligencePhase: 'detailed',
    },
  },
];
