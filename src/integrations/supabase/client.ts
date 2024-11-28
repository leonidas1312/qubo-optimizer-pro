import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zddqnxesbhbvmdcyqpuw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkZHFueGVzYmhidm1kY3lxcHV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5Mjc4MjIsImV4cCI6MjA0NzUwMzgyMn0.aBMh1r41BNHRKuT1UICK2Rr2Vq6EqptdTVymf4FqvrY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storage: localStorage,
    storageKey: 'supabase.auth.token',
  },
});