import { createClient } from '@supabase/supabase-js';

// Replace these values with your Supabase project's URL and anon key
const supabaseUrl = "https://hvlobxefbnlevewtzazc.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2bG9ieGVmYm5sZXZld3R6YXpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5MDM5MDMsImV4cCI6MjA0NzQ3OTkwM30.qLJpDoi8-jFLqVyJHLK9qgjNLyy2F3SrBeFBHUV-Jb8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
