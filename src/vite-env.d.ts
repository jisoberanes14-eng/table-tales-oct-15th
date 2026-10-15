/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Supabase project URL. Public. Optional: without it the app uses mock data. */
  readonly VITE_SUPABASE_URL?: string
  /** Supabase publishable (or legacy anon) key. Public. Never the service-role key. */
  readonly VITE_SUPABASE_ANON_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
