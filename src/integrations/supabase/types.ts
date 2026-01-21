export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      ai_assessments: {
        Row: {
          budget_timeline: Json | null
          created_at: string | null
          current_ai_usage: Json | null
          id: string
          organization_profile: Json | null
          readiness_score: number | null
          recommendations: Json | null
          technical_readiness: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          budget_timeline?: Json | null
          created_at?: string | null
          current_ai_usage?: Json | null
          id?: string
          organization_profile?: Json | null
          readiness_score?: number | null
          recommendations?: Json | null
          technical_readiness?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          budget_timeline?: Json | null
          created_at?: string | null
          current_ai_usage?: Json | null
          id?: string
          organization_profile?: Json | null
          readiness_score?: number | null
          recommendations?: Json | null
          technical_readiness?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      ai_platforms: {
        Row: {
          capabilities: Json
          category: string
          compliance: string[] | null
          context_window: string | null
          created_at: string | null
          ecosystem: string | null
          id: string
          logo_color: string | null
          market_share: string | null
          name: string
          pricing: string | null
          priority: string
          specialties: string[] | null
          target_users: string | null
          verdict: string | null
        }
        Insert: {
          capabilities?: Json
          category: string
          compliance?: string[] | null
          context_window?: string | null
          created_at?: string | null
          ecosystem?: string | null
          id: string
          logo_color?: string | null
          market_share?: string | null
          name: string
          pricing?: string | null
          priority: string
          specialties?: string[] | null
          target_users?: string | null
          verdict?: string | null
        }
        Update: {
          capabilities?: Json
          category?: string
          compliance?: string[] | null
          context_window?: string | null
          created_at?: string | null
          ecosystem?: string | null
          id?: string
          logo_color?: string | null
          market_share?: string | null
          name?: string
          pricing?: string | null
          priority?: string
          specialties?: string[] | null
          target_users?: string | null
          verdict?: string | null
        }
        Relationships: []
      }
      analytics_events: {
        Row: {
          created_at: string
          event_data: Json | null
          event_type: string
          id: string
          profile_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          event_data?: Json | null
          event_type: string
          id?: string
          profile_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          event_data?: Json | null
          event_type?: string
          id?: string
          profile_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "analytics_events_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "enterprise_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      document_favorites: {
        Row: {
          created_at: string | null
          document_id: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          document_id: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          document_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "document_favorites_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "knowledge_base_documents"
            referencedColumns: ["id"]
          },
        ]
      }
      document_versions: {
        Row: {
          category: string | null
          change_summary: string | null
          content: string
          created_at: string | null
          description: string | null
          document_id: string
          id: string
          tags: string[] | null
          title: string
          user_id: string
          version_number: number
        }
        Insert: {
          category?: string | null
          change_summary?: string | null
          content: string
          created_at?: string | null
          description?: string | null
          document_id: string
          id?: string
          tags?: string[] | null
          title: string
          user_id: string
          version_number: number
        }
        Update: {
          category?: string | null
          change_summary?: string | null
          content?: string
          created_at?: string | null
          description?: string | null
          document_id?: string
          id?: string
          tags?: string[] | null
          title?: string
          user_id?: string
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "document_versions_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "knowledge_base_documents"
            referencedColumns: ["id"]
          },
        ]
      }
      ecosystem_exports: {
        Row: {
          configuration: Json | null
          content: string
          created_at: string
          ecosystem: string
          export_type: string
          id: string
          is_active: boolean | null
          name: string
          persona_id: string
          updated_at: string
          user_id: string
          version: number | null
        }
        Insert: {
          configuration?: Json | null
          content: string
          created_at?: string
          ecosystem: string
          export_type: string
          id?: string
          is_active?: boolean | null
          name: string
          persona_id: string
          updated_at?: string
          user_id: string
          version?: number | null
        }
        Update: {
          configuration?: Json | null
          content?: string
          created_at?: string
          ecosystem?: string
          export_type?: string
          id?: string
          is_active?: boolean | null
          name?: string
          persona_id?: string
          updated_at?: string
          user_id?: string
          version?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ecosystem_exports_persona_id_fkey"
            columns: ["persona_id"]
            isOneToOne: false
            referencedRelation: "employee_personas"
            referencedColumns: ["id"]
          },
        ]
      }
      employee_hats: {
        Row: {
          ai_suggestions: Json | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          key_tasks: string[] | null
          name: string
          optimized_prompt: string | null
          persona_id: string
          priority: number | null
          responsibilities: string[] | null
          stakeholders: string[] | null
          time_percentage: number | null
          tools: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_suggestions?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          key_tasks?: string[] | null
          name: string
          optimized_prompt?: string | null
          persona_id: string
          priority?: number | null
          responsibilities?: string[] | null
          stakeholders?: string[] | null
          time_percentage?: number | null
          tools?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_suggestions?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          key_tasks?: string[] | null
          name?: string
          optimized_prompt?: string | null
          persona_id?: string
          priority?: number | null
          responsibilities?: string[] | null
          stakeholders?: string[] | null
          time_percentage?: number | null
          tools?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "employee_hats_persona_id_fkey"
            columns: ["persona_id"]
            isOneToOne: false
            referencedRelation: "employee_personas"
            referencedColumns: ["id"]
          },
        ]
      }
      employee_personas: {
        Row: {
          ai_interaction_style: string | null
          communication_style: Json | null
          created_at: string
          department: string | null
          email: string | null
          expertise_areas: string[] | null
          goals: string[] | null
          id: string
          job_title: string | null
          name: string
          pain_points: string[] | null
          preferred_response_length: string | null
          preferred_tone: string | null
          skills: string[] | null
          status: string | null
          tools_used: string[] | null
          updated_at: string
          user_id: string
          work_preferences: Json | null
        }
        Insert: {
          ai_interaction_style?: string | null
          communication_style?: Json | null
          created_at?: string
          department?: string | null
          email?: string | null
          expertise_areas?: string[] | null
          goals?: string[] | null
          id?: string
          job_title?: string | null
          name: string
          pain_points?: string[] | null
          preferred_response_length?: string | null
          preferred_tone?: string | null
          skills?: string[] | null
          status?: string | null
          tools_used?: string[] | null
          updated_at?: string
          user_id: string
          work_preferences?: Json | null
        }
        Update: {
          ai_interaction_style?: string | null
          communication_style?: Json | null
          created_at?: string
          department?: string | null
          email?: string | null
          expertise_areas?: string[] | null
          goals?: string[] | null
          id?: string
          job_title?: string | null
          name?: string
          pain_points?: string[] | null
          preferred_response_length?: string | null
          preferred_tone?: string | null
          skills?: string[] | null
          status?: string | null
          tools_used?: string[] | null
          updated_at?: string
          user_id?: string
          work_preferences?: Json | null
        }
        Relationships: []
      }
      enterprise_profiles: {
        Row: {
          branding: Json | null
          company_info: Json | null
          compliance: Json | null
          created_at: string
          id: string
          metadata: Json | null
          name: string
          published_at: string | null
          services: Json | null
          slug: string | null
          status: Database["public"]["Enums"]["profile_status"]
          team: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          branding?: Json | null
          company_info?: Json | null
          compliance?: Json | null
          created_at?: string
          id?: string
          metadata?: Json | null
          name: string
          published_at?: string | null
          services?: Json | null
          slug?: string | null
          status?: Database["public"]["Enums"]["profile_status"]
          team?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          branding?: Json | null
          company_info?: Json | null
          compliance?: Json | null
          created_at?: string
          id?: string
          metadata?: Json | null
          name?: string
          published_at?: string | null
          services?: Json | null
          slug?: string | null
          status?: Database["public"]["Enums"]["profile_status"]
          team?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      knowledge_base_documents: {
        Row: {
          category: string | null
          content: string
          created_at: string
          description: string | null
          folder_id: string | null
          id: string
          is_public: boolean | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category?: string | null
          content: string
          created_at?: string
          description?: string | null
          folder_id?: string | null
          id?: string
          is_public?: boolean | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string | null
          content?: string
          created_at?: string
          description?: string | null
          folder_id?: string | null
          id?: string
          is_public?: boolean | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "knowledge_base_documents_folder_id_fkey"
            columns: ["folder_id"]
            isOneToOne: false
            referencedRelation: "knowledge_base_folders"
            referencedColumns: ["id"]
          },
        ]
      }
      knowledge_base_folders: {
        Row: {
          color: string | null
          created_at: string
          icon: string | null
          id: string
          name: string
          parent_id: string | null
          slug: string
          sort_order: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          icon?: string | null
          id?: string
          name: string
          parent_id?: string | null
          slug: string
          sort_order?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          color?: string | null
          created_at?: string
          icon?: string | null
          id?: string
          name?: string
          parent_id?: string | null
          slug?: string
          sort_order?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "knowledge_base_folders_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "knowledge_base_folders"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_revisions: {
        Row: {
          created_at: string
          data: Json
          id: string
          profile_id: string
          revision_number: number
          user_id: string
        }
        Insert: {
          created_at?: string
          data: Json
          id?: string
          profile_id: string
          revision_number: number
          user_id: string
        }
        Update: {
          created_at?: string
          data?: Json
          id?: string
          profile_id?: string
          revision_number?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profile_revisions_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "enterprise_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      roi_calculations: {
        Row: {
          created_at: string | null
          id: string
          inputs: Json
          name: string
          outputs: Json
          platform_ids: string[] | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          inputs?: Json
          name: string
          outputs?: Json
          platform_ids?: string[] | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          inputs?: Json
          name?: string
          outputs?: Json
          platform_ids?: string[] | null
          user_id?: string
        }
        Relationships: []
      }
      user_onboarding_preferences: {
        Row: {
          ai_ecosystems: Json | null
          api_keys: Json | null
          created_at: string
          id: string
          onboarding_completed: boolean | null
          persona_type: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_ecosystems?: Json | null
          api_keys?: Json | null
          created_at?: string
          id?: string
          onboarding_completed?: boolean | null
          persona_type?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_ecosystems?: Json | null
          api_keys?: Json | null
          created_at?: string
          id?: string
          onboarding_completed?: boolean | null
          persona_type?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "manager" | "user"
      profile_status: "draft" | "published" | "archived"
      user_role: "admin" | "editor" | "viewer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "manager", "user"],
      profile_status: ["draft", "published", "archived"],
      user_role: ["admin", "editor", "viewer"],
    },
  },
} as const
