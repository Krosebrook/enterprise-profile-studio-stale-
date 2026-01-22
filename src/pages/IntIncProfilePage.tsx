import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ROICalculatorWidget } from '@/components/pricing/ROICalculatorWidget';
import { 
  ArrowRight, 
  Check, 
  Sparkles, 
  Building2, 
  Users, 
  Zap,
  Globe,
  Shield,
  Code,
  Bot,
  Workflow,
  Brain,
  ChevronRight,
  Star
} from 'lucide-react';

const pricingTiers = [
  {
    name: 'Starter',
    description: 'For small teams getting started with AI enablement',
    price: '$299',
    period: '/month',
    features: [
      'Up to 10 employee personas',
      'Claude & Gemini exports',
      '5 knowledge base documents',
      'Email support',
      'Basic analytics'
    ],
    cta: 'Start Free Trial',
    popular: false,
    icon: <Zap className="h-5 w-5" />
  },
  {
    name: 'Professional',
    description: 'For growing organizations scaling AI adoption',
    price: '$799',
    period: '/month',
    features: [
      'Up to 50 employee personas',
      'All ecosystem exports',
      'Unlimited knowledge base',
      'Priority support',
      'Advanced analytics',
      'Custom API integrations',
      'n8n workflow templates'
    ],
    cta: 'Get Started',
    popular: true,
    icon: <Brain className="h-5 w-5" />
  },
  {
    name: 'Enterprise',
    description: 'For large enterprises with custom requirements',
    price: 'Custom',
    period: '',
    features: [
      'Unlimited personas',
      'All ecosystem exports',
      'Dedicated success manager',
      'SSO & SAML integration',
      'Custom SLAs',
      'On-premise deployment',
      'White-label options',
      'API rate limits removed'
    ],
    cta: 'Contact Sales',
    popular: false,
    icon: <Building2 className="h-5 w-5" />
  }
];

const integrationExamples = [
  {
    name: 'Claude for Developers',
    ecosystem: 'Anthropic',
    description: 'Configure Claude with developer-specific system prompts, code review guidelines, and technical documentation context.',
    setup: [
      'Generate persona in INT OS',
      'Export Claude custom instructions',
      'Paste into Claude Projects settings',
      'Optional: Configure via AWS Bedrock API'
    ],
    icon: <Bot className="h-8 w-8" />,
    color: 'bg-orange-500/10 text-orange-500'
  },
  {
    name: 'Microsoft Copilot for Enterprise',
    ecosystem: 'Microsoft 365',
    description: 'Deploy role-specific Copilot configurations across your organization with proper M365 licensing and Entra ID groups.',
    setup: [
      'Verify M365 E3/E5 or F1/F3 licensing',
      'Configure Entra ID security groups',
      'Export persona as Copilot instructions',
      'Deploy via Microsoft Admin Center'
    ],
    icon: <Sparkles className="h-8 w-8" />,
    color: 'bg-blue-500/10 text-blue-500'
  },
  {
    name: 'Google Gemini for Teams',
    ecosystem: 'Google Workspace',
    description: 'Enable Gemini across Workspace with department-specific AI configurations and data governance policies.',
    setup: [
      'Enable Gemini in Google Admin',
      'Configure organizational units',
      'Export persona instructions',
      'Apply via Gemini settings'
    ],
    icon: <Brain className="h-8 w-8" />,
    color: 'bg-emerald-500/10 text-emerald-500'
  },
  {
    name: 'n8n Workflow Automation',
    ecosystem: 'Custom API',
    description: 'Connect personas to automated workflows using our JSON API export for n8n, Make, or Zapier integrations.',
    setup: [
      'Export persona as Custom API JSON',
      'Import into n8n workflow',
      'Configure webhook triggers',
      'Connect to your business systems'
    ],
    icon: <Workflow className="h-8 w-8" />,
    color: 'bg-purple-500/10 text-purple-500'
  }
];

const stats = [
  { value: '500+', label: 'Enterprise Clients' },
  { value: '50K+', label: 'AI Personas Created' },
  { value: '99.9%', label: 'Platform Uptime' },
  { value: '4.9/5', label: 'Customer Rating' }
];

const capabilities = [
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Employee AI Personas',
    description: 'Create personalized AI configurations for every role in your organization.'
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: 'Multi-Ecosystem Export',
    description: 'Deploy to Claude, Microsoft Copilot, Google Gemini, and custom APIs.'
  },
  {
    icon: <Code className="h-6 w-6" />,
    title: 'API-First Architecture',
    description: 'Integrate with your existing tools via REST APIs and webhooks.'
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'Enterprise Security',
    description: 'SOC 2 Type II certified with full GDPR and CCPA compliance.'
  }
];

