import { createClient } from '@supabase/supabase-js'

export interface Database {
  public: {
    Tables: {
      users: { 
        Row: {
          id: string // UUID de auth.users
          name: string
          email: string
        }
        Insert: {
          id?: string
          name: string
          email: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
        }
        Relationships: []
      },
      courses: {
        Row: {
          id: string; // UUID
          titulo: string;
          descripcion: string;
        };
        Insert: {
          id?: string;
          titulo: string;
          descripcion?: string;
        };
        Update: {
          id?: string;
          titulo?: string;
          descripcion?: string;
        };
        Relationships: [];
      };
      modules: {
        Row: {
          id: string; // UUID
          id_curso: string; // UUID
          titulo: string;
          descripcion: string;
        };
        Insert: {
          id?: string;
          id_curso: string;
          titulo: string;
          descripcion?: string;
        };
        Update: {
          id?: string;
          id_curso?: string;
          titulo?: string;
          descripcion?: string;
        };
        Relationships: [
          {
            foreignKeyName: "modules_id_curso_fkey";
            columns: ["id_curso"];
            isOneToOne: false;
            referencedRelation: "courses";
            referencedColumns: ["id"];
          },
        ];
      };
      user_module_progress: {
        Row: {
          user_id: string; // UUID de auth.users
          module_id: string; // UUID de modules
          completed: boolean;
        };
        Insert: {
          user_id: string;
          module_id: string;
          completed?: boolean;
        };
        Update: {
          user_id?: string;
          module_id?: string;
          completed?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "user_module_progress_module_id_fkey";
            columns: ["module_id"];
            isOneToOne: false;
            referencedRelation: "modules";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_module_progress_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      user_course_progress: {
        Row: {
          user_id: string; // UUID de auth.users
          course_id: string; // UUID de courses
          completed: boolean;
        };
        Insert: {
          user_id: string;
          course_id: string;
          completed?: boolean;
        };
        Update: {
          user_id?: string;
          course_id?: string;
          completed?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "user_course_progress_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "courses";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_course_progress_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
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


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Las variables de entorno VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY deben ser proporcionadas en un archivo .env');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);