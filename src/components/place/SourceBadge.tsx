import { SOURCE_LABELS } from '@/lib/constants'
import type { SourceLabel } from '@/types'

interface SourceBadgeProps {
  label: SourceLabel
  /** Also show the one-sentence explanation (used on the story page). */
  showDescription?: boolean
}

export function SourceBadge({ label, showDescription = false }: SourceBadgeProps) {
  const { short, description } = SOURCE_LABELS[label]
  return (
    <div className="font-sans">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary-soft px-3 py-1 text-xs font-semibold text-secondary">
        <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor" aria-hidden="true">
          <path d="M12 2 9.2 8.6 2 9.3l5.4 4.7L5.8 21 12 17.3 18.2 21l-1.6-7 5.4-4.7-7.2-.7z" />
        </svg>
        {short}
      </span>
      {showDescription && <p className="mt-1.5 text-sm text-muted">{description}</p>}
    </div>
  )
}
