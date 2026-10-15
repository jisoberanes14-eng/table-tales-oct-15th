import { createId } from '@/lib/id'
import { readJson, writeJson } from '@/lib/storage'
import type { AuthUser } from '@/types'
import type { AuthRepository } from '../repositories'
import { delay } from './delay'

const STORAGE_KEY = 'table-tales:mock-user:v1'

function isAuthUser(value: unknown): value is AuthUser {
  if (typeof value !== 'object' || value === null) return false
  const user = value as Record<string, unknown>
  return typeof user.id === 'string' && typeof user.email === 'string'
}

const listeners = new Set<(user: AuthUser | null) => void>()

function current(): AuthUser | null {
  return readJson<AuthUser | null>(
    STORAGE_KEY,
    (v): v is AuthUser | null => v === null || isAuthUser(v),
    null,
  )
}

function emit(user: AuthUser | null): void {
  for (const listener of listeners) listener(user)
}

/**
 * Development stand-in used only when Supabase is not configured: no email is sent and
 * "signing in" happens instantly. It exists so the signed-in screens can be built and tested
 * offline. It provides NO security.
 */
export const mockAuthRepository: AuthRepository = {
  subscribe(listener) {
    listeners.add(listener)
    listener(current())
    return () => {
      listeners.delete(listener)
    }
  },

  async sendMagicLink(email) {
    await delay(300, 600)
    const user: AuthUser = { id: createId(), email: email.trim().toLowerCase() }
    writeJson(STORAGE_KEY, user)
    emit(user)
  },

  async signOut() {
    writeJson(STORAGE_KEY, null)
    emit(null)
  },
}
