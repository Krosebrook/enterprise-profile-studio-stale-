# Architecture Documentation

## System Overview

INT OS (Enterprise Profile Studio) is a full-stack web application built with a modern React frontend and Supabase backend. The application follows a component-based architecture with clear separation of concerns, supporting enterprise profile management, AI persona configuration, and a comprehensive knowledge base.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │    Pages     │  │  Components  │  │    Hooks     │      │
│  │              │  │              │  │              │      │
│  │ - Dashboard  │  │ - Auth       │  │ - useProfiles│      │
│  │ - Personas   │  │ - Wizard     │  │ - usePersonas│      │
│  │ - Knowledge  │  │ - Persona    │  │ - useKnowledge│     │
│  │ - Analytics  │  │ - Knowledge  │  │ - useAuth    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│           │                │                  │              │
│           └────────────────┴──────────────────┘              │
│                           │                                  │
│                  ┌────────▼────────┐                        │
│                  │   TanStack      │                        │
│                  │     Query       │                        │
│                  └────────┬────────┘                        │
└───────────────────────────┼─────────────────────────────────┘
                            │
                   ┌────────▼────────┐
                   │  Supabase SDK   │
                   └────────┬────────┘
                            │
┌───────────────────────────┼─────────────────────────────────┐
│                    Supabase Backend                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  PostgreSQL  │  │     Auth     │  │    Edge      │      │
│  │   Database   │  │   Service    │  │  Functions   │      │
│  │              │  │              │  │              │      │
│  │ - Profiles   │  │ - JWT        │  │ - AI Generate│      │
│  │ - Personas   │  │ - Sessions   │  │ - Persona AI │      │
│  │ - Hats       │  │ - Users      │  │ - Documents  │      │
│  │ - Knowledge  │  │              │  │ - Analytics  │      │
│  │ - Exports    │  │              │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

## Core Concepts

### 1. Profile Management

Enterprise profiles are the central entity in the system. Each profile contains:

- **Company Information**: Basic company details (name, industry, description, etc.)
- **Branding**: Visual identity (colors, logo, fonts)
- **Services**: List of offered services with descriptions
- **Team**: Team members and their roles
- **Compliance**: Certifications and security standards
- **Metadata**: Additional configuration and version control

**Type Definition**: See `src/types/profile.ts` for complete interface

### 2. Employee Persona System

The persona system enables organizations to create AI-ready configurations for team members:

```
Employee Persona
├── Basic Info (name, title, department, email)
├── Skills & Expertise Areas
├── Communication Style (formality, directness, detail level)
├── Work Preferences (hours, collaboration, learning style)
├── AI Interaction Settings (style, tone, response length)
├── Goals & Pain Points
└── Hats (Roles)
    ├── Hat 1: Primary Role
    │   ├── Responsibilities
    │   ├── Time Allocation
    │   ├── Tools Used
    │   └── AI Suggestions
    └── Hat 2: Secondary Role
        └── ...
```

**Key Features**:
- Multi-ecosystem export (Claude, Copilot, Gemini)
- AI-powered persona generation from job title/department
- Knowledge Base document generation
- Bulk export to ZIP files
- Template-based creation

**Type Definition**: See `src/types/employee-persona.ts`

### 3. Knowledge Base

Hierarchical document organization with multi-source seeding:

```
Root
├── Folder 1
│   ├── Document 1.1
│   └── Document 1.2
└── Folder 2
    ├── Subfolder 2.1
    │   └── Document 2.1.1
    └── Document 2.2
```

**Seed Document Libraries**:
- **Industry Standard**: Common business templates
- **INT Inc. Strategy**: Hybrid Intelligence frameworks
- **INT Inc. Research**: Department taxonomy, ROI analysis
- **INT Inc. Methodology**: 4-Agent Architecture, R-I-S-E formula
- **FlashFusion Design**: Color palette, component library, integration guides

**Features**:
- Full-text search with history
- Multi-tag filtering
- Version history with restore
- Favorites system
- AI-powered document generation
- Markdown support

### 4. Ecosystem Export System

Multi-platform AI configuration generation:

```
Persona Data
    │
    ▼
┌─────────────────────────────┐
│  generate-persona-prompts   │  ← Edge Function
│  (Lovable AI Gateway)       │
└─────────────────────────────┘
    │
    ├── Claude Configuration
    │   └── System prompt optimized for Claude
    │
    ├── Microsoft Copilot
    │   └── Custom instructions format
    │
    └── Google Gemini
        └── Gems configuration format
```

### 5. Analytics Tracking

Event-based analytics system tracking:
- Profile views
- Share actions
- Contact clicks
- Document downloads
- Service views

Events are aggregated for dashboards and reports.

## Data Flow

### Persona Creation Flow

```
Template Selection → Wizard Steps → React State → TanStack Mutation
                                                        ↓
                                              Supabase Client
                                                        ↓
                                              Database Insert
                                                        ↓
                                              Query Invalidation
                                                        ↓
                                              UI Update
```

### AI Configuration Export Flow

```
User Request → Edge Function → Lovable AI Gateway → Generated Prompt
                                                           ↓
                                                    Database Save
                                                           ↓
                                                    Download/Copy
```

## Component Architecture

### Component Hierarchy

