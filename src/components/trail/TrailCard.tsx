import { Link } from 'react-router-dom'
import { Icon } from '@/components/ui/Icon'
import { SampleBadge } from '@/components/ui/SampleBadge'
import { formatMinutes, pluralize } from '@/lib/format'
import { routes } from '@/lib/routes'
import type { Trail } from '@/types'

export function TrailCard({ trail }: { trail: Trail }) {
  return (
    <article className="relative flex h-full flex-col rounded-2xl border border-line bg-raised p-5 transition-shadow hover:shadow-md">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center rounded-full bg-accent-soft px-3 py-1 font-sans text-xs font-semibold text-accent-strong">
          {trail.kind === 'neighborhood' ? 'Neighborhood walk' : 'Theme trail'}
        </span>
        {trail.isPlaceholder && <SampleBadge />}
      </div>

      <h3 className="text-xl font-semibold">
        <Link
          to={routes.trail(trail.id)}
          className="after:absolute after:inset-0 after:rounded-2xl focus-visible:after:outline-3 focus-visible:after:outline-offset-2 focus-visible:after:outline-focus focus-visible:outline-none"
        >
          {trail.title}
        </Link>
      </h3>
      <p className="mt-1 font-sans text-sm text-muted">{trail.area}</p>
      <p className="mt-3 line-clamp-3 text-[0.9375rem] leading-relaxed">{trail.description}</p>

      <p className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-4 font-sans text-sm text-muted">
        <span className="flex items-center gap-1.5">
          <Icon name="route" className="size-4" />
          {pluralize(trail.stopCount, 'stop')}
        </span>
        <span className="flex items-center gap-1.5">
          <Icon name="clock" className="size-4" />
          {formatMinutes(trail.estimatedMinutes)}
        </span>
      </p>
    </article>
  )
}
