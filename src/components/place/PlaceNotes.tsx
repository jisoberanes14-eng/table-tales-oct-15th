import { useRef, useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { useAddNote, useDeleteNote, useSavedStory } from '@/hooks/useSaved'
import { NoteList } from './NoteList'

interface PlaceNotesProps {
  placeId: string
  open: boolean
}

/** Notes panel on the place page. Adding a note also saves the story (see SavedRepository.addNote). */
export function PlaceNotes({ placeId, open }: PlaceNotesProps) {
  const savedQuery = useSavedStory(placeId)
  const addNote = useAddNote()
  const deleteNote = useDeleteNote()
  const [text, setText] = useState('')
  const fieldRef = useRef<HTMLTextAreaElement>(null)

  const notes = savedQuery.data?.notes ?? []

  if (!open && notes.length === 0) return <div id="place-notes" hidden />

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    addNote.mutate(
      { placeId, text: trimmed },
      {
        onSuccess: () => {
          setText('')
          fieldRef.current?.focus()
        },
      },
    )
  }

  return (
    <section
      id="place-notes"
      aria-labelledby="notes-heading"
      className="mt-4 rounded-2xl border border-line bg-raised p-5"
    >
      <h2
        id="notes-heading"
        className="font-sans text-xs font-semibold tracking-widest text-muted uppercase"
      >
        Your notes
      </h2>

      {notes.length > 0 && (
        <div className="mt-3">
          <NoteList notes={notes} onDelete={(noteId) => deleteNote.mutate({ placeId, noteId })} />
        </div>
      )}

      {open && (
        <form onSubmit={handleSubmit} className="mt-4">
          <label htmlFor="new-note" className="block font-sans text-sm font-semibold">
            Add a note
          </label>
          <textarea
            id="new-note"
            ref={fieldRef}
            value={text}
            onChange={(event) => setText(event.target.value)}
            rows={3}
            maxLength={1000}
            placeholder="What did the owner tell you? What did you order?"
            className="mt-2 w-full rounded-xl border border-line bg-surface px-4 py-3 text-base"
          />
          <div className="mt-3 flex items-center gap-3">
            <Button type="submit" variant="primary" disabled={!text.trim() || addNote.isPending}>
              {addNote.isPending ? 'Saving…' : 'Save note'}
            </Button>
            {addNote.isError && (
              <p role="alert" className="font-sans text-sm text-accent-strong">
                Could not save that note. Please try again.
              </p>
            )}
          </div>
          <p className="mt-2 font-sans text-xs text-muted">
            Notes are saved on this device only. Adding one also saves the story.
          </p>
        </form>
      )}
    </section>
  )
}
