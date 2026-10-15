import { Link } from 'react-router-dom'
import { PriceTier } from '@/components/place/PriceTier'
import { Icon } from '@/components/ui/Icon'
import { routes } from '@/lib/routes'
import type { ResolvedTrailStop } from '@/types'

interface TrailStopItemProps {
  stop: ResolvedTrailStop
  isLast: boolean
}

/** One stop in an ordered trail. Rendered inside an <ol>, so the list supplies the order semantics. */
export function TrailStopItem({ stop, isLast }: TrailStopItemProps) {
  const { place } = stop
  return (
    <li className="relative flex gap-4 pb-8 last:pb-0">
      {/* Number marker with a connector line down to the next stop. */}
      <div className="flex flex-col items-center">
        <span
          aria-hidden="true"
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent font-sans text-base font-bold text-on-accent"
        >
          {stop.order}
        </span>
        {!isLast && <span aria-hidden="true" className="mt-1 w-px flex-1 bg-line" />}
      </div>

      <div className="min-w-0 flex-1">
        {stop.fromPrevious && (
          <p className="mb-1 flex items-center gap-1.5 font-sans text-xs font-semibold text-muted">
            <Icon name="route" className="size-3.5" />
            {stop.fromPrevious}
          </p>
        )}
        <h3 className="text-xl font-semibold">
          <span className="sr-only">Stop {stop.order}: </span>
          {place.name}
        </h3>
        <p className="mt-1 flex flex-wrap items-center gap-x-2 font-sans text-sm text-muted">
          <span>{place.neighborhood}</span>
          <span aria-hidden="true">·</span>
          <span>{place.cuisine}</span>
          <span aria-hidden="true">·</span>
          <PriceTier tier={place.priceTier} />
        </p>
        <p className="mt-3 text-[1.0625rem] leading-relaxed">{stop.blurb}</p>
        <Link
          to={routes.place(place.id)}
          className="mt-3 inline-flex min-h-11 items-center gap-1 font-sans text-[0.9375rem] font-semibold text-accent-strong underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
        >
          Read the story
          <span className="sr-only"> of {place.name}</span>
          <Icon name="chevron-right" className="size-4" />
        </Link>
      </div>
    </li>
  )
}