```
App
├── AuthProvider (Context)
│   └── BrowserRouter
│       ├── Navbar
│       ├── Routes
│       │   ├── LandingPage
│       │   ├── DashboardPage
│       │   │   ├── ProfileList
│       │   │   └── QuickActions
│       │   ├── PersonasListPage
│       │   │   ├── PersonaStatsBar
│       │   │   ├── PersonaFilterBar
│       │   │   └── PersonaCard[]
│       │   ├── PersonaBuilderPage
│       │   │   ├── PersonaBuilderWizard
│       │   │   ├── HatsRoleManager
│       │   │   └── EcosystemExportPanel
│       │   ├── KnowledgeBasePage
│       │   │   ├── FolderTree
│       │   │   ├── DocumentSearch
│       │   │   └── DocumentCard[]
│       │   └── AnalyticsDashboardPage
│       └── Footer
└── Toaster (Notifications)
```

### UI Component Library

Built on shadcn/ui and Radix UI primitives:

- **Form Components**: Input, Select, Textarea, Checkbox, Radio
- **Layout**: Card, Separator, Tabs, Accordion
- **Feedback**: Alert, Toast, Dialog, Popover
- **Navigation**: Command Palette, Dropdown Menu, Navigation Menu
- **Data Display**: Table, Badge, Avatar, Progress

### Design System

FlashFusion × INT Inc. unified design:

- **Colors**: Eclipse Navy, Cloudburst Blue, Purple Highlight, Signature Orange
- **Gradients**: Hero (Green → Cyan → Blue), Rainbow, Glass
- **Components**: RACI badges, glassmorphism cards, pillar borders
- **Typography**: Plus Jakarta Sans (headings), Inter (body)

## Database Schema

### Core Tables

**employee_personas**
```sql
- id: uuid (PK)
- user_id: uuid (FK → auth.users)
- name: text
- job_title: text
- department: text
- email: text
- skills: text[]
- expertise_areas: text[]
- tools_used: text[]
- pain_points: text[]
- goals: text[]
- communication_style: jsonb
- work_preferences: jsonb
- ai_interaction_style: text
- preferred_tone: text
- preferred_response_length: text
- status: text
- created_at: timestamp
- updated_at: timestamp
```

**employee_hats**
```sql
- id: uuid (PK)
- persona_id: uuid (FK → employee_personas)
- user_id: uuid
- name: text
- description: text
- responsibilities: text[]
- key_tasks: text[]
- stakeholders: text[]
- tools: text[]
- time_percentage: integer
- ai_suggestions: jsonb
- priority: integer
- is_active: boolean
```

**ecosystem_exports**
```sql
- id: uuid (PK)
- persona_id: uuid (FK → employee_personas)
- ecosystem: text (claude | copilot | gemini)
- content: text
- export_type: text
- version: integer
- is_active: boolean
```

**knowledge_base_documents**
```sql
- id: uuid (PK)
- user_id: uuid (FK → auth.users)
- folder_id: uuid (FK → knowledge_base_folders, nullable)
- title: text
- slug: text (unique)
- content: text
- description: text
- category: text
- tags: text[]
- is_public: boolean
- created_at: timestamp
- updated_at: timestamp
```

### Row Level Security (RLS)

All tables implement RLS policies:

```sql
-- Users can only access their own data
CREATE POLICY "Users can view their own personas"
  ON employee_personas FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own personas"
  ON employee_personas FOR ALL
  USING (auth.uid() = user_id);
```

## Edge Functions

### AI-Powered Functions

| Function | Purpose | Model |
|----------|---------|-------|
| `generate-persona` | Auto-fill persona from job title | Gemini 2.5 Flash |
| `generate-persona-prompts` | Multi-ecosystem prompt generation | Gemini 2.5 Flash |
| `generate-document` | AI document generation | Gemini 2.5 Flash |
| `generate-profile-content` | Profile content suggestions | Gemini 2.5 Flash |
| `generate-onboarding-suggestions` | Personalized recommendations | Gemini 2.5 Flash |

### Utility Functions

| Function | Purpose |
|----------|---------|
| `validate-api-key` | External API connectivity check |
| `send-notification` | Push notification delivery |
| `send-welcome-email` | Onboarding email |
| `track-analytics` | Event tracking |

## Security Architecture

### Authentication Flow

```
User → Login Form → Supabase Auth → JWT Token → Client Storage
                                          ↓
                                    Session Context
                                          ↓
                                    Protected Routes
```

### Authorization

- **Route Protection**: `PrivateRoute` component checks auth state
- **API Authorization**: JWT tokens in request headers
- **Database Security**: RLS policies enforce data access rules

## Performance Optimizations

### Frontend

1. **Code Splitting**: Dynamic imports for route-based chunks
2. **Lazy Loading**: Components loaded on demand
3. **Query Caching**: TanStack Query caches API responses
4. **Optimistic Updates**: UI updates before server confirmation
5. **Debouncing**: Search inputs debounced to reduce API calls

### Backend

1. **Database Indexing**: Indexes on frequently queried columns
2. **Query Optimization**: Efficient SQL queries with proper joins
3. **Connection Pooling**: Supabase manages connection pool
4. **Edge Functions**: Deployed globally for low latency

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development guidelines.
