import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://dubctqsidhgtfgnrsjte.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1YmN0cXNpZGhndGZnbnJzanRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1OTE4ODYsImV4cCI6MjA1NjE2Nzg4Nn0.cjo55xCPB7kc4Z_jeVJA_6eTdh-3QSCh1R5k9nM8erw";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;