import { Link } from 'react-router-dom'
import { Icon } from '@/components/ui/Icon'
import { ClosedBadge } from '@/components/ui/ClosedBadge'
import { SampleBadge } from '@/components/ui/SampleBadge'
import { formatDistance } from '@/lib/format'
import { routes } from '@/lib/routes'
import type { PlaceSummary } from '@/types'
import { PriceTier } from './PriceTier'
import { SourceBadge } from './SourceBadge'
import { StoryTagList } from './StoryTag'

interface PlaceCardProps {
  place: PlaceSummary
  /** Shows the (mock) distance. Off on screens where distance is not relevant. */
  showDistance?: boolean
}

/** The whole card is one link (via the stretched ::after on the title link). */
export function PlaceCard({ place, showDistance = true }: PlaceCardProps) {
  return (
    <article className="relative flex h-full flex-col rounded-2xl border border-line bg-raised p-5 transition-shadow hover:shadow-md">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {place.isPlaceholder && <SampleBadge />}
        {place.isClosed && <ClosedBadge />}
        <SourceBadge label={place.sourceLabel} />
      </div>

      <h3 className="text-xl font-semibold">
        <Link
          to={routes.place(place.id)}
          className="after:absolute after:inset-0 after:rounded-2xl focus-visible:after:outline-3 focus-visible:after:outline-offset-2 focus-visible:after:outline-focus focus-visible:outline-none"
        >
          {place.name}
        </Link>
      </h3>

      <p className="mt-1 flex flex-wrap items-center gap-x-2 font-sans text-sm text-muted">
        <span>{place.neighborhood}</span>
        <span aria-hidden="true">·</span>
        <span>{place.cuisine}</span>
        <span aria-hidden="true">·</span>
        <PriceTier tier={place.priceTier} />
      </p>

      <p className="mt-3 line-clamp-3 text-[0.9375rem] leading-relaxed">{place.summary}</p>

      <div className="mt-4">
        <StoryTagList tags={place.tags} limit={3} />
      </div>

      {showDistance && (
        <p className="mt-auto flex items-center gap-1.5 pt-4 font-sans text-sm text-muted">
          <Icon name="pin" className="size-4" />
          <span>{formatDistance(place.mockDistanceMiles)} away</span>
        </p>
      )}
    </article>
  )
}

export function PlaceCardSkeletonList({ count = 4 }: { count?: number }) {
  return (
    <ul className="grid gap-4 lg:grid-cols-2" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <li key={index} className="h-56 rounded-2xl border border-line bg-raised p-5">
          <div className="h-5 w-24 rounded-full bg-sunken motion-safe:animate-pulse" />
          <div className="mt-4 h-6 w-3/4 rounded bg-sunken motion-safe:animate-pulse" />
          <div className="mt-3 h-4 w-1/2 rounded bg-sunken motion-safe:animate-pulse" />
          <div className="mt-5 h-4 w-full rounded bg-sunken motion-safe:animate-pulse" />
          <div className="mt-2 h-4 w-5/6 rounded bg-sunken motion-safe:animate-pulse" />
        </li>
      ))}
    </ul>
  )
}
