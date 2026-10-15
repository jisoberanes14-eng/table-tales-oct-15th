import { IconButton } from '@/components/ui/IconButton'
import { formatDate } from '@/lib/format'
import type { Note } from '@/types'

interface NoteListProps {
  notes: Note[]
  /** When provided, each note gets a delete button. */
  onDelete?: (noteId: string) => void
}

export function NoteList({ notes, onDelete }: NoteListProps) {
  if (notes.length === 0) return null
  return (
    <ul className="space-y-3">
      {notes.map((note) => (
        <li
          key={note.id}
          className="flex items-start justify-between gap-3 rounded-xl bg-sunken px-4 py-3"
        >
          <div className="min-w-0">
            <p className="text-[0.9375rem] leading-relaxed break-words whitespace-pre-wrap">
              {note.text}
            </p>
            <p className="mt-1 font-sans text-xs text-muted">{formatDate(note.createdAt)}</p>
          </div>
          {onDelete && (
            <IconButton
              icon="trash"
              label="Delete note"
              onClick={() => onDelete(note.id)}
              className="-mr-2 -mt-1.5"
            />
          )}
        </li>
      ))}
    </ul>
  )
}
