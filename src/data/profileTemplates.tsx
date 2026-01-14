import { Building2, Briefcase, Code, Stethoscope, Scale, Rocket, GraduationCap, ShoppingBag } from 'lucide-react';

export interface ProfileTemplate {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  data: {
    company_info: Record<string, any>;
    branding: Record<string, any>;
    services: any[];
    compliance: Record<string, any>;
  };
}

export const profileTemplates: ProfileTemplate[] = [
  {
    id: 'blank',
    name: 'Blank Profile',
    description: 'Start from scratch with a clean slate',
    icon: Building2,
    color: 'bg-slate-500',
    data: {
      company_info: {},
      branding: { primaryColor: '#3B82F6', secondaryColor: '#8B5CF6', accentColor: '#10B981' },
      services: [],
      compliance: {},
    },
  },
  {
    id: 'tech-startup',
    name: 'Tech Startup',
    description: 'Perfect for software companies and tech ventures',
    icon: Rocket,
    color: 'bg-violet-500',
    data: {
      company_info: {
        industry: 'Technology',
        tagline: 'Innovating for a better tomorrow',
      },
      branding: { primaryColor: '#8B5CF6', secondaryColor: '#06B6D4', accentColor: '#F59E0B' },
      services: [
        { id: '1', name: 'Software Development', description: 'Custom software solutions tailored to your business needs' },
        { id: '2', name: 'Cloud Infrastructure', description: 'Scalable and secure cloud solutions' },
        { id: '3', name: 'Technical Consulting', description: 'Expert guidance for digital transformation' },
      ],
      compliance: { certifications: ['iso27001', 'soc2'] },
    },
  },
  {
    id: 'consulting',
    name: 'Consulting Firm',
    description: 'Ideal for professional services and advisory',
    icon: Briefcase,
    color: 'bg-blue-500',
    data: {
      company_info: {
        industry: 'Consulting',
        tagline: 'Strategic insights for sustainable growth',
      },
      branding: { primaryColor: '#1E40AF', secondaryColor: '#3B82F6', accentColor: '#059669' },
      services: [
        { id: '1', name: 'Strategy Consulting', description: 'Transform your business with data-driven strategies' },
        { id: '2', name: 'Operations Excellence', description: 'Optimize processes for maximum efficiency' },
        { id: '3', name: 'Digital Transformation', description: 'Navigate the digital landscape with confidence' },
      ],
      compliance: { certifications: ['iso27001'] },
    },
  },
  {
    id: 'healthcare',
    name: 'Healthcare Provider',
    description: 'For medical practices and healthcare organizations',
    icon: Stethoscope,
    color: 'bg-emerald-500',
    data: {
      company_info: {
        industry: 'Healthcare',
        tagline: 'Compassionate care, exceptional outcomes',
      },
      branding: { primaryColor: '#059669', secondaryColor: '#10B981', accentColor: '#3B82F6' },
      services: [
        { id: '1', name: 'Patient Care', description: 'Comprehensive healthcare services for all ages' },
        { id: '2', name: 'Specialized Treatment', description: 'Expert care from board-certified specialists' },
        { id: '3', name: 'Preventive Medicine', description: 'Proactive health management and wellness programs' },
      ],
      compliance: { certifications: ['hipaa', 'iso27001'] },
    },
  },
  {
    id: 'legal',
    name: 'Law Firm',
    description: 'Professional template for legal practices',
    icon: Scale,
    color: 'bg-amber-600',
    data: {
      company_info: {
        industry: 'Legal Services',
        tagline: 'Trusted counsel for complex challenges',
      },
      branding: { primaryColor: '#92400E', secondaryColor: '#D97706', accentColor: '#1E40AF' },
      services: [
        { id: '1', name: 'Corporate Law', description: 'Comprehensive legal solutions for businesses' },
        { id: '2', name: 'Litigation', description: 'Skilled representation in complex disputes' },
        { id: '3', name: 'Regulatory Compliance', description: 'Navigate regulations with confidence' },
      ],
      compliance: {},
    },
  },
  {
    id: 'agency',
    name: 'Creative Agency',
    description: 'For marketing, design, and creative studios',
    icon: Code,
    color: 'bg-pink-500',
    data: {
      company_info: {
        industry: 'Creative Services',
        tagline: 'Where creativity meets strategy',
      },
      branding: { primaryColor: '#EC4899', secondaryColor: '#8B5CF6', accentColor: '#F59E0B' },
      services: [
        { id: '1', name: 'Brand Strategy', description: 'Build memorable brands that resonate' },
        { id: '2', name: 'Digital Marketing', description: 'Data-driven campaigns that deliver results' },
        { id: '3', name: 'Creative Design', description: 'Stunning visuals that tell your story' },
      ],
      compliance: { certifications: ['gdpr'] },
    },
  },
  {
    id: 'education',
    name: 'Educational Institution',
    description: 'For schools, universities, and training providers',
    icon: GraduationCap,
    color: 'bg-indigo-500',
    data: {
      company_info: {
        industry: 'Education',
        tagline: 'Empowering minds, shaping futures',
      },
      branding: { primaryColor: '#4F46E5', secondaryColor: '#6366F1', accentColor: '#10B981' },
      services: [
        { id: '1', name: 'Academic Programs', description: 'Comprehensive curriculum for all levels' },
        { id: '2', name: 'Professional Development', description: 'Skills training for career advancement' },
        { id: '3', name: 'Research & Innovation', description: 'Cutting-edge research initiatives' },
      ],
      compliance: {},
    },
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce Business',
    description: 'For retail and online commerce companies',
    icon: ShoppingBag,
    color: 'bg-orange-500',
    data: {
      company_info: {
        industry: 'E-Commerce',
        tagline: 'Your one-stop shop for quality products',
      },
      branding: { primaryColor: '#EA580C', secondaryColor: '#F97316', accentColor: '#059669' },
      services: [
        { id: '1', name: 'Product Catalog', description: 'Wide selection of quality products' },
        { id: '2', name: 'Fast Shipping', description: 'Quick and reliable delivery worldwide' },
        { id: '3', name: 'Customer Support', description: '24/7 assistance for all your needs' },
      ],
      compliance: { certifications: ['pciDss', 'gdpr'] },
    },
  },
];
