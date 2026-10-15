export interface Note {
  id: string
  text: string
  /** ISO 8601 timestamp. */
  createdAt: string
}

export interface SavedStory {
  placeId: string
  /** ISO 8601 timestamp. */
  savedAt: string
  notes: Note[]
}
