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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
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
      profile_status: ["draft", "published", "archived"],
      user_role: ["admin", "editor", "viewer"],
    },
  },
} as const
