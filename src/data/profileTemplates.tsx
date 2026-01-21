import { Building2, Briefcase, Code, Stethoscope, Scale, Rocket, GraduationCap, ShoppingBag } from 'lucide-react';
import type { ProfileTemplate } from '@/types/profile';

export type { ProfileTemplate };

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
      services: { services: [] },
      team: {},
      compliance: {},
      metadata: {},
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
      services: {
        services: [
          { id: '1', title: 'Software Development', description: 'Custom software solutions tailored to your business needs' },
          { id: '2', title: 'Cloud Infrastructure', description: 'Scalable and secure cloud solutions' },
          { id: '3', title: 'Technical Consulting', description: 'Expert guidance for digital transformation' },
        ],
      },
      team: {},
      compliance: { 
        certifications: [
          { id: '1', name: 'ISO 27001', issuer: 'ISO' },
          { id: '2', name: 'SOC 2', issuer: 'AICPA' },
        ] 
      },
      metadata: {},
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
      services: {
        services: [
          { id: '1', title: 'Strategy Consulting', description: 'Transform your business with data-driven strategies' },
          { id: '2', title: 'Operations Excellence', description: 'Optimize processes for maximum efficiency' },
          { id: '3', title: 'Digital Transformation', description: 'Navigate the digital landscape with confidence' },
        ],
      },
      team: {},
      compliance: { 
        certifications: [
          { id: '1', name: 'ISO 27001', issuer: 'ISO' },
        ] 
      },
      metadata: {},
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
      services: {
        services: [
          { id: '1', title: 'Patient Care', description: 'Comprehensive healthcare services for all ages' },
          { id: '2', title: 'Specialized Treatment', description: 'Expert care from board-certified specialists' },
          { id: '3', title: 'Preventive Medicine', description: 'Proactive health management and wellness programs' },
        ],
      },
      team: {},
      compliance: { 
        certifications: [
          { id: '1', name: 'HIPAA', issuer: 'HHS' },
          { id: '2', name: 'ISO 27001', issuer: 'ISO' },
        ] 
      },
      metadata: {},
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
      services: {
        services: [
          { id: '1', title: 'Corporate Law', description: 'Comprehensive legal solutions for businesses' },
          { id: '2', title: 'Litigation', description: 'Skilled representation in complex disputes' },
          { id: '3', title: 'Regulatory Compliance', description: 'Navigate regulations with confidence' },
        ],
      },
      team: {},
      compliance: {},
      metadata: {},
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
      services: {
        services: [
          { id: '1', title: 'Brand Strategy', description: 'Build memorable brands that resonate' },
          { id: '2', title: 'Digital Marketing', description: 'Data-driven campaigns that deliver results' },
          { id: '3', title: 'Creative Design', description: 'Stunning visuals that tell your story' },
        ],
      },
      team: {},
      compliance: { 
        certifications: [
          { id: '1', name: 'GDPR Compliant', issuer: 'EU' },
        ] 
      },
      metadata: {},
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
      services: {
        services: [
          { id: '1', title: 'Academic Programs', description: 'Comprehensive curriculum for all levels' },
          { id: '2', title: 'Professional Development', description: 'Skills training for career advancement' },
          { id: '3', title: 'Research & Innovation', description: 'Cutting-edge research initiatives' },
        ],
      },
      team: {},
      compliance: {},
      metadata: {},
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
      services: {
        services: [
          { id: '1', title: 'Product Catalog', description: 'Wide selection of quality products' },
          { id: '2', title: 'Fast Shipping', description: 'Quick and reliable delivery worldwide' },
          { id: '3', title: 'Customer Support', description: '24/7 assistance for all your needs' },
        ],
      },
      team: {},
      compliance: { 
        certifications: [
          { id: '1', name: 'PCI DSS', issuer: 'PCI SSC' },
          { id: '2', name: 'GDPR Compliant', issuer: 'EU' },
        ] 
      },
      metadata: {},
    },
  },
];
