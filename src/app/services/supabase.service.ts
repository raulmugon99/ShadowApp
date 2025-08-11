import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabaseUrl = 'https://rwhjmghbshkhsfacgxwq.supabase.co';
  private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3aGptZ2hic2hraHNmYWNneHdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4OTE0MTMsImV4cCI6MjA3MDQ2NzQxM30.d4YzzfCxJvQNodgLoC0o8Qbf6rJPpFkLT645dobmsRY';
  public supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
  }

}
