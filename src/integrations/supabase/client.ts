import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zddqnxesbhbvmdcyqpuw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkZHFueGVzYmhidm1kY3lxcHV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg2MjY1ODAsImV4cCI6MjAyNDIwMjU4MH0.0LwKHZQZXz5-zVwnYF_H0Zy_JZR9-kZ0W_8YQEQHbJY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storage: localStorage,
    storageKey: 'supabase.auth.token',
  },
});