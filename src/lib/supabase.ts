import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bmmvufvnhkhjrquvmnoa.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtbXZ1ZnZuaGtoanJxdXZtbm9hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NTc5MTgsImV4cCI6MjA4NTIzMzkxOH0.3Fb-nLnPFM1EqMZncKfbfvsUwsb4z3PG95A9UWKftaQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types based on existing schema
export interface UserProfile {
  user_id: string;
  full_name: string | null;
  phone_number: string | null;
  date_of_birth: string | null;
  gender: 'female' | 'male' | 'other' | 'prefer_not_to_say' | null;
  whatsapp_opt_in: boolean;
  communication_preferences: {
    email_marketing?: boolean;
    sms_offers?: boolean;
    whatsapp_updates?: boolean;
  } | null;
  default_shipping_address_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Address {
  id: string;
  user_id: string;
  label: string;
  full_address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
  created_at: string;
}

export interface StylePreferences {
  id: string;
  user_id: string;
  occasion_daily: boolean;
  occasion_office: boolean;
  occasion_party: boolean;
  occasion_wedding: boolean;
  aesthetic_minimal: boolean;
  aesthetic_bold: boolean;
  aesthetic_traditional: boolean;
  aesthetic_indo_western: boolean;
  created_at: string;
  updated_at: string;
}

export interface WishlistItem {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
}

export interface Order {
  id: string;
  user_id: string | null;
  guest_email: string | null;
  guest_phone: string | null;
  status: string;
  total_amount: number;
  shopify_order_id: string | null;
  shopify_checkout_token: string | null;
  created_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
}
