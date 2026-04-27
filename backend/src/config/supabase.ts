import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('placeholder')) {
  console.error('❌ WARNING: Supabase credentials missing on Render.');
  console.error('👉 ACTION REQUIRED: Go to Render Dashboard -> Environment and add SUPABASE_URL and SUPABASE_ANON_KEY.');
}

// Export a client even if credentials are missing to prevent initialization crashes.
// Auth attempts will simply fail at runtime instead of crashing the deploy.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder'
);
