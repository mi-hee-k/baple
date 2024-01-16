export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      bookmarks: {
        Row: {
          id: string;
          place_id: string | null;
          user_id: string | null;
        };
        Insert: {
          id?: string;
          place_id?: string | null;
          user_id?: string | null;
        };
        Update: {
          id?: string;
          place_id?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'bookmarks_place_id_fkey';
            columns: ['place_id'];
            isOneToOne: false;
            referencedRelation: 'places';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'bookmarks_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      comments: {
        Row: {
          content: string | null;
          created_at: string;
          id: string;
          review_id: string | null;
          user_id: string | null;
        };
        Insert: {
          content?: string | null;
          created_at?: string;
          id?: string;
          review_id?: string | null;
          user_id?: string | null;
        };
        Update: {
          content?: string | null;
          created_at?: string;
          id?: string;
          review_id?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'comments_review_id_fkey';
            columns: ['review_id'];
            isOneToOne: false;
            referencedRelation: 'reviews';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'comments_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      likes: {
        Row: {
          id: string;
          review_id: string | null;
          user_id: string | null;
        };
        Insert: {
          id?: string;
          review_id?: string | null;
          user_id?: string | null;
        };
        Update: {
          id?: string;
          review_id?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'likes_review_id_fkey';
            columns: ['review_id'];
            isOneToOne: false;
            referencedRelation: 'reviews';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'likes_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      places: {
        Row: {
          address: string | null;
          category_1: string | null;
          category_2: string | null;
          city: string | null;
          district: string | null;
          holidays: string | null;
          id: string;
          image_url: string | null;
          is_audio_guide: boolean | null;
          is_braille_guide: boolean | null;
          is_disabled_parking: boolean | null;
          is_disabled_toilet: boolean | null;
          is_easy_door: boolean | null;
          is_guide_dog: boolean | null;
          is_paid: boolean | null;
          is_wheelchair_rental: boolean | null;
          lat: number;
          lng: number;
          place_name: string;
          tel: string | null;
          working_hours: string | null;
        };
        Insert: {
          address?: string | null;
          category_1?: string | null;
          category_2?: string | null;
          city?: string | null;
          district?: string | null;
          holidays?: string | null;
          id?: string;
          image_url?: string | null;
          is_audio_guide?: boolean | null;
          is_braille_guide?: boolean | null;
          is_disabled_parking?: boolean | null;
          is_disabled_toilet?: boolean | null;
          is_easy_door?: boolean | null;
          is_guide_dog?: boolean | null;
          is_paid?: boolean | null;
          is_wheelchair_rental?: boolean | null;
          lat?: number;
          lng?: number;
          place_name?: string | null;
          tel?: string | null;
          working_hours?: string | null;
        };
        Update: {
          address?: string | null;
          category_1?: string | null;
          category_2?: string | null;
          city?: string | null;
          district?: string | null;
          holidays?: string | null;
          id?: string;
          image_url?: string | null;
          is_audio_guide?: boolean | null;
          is_braille_guide?: boolean | null;
          is_disabled_parking?: boolean | null;
          is_disabled_toilet?: boolean | null;
          is_easy_door?: boolean | null;
          is_guide_dog?: boolean | null;
          is_paid?: boolean | null;
          is_wheelchair_rental?: boolean | null;
          lat?: number;
          lng?: number;
          place_name?: string | null;
          tel?: string | null;
          working_hours?: string | null;
        };
        Relationships: [];
      };
      reviews: {
        Row: {
          content: string;
          created_at: string;
          id: string;
          images_url: Json | null;
          place_id: string;
          user_id: string | null;
        };
        Insert: {
          content?: string | null;
          created_at?: string;
          id?: string;
          images_url?: Json | null;
          place_id?: string | null;
          user_id?: string | null;
        };
        Update: {
          content?: string | null;
          created_at?: string;
          id?: string;
          images_url?: Json | null;
          place_id?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'reviews_place_id_fkey';
            columns: ['place_id'];
            isOneToOne: false;
            referencedRelation: 'places';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'reviews_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      users: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          email: string | null;
          id: string;
          user_name: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          email?: string | null;
          id: string;
          user_name?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          email?: string | null;
          id?: string;
          user_name?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'users_id_fkey';
            columns: ['id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
      Database['public']['Views'])
  ? (Database['public']['Tables'] &
      Database['public']['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
  ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
  ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database['public']['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
  ? Database['public']['Enums'][PublicEnumNameOrOptions]
  : never;
