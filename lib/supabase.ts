import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://wuncfvbxdbiiiqrtztrs.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1bmNmdmJ4ZGJpaWlxcnR6dHJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ3MTk0MzgsImV4cCI6MjEwMDI5NTQzOH0.IogxyIgIEvuVbXIif3TTvHfaI1kUxAIDkbPSPkCnCpc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
