import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY; // Use "NEXT_PUBLIC_" for Next.js
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
