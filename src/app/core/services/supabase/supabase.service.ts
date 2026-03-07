import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environments } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environments.supabase.url,
      environments.supabase.anonKey
    );
  }

  get client(): SupabaseClient {
    return this.supabase;
  }
}