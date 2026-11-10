export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      admins: {
        Row: {
          email: string
          user_id: string
        }
        Insert: {
          email: string
          user_id: string
        }
        Update: {
          email?: string
          user_id?: string
        }
        Relationships: []
      }
      certificates: {
        Row: {
          created_at: string | null
          credential_url: string | null
          display_order: number | null
          id: string
          image_url: string
          issuer: string
          title: string
        }
        Insert: {
          created_at?: string | null
          credential_url?: string | null
          display_order?: number | null
          id?: string
          image_url: string
          issuer: string
          title: string
        }
        Update: {
          created_at?: string | null
          credential_url?: string | null
          display_order?: number | null
          id?: string
          image_url?: string
          issuer?: string
          title?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string | null
          description: string
          github_url: string | null
          id: string
          image_url: string | null
          live_url: string | null
          tech_stack: string[] | null
          title: string
        }
        Insert: {
          created_at?: string | null
          description: string
          github_url?: string | null
          id?: string
          image_url?: string | null
          live_url?: string | null
          tech_stack?: string[] | null
          title: string
        }
        Update: {
          created_at?: string | null
          description?: string
          github_url?: string | null
          id?: string
          image_url?: string | null
          live_url?: string | null
          tech_stack?: string[] | null
          title?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          key: string
          value: string
        }
        Insert: {
          key: string
          value: string
        }
        Update: {
          key?: string
          value?: string
        }
        Relationships: []
      }
      skills: {
        Row: {
          category: string
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          category: string
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          category?: string
          created_at?: string | null
          id?: string
          name?: string
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
