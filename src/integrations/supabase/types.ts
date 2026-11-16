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
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      inquiries: {
        Row: {
          company: string
          created_at: string
          email: string
          id: string
          kind: string
          message: string
          name: string
          slack_error: string | null
          slack_notified_at: string | null
          source_path: string
          status: string
          updated_at: string
        }
        Insert: {
          company?: string
          created_at?: string
          email: string
          id?: string
          kind: string
          message: string
          name: string
          slack_error?: string | null
          slack_notified_at?: string | null
          source_path?: string
          status?: string
          updated_at?: string
        }
        Update: {
          company?: string
          created_at?: string
          email?: string
          id?: string
          kind?: string
          message?: string
          name?: string
          slack_error?: string | null
          slack_notified_at?: string | null
          source_path?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      teileklar_catalog_sync_runs: {
        Row: {
          archived: number
          complete: boolean | null
          finished_at: string | null
          last_error: string | null
          next_offset: number
          received: number
          rejected: number
          reported_total: number
          run_date: string
          started_at: string
          updated_at: string
        }
        Insert: {
          archived?: number
          complete?: boolean | null
          finished_at?: string | null
          last_error?: string | null
          next_offset?: number
          received?: number
          rejected?: number
          reported_total: number
          run_date: string
          started_at?: string
          updated_at?: string
        }
        Update: {
          archived?: number
          complete?: boolean | null
          finished_at?: string | null
          last_error?: string | null
          next_offset?: number
          received?: number
          rejected?: number
          reported_total?: number
          run_date?: string
          started_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      teileklar_part_inquiries: {
        Row: {
          attachment_name: string | null
          attachment_path: string | null
          attachment_size: number | null
          attachment_type: string | null
          created_at: string
          email: string
          id: string
          message: string
          name: string
          part: string
          slack_error: string | null
          slack_notified_at: string | null
          status: string
          updated_at: string
          vehicle: string
        }
        Insert: {
          attachment_name?: string | null
          attachment_path?: string | null
          attachment_size?: number | null
          attachment_type?: string | null
          created_at?: string
          email: string
          id?: string
          message?: string
          name: string
          part: string
          slack_error?: string | null
          slack_notified_at?: string | null
          status?: string
          updated_at?: string
          vehicle: string
        }
        Update: {
          attachment_name?: string | null
          attachment_path?: string | null
          attachment_size?: number | null
          attachment_type?: string | null
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          part?: string
          slack_error?: string | null
          slack_notified_at?: string | null
          status?: string
          updated_at?: string
          vehicle?: string
        }
        Relationships: []
      }
      teileklar_products: {
        Row: {
          archived_at: string | null
          brand: string
          category: string
          condition: string
          delivery_note: string
          ean: string
          feed_created_at: string | null
          id: string
          image_alt: string
          image_src: string
          name: string
          oe_number: string
          price_value: number | null
          source: string
          specs: Json
          status_label: string
          stock: number
          synced_at: string
        }
        Insert: {
          archived_at?: string | null
          brand?: string
          category?: string
          condition?: string
          delivery_note?: string
          ean?: string
          feed_created_at?: string | null
          id: string
          image_alt?: string
          image_src?: string
          name: string
          oe_number?: string
          price_value?: number | null
          source?: string
          specs?: Json
          status_label?: string
          stock?: number
          synced_at?: string
        }
        Update: {
          archived_at?: string | null
          brand?: string
          category?: string
          condition?: string
          delivery_note?: string
          ean?: string
          feed_created_at?: string | null
          id?: string
          image_alt?: string
          image_src?: string
          name?: string
          oe_number?: string
          price_value?: number | null
          source?: string
          specs?: Json
          status_label?: string
          stock?: number
          synced_at?: string
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
      teileklar_categories: {
        Row: {
          category: string | null
          product_count: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
      app_role: ["admin", "user"],
    },
  },
} as const
