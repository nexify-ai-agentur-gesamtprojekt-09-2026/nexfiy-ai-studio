export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      inquiries: {
        Row: {
          company: string
          consent_at: string | null
          consent_version: string | null
          created_at: string
          email: string
          id: string
          kind: string
          message: string
          name: string
          slack_channel_id: string | null
          slack_error: string | null
          slack_message_ts: string | null
          slack_notified_at: string | null
          source_path: string
          status: string
          updated_at: string
        }
        Insert: {
          company?: string
          consent_at?: string | null
          consent_version?: string | null
          created_at?: string
          email: string
          id?: string
          kind: string
          message: string
          name: string
          slack_channel_id?: string | null
          slack_error?: string | null
          slack_message_ts?: string | null
          slack_notified_at?: string | null
          source_path?: string
          status?: string
          updated_at?: string
        }
        Update: {
          company?: string
          consent_at?: string | null
          consent_version?: string | null
          created_at?: string
          email?: string
          id?: string
          kind?: string
          message?: string
          name?: string
          slack_channel_id?: string | null
          slack_error?: string | null
          slack_message_ts?: string | null
          slack_notified_at?: string | null
          source_path?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      inquiry_duplicate_guards: {
        Row: {
          accepted_at: string
          fingerprint: string
          inquiry_id: string
        }
        Insert: {
          accepted_at: string
          fingerprint: string
          inquiry_id: string
        }
        Update: {
          accepted_at?: string
          fingerprint?: string
          inquiry_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "inquiry_duplicate_guards_inquiry_id_fkey"
            columns: ["inquiry_id"]
            isOneToOne: false
            referencedRelation: "inquiries"
            referencedColumns: ["id"]
          },
        ]
      }
      inquiry_guard_secret: {
        Row: {
          salt: string
          singleton: boolean
        }
        Insert: {
          salt: string
          singleton?: boolean
        }
        Update: {
          salt?: string
          singleton?: boolean
        }
        Relationships: []
      }
      inquiry_rate_guards: {
        Row: {
          accepted_at: string[]
          ip_hash: string
        }
        Insert: {
          accepted_at?: string[]
          ip_hash: string
        }
        Update: {
          accepted_at?: string[]
          ip_hash?: string
        }
        Relationships: []
      }
      slack_delivery_receipts: {
        Row: {
          actor_id: string
          channel_id: string
          created_at: string
          entity_id: string | null
          entity_table: string | null
          error_code: string | null
          event_key: string
          flow_id: string
          id: string
          outcome: string
          team_id: string
          thread_ts: string | null
          updated_at: string
        }
        Insert: {
          actor_id: string
          channel_id: string
          created_at?: string
          entity_id?: string | null
          entity_table?: string | null
          error_code?: string | null
          event_key: string
          flow_id: string
          id?: string
          outcome?: string
          team_id: string
          thread_ts?: string | null
          updated_at?: string
        }
        Update: {
          actor_id?: string
          channel_id?: string
          created_at?: string
          entity_id?: string | null
          entity_table?: string | null
          error_code?: string | null
          event_key?: string
          flow_id?: string
          id?: string
          outcome?: string
          team_id?: string
          thread_ts?: string | null
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
          slack_channel_id: string | null
          slack_error: string | null
          slack_message_ts: string | null
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
          slack_channel_id?: string | null
          slack_error?: string | null
          slack_message_ts?: string | null
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
          slack_channel_id?: string | null
          slack_error?: string | null
          slack_message_ts?: string | null
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
          has_image: boolean | null
          id: string
          image_alt: string
          image_checked_at: string | null
          image_checked_src: string
          image_cutout_of: string
          image_cutout_path: string
          image_path: string
          image_pending: boolean | null
          image_src: string
          name: string
          oe_number: string
          price_value: number | null
          source: string
          source_category: string
          specs: Json
          status_label: string
          stock: number
          synced_at: string
          variant_group: string | null
        }
        Insert: {
          archived_at?: string | null
          brand?: string
          category?: string
          condition?: string
          delivery_note?: string
          ean?: string
          feed_created_at?: string | null
          has_image?: boolean | null
          id: string
          image_alt?: string
          image_checked_at?: string | null
          image_checked_src?: string
          image_cutout_of?: string
          image_cutout_path?: string
          image_path?: string
          image_pending?: boolean | null
          image_src?: string
          name: string
          oe_number?: string
          price_value?: number | null
          source?: string
          source_category?: string
          specs?: Json
          status_label?: string
          stock?: number
          synced_at?: string
          variant_group?: string | null
        }
        Update: {
          archived_at?: string | null
          brand?: string
          category?: string
          condition?: string
          delivery_note?: string
          ean?: string
          feed_created_at?: string | null
          has_image?: boolean | null
          id?: string
          image_alt?: string
          image_checked_at?: string | null
          image_checked_src?: string
          image_cutout_of?: string
          image_cutout_path?: string
          image_path?: string
          image_pending?: boolean | null
          image_src?: string
          name?: string
          oe_number?: string
          price_value?: number | null
          source?: string
          source_category?: string
          specs?: Json
          status_label?: string
          stock?: number
          synced_at?: string
          variant_group?: string | null
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
      teileklar_product_groups: {
        Row: {
          brand: string | null
          category: string | null
          delivery_note: string | null
          has_image: boolean | null
          id: string | null
          image_alt: string | null
          image_cutout: string | null
          image_path: string | null
          in_stock: boolean | null
          max_price: number | null
          min_price: number | null
          name: string | null
          price_value: number | null
          search_keys: string | null
          stock: number | null
          variant_count: number | null
          variant_group: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      accept_guarded_inquiry: {
        Args: {
          p_company: string
          p_consent: boolean
          p_consent_version: string
          p_email: string
          p_fingerprint: string
          p_ip_hash: string
          p_kind: string
          p_message: string
          p_name: string
          p_source_path: string
        }
        Returns: {
          inquiry_id: string
          outcome: string
          retry_after_seconds: number
        }[]
      }
      get_inquiry_guard_salt: { Args: never; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      teileklar_base_name: { Args: { _name: string }; Returns: string }
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

