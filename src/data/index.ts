/**
 * THE single place where data implementations are chosen.
 *
 *  - With VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY set (see .env.local): everything comes
 *    from Supabase, and access rules (who can read what) are enforced by the database.
 *  - Without them: built-in mock sample data and a fake instant sign-in, so the app still runs
 *    offline. The mock has NO security; it exists for development only.
 *
 * Hooks import from this file only, so no UI code knows or cares which one is in use.
 * See README: "How the data layer works".
 */
import { mockAuthRepository } from './mock/mockAuth'
import { mockPlacesRepository } from './mock/mockPlaces'
import { mockReportsRepository } from './mock/mockReports'
import { mockSavedRepository } from './mock/mockSaved'
import { mockTrailsRepository } from './mock/mockTrails'
import type {
  AuthRepository,
  PlacesRepository,
  ReportsRepository,
  SavedRepository,
  TrailsRepository,
} from './repositories'
import { getSupabaseClient, isSupabaseConfigured } from './supabase/client'
import { createSupabaseAuthRepository } from './supabase/supabaseAuth'
import { createSupabasePlacesRepository } from './supabase/supabasePlaces'
import { createSupabaseReportsRepository } from './supabase/supabaseReports'
import { createSupabaseSavedRepository } from './supabase/supabaseSaved'
import { createSupabaseTrailsRepository } from './supabase/supabaseTrails'

export const placesRepo: PlacesRepository = isSupabaseConfigured
  ? createSupabasePlacesRepository(getSupabaseClient())
  : mockPlacesRepository

export const trailsRepo: TrailsRepository = isSupabaseConfigured
  ? createSupabaseTrailsRepository(getSupabaseClient())
  : mockTrailsRepository

export const savedRepo: SavedRepository = isSupabaseConfigured
  ? createSupabaseSavedRepository(getSupabaseClient())
  : mockSavedRepository

export const reportsRepo: ReportsRepository = isSupabaseConfigured
  ? createSupabaseReportsRepository(getSupabaseClient())
  : mockReportsRepository

export const authRepo: AuthRepository = isSupabaseConfigured
  ? createSupabaseAuthRepository(getSupabaseClient())
  : mockAuthRepository

/** True when running on the insecure mock backend (shown as a banner in development). */
export const isMockBackend = !isSupabaseConfigured
