# Architecture Documentation

## System Overview

Enterprise Profile Studio is a full-stack web application built with a modern React frontend and Supabase backend. The application follows a component-based architecture with clear separation of concerns.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │    Pages     │  │  Components  │  │    Hooks     │      │
│  │              │  │              │  │              │      │
│  │ - Landing    │  │ - Auth       │  │ - useProfiles│      │
│  │ - Dashboard  │  │ - Wizard     │  │ - useDeals   │      │
│  │ - Profiles   │  │ - Deals      │  │ - useAnalytics│     │
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
│  │ - Profiles   │  │ - JWT        │  │ - AI Suggest │      │
│  │ - Analytics  │  │ - Sessions   │  │ - Notifs     │      │
│  │ - Deals      │  │ - Users      │  │ - Analytics  │      │
│  │ - Knowledge  │  │              │  │              │      │
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

### 2. Deal Pipeline

Deals move through a customizable pipeline:

```
Screening → Due Diligence → Term Sheet → Legal Review → Closing
                                                      ↓
                                                   Passed
```

Each deal includes:
- Financial metrics
- Team assignments
- Timeline tracking
- Document attachments
- Investment memos

**Type Definition**: See `src/types/deals.ts`

### 3. Knowledge Base

Hierarchical document organization:

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

Features:
- Full-text search
- Tag-based filtering
- Template library
- Markdown support

### 4. Analytics Tracking

Event-based analytics system tracking:
- Profile views
- Share actions
- Contact clicks
- Document downloads
- Service views

Events are aggregated for dashboards and reports.

## Data Flow

### Profile Creation Flow

```
User Input → Wizard Component → React State → TanStack Mutation
                                                      ↓
                                            Supabase Client
                                                      ↓
                                            Database Insert
                                                      ↓
                                            Query Invalidation
                                                      ↓
                                            UI Update
```

### Real-time Analytics

```
User Action → Track Event → Supabase Function → Database Insert
                                                       ↓
                                                 Real-time Sub
                                                       ↓
                                                Dashboard Update
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
│       │   ├── ProfileEditPage
│       │   │   └── ProfileWizard
│       │   │       ├── CompanyInfoStep
│       │   │       ├── BrandingStep
│       │   │       ├── ServicesStep
│       │   │       ├── TeamStep
│       │   │       └── ComplianceStep
│       │   ├── AnalyticsDashboardPage
│       │   └── KnowledgeBasePage
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

## State Management

### Global State

- **Authentication**: `AuthContext` - User session and auth state
- **Server State**: TanStack Query - API data caching and synchronization

### Local State

- React hooks (`useState`, `useReducer`) for component-level state
- Form state managed by `react-hook-form` with Zod validation

### Data Fetching Strategy

```typescript
// Query for fetching data
const { data, isLoading, error } = useQuery({
  queryKey: ['profiles', userId],
  queryFn: () => fetchProfiles(userId),
  staleTime: 5 * 60 * 1000, // 5 minutes
});

// Mutation for updates
const mutation = useMutation({
  mutationFn: updateProfile,
  onSuccess: () => {
    queryClient.invalidateQueries(['profiles']);
  },
});
```

## Database Schema

### Core Tables

**enterprise_profiles**
```sql
- id: uuid (PK)
- user_id: uuid (FK → auth.users)
- name: text
- slug: text (unique)
- status: enum ('draft', 'published', 'archived')
- company_info: jsonb
- branding: jsonb
- services: jsonb
- team: jsonb
- compliance: jsonb
- metadata: jsonb
- published_at: timestamp
- created_at: timestamp
- updated_at: timestamp
```

**analytics_events**
```sql
- id: uuid (PK)
- profile_id: uuid (FK → enterprise_profiles)
- event_type: text
- event_data: jsonb
- created_at: timestamp
```

**knowledge_documents**
```sql
- id: uuid (PK)
- user_id: uuid (FK → auth.users)
- folder_id: uuid (FK → knowledge_folders, nullable)
- title: text
- content: text
- tags: text[]
- created_at: timestamp
- updated_at: timestamp
```

**deals**
```sql
- id: uuid (PK)
- user_id: uuid (FK → auth.users)
- name: text
- stage: text
- amount: numeric
- metrics: jsonb
- team: jsonb
- timeline: jsonb
- created_at: timestamp
- updated_at: timestamp
```

### Row Level Security (RLS)

All tables implement RLS policies:

```sql
-- Users can only access their own data
CREATE POLICY "Users can view their own profiles"
  ON enterprise_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profiles"
  ON enterprise_profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- Public profiles are viewable by anyone
CREATE POLICY "Published profiles are publicly viewable"
  ON enterprise_profiles FOR SELECT
  USING (status = 'published');
```

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

### Data Validation

- **Client-side**: Zod schemas validate form inputs
- **Server-side**: Supabase validates against schema and constraints
- **Type Safety**: TypeScript ensures type correctness

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

## Error Handling

### Frontend Error Boundaries

```typescript
<ErrorBoundary fallback={<ErrorPage />}>
  <App />
</ErrorBoundary>
```

### API Error Handling

```typescript
try {
  const { data, error } = await supabase.from('profiles').select();
  if (error) throw error;
  return data;
} catch (error) {
  toast.error('Failed to load profiles');
  console.error(error);
}
```

### User Feedback

- Toast notifications for action results
- Inline validation errors on forms
- Loading states during async operations
- Error pages for critical failures

## Testing Strategy

### Unit Tests

- Component rendering tests
- Hook logic tests
- Utility function tests

### Integration Tests

- User flow tests
- API integration tests
- Authentication flow tests

### Test Stack

- **Vitest**: Test runner
- **Testing Library**: Component testing
- **jsdom**: DOM simulation

## Deployment

### Build Process

```
Source Code → TypeScript Compiler → Vite Bundler → Static Assets
                                                          ↓
                                                    CDN/Hosting
```

### Environment Configuration

- **Development**: `.env` with local Supabase
- **Staging**: Environment variables in CI/CD
- **Production**: Secure environment variables

### CI/CD Pipeline

```
Git Push → Lint & Type Check → Run Tests → Build → Deploy
```

## Monitoring and Observability

### Metrics

- Page load times
- API response times
- Error rates
- User engagement metrics

### Logging

- Client errors logged to console
- Server errors captured in Supabase logs
- Analytics events tracked in database

## Future Considerations

### Scalability

- Consider Redis for caching at scale
- Implement CDN for static assets
- Database read replicas for high traffic

### Features

- Real-time collaboration
- Advanced search with Elasticsearch
- Mobile application
- API for third-party integrations

### Technical Debt

- Migrate remaining any types to proper interfaces
- Add more comprehensive test coverage
- Implement proper logging service
- Add performance monitoring

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development guidelines.
