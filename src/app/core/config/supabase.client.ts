import { createClient } from '@supabase/supabase-js';
import { environments } from '../../../environments/environments';

export const supabase = createClient(
  environments.supabase.url,
  environments.supabase.anonKey
);