import type { Session } from '@supabase/supabase-js'
import type { AuthUser } from '@/types'
import type { AuthRepository } from '../repositories'
import type { TableTalesClient } from './client'

function toAuthUser(session: Session | null): AuthUser | null {
  if (!session) return null
  return { id: session.user.id, email: session.user.email ?? '' }
}

/** Passwordless sign-in: Supabase emails a one-time link; opening it signs the person in. */
export function createSupabaseAuthRepository(db: TableTalesClient): AuthRepository {
  return {
    subscribe(listener) {
      // Fires once right away with the stored session (INITIAL_SESSION), then on every change.
      // Keep this callback tiny: calling other Supabase methods inside it can deadlock.
      const { data } = db.auth.onAuthStateChange((_event, session) => {
        listener(toAuthUser(session))
      })
      return () => data.subscription.unsubscribe()
    },

    async sendMagicLink(email, returnTo) {
      const { error } = await db.auth.signInWithOtp({
        email: email.trim(),
        // Where the link brings the person back to. Must be in the Redirect URLs allow-list
        // in the Supabase dashboard (Authentication > URL Configuration).
        options: { emailRedirectTo: returnTo, shouldCreateUser: true },
      })
      if (error) throw new Error(error.message)
    },

    async signOut() {
      const { error } = await db.auth.signOut()
      if (error) throw new Error(error.message)
    },
  }
}
