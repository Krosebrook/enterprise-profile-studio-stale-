# Enterprise Profile Studio

A powerful platform for creating, managing, and sharing professional enterprise profiles. Build stunning company profiles with ease using our intuitive wizard-based interface, showcase your team and services, manage deals and analytics, and maintain a comprehensive knowledge base.

## 🌟 Features

### Profile Management
- **Guided Profile Creation**: Step-by-step wizard for building comprehensive enterprise profiles
- **Multiple Templates**: Pre-configured templates for various industries (Tech, Consulting, Healthcare, Legal, etc.)
- **Real-time Preview**: See your profile as you build it
- **Public Sharing**: Share profiles via unique URLs
- **PDF Export**: Generate professional PDF versions of your profiles

### Deal Pipeline Management
- **Deal Tracking**: Manage deals through customizable pipeline stages
- **Deal Comparison**: Compare multiple deals side-by-side
- **Analytics Dashboard**: Track deal metrics and performance
- **Investment Memos**: Document deal analysis and decisions

### Knowledge Base
- **Document Management**: Organize documents in folders
- **Search & Tagging**: Powerful search with tag-based organization
- **Templates**: Document templates for common use cases
- **Markdown Support**: Rich text editing with markdown

### Analytics & Insights
- **Profile Analytics**: Track views, shares, and engagement
- **Dashboard Metrics**: Comprehensive analytics dashboard
- **Real-time Updates**: Live data refresh every 30 seconds

### Additional Features
- **Authentication**: Secure user authentication with Supabase
- **Onboarding**: Personalized onboarding flow for new users
- **AI Suggestions**: AI-powered content suggestions (via Supabase Edge Functions)
- **Keyboard Shortcuts**: Power user shortcuts for common actions
- **Command Palette**: Quick access to all features (Cmd/Ctrl+K)
- **Dark Mode**: Built-in theme support

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account (for backend services)

### Installation

```sh
# Clone the repository
git clone https://github.com/Krosebrook/enterprise-profile-studio.git

# Navigate to the project directory
cd enterprise-profile-studio

# Install dependencies
npm install

# Set up environment variables (see .env file)
# Update VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Environment Variables

Create a `.env` file in the root directory with:

```env
VITE_SUPABASE_PROJECT_ID=your_project_id
VITE_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
VITE_SUPABASE_URL=your_supabase_url
```

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
│   ├── deals/        # Deal management components
│   ├── knowledge/    # Knowledge base components
│   ├── layout/       # Layout components
│   ├── onboarding/   # Onboarding flow components
│   ├── ui/           # Reusable UI components (shadcn-ui)
│   └── wizard/       # Profile wizard components
├── contexts/         # React contexts (Auth, etc.)
├── data/             # Static data and templates
├── hooks/            # Custom React hooks
├── integrations/     # External integrations (Supabase)
├── lib/              # Utility libraries
├── pages/            # Page components
├── types/            # TypeScript type definitions
└── test/             # Test files

supabase/
├── functions/        # Edge Functions
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

### Backend & Services
- **Supabase**: Backend-as-a-Service
  - PostgreSQL database
  - Authentication
  - Real-time subscriptions
  - Edge Functions
  - Storage

### Development Tools
- **ESLint**: Code linting
- **Vitest**: Unit testing
- **Testing Library**: React component testing

## 🧪 Testing

```sh
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

## 📝 License

This project is private and proprietary.

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development guidelines and best practices.

## 📚 Additional Documentation

- [Architecture Documentation](./ARCHITECTURE.md) - System architecture and design patterns
- [API Documentation](./docs/API.md) - API endpoints and integrations
- [Deployment Guide](./docs/DEPLOYMENT.md) - How to deploy the application

## 🔒 Security

If you discover a security vulnerability, please email security@example.com.

## 📞 Support

For support, please open an issue in the GitHub repository or contact the development team.
