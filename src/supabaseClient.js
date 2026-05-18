import { createClient } from '@supabase/supabase-js';

// اللينك الأساسي فقط بدون أي إضافات
const supabaseUrl = 'https://sozkprejeqvpiibtwvpa.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvemtwcmVqZXF2cGlpYnR3dnBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyNzc0MDcsImV4cCI6MjA3NTg1MzQwN30.XTR3wJkkASZzqIwbE2AkYygwFurGm2UxSMEFbVM3j9M';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);