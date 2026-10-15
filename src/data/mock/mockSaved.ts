import { createId } from '@/lib/id'
import { readJson, writeJson } from '@/lib/storage'
import type { Note, SavedStory } from '@/types'
import type { SavedRepository } from '../repositories'
import { delay, failIfRequested } from './delay'

/** Bump the version suffix if the stored shape ever changes. */
const STORAGE_KEY = 'table-tales:saved:v1'

function isNote(value: unknown): value is Note {
  if (typeof value !== 'object' || value === null) return false
  const note = value as Record<string, unknown>
  return (
    typeof note.id === 'string' &&
    typeof note.text === 'string' &&
    typeof note.createdAt === 'string'
  )
}

function isSavedStory(value: unknown): value is SavedStory {
  if (typeof value !== 'object' || value === null) return false
  const story = value as Record<string, unknown>
  return (
    typeof story.placeId === 'string' &&
    typeof story.savedAt === 'string' &&
    Array.isArray(story.notes) &&
    story.notes.every(isNote)
  )
}

function isSavedList(value: unknown): value is SavedStory[] {
  return Array.isArray(value) && value.every(isSavedStory)
}

function load(): SavedStory[] {
  return readJson<SavedStory[]>(STORAGE_KEY, isSavedList, [])
}

function store(stories: SavedStory[]): void {
  writeJson(STORAGE_KEY, stories)
}

function requireStory(stories: SavedStory[], placeId: string): SavedStory {
  const story = stories.find((candidate) => candidate.placeId === placeId)
  if (!story) throw new Error(`Story "${placeId}" is not saved`)
  return story
}

export const mockSavedRepository: SavedRepository = {
  async listSaved() {
    await delay(150, 350)
    failIfRequested()
    // Most recently saved first.
    return load().sort((a, b) => b.savedAt.localeCompare(a.savedAt))
  },

  async getSaved(placeId) {
    await delay(100, 250)
    failIfRequested()
    return load().find((story) => story.placeId === placeId) ?? null
  },

  async saveStory(placeId) {
    await delay(100, 250)
    const stories = load()
    const existing = stories.find((story) => story.placeId === placeId)
    if (existing) return existing
    const created: SavedStory = { placeId, savedAt: new Date().toISOString(), notes: [] }
    store([...stories, created])
    return created
  },

  async unsaveStory(placeId) {
    await delay(100, 250)
    store(load().filter((story) => story.placeId !== placeId))
  },

  async addNote(placeId, text) {
    await delay(100, 250)
    const trimmed = text.trim()
    if (!trimmed) throw new Error('A note cannot be empty')
    const stories = load()
    const note: Note = { id: createId(), text: trimmed, createdAt: new Date().toISOString() }
    const existing = stories.find((story) => story.placeId === placeId)
    if (!existing) {
      const created: SavedStory = { placeId, savedAt: note.createdAt, notes: [note] }
      store([...stories, created])
      return created
    }
    const updated: SavedStory = { ...existing, notes: [...existing.notes, note] }
    store(stories.map((story) => (story.placeId === placeId ? updated : story)))
    return updated
  },

  async deleteNote(placeId, noteId) {
    await delay(100, 250)
    const stories = load()
    const existing = requireStory(stories, placeId)
    const updated: SavedStory = {
      ...existing,
      notes: existing.notes.filter((note) => note.id !== noteId),
    }
    store(stories.map((story) => (story.placeId === placeId ? updated : story)))
    return updated
  },
}
