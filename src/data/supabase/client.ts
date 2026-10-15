import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

export type TableTalesClient = SupabaseClient<Database>

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

/** True when both public env values are set; src/data/index.ts uses this to pick the backend. */
export const isSupabaseConfigured = Boolean(url && key)

let client: TableTalesClient | undefined

/**
 * Lazily creates the one shared client. The key here is the PUBLIC publishable/anon key:
 * what the browser may do is decided by Row Level Security in the database, using the
 * signed-in user's identity that the client attaches to every request.
 */
export function getSupabaseClient(): TableTalesClient {
  if (!url || !key) {
    throw new Error('Supabase is not configured: set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY')
  }
  client ??= createClient<Database>(url, key, {
    auth: {
      persistSession: true, // keep people signed in across visits (stored in localStorage)
      autoRefreshToken: true,
      detectSessionInUrl: true, // reads the session from the magic-link URL after the redirect
      // "implicit" works even if the link is opened in a different browser than the one that
      // requested it (common on phones). PKCE would require the same browser.
      flowType: 'implicit',
    },
  })
  return client
}
