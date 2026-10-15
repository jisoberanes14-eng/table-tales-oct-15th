import type {
  AuthUser,
  Neighborhood,
  Place,
  PlaceSummary,
  SavedStory,
  Trail,
  TrailDetail,
} from '@/types'

/**
 * Repository interfaces: the ONLY contract the UI depends on.
 * The mock implementations in ./mock and the Supabase ones in ./supabase both satisfy them,
 * so the UI never knows which one is in use. All methods are async because real backends are.
 *
 * ACCESS RULES (enforced by the database, not by these interfaces or the UI):
 *   - Summaries (cards) are public.
 *   - Full places, trail stops, saved stories and notes need a signed-in user.
 */

export interface PlacesRepository {
  /** Public cards. */
  listPlaces(): Promise<PlaceSummary[]>
  /** Public card for one place. Resolves to null when no place has this id. */
  getPlaceSummary(placeId: string): Promise<PlaceSummary | null>
  /** Full story. Signed-in only: resolves to null if missing OR if the caller is not signed in. */
  getPlace(placeId: string): Promise<Place | null>
  /** Matches name, neighborhood, cuisine, tags and summary. An empty query returns every place. */
  searchPlaces(query: string): Promise<PlaceSummary[]>
  listNeighborhoods(): Promise<Neighborhood[]>
}

export interface TrailsRepository {
  /** Public trail cards. */
  listTrails(): Promise<Trail[]>
  /** Signed-in only. Stops come back ordered, each with its place card resolved. Null if unavailable. */
  getTrail(trailId: string): Promise<TrailDetail | null>
}

export interface SavedRepository {
  listSaved(): Promise<SavedStory[]>
  /** Resolves to null when the story is not saved. */
  getSaved(placeId: string): Promise<SavedStory | null>
  /** Idempotent: saving an already-saved story returns it unchanged. */
  saveStory(placeId: string): Promise<SavedStory>
  unsaveStory(placeId: string): Promise<void>
  /** Adding a note to an unsaved story saves it first. */
  addNote(placeId: string, text: string): Promise<SavedStory>
  deleteNote(placeId: string, noteId: string): Promise<SavedStory>
}

export interface ReportsRepository {
  /** Has the signed-in person reported this place as closed? */
  hasReportedClosed(placeId: string): Promise<boolean>
  /**
   * Reports a place as closed. This only records the report for an admin to review; it never
   * changes what other people see. Idempotent: reporting twice is fine.
   */
  reportClosed(placeId: string): Promise<void>
  /** Takes back the person's own report. */
  withdrawClosedReport(placeId: string): Promise<void>
}

export interface AuthRepository {
  /**
   * Calls `listener` with the current user right away, then again whenever the user signs in or out.
   * Returns a function that stops listening.
   */
  subscribe(listener: (user: AuthUser | null) => void): () => void
  /** Emails a one-time sign-in link. No password. `returnTo` is the full URL to come back to. */
  sendMagicLink(email: string, returnTo: string): Promise<void>
  signOut(): Promise<void>
}
