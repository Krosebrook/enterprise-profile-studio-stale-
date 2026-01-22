import { CreateDocumentData, generateSlug } from '@/hooks/useKnowledgeBase';

type FlashFusionDocument = Omit<CreateDocumentData, 'slug'>;

export const flashFusionDocuments: FlashFusionDocument[] = [
  {
    title: 'FlashFusion Design System Analysis',
    description: 'Cross-platform pattern recognition for the FlashFusion ecosystem including color palette, typography, component patterns, and integration points.',
    category: 'Design',
    tags: ['design-system', 'flashfusion', 'ui-patterns', 'color-palette', 'typography'],
    content: `# FlashFusion Design System Analysis

## Color Palette

### Primary Colors
- **Dark Navy Base**: \`#0a0e27\`, \`#1a1a2e\`, \`#1a1f3a\` (backgrounds)
- **Blue Accent**: \`#3b82f6\`, \`#2563eb\` (CTAs, active states)
- **Purple Highlight**: \`#a855f7\`, \`#8b5cf6\` (active tabs, premium features)
- **Green Success**: \`#10b981\`, \`#22c55e\` (positive actions)
- **Orange Primary**: \`#FF8C42\`, \`#FF6B35\` (FlashFusion brand CTAs)

### Gradient Patterns
1. **Hero Gradients**: Green → Cyan → Blue
2. **Text Gradients**: Green → Cyan → Purple → Pink
3. **Orange Brand**: \`#FF8C42\` → \`#FF6B35\`

## Component Patterns

### Navigation
- Bottom Tab (Mobile): 4 tabs with active/inactive states
- Top Navigation (Desktop): Horizontal menu, sticky on scroll
- Category Tabs: Purple active state, rounded pills

### Cards
- Glassmorphism: rgba(255,255,255,0.05) with backdrop blur
- Hover: translateY(-4px), shadow increase

### RACI Badge System
- R (Responsible): Blue
- A (Accountable): Purple
- C (Consulted): Green
- I (Informed): Gray
`,
  },
  {
    title: 'FlashFusion Integration Guide',
    description: 'Comprehensive documentation for integrating the FlashFusion mockup suite into the Symphony of Roles ecosystem.',
    category: 'Guides',
    tags: ['integration', 'flashfusion', 'symphony', 'architecture', 'workflow'],
    content: `# FlashFusion Integration Guide

## Platform Components

### Symphony Core Suite
- **Platform Architecture**: 11-agent Symphony across 6 RACI phases
- **Agent Marketplace**: Browse and discover AI agents
- **Workflow Builder**: Drag-and-drop agent orchestration
- **Agent Prompt Studio**: Configure and test system prompts

### Symphony Management Suite
- **Team Recruitment Hub**: Job descriptions for all 11 roles
- **Project Roadmap**: Timeline visualization of phases
- **Role Matrix Explorer**: Agent contributions and skills
- **RACI Matrix**: Accountability framework

## User Journeys

### New User Onboarding
1. Landing → Agent Marketplace → Platform Architecture
2. Workflow Builder → Agent Prompt Studio → Mobile App

### Team Building
1. Platform Architecture → Role Matrix Explorer
2. RACI Matrix → Team Recruitment Hub → Project Roadmap
`,
  },
  {
    title: 'Symphony Suite Component Library',
    description: 'Comprehensive component library documentation for the Symphony of Roles platform.',
    category: 'Design',
    tags: ['components', 'symphony', 'ui-library', 'patterns', 'design-tokens'],
    content: `# Symphony Suite Component Library

## Core Components

### Navigation
- TopNav: Logo, menu items, search
- BottomNav: 4 mobile tabs
- TabNav: Category pills with purple active state

### Cards
- AgentCard: Icon, name, description, RACI badge
- ToolCard: Featured glassmorphism card
- ProductCard: Selection with blue glow

### Buttons
- Primary: Blue gradient
- Premium: Purple gradient
- Success: Green
- Accent: Orange

### Badges
- RACIBadge: R/A/C/I color-coded
- PhaseBadge: Discovery, Design, Build, Deploy
- StatusBadge: Active, Draft, Archived

## Design Tokens

### Colors
Use semantic tokens: bg-background, bg-primary, bg-premium

### Spacing
- Card padding: p-6 (24px)
- Card gap: gap-4 or gap-6
- Section margin: my-16 or my-24

### Border Radius
- Cards: rounded-xl
- Buttons: rounded-lg
- Pills: rounded-full
`,
  },
];

// Helper to convert to CreateDocumentData with slugs
export function getFlashFusionDocsWithSlugs(): CreateDocumentData[] {
  return flashFusionDocuments.map(doc => ({
    ...doc,
    slug: generateSlug(doc.title),
  }));
}
