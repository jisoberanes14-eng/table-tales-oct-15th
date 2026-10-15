/**
 * Generated from the Supabase schema (Supabase MCP `generate_typescript_types`).
 * Regenerate after any schema change; do not edit by hand.
 */
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '14.18'
  }
  public: {
    Tables: {
      notes: {
        Row: {
          created_at: string
          id: string
          place_id: string
          text: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          place_id: string
          text: string
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: string
          place_id?: string
          text?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'notes_user_id_place_id_fkey'
            columns: ['user_id', 'place_id']
            isOneToOne: false
            referencedRelation: 'saved_stories'
            referencedColumns: ['user_id', 'place_id']
          },
        ]
      }
      place_closure_reports: {
        Row: {
          place_id: string
          reported_at: string
          user_id: string
        }
        Insert: {
          place_id: string
          reported_at?: string
          user_id?: string
        }
        Update: {
          place_id?: string
          reported_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'place_closure_reports_place_id_fkey'
            columns: ['place_id']
            isOneToOne: false
            referencedRelation: 'places'
            referencedColumns: ['id']
          },
        ]
      }
      place_details: {
        Row: {
          ask_them: string[]
          order_dish: string
          order_why: string
          place_id: string
        }
        Insert: {
          ask_them: string[]
          order_dish: string
          order_why: string
          place_id: string
        }
        Update: {
          ask_them?: string[]
          order_dish?: string
          order_why?: string
          place_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'place_details_place_id_fkey'
            columns: ['place_id']
            isOneToOne: true
            referencedRelation: 'places'
            referencedColumns: ['id']
          },
        ]
      }
      place_sections: {
        Row: {
          body: string[]
          kind: Database['public']['Enums']['section_kind']
          place_id: string
          sort_order: number
          title: string
        }
        Insert: {
          body: string[]
          kind: Database['public']['Enums']['section_kind']
          place_id: string
          sort_order: number
          title: string
        }
        Update: {
          body?: string[]
          kind?: Database['public']['Enums']['section_kind']
          place_id?: string
          sort_order?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: 'place_sections_place_id_fkey'
            columns: ['place_id']
            isOneToOne: false
            referencedRelation: 'places'
            referencedColumns: ['id']
          },
        ]
      }
      place_sources: {
        Row: {
          id: number
          kind: Database['public']['Enums']['source_kind']
          label: string
          note: string | null
          place_id: string
          sort_order: number
        }
        Insert: {
          id?: never
          kind: Database['public']['Enums']['source_kind']
          label: string
          note?: string | null
          place_id: string
          sort_order: number
        }
        Update: {
          id?: never
          kind?: Database['public']['Enums']['source_kind']
          label?: string
          note?: string | null
          place_id?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: 'place_sources_place_id_fkey'
            columns: ['place_id']
            isOneToOne: false
            referencedRelation: 'places'
            referencedColumns: ['id']
          },
        ]
      }
      places: {
        Row: {
          created_at: string
          cuisine: string
          id: string
          is_closed: boolean
          is_placeholder: boolean
          mock_distance_miles: number
          name: string
          neighborhood: string
          price_tier: number
          search_text: string
          source_label: Database['public']['Enums']['source_label']
          summary: string
          tags: Database['public']['Enums']['story_tag'][]
          updated_at: string
        }
        Insert: {
          created_at?: string
          cuisine: string
          id: string
          is_closed?: boolean
          is_placeholder?: boolean
          mock_distance_miles: number
          name: string
          neighborhood: string
          price_tier: number
          search_text?: string
          source_label: Database['public']['Enums']['source_label']
          summary: string
          tags?: Database['public']['Enums']['story_tag'][]
          updated_at?: string
        }
        Update: {
          created_at?: string
          cuisine?: string
          id?: string
          is_closed?: boolean
          is_placeholder?: boolean
          mock_distance_miles?: number
          name?: string
          neighborhood?: string
          price_tier?: number
          search_text?: string
          source_label?: Database['public']['Enums']['source_label']
          summary?: string
          tags?: Database['public']['Enums']['story_tag'][]
          updated_at?: string
        }
        Relationships: []
      }
      saved_stories: {
        Row: {
          place_id: string
          saved_at: string
          user_id: string
        }
        Insert: {
          place_id: string
          saved_at?: string
          user_id?: string
        }
        Update: {
          place_id?: string
          saved_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'saved_stories_place_id_fkey'
            columns: ['place_id']
            isOneToOne: false
            referencedRelation: 'places'
            referencedColumns: ['id']
          },
        ]
      }
      trail_stops: {
        Row: {
          blurb: string
          from_previous: string | null
          place_id: string
          stop_order: number
          trail_id: string
        }
        Insert: {
          blurb: string
          from_previous?: string | null
          place_id: string
          stop_order: number
          trail_id: string
        }
        Update: {
          blurb?: string
          from_previous?: string | null
          place_id?: string
          stop_order?: number
          trail_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'trail_stops_place_id_fkey'
            columns: ['place_id']
            isOneToOne: false
            referencedRelation: 'places'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'trail_stops_trail_id_fkey'
            columns: ['trail_id']
            isOneToOne: false
            referencedRelation: 'trails'
            referencedColumns: ['id']
          },
        ]
      }
      trails: {
        Row: {
          area: string
          created_at: string
          description: string
          estimated_minutes: number
          id: string
          is_placeholder: boolean
          kind: Database['public']['Enums']['trail_kind']
          stop_count: number
          title: string
        }
        Insert: {
          area: string
          created_at?: string
          description: string
          estimated_minutes: number
          id: string
          is_placeholder?: boolean
          kind: Database['public']['Enums']['trail_kind']
          stop_count?: number
          title: string
        }
        Update: {
          area?: string
          created_at?: string
          description?: string
          estimated_minutes?: number
          id?: string
          is_placeholder?: boolean
          kind?: Database['public']['Enums']['trail_kind']
          stop_count?: number
          title?: string
        }
        Relationships: []
      }
    }
    Views: {
      neighborhoods: {
        Row: {
          name: string | null
          place_count: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      add_note: {
        Args: { p_place_id: string; p_text: string }
        Returns: undefined
      }
    }
    Enums: {
      section_kind: 'family' | 'food' | 'building' | 'neighborhood'
      source_kind: 'owner-interview' | 'oral-history' | 'archive' | 'book' | 'article'
      source_label: 'owner' | 'researched' | 'both'
      story_tag:
        | 'family-owned'
        | 'immigrant-cuisine'
        | 'historic-building'
        | 'generations-old'
        | 'neighborhood-institution'
        | 'community-hub'
      trail_kind: 'neighborhood' | 'theme'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
