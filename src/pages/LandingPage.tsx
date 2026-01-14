import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ArrowRight, 
  Shield, 
  Zap, 
  Globe,
  Users,
  BarChart3,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

const features = [
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: 'Professional Profiles',
    description: 'Create stunning enterprise profiles that showcase your company\'s strengths.',
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: 'Compliance Ready',
    description: 'Display certifications and security credentials with confidence.',
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: 'Quick Setup',
    description: 'Guided wizard walks you through each section in minutes.',
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: 'Share Anywhere',
    description: 'Publish with a unique URL or export to PDF for offline use.',
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: 'Team Showcase',
    description: 'Highlight your leadership team with rich profiles.',
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    title: 'Analytics',
    description: 'Track profile views and engagement in real-time.',
  },
];

const benefits = [
  'Streamlined profile creation',
  'Professional, modern design',
  'Secure data storage',
  'Version history & revisions',
  'Team collaboration',
  'Export & share capabilities',
];

export default function LandingPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pb-24 pt-32">
        {/* Halftone pattern background */}
        <div className="absolute inset-0 halftone-pattern opacity-50" />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-primary/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-accent/5 to-transparent" />
        
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm shadow-sm">
              <span className="the-dot" />
              <span className="text-muted-foreground">Business Solutions You CAN Take for Granted</span>
            </div>
            
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Create Professional
              <span className="text-gradient block mt-2">Enterprise Profiles</span>
            </h1>
            
            <p className="mt-6 text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto">
              Showcase your company's capabilities, team, services, and compliance credentials 
              with beautiful, shareable enterprise profiles.
            </p>
            
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button 
                asChild 
                size="lg" 
                className="accent-gradient border-0 px-8 shadow-md hover:shadow-lg transition-shadow"
              >
                <Link to={user ? '/dashboard' : '/signup'}>
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-border/60 hover:bg-muted"
              >
                <Link to="/login">
                  Sign In
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="the-dot-lg" />
              <span className="text-sm font-medium text-accent uppercase tracking-wider">Features</span>
            </div>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Everything you need to
              <span className="text-gradient"> stand out</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Build comprehensive enterprise profiles with our intuitive tools
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group rounded-xl border border-border/50 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/20"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  {feature.icon}
                </div>
                <h3 className="mb-2 font-display text-lg font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24">
        <div className="container">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="the-dot-lg" />
                <span className="text-sm font-medium text-accent uppercase tracking-wider">Why Choose Us</span>
              </div>
              <h2 className="font-display text-3xl font-bold md:text-4xl">
                Built for modern
                <span className="text-gradient"> enterprises</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Whether you're a startup or an established enterprise, our platform 
                helps you create professional profiles that win trust and business.
              </p>
              
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/10">
                      <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
                    </div>
                    <span className="text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                asChild 
                size="lg" 
                className="mt-8 accent-gradient border-0 shadow-md hover:shadow-lg transition-shadow"
              >
                <Link to={user ? '/dashboard' : '/signup'}>
                  Start Building
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            
            {/* Preview Card */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 blur-2xl" />
              <div className="relative rounded-xl border border-border bg-card p-8 shadow-xl">
                <div className="mb-6 flex items-center gap-4">
                  <div className="h-14 w-14 rounded-xl primary-gradient flex items-center justify-center shadow-glow">
                    <Sparkles className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold">Acme Corporation</h3>
                    <p className="text-muted-foreground text-sm">Technology • Since 2020</p>
                  </div>
                </div>
                <p className="mb-6 text-muted-foreground text-sm leading-relaxed">
                  Leading provider of innovative enterprise solutions, serving Fortune 500 
                  companies worldwide with cutting-edge technology.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">SOC 2</span>
                  <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">ISO 27001</span>
                  <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">GDPR</span>
                </div>
              </div>
            </div>
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
                Ready to build your enterprise profile?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">
                Join thousands of companies using our platform to showcase their 
                capabilities and win new business.
              </p>
              <Button 
                asChild 
                size="lg" 
                className="mt-8 bg-white text-foreground hover:bg-white/90 shadow-lg"
              >
                <Link to={user ? '/dashboard' : '/signup'}>
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