export default function IntIncProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pb-24 pt-32">
        <div className="absolute inset-0 halftone-pattern opacity-50" />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-primary/10 to-transparent" />
        
        <div className="container relative">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-border bg-card px-5 py-2.5 shadow-sm">
              <span className="the-dot" />
              <span className="font-display font-semibold text-foreground">INT Inc.</span>
              <span className="text-muted-foreground">|</span>
              <span className="text-muted-foreground">AI-as-a-Service</span>
            </div>
            
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Enterprise AI Enablement
              <span className="text-gradient block mt-2">Platform</span>
            </h1>
            
            <p className="mt-6 text-lg text-muted-foreground md:text-xl max-w-3xl mx-auto">
              INT Inc. delivers AI-as-a-Service (AIaaS) solutions that transform how your workforce 
              interacts with AI. Create, deploy, and manage AI personas across Claude, Microsoft Copilot, 
              Google Gemini, and custom integrations.
            </p>
            
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button 
                asChild 
                size="lg" 
                className="accent-gradient border-0 px-8 shadow-md hover:shadow-lg transition-shadow"
              >
                <Link to="/signup">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-border/60 hover:bg-muted"
              >
                <Link to="/ai-explorer">
                  Explore AI Platforms
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-border bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-display text-3xl md:text-4xl font-bold text-gradient">{stat.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-24">
        <div className="container">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="the-dot-lg" />
              <span className="text-sm font-medium text-accent uppercase tracking-wider">AIaaS Platform</span>
            </div>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Everything You Need for
              <span className="text-gradient"> AI Adoption</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A complete platform for managing AI enablement across your enterprise
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((capability, index) => (
              <Card key={index} className="group hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:border-primary/20">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    {capability.icon}
                  </div>
                  <CardTitle className="font-display text-lg">{capability.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{capability.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="the-dot-lg" />
              <span className="text-sm font-medium text-accent uppercase tracking-wider">Pricing</span>
            </div>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Simple, Transparent
              <span className="text-gradient"> Pricing</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Choose the plan that fits your organization's AI enablement needs
            </p>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-4 max-w-7xl mx-auto">
            {/* Pricing Tiers */}
            <div className="lg:col-span-3 grid gap-8 md:grid-cols-3">
              {pricingTiers.map((tier, index) => (
                <Card 
                  key={index} 
                  className={`relative ${tier.popular ? 'border-primary shadow-lg shadow-primary/10 scale-105' : ''}`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="accent-gradient border-0 px-4 py-1">
                        <Star className="h-3 w-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-8 pt-6">
                    <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${tier.popular ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'}`}>
                      {tier.icon}
                    </div>
                    <CardTitle className="font-display text-xl">{tier.name}</CardTitle>
                    <CardDescription className="text-sm">{tier.description}</CardDescription>
                    <div className="mt-4">
                      <span className="font-display text-4xl font-bold">{tier.price}</span>
                      <span className="text-muted-foreground">{tier.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-8">
                      {tier.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/10 shrink-0 mt-0.5">
                            <Check className="h-3 w-3 text-accent" />
                          </div>
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className={`w-full ${tier.popular ? 'accent-gradient border-0' : ''}`}
                      variant={tier.popular ? 'default' : 'outline'}
                      asChild
                    >
                      <Link to="/signup">
                        {tier.cta}
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* ROI Calculator */}
            <div className="lg:col-span-1">
              <ROICalculatorWidget />
            </div>
          </div>
        </div>
      </section>

      {/* Integration Examples Section */}
      <section className="py-24">
        <div className="container">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="the-dot-lg" />
              <span className="text-sm font-medium text-accent uppercase tracking-wider">Integrations</span>
            </div>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Deploy to Any
              <span className="text-gradient"> AI Ecosystem</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Step-by-step integration guides for major AI platforms
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            {integrationExamples.map((integration, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${integration.color}`}>
                      {integration.icon}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {integration.ecosystem}
                    </Badge>
                  </div>
                  <CardTitle className="font-display text-xl mt-4">{integration.name}</CardTitle>
                  <CardDescription>{integration.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Setup Steps</p>
                    <ol className="space-y-2">
                      {integration.setup.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex items-start gap-3">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium shrink-0 mt-0.5">
                            {stepIndex + 1}
                          </span>
                          <span className="text-sm">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="relative overflow-hidden rounded-2xl hero-gradient px-8 py-16 text-center md:px-16">
            <div className="absolute inset-0 halftone-pattern opacity-10" />
            
            <div className="relative">
              <div className="flex justify-center mb-6">
                <div className="the-dot-lg animate-pulse-dot" />
              </div>
              <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
                Ready to Transform Your AI Strategy?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">
                Join 500+ enterprises using INT Inc. to enable AI-powered productivity 
                across their organizations.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-white text-foreground hover:bg-white/90 shadow-lg"
                >
                  <Link to="/signup">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button 
                  asChild 
                  size="lg" 
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  <Link to="/personas">
                    Build Your First Persona
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
