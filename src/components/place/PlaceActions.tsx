import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { useClosureReport } from '@/hooks/useClosureReport'
import { useSavedStory, useSaveStory, useUnsaveStory } from '@/hooks/useSaved'
import { useShare } from '@/hooks/useShare'
import { routes } from '@/lib/routes'
import type { PlaceSummary } from '@/types'

interface PlaceActionsProps {
  place: PlaceSummary
  notesOpen: boolean
  onToggleNotes: () => void
}

const SHARE_MESSAGES = {
  shared: 'Shared.',
  copied: 'Link copied to clipboard.',
  cancelled: '',
  failed: 'Could not share or copy the link. Copy it from the address bar instead.',
} as const

export function PlaceActions({ place, notesOpen, onToggleNotes }: PlaceActionsProps) {
  const savedQuery = useSavedStory(place.id)
  const saveStory = useSaveStory()
  const unsaveStory = useUnsaveStory()
  const { share, outcome } = useShare()
  const closure = useClosureReport(place.id)
  const [reportMessage, setReportMessage] = useState('')

  const isSaved = Boolean(savedQuery.data)
  const isBusy = saveStory.isPending || unsaveStory.isPending
  const noteCount = savedQuery.data?.notes.length ?? 0
  const closureBusy = closure.isLoading || closure.report.isPending || closure.withdraw.isPending

  function toggleSaved() {
    if (isSaved) unsaveStory.mutate(place.id)
    else saveStory.mutate(place.id)
  }

  function toggleClosureReport() {
    setReportMessage('')
    if (closure.hasReported) {
      closure.withdraw.mutate(undefined, { onSuccess: () => setReportMessage('Report withdrawn.') })
    } else {
      closure.report.mutate(undefined, {
        onSuccess: () => setReportMessage('Thanks. We will check and update this place.'),
      })
    }
  }

  const statusMessage = outcome
    ? SHARE_MESSAGES[outcome]
    : saveStory.isError || unsaveStory.isError
      ? 'Could not update your saved stories. Please try again.'
      : closure.report.isError || closure.withdraw.isError
        ? 'Could not update your report. Please try again.'
        : reportMessage

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <Button
          variant={isSaved ? 'primary' : 'secondary'}
          aria-pressed={isSaved}
          disabled={isBusy || savedQuery.isPending}
          onClick={toggleSaved}
        >
          <Icon name="bookmark" filled={isSaved} />
          {isSaved ? 'Saved' : 'Save story'}
        </Button>
        <Button aria-expanded={notesOpen} aria-controls="place-notes" onClick={onToggleNotes}>
          <Icon name="pencil" />
          {noteCount > 0 ? `Notes (${noteCount})` : 'Add a note'}
        </Button>
        <Button
          onClick={() =>
            void share({
              title: place.name,
              text: `${place.summary} Read the story on Table Tales.`,
              path: routes.place(place.id),
            })
          }
        >
          <Icon name="share" />
          Share
        </Button>
        {/* Reporting only records a report for an admin to review; it never changes the place. */}
        {!place.isClosed && (
          <Button
            variant={closure.hasReported ? 'primary' : 'secondary'}
            aria-pressed={closure.hasReported}
            disabled={closureBusy}
            onClick={toggleClosureReport}
          >
            <Icon name="flag" />
            {closure.hasReported ? 'Reported as closed' : 'Mark as closed'}
          </Button>
        )}
      </div>
      {/* Always rendered so screen readers pick up changes to its text. */}
      <p role="status" aria-live="polite" className="mt-2 min-h-6 font-sans text-sm text-muted">
        {statusMessage}
      </p>
    </div>
  )
}
