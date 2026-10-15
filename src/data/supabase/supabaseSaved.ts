import type { SavedStory } from '@/types'
import type { SavedRepository } from '../repositories'
import type { TableTalesClient } from './client'
import { toSavedStory } from './mappers'

const SAVED_SELECT = 'place_id, saved_at, notes(id, text, created_at)'

/**
 * Saved stories and notes. Which rows a user can see or change is decided by Row Level Security
 * in the database (user_id = the signed-in user), and note rules (1 to 1000 characters,
 * story must exist) are table constraints. Nothing here is trusted for security.
 */
export function createSupabaseSavedRepository(db: TableTalesClient): SavedRepository {
  async function fetchOne(placeId: string): Promise<SavedStory | null> {
    const { data, error } = await db
      .from('saved_stories')
      .select(SAVED_SELECT)
      .eq('place_id', placeId)
      .maybeSingle()
    if (error) throw new Error(error.message)
    return data ? toSavedStory(data) : null
  }

  async function requireOne(placeId: string): Promise<SavedStory> {
    const story = await fetchOne(placeId)
    if (!story) throw new Error('That story is not in your saved list')
    return story
  }

  return {
    async listSaved() {
      const { data, error } = await db
        .from('saved_stories')
        .select(SAVED_SELECT)
        .order('saved_at', { ascending: false })
      if (error) throw new Error(error.message)
      return data.map(toSavedStory)
    },

    getSaved: fetchOne,

    async saveStory(placeId) {
      const { error } = await db
        .from('saved_stories')
        .upsert({ place_id: placeId }, { onConflict: 'user_id,place_id', ignoreDuplicates: true })
      if (error) throw new Error(error.message)
      return requireOne(placeId)
    },

    async unsaveStory(placeId) {
      // Notes on the story are removed with it (ON DELETE CASCADE).
      const { error } = await db.from('saved_stories').delete().eq('place_id', placeId)
      if (error) throw new Error(error.message)
    },

    async addNote(placeId, text) {
      // One database function saves the story (if needed) and adds the note, all or nothing.
      const { error } = await db.rpc('add_note', { p_place_id: placeId, p_text: text })
      if (error) throw new Error(error.message)
      return requireOne(placeId)
    },

    async deleteNote(placeId, noteId) {
      const { error } = await db.from('notes').delete().eq('id', noteId)
      if (error) throw new Error(error.message)
      return requireOne(placeId)
    },
  }
}
