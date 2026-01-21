/**
 * Employee AI Persona Type Definitions
 * 
 * Types for managing employee personas, hats (roles), and ecosystem exports
 */

export interface CommunicationStyle {
  formality: 'casual' | 'balanced' | 'formal';
  detail_level: 'concise' | 'balanced' | 'detailed';
  examples_preference: 'minimal' | 'moderate' | 'extensive';
  technical_depth: 'simplified' | 'balanced' | 'technical';
}

export interface WorkPreferences {
  focus_time: 'morning' | 'afternoon' | 'evening' | 'flexible';
  collaboration_style: 'async' | 'realtime' | 'mixed';
  decision_making: 'data_driven' | 'intuitive' | 'collaborative';
  feedback_preference: 'direct' | 'diplomatic' | 'coaching';
}

export interface EmployeePersona {
  id: string;
  user_id: string;
  name: string;
  email?: string;
  department?: string;
  job_title?: string;
  
  // Communication & work style
  communication_style: CommunicationStyle;
  work_preferences: WorkPreferences;
  pain_points: string[];
  goals: string[];
  
  // Skills and expertise
  skills: string[];
  expertise_areas: string[];
  tools_used: string[];
  
  // AI preferences
  ai_interaction_style: 'concise' | 'balanced' | 'comprehensive';
  preferred_response_length: 'short' | 'medium' | 'long';
  preferred_tone: 'casual' | 'professional' | 'formal';
  
  // Metadata
  status: 'draft' | 'active' | 'archived';
  created_at: string;
  updated_at: string;
}

export interface EmployeeHat {
  id: string;
  persona_id: string;
  user_id: string;
  name: string;
  description?: string;
  
  // Role details
  responsibilities: string[];
  key_tasks: string[];
  stakeholders: string[];
  tools: string[];
  
  // Time allocation
  time_percentage: number;
  priority: number;
  
  // AI optimization
  ai_suggestions: HatAISuggestions;
  optimized_prompt?: string;
  
  // Metadata
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface HatAISuggestions {
  efficiency_tips?: string[];
  automation_opportunities?: string[];
  skill_gaps?: string[];
  recommended_tools?: string[];
  prompt_improvements?: string[];
}

export interface EcosystemExport {
  id: string;
  persona_id: string;
  user_id: string;
  
  ecosystem: 'claude' | 'copilot' | 'gemini';
  export_type: 'system_prompt' | 'context' | 'configuration';
  name: string;
  
  content: string;
  configuration: EcosystemConfiguration;
  
  version: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface EcosystemConfiguration {
  model?: string;
  temperature?: number;
  max_tokens?: number;
  custom_instructions?: string[];
  enabled_features?: string[];
}

// Form/Input types
export interface CreatePersonaInput {
  name: string;
  email?: string;
  department?: string;
  job_title?: string;
}

export interface CreateHatInput {
  name: string;
  description?: string;
  responsibilities?: string[];
  key_tasks?: string[];
  time_percentage?: number;
}

// Constants
export const DEPARTMENTS = [
  'Engineering',
  'Product',
  'Design',
  'Marketing',
  'Sales',
  'Customer Success',
  'Operations',
  'Finance',
  'HR',
  'Legal',
  'Executive',
] as const;

export const COMMON_TOOLS = [
  'Slack',
  'Microsoft Teams',
  'Google Workspace',
  'Notion',
  'Jira',
  'Confluence',
  'GitHub',
  'GitLab',
  'Figma',
  'Salesforce',
  'HubSpot',
  'Zendesk',
  'Linear',
  'Asana',
  'Monday.com',
] as const;

export const ECOSYSTEMS = [
  { id: 'claude', name: 'Claude (Anthropic)', icon: 'Bot', color: 'bg-orange-500' },
  { id: 'copilot', name: 'Microsoft Copilot', icon: 'Sparkles', color: 'bg-blue-500' },
  { id: 'gemini', name: 'Google Gemini', icon: 'Zap', color: 'bg-purple-500' },
] as const;

export const COMMUNICATION_STYLES = {
  formality: [
    { value: 'casual', label: 'Casual', description: 'Friendly and relaxed' },
    { value: 'balanced', label: 'Balanced', description: 'Professional but approachable' },
    { value: 'formal', label: 'Formal', description: 'Strictly professional' },
  ],
  detail_level: [
    { value: 'concise', label: 'Concise', description: 'Brief and to the point' },
    { value: 'balanced', label: 'Balanced', description: 'Moderate detail' },
    { value: 'detailed', label: 'Detailed', description: 'Comprehensive explanations' },
  ],
  examples_preference: [
    { value: 'minimal', label: 'Minimal', description: 'Few examples' },
    { value: 'moderate', label: 'Moderate', description: 'Some examples' },
    { value: 'extensive', label: 'Extensive', description: 'Many examples' },
  ],
  technical_depth: [
    { value: 'simplified', label: 'Simplified', description: 'Non-technical language' },
    { value: 'balanced', label: 'Balanced', description: 'Some technical terms' },
    { value: 'technical', label: 'Technical', description: 'Full technical depth' },
  ],
} as const;
