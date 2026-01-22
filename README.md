# INT OS (Enterprise Profile Studio)

A powerful platform for creating enterprise profiles, managing AI personas, and maintaining a comprehensive knowledge base. Build professional company profiles, configure AI assistants for team members across multiple ecosystems (Claude, Copilot, Gemini), and organize documentation with our intuitive interface.

## 🌟 Features

### Profile Management
- **Guided Profile Creation**: Step-by-step wizard for building comprehensive enterprise profiles
- **Multiple Templates**: Pre-configured templates for various industries (Tech, Consulting, Healthcare, Legal, etc.)
- **Real-time Preview**: See your profile as you build it
- **Public Sharing**: Share profiles via unique URLs
- **PDF Export**: Generate professional PDF versions of your profiles

### AI Persona Management
- **Employee Personas**: Create detailed AI-ready configurations for team members
- **Multi-Ecosystem Export**: Generate optimized prompts for Claude, Microsoft Copilot, and Google Gemini
- **Template Library**: Pre-built persona templates for common roles (Sales, Engineering, Product, etc.)
- **AI Auto-Fill**: Generate persona details from job title and department
- **Hats/Roles System**: Define multiple roles per person with time allocation
- **Bulk Export**: Download all persona configurations as a ZIP file
- **Knowledge Base Integration**: Auto-generate AI configuration documents

### Knowledge Base
- **Document Management**: Organize documents in hierarchical folders
- **Search & Tagging**: Powerful full-text search with multi-tag filtering
- **Templates**: Document templates for common use cases
- **Markdown Support**: Rich text editing with markdown
- **Version History**: Track changes with snapshot-based versioning
- **Favorites**: Quick access to important documents
- **Seed Libraries**: Pre-built content libraries:
  - Industry Standard Documents
  - INT Inc. Strategy (Hybrid Intelligence frameworks)
  - INT Inc. Research (Department taxonomy, ROI analysis)
  - INT Inc. Methodology (4-Agent Architecture, R-I-S-E formula)
  - FlashFusion Design System (Component library, integration guides)

### Analytics & Insights
- **Profile Analytics**: Track views, shares, and engagement
- **Dashboard Metrics**: Comprehensive analytics dashboard
- **Real-time Updates**: Live data refresh

### Additional Features
- **Authentication**: Secure user authentication via Lovable Cloud
- **Onboarding**: Personalized onboarding flow for new users
- **AI Suggestions**: AI-powered content suggestions
- **Keyboard Shortcuts**: Power user shortcuts for common actions (Cmd/Ctrl+K)
- **Command Palette**: Quick access to all features
- **Dark Mode**: Built-in theme support with FlashFusion design system

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Lovable Cloud account (for backend services)

### Installation

```sh
# Clone the repository
git clone https://github.com/your-org/int-os.git

# Navigate to the project directory
cd int-os

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 🛠️ Development

### Available Scripts

```sh
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Build for development (includes source maps)
npm run build:dev

# Run linter
npm run lint

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Preview production build
npm run preview
```

### Project Structure

```
src/
├── components/        # React components
│   ├── auth/         # Authentication components
│   ├── dashboard/    # Dashboard components
│   ├── knowledge/    # Knowledge base components
│   ├── layout/       # Layout components
│   ├── onboarding/   # Onboarding flow components
│   ├── persona/      # Persona management components
│   ├── ui/           # Reusable UI components (shadcn-ui)
│   └── wizard/       # Profile wizard components
├── contexts/         # React contexts (Auth, etc.)
├── data/             # Static data and templates
│   ├── flashFusionDocuments.ts    # Design system docs
│   ├── intIncMethodologyDocuments.ts  # Methodology frameworks
│   ├── intIncResearchDocuments.ts     # Research documents
│   ├── intIncStrategyDocuments.ts     # Strategy documents
│   └── personaTemplates.ts            # Persona templates
├── hooks/            # Custom React hooks
├── integrations/     # External integrations (Supabase)
├── lib/              # Utility libraries
├── pages/            # Page components
├── types/            # TypeScript type definitions
└── test/             # Test files

supabase/
├── functions/        # Edge Functions
│   ├── generate-document/
│   ├── generate-persona/
│   ├── generate-persona-prompts/
│   └── ...
└── migrations/       # Database migrations
```

## 🏗️ Tech Stack

### Frontend
- **React 18**: UI library
- **TypeScript**: Type safety and better DX
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality React components
- **Radix UI**: Unstyled, accessible components
- **TanStack Query**: Data fetching and caching
- **React Router**: Client-side routing
- **Framer Motion**: Animations
- **Lucide React**: Icon library

### Backend (Lovable Cloud)
- PostgreSQL database
- Authentication
- Real-time subscriptions
- Edge Functions (AI-powered features)
- Storage

### AI Integration
- **Lovable AI Gateway**: Access to Gemini models without API keys
- Multi-ecosystem prompt generation
- Content suggestions and auto-fill

### Development Tools
- **ESLint**: Code linting
- **Vitest**: Unit testing
- **Testing Library**: React component testing
- **Playwright**: E2E testing

## 🎨 Design System

The application uses the FlashFusion × INT Inc. unified design system:

### Color Palette
- **Eclipse Navy**: Deep backgrounds
- **Cloudburst Blue**: Primary CTAs and active states
- **Purple Highlight**: Premium features
- **Signature Orange**: Brand accent

### Components
- RACI badge system (Responsible, Accountable, Consulted, Informed)
- Glassmorphism cards with backdrop blur
- Hero gradients (Green → Cyan → Blue)
- Pillar borders for section headers

## 📝 License

This project is private and proprietary.

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development guidelines and best practices.

## 📚 Additional Documentation

- [Architecture Documentation](./ARCHITECTURE.md) - System architecture and design patterns
- [Security Documentation](./SECURITY.md) - Security practices and guidelines

## 🔒 Security

If you discover a security vulnerability, please review [SECURITY.md](./SECURITY.md).
