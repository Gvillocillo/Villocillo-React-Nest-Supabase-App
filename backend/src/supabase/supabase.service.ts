import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * Supabase client singleton
 * Connects to Supabase database for data operations
 */
export class SupabaseService {
  private static instance: SupabaseClient;

  /**
   * Get Supabase client instance
   * Creates a new instance if one doesn't exist
   */
  static getClient(): SupabaseClient {
    if (!this.instance) {
      const supabaseUrl = process.env.SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_KEY;

      if (!supabaseUrl || !supabaseKey) {
        throw new Error(
          'Missing Supabase configuration. Please check your .env file.',
        );
      }

      this.instance = createClient(supabaseUrl, supabaseKey);
    }

    return this.instance;
  }
}
