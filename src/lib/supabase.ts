import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      enquiries: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          subject: string
          message: string
          created_at: string
        }
        Insert: {
          name: string
          email: string
          phone?: string
          subject: string
          message: string
        }
      }
      applications: {
        Row: {
          id: string
          user_id: string | null
          product_type: string
          first_name: string
          last_name: string
          email: string
          phone: string
          date_of_birth: string
          annual_income: string
          status: string
          created_at: string
        }
        Insert: {
          user_id?: string
          product_type: string
          first_name: string
          last_name: string
          email: string
          phone: string
          date_of_birth: string
          annual_income: string
          status?: string
        }
      }
    }
  }
}
